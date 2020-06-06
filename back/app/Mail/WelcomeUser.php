<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class WelcomeUser extends Mailable
{
    use Queueable, SerializesModels;
    public $uname;
    public $code;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($uname,$code)
    {
        $this->uname = $uname;
        $this->code=$code;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $subject='code de récupération de compte utecom Voyage';
        return $this->subject($subject)->view('email.welcome');
    }
}
