namespace ClinicApi.Models
{
    public class Patient
    {
        public int Id { get; set; }

        public string FirstName { get; set; } = null!;
        public string LastName  { get; set; } = null!;

        public DateTime DateOfBirth { get; set; }

        public string? Phone { get; set; }
        public string? Email { get; set; }

        // Navigation
        public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
    }
}
