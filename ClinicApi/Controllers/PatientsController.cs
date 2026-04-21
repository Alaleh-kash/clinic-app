using ClinicApi.Data;
using ClinicApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClinicApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientsController : ControllerBase
    {
        private readonly ClinicDbContext _db;

        public PatientsController(ClinicDbContext db)
        {
            _db = db;
        }

        // GET: api/patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            return await _db.Patients.ToListAsync();
        }

        // GET: api/patients/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatient(int id)
        {
            var patient = await _db.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            return patient;
        }

        // POST: api/patients
        [HttpPost]
        public async Task<ActionResult<Patient>> CreatePatient(Patient patient)
        {
            _db.Patients.Add(patient);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatient), new { id = patient.Id }, patient);
        }

        // PUT: api/patients/1
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatient(int id, Patient updated)
        {
            if (id != updated.Id) return BadRequest("ID mismatch");

            _db.Entry(updated).State = EntityState.Modified;
            await _db.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/patients/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _db.Patients.FindAsync(id);
            if (patient == null) return NotFound();

            _db.Patients.Remove(patient);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
