using ClinicApi.Models;
using Microsoft.EntityFrameworkCore;

namespace ClinicApi.Data
{
    public class ClinicDbContext : DbContext
    {
        public ClinicDbContext(DbContextOptions<ClinicDbContext> options)
            : base(options)
        {
        }

        public DbSet<Patient> Patients { get; set; } = null!;
        public DbSet<Doctor> Doctors { get; set; } = null!;
        public DbSet<Appointment> Appointments { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Relationships (more in Step 2, but already fine here)
            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Patient)
                .WithMany(p => p.Appointments)
                .HasForeignKey(a => a.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Appointment>()
                .HasOne(a => a.Doctor)
                .WithMany(d => d.Appointments)
                .HasForeignKey(a => a.DoctorId)
                .OnDelete(DeleteBehavior.Restrict);

            // Seed doctors
            modelBuilder.Entity<Doctor>().HasData(
                new Doctor
                {
                    Id = 1,
                    FirstName = "Emily",
                    LastName = "Smith",
                    Specialty = "Family Medicine",
                    Email = "emily.smith@clinic.local",
                    Phone = "555-1001"
                },
                new Doctor
                {
                    Id = 2,
                    FirstName = "Ali",
                    LastName = "Karimi",
                    Specialty = "Pediatrics",
                    Email = "ali.karimi@clinic.local",
                    Phone = "555-1002"
                }
            );

            // Seed patients
            modelBuilder.Entity<Patient>().HasData(
                new Patient
                {
                    Id = 1,
                    FirstName = "John",
                    LastName = "Doe",
                    DateOfBirth = new DateTime(1985, 5, 10),
                    Phone = "555-2001",
                    Email = "john.doe@test.com"
                },
                new Patient
                {
                    Id = 2,
                    FirstName = "Sarah",
                    LastName = "Miller",
                    DateOfBirth = new DateTime(1992, 8, 21),
                    Phone = "555-2002",
                    Email = "sarah.miller@test.com"
                }
            );
        }
    }
}
