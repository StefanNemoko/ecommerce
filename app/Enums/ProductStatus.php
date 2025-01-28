<?php

namespace App\Enums;

enum ProductStatus: string
{
    const ACTIVE = 'active';
    const INACTIVE = 'inactive';
    const ARCHIVED = 'archived';
}
