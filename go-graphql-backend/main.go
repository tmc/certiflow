package main

import (
	"context"
	_ "embed"
	"go-graphql-backend/graph"
	"go-graphql-backend/graph/model"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/gorilla/websocket"
	"github.com/ravilushqa/otelgqlgen"
	"github.com/rs/cors"
)

//go:embed ./csf.json
var data []byte

func main() {
	ctx := context.Background()
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Set up tracing.
	shutdown, err := initOtelProvider()
	if err != nil {
		log.Fatal(err)
	}
	defer shutdown(ctx)

	router := chi.NewRouter()

	// Middleware setup
	router.Use(
		middleware.RequestID,
		middleware.RealIP,
		middleware.Recoverer,
		middleware.Logger,
	)

	// GraphQL setup
	resolver := &graph.Resolver{
		Data: []*model.ControlCategory{
			{
				ID:      "1",
				Title:   "Category 1",
				Version: ref("11.0"),
				Objectives: []*model.Objective{
					{
						ID:          "1",
						Title:       "Objective 1",
						Description: ref("Lorem ipsum dolor sit amet, consectetur adipiscing elit. "),
						ControlReferences: []*model.ControlReference{
							{
								ID:         "1",
								Name:       "Control 1",
								FactorType: model.FactorTypeOrganizational,
								Topics: []string{
									"Topic 1",
									"Topic 2",
								},
								Levels: []*model.Level{
									{
										Level:                 1,
										Factors:               []model.FactorType{},
										ImplementationExample: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
										//AuthoritativeSourceMapping:
									},
								},
							},
						},
					},
				},
			},
		},
	}
	s := graph.NewExecutableSchema(graph.Config{Resolvers: resolver})
	srv := newServer(s)
	srv.Use(otelgqlgen.Middleware())

	router.HandleFunc("/", renderApolloSandbox)
	router.Handle("/graphql", srv)
	// Set the context with the span from the request.

	cors := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		AllowedMethods: []string{"GET", "POST"},
		AllowedHeaders: []string{"*"},
		//ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		// Debug:            true,
	})

	log.Printf("Listening on http://localhost:%s", port)
	log.Fatal(http.ListenAndServe(":"+port, cors.Handler(router)))
}

// Largely copied from handler.NewDefaultServer but with relaxed CORS settings.
func newServer(es graphql.ExecutableSchema) *handler.Server {
	srv := handler.New(es)
	srv.AddTransport(&transport.Websocket{
		KeepAlivePingInterval: 10 * time.Second,
		Upgrader: websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})
	srv.AddTransport(transport.MultipartForm{})

	srv.SetQueryCache(lru.New(1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New(100),
	})

	return srv
}

func ref[T any](v T) *T {
	return &v
}
