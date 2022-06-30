<?php

namespace App\Resolver;

use App\Document\Task;
use Doctrine\ODM\MongoDB\DocumentManager;

Class TaskResolver {

  private DocumentManager $dm;

  public function __construct(DocumentManager $dm) {
    $this->dm = $dm;
  }

  public function showAll() {
    $task = $this->dm->getRepository(Task::class)->findAll();
    return $task;
  }

  public function show($id) {
    $task = $this->dm->getRepository(Task::class)->find($id);
    return $task;
  }

  public function create($task) {
    $this->dm->persist($task);
    $this->dm->flush();
    return $task;
  }

  public function update($task) {
    $this->dm->persist($task);
    $this->dm->flush();
    return $task;
  }

  public function delete($id) {
    $task = $this->dm->getRepository(Task::class)->find($id);
    $this->dm->remove($task);
    $this->dm->flush();
    return $task;
  }
}