namespace ClinicApi.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        public DateTime StartTime { get; set; }
        public DateTime EndTime   { get; set; }

        public string? Reason { get; set; }

        // Foreign keys
        public int PatientId { get; set; }
        public int DoctorId  { get; set; }

        // Navigation
        public Patient? Patient { get; set; }
        public Doctor? Doctor  { get; set; }
    }
}
