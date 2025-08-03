<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeUserMail extends Mailable
{
    use Queueable, SerializesModels;

    
    public $prenom;
    public $email;
    public $password;

    public function __construct($prenom, $email, $password)
    {
        $this->prenom = $prenom;
        $this->email = $email;
        $this->password = $password;
    }

    public function build()
    {
        return $this->subject('Bienvenue sur ISI School')
                    ->view('emails.welcome');
    }
}
