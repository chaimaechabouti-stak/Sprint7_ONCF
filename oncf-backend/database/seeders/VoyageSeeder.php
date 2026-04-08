<?php
namespace Database\Seeders;

use App\Models\Voyage;
use Illuminate\Database\Seeder;

class VoyageSeeder extends Seeder
{
    public function run(): void
    {
        Voyage::insert([
            ['code_voyage'=>'ONCF001','heureDepart'=>'06:00:00','villeDepart'=>'Casablanca',
             'heureDarrivee'=>'07:30:00','villeDarrivee'=>'Rabat','prixVoyage'=>80.00,
             'created_at'=>now(),'updated_at'=>now()],
            ['code_voyage'=>'ONCF002','heureDepart'=>'08:00:00','villeDepart'=>'Rabat',
             'heureDarrivee'=>'09:30:00','villeDarrivee'=>'Casablanca','prixVoyage'=>80.00,
             'created_at'=>now(),'updated_at'=>now()],
            ['code_voyage'=>'ONCF003','heureDepart'=>'09:00:00','villeDepart'=>'Casablanca',
             'heureDarrivee'=>'12:30:00','villeDarrivee'=>'Marrakech','prixVoyage'=>120.00,
             'created_at'=>now(),'updated_at'=>now()],
            ['code_voyage'=>'ONCF004','heureDepart'=>'07:00:00','villeDepart'=>'Tanger',
             'heureDarrivee'=>'10:30:00','villeDarrivee'=>'Rabat','prixVoyage'=>150.00,
             'created_at'=>now(),'updated_at'=>now()],
            ['code_voyage'=>'ONCF005','heureDepart'=>'14:00:00','villeDepart'=>'Fes',
             'heureDarrivee'=>'17:00:00','villeDarrivee'=>'Casablanca','prixVoyage'=>100.00,
             'created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}