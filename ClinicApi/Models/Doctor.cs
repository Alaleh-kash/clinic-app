namespace ClinicApi.Models
{
    public class Doctor
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName  { get; set; } = null!;

        public string Specialty { get; set; } = null!;

        public string? Email { get; set; }
        public string? Phone { get; set; }

        // Navigation
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
