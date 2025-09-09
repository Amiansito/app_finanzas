class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    // Campos que se pueden asignar masivamente
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    // Ocultar datos sensibles al devolver en JSON
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Relación: un usuario tiene muchas transacciones
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
