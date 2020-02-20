<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BookTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    /** @test */
    public function it_can_create_an_book()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => $title
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(201)
            ->assertJsonStructure(array_keys($data), $data);
    }

    /** @test */
    public function it_fail_create_an_book_author_empty()
    {
        $title = $this->faker->word;

        $data = [
            'title' => $title
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_create_an_book_author_not_integer()
    {
        $title = $this->faker->word;

        $data = [
            'author_id' => 'a',
            'title'     => $title
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_create_an_book_author_not_found()
    {
        $title = $this->faker->word;

        $data = [
            'author_id' => '1',
            'title'     => $title
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_create_an_book_title_empty()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $data = [
            'author_id' => 1,
            'title'     => ''
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_create_an_book_title_over_char()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $data = [
            'author_id' => 1,
            'title'     => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];

        $this->post('api/v1/book', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_can_get_detail_an_book()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => $title
        ];

        $this->post('api/v1/book', $data);

        $this->get('api/v1/book/1')
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_get_detail_an_book_id_not_integer()
    {
        $this->get('api/v1/book/a')
            ->assertStatus(404);
    }

    /** @test */
    public function it_fail_get_detail_an_book_not_found()
    {
        $this->get('api/v1/book/1')
            ->assertStatus(404);
    }

    /** @test */
    public function it_can_update_an_book()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $titleInit = $this->faker->word;

        $dataInit = [
            'author_id' => 1,
            'title'     => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => $title
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_update_an_book_author_empty()
    {
        $titleInit = $this->faker->word;

        $dataInit = [
            'title' => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => ''
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_book_author_not_integer()
    {
        $titleInit = $this->faker->word;

        $dataInit = [
            'author_id' => 'a',
            'title'     => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => ''
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_book_author_not_found()
    {
        $titleInit = $this->faker->word;

        $dataInit = [
            'author_id' => 1,
            'title'     => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => ''
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_book_title_empty()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $titleInit = $this->faker->word;

        $dataInit = [
            'author_id' => 1,
            'title'     => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => ''
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_book_title_over_char()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $titleInit = $this->faker->word;

        $dataInit = [
            'author_id' => 1,
            'title'     => $titleInit
        ];

        $this->post('api/v1/book', $dataInit);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'      => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_book_not_found()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => $title
        ];

        $this->put('api/v1/book/1', $data)
            ->assertStatus(404);
    }

    /** @test */
    public function it_fail_update_an_book_id_not_integer()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $title = $this->faker->word;

        $data = [
            'author_id' => 1,
            'title'     => $title
        ];

        $this->put('api/v1/book/4', $data)
            ->assertStatus(404);
    }

    /** @test */
    public function it_can_delete_an_book()
    {
        $this->delete('api/v1/book/1')
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_delete_an_book_id_not_intege()
    {
        $this->delete('api/v1/book/a')
            ->assertStatus(404);
    }
}
