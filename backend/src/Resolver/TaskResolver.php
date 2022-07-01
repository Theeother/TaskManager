<?php

namespace App\Resolver;

use App\Document\Task;
use Doctrine\ODM\MongoDB\DocumentManager;

Class TaskResolver {

  private DocumentManager $dm;

  public function __construct(DocumentManager $dm) {
    $this->dm = $dm;
  }

  public function showAll()
  {
    $tasks = $this->dm->getRepository(Task::class)->findAll();
    return $tasks;
  }

  public function create(Task $task): Task
  {
    $this->dm->persist($task);
    $this->dm->flush();
    return $task;
  }

  public function update($task): Task
  {
    $this->dm->persist($task);
    $this->dm->flush();
    return $task;
  }

  public function delete(Task $task): Task
  {
    $this->dm->remove($task);
    $this->dm->flush();
    return $task;
  }
}