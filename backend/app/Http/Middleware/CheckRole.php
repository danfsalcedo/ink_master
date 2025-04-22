<?php

namespace App\Http\Middleware;

use Closure;
use Tymon\JWTAuth\Facades\JWTAuth;

class CheckRole
{
    public function handle($request, Closure $next, ...$roles)
    {
        $user = JWTAuth::parseToken()->authenticate();
        
        if (!$user || !in_array($user->tipo, $roles)) {
            return response()->json([
                'message' => 'No autorizado para esta acción',
                'status' => 403
            ], 403);
        }

        return $next($request);
    }
}