using ClinicApi.Data;
using ClinicApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentsController : ControllerBase
    {
        private readonly ClinicDbContext _db;

        public AppointmentsController(ClinicDbContext db)
        {
            _db = db;
        }

        // GET: api/appointments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            return await _db.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .ToListAsync();
        }

        // GET: api/appointments/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _db.Appointments
                .Include(a => a.Patient)
                .Include(a => a.Doctor)
                .FirstOrDefaultAsync(a => a.Id == id);

            if (appointment == null) return NotFound();

            return appointment;
        }

        // POST: api/appointments
        [HttpPost]
        public async Task<ActionResult<Appointment>> CreateAppointment(Appointment appointment)
        {
            _db.Appointments.Add(appointment);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
        }
        
       // PUT: api/appointments/1
[HttpPut("{id}")]
public async Task<IActionResult> UpdateAppointment(int id, Appointment updated)
{
    if (id != updated.Id)
        return BadRequest("ID mismatch");

    // 1) Validate entities exist
    if (!await _db.Doctors.AnyAsync(d => d.Id == updated.DoctorId))
        return BadRequest("Doctor not found.");

    if (!await _db.Patients.AnyAsync(p => p.Id == updated.PatientId))
        return BadRequest("Patient not found.");

    // 2) Prevent scheduling conflicts
    var conflict = await _db.Appointments.AnyAsync(a =>
        a.Id != id &&
        a.DoctorId == updated.DoctorId &&
        a.StartTime < updated.EndTime &&
        updated.StartTime < a.EndTime
    );

    if (conflict)
        return BadRequest("This doctor already has an appointment during that time.");

    // 3) Save changes
    _db.Entry(updated).State = EntityState.Modified;
    await _db.SaveChangesAsync();

    return NoContent();
}


        // DELETE: api/appointments/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAppointment(int id)
        {
            var appointment = await _db.Appointments.FindAsync(id);
            if (appointment == null) return NotFound();

            _db.Appointments.Remove(appointment);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
