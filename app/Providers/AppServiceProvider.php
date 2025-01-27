<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (config('app.app_path')) {
            $this->app->bind('path.public', function () {
                return config('app.app_path'); // Use the environment variable
            });
        }
    }
}
