.PHONY: run e2e

run:
	@npm run dev
	@php artisan migrate
	@php artisan serve

e2e:
	@cd tests/E2E/cypress && npm install && ./node_modules/.bin/cypress open


