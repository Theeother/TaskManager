<?php
declare(strict_types=1);
namespace App\Document;

use Doctrine\Bundle\MongoDBBundle\Repository\ServiceDocumentRepository as ServiceDocumentRepository;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ODM\Document(collection="tasks")
 */
class Task 
{
    /**
     * @ODM\Id
     */
    private string $id;

    /**
     * @ODM\Field(type="string")
     * @assert\NotBlank()
     */
    private string $title;
    /**
     * @ODM\Field(type="string")
     * @assert\NotBlank()
     */
    private string $description;

    /**
     * @ODM\Field(type="string")
     */
    
    private string $color;

    /**
     * @ODM\Field(type="int")
     */

    private int $priority;

    /**
     * @ODM\Field(type="bool")
     */

    private bool $done;


    public function getId(): string
    {
        return $this->id;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle($title): Task
    {
        $this->title = $title;
        return $this;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription($description): Task
    {
        $this->description = $description;
        return $this;
    }

    public function getColor(): string
    {
        return $this->color;
    }

    public function setColor($color): Task
    {
        $this->color = $color;
        return $this;
    }

    public function getPriority(): int
    {
        return $this->priority;
    }

    public function setPriority($priority): Task
    {
        $this->priority = (int) $priority;
        return $this;
    }

    public function getDone(): bool
    {
        return $this->done;
    }

    public function setDone($done): Task
    {
        $this->done = (bool) $done;
        return $this;
    }

    public function __construct()
    {
        $this->done = false;
    }
}