<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;
use App\Task;
class CreateTasksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->increments('id');
			$table->string('task');
			$table->string('description');
			$table->string('email');
            $table->timestamps();
        });
		Task::create([
			'task' => 'Weekend hookup',
			'description' => 'Call Helga in the afternoon',
			'email' => 'quang@gmail.com',
		]);

		Task::create([
			'task' => 'Late night coding',
			'description' => 'Finishing coding POS API',
			'email' => 'ltq@gmail.com',
		]);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
}
