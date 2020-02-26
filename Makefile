.PHONY: run e2e

run:
	@npm run dev
	@php artisan migrate
	@php artisan serve

e2e:
	@npm install && npx cypress open
