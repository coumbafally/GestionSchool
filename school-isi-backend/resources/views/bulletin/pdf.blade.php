<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Bulletin de {{ $eleve->user->prenom }} {{ $eleve->user->nom }}</title>
    <style>
        body { font-family: DejaVu Sans, sans-serif; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #333; padding: 8px; text-align: center; }
    </style>
</head>
<body>

<h2>Bulletin - {{ $periode }}</h2>

<p><strong>Nom : </strong>{{ $eleve->user->prenom }} {{ $eleve->user->nom }}</p>
<p><strong>Classe : </strong>{{ $eleve->classe->nom }} ({{ $eleve->classe->niveau }})</p>
<p><strong>Identifiant : </strong>{{ $eleve->identifiant_eleve }}</p>

<table>
    <thead>
        <tr>
            <th>Matière</th>
            <th>Type</th>
            <th>Note</th>
            <th>Coef</th>
            <th>Appréciation</th>
        </tr>
    </thead>
    <tbody>
        @foreach($bulletin as $item)
            @foreach($item['notes'] as $note)
                <tr>
                    <td>{{ $item['matiere'] }}</td>
                    <td>{{ $note['type'] }}</td>
                    <td>{{ $note['note'] }}</td>
                    <td>{{ $note['coef'] }}</td>
                    <td>{{ $note['appréciation'] }}</td>
                </tr>
            @endforeach
        @endforeach
    </tbody>
</table>

<p><strong>Moyenne générale : </strong>{{ $moyenne_generale }}</p>
<p><strong>Mention : </strong>{{ $mention }}</p>

<p style="text-align: right; margin-top: 50px;">Signature du directeur ____________________</p>

</body>
</html>
