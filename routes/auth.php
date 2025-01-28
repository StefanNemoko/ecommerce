<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;

Route::middleware('guest')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('/backend/login', [AuthenticatedSessionController::class, 'create'])
        ->name('login');

    Route::post('/backend/login', [AuthenticatedSessionController::class, 'store']);

    Route::get('/backend/forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('password.request');

    Route::post('/backend/forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('password.email');

    Route::get('/backend/reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('password.reset');

    Route::post('/backend/reset-password', [NewPasswordController::class, 'store'])
        ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('/backend/verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::get('/backend/verify-email/{id}/{hash}', VerifyEmailController::class)
        ->middleware(['signed', 'throttle:6,1'])
        ->name('verification.verify');

    Route::post('/backend/email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('verification.send');

    Route::get('/backend/confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('password.confirm');

    Route::post('/backend/confirm-password', [ConfirmablePasswordController::class, 'store']);

    Route::put('/backend/password', [PasswordController::class, 'update'])->name('password.update');

    Route::post('/backend/logout', [AuthenticatedSessionController::class, 'destroy'])
        ->name('logout');
});
