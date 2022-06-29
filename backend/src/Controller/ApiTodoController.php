<?php
declare(strict_types=1);
namespace App\Controller; 

use App\Document\Task;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ODM\MongoDB\DocumentManager as DocumentManager;
use Laminas\Diactoros\Exception\DeserializationException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Serializer;


/**
 * @Route("/api/todo", name="api_todo_")
 */
class ApiTodoController extends AbstractController
{
    /**
     * @Route("/", name="list", methods={"GET"})
     */   
    public function list( DocumentManager $dm): JsonResponse
    {
        $tasks = $dm->getRepository(Task::class)->findAll();
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($tasks, 'json');
        
        return new JsonResponse($jsonContent, 200, [], true);
    }

    /**
     * @Route("/{id}", name="get", methods={"GET"})
     */
    public function show(DocumentManager $dm, $id): JsonResponse
    {
        $task = $dm->getRepository(Task::class)->find($id);
        $response = new Response();
        $response->setContent(json_encode($task));
        return $response;

    }

    /**
     * @Route("/create", name="create", methods={"POST"})
     */
    public function create(Request $request,DocumentManager $dm)

    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);
        $task = $serializer->deserialize($request->getContent(), Task::class, 'json');
        $dm->persist($task);
        $dm->flush();
        return $this->json($task);
    }

    /**
     * @Route("/update", name="update", methods={"PUT"})
     */
    public function update(Request $request,DocumentManager $dm)
    {
        $encoders = [new XmlEncoder(), new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $serializer = new Serializer($normalizers, $encoders);

        $task = $serializer->deserialize($request->getContent(), Task::class, 'json');
        echo $task->getId();
        $oldTask = $dm->getRepository(Task::class)->find($task->getId());
        $oldTask->setTitle($task->getTitle())->
        setDescription($task->getDescription())->
        setColor($task->getColor())->
        setPriority($task->getPriority())->
        setDone($task->getDone());
        $dm->flush();
        
        return $this->json($task);
    }

    /**
     * @Route("/delete/{id}", name="delete", methods={"DELETE"})
     */
    public function delete(DocumentManager $dm, $id)
    {
        $task = $dm->getRepository(Task::class)->find($id);
        $dm->remove($task);
        $dm->flush();

        return $this->json($task);
    }
}