<?php

declare(strict_types=1);

namespace App\Controller;

use App\Document\Task;
use App\Resolver\TaskResolver;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Symfony\Component\Serializer\SerializerInterface;

/**
 * @Route("/api/todo", name="api_todo_")
 */
class ApiTodoController extends AbstractController
{

    private TaskResolver $resolver;
    private SerializerInterface $serializer;

    public function __construct(TaskResolver $resolver, SerializerInterface $serializer)
    {
        $this->resolver = $resolver;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/", name="list", methods={"GET"})
     */
    public function list(): JsonResponse
    {
        $tasks = $this->resolver->showAll();
        $json = $this->serializer->serialize($tasks, 'json');
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    /**
     * @Route("/{id}", name="get", methods={"GET"})
     */
    public function show(string $id): JsonResponse
    {
        $task = $this->resolver->show($id);
        $json = $this->serializer->serialize($task, 'json');
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    /**
     * @Route("/", name="create", methods={"POST"})
     */
    public function create(Request $request): JsonResponse
    {
        $task = $this->serializer->deserialize($request->getContent(), Task::class, 'json');
        $task = $this->resolver->create($task);
        $json = $this->serializer->serialize($task, 'json');
        return new JsonResponse($json, Response::HTTP_CREATED, [], true);
    }

    /**
     * @Route("/{id}", name="update", methods={"PUT"})
     */
    public function update(Request $request, Task $task): JsonResponse
    {
        $task = $this->serializer->deserialize($request->getContent(), Task::class, 'json', [
            AbstractNormalizer::OBJECT_TO_POPULATE => $task
        ]);
        $task = $this->resolver->update($task);
        $json = $this->serializer->serialize($task, 'json');
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }

    /**
     * @Route("/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(string $id): JsonResponse
    {
        $task = $this->resolver->delete($id);
        $json = $this->serializer->serialize($task, 'json');
        return new JsonResponse($json, Response::HTTP_OK, [], true);
    }
}
