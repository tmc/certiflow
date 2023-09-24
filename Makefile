# This makefile provides helper targets for building and running the project.
# Run `make help` to print out all the available targets.

.PHONY: run-dev
run-dev: run-frontend-dev ## Run frontend and backend

.PHONY: run-backend-dev
run-backend-dev: ## Run backend
	make -C go-graphql-backend run-dev

.PHONY: run-frontend-dev
run-frontend-dev: ## Run frontend
	make -C react-frontend run-dev

.PHONY: generate
generate: ## Generate code.
	@echo "Generating code..."
	@cd ./go-graphql-backend && make generate
	@cd ./vite-react-frontend && make generate

.PHONY: help
help: ## Show help for each of the Makefile recipes.
	@# This shell prints out the help for each target in this Makefile.
	@grep -E '^[a-zA-Z0-9 -]+:.*##'  Makefile | sort | while read -r l; do printf "\033[1;32m$$(echo $$l | cut -f 1 -d':')\033[00m:$$(echo $$l | cut -f 2- -d'#')\n"; done

.DEFAULT_GOAL := help
