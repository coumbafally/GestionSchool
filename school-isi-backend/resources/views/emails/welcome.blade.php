<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Bienvenue</title>
</head>
<body>
    <h2>Bienvenue sur ISI School</h2>

    <p>Bonjour {{ $prenom }},</p>

    <p>Nous sommes ravis de vous accueillir sur ISI School, votre portail scolaire.</p>

    <p>Vous pouvez vous connecter ici :</p>

    <div style="background: #f2f2f2; padding: 10px; border-radius: 5px;">
        <strong>Identifiant :</strong> {{ $email }}<br>
        <strong>Mot de passe :</strong> {{ $password }}
    </div>

    <p style="margin-top: 20px;">
        <a href="{{ url('/') }}" style="background: #031346; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
            Se connecter à ISI School
        </a>
    </p>
</body>
</html>
