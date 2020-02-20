<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AuthorTest extends TestCase
{
    use DatabaseMigrations;
    use WithFaker;

    /** @test */
    public function it_can_create_an_author()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data)
            ->assertStatus(201)
            ->assertJsonStructure(array_keys($data), $data);
    }

    /** @test */
    public function it_fail_create_an_author_name_empty()
    {
        $data = [
            'name' => ''
        ];

        $this->post('api/v1/author', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_create_an_author_name_over_char()
    {
        $data = [
            'name' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];

        $this->post('api/v1/author', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_can_get_detail_an_author()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->post('api/v1/author', $data);

        $this->get('api/v1/author/1')
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_get_detail_an_author_id_not_integer()
    {
        $this->get('api/v1/author/a')
            ->assertStatus(404);
    }

    /** @test */
    public function it_fail_get_detail_an_author_not_found()
    {
        $this->get('api/v1/author/1')
            ->assertStatus(404);
    }

    /** @test */
    public function it_can_update_an_author()
    {
        $nameInit = $this->faker->word;

        $dataInit = [
            'name' => $nameInit
        ];

        $this->post('api/v1/author', $dataInit);

        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->put('api/v1/author/1', $data)
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_update_an_author_name_empty()
    {
        $nameInit = $this->faker->word;

        $dataInit = [
            'name' => $nameInit
        ];

        $this->post('api/v1/author', $dataInit);

        $name = $this->faker->word;

        $data = [
            'name' => ''
        ];

        $this->put('api/v1/author/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_author_name_over_char()
    {
        $nameInit = $this->faker->word;

        $dataInit = [
            'name' => $nameInit
        ];

        $this->post('api/v1/author', $dataInit);

        $name = $this->faker->word;

        $data = [
            'name' => 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
        ];

        $this->put('api/v1/author/1', $data)
            ->assertStatus(400);
    }

    /** @test */
    public function it_fail_update_an_author_not_found()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->put('api/v1/author/1', $data)
            ->assertStatus(404);
    }

    /** @test */
    public function it_fail_update_an_author_id_not_integer()
    {
        $name = $this->faker->word;

        $data = [
            'name' => $name
        ];

        $this->put('api/v1/author/4', $data)
            ->assertStatus(404);
    }

    /** @test */
    public function it_can_delete_an_author()
    {
        $this->delete('api/v1/author/1')
            ->assertStatus(200);
    }

    /** @test */
    public function it_fail_delete_an_author_id_not_intege()
    {
        $this->delete('api/v1/author/a')
            ->assertStatus(404);
    }
}
