using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VueWebpackExample.Data;
using VueWebpackExample.Models;

namespace VueWebpackExample.Controllers.Api
{
    [Produces("application/json")]
    [Route("api/Todo")]
    public class TodosController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TodosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Todo
        [HttpGet]
        public IEnumerable<Todo> GetTodos([FromQuery] bool done = false)
        {
            return _context.Todos.Where(t => t.Done == done);
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetTodo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todo = await _context.Todos.SingleOrDefaultAsync(m => m.Id == id);

            if (todo == null)
            {
                return NotFound();
            }

            return Ok(todo);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todo = await _context.Todos.SingleOrDefaultAsync(m => m.Id == id);
            if (todo == null)
            {
                return NotFound();
            }


            todo.Done = true;
            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<IActionResult> PostTodo([FromBody] Todo todo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
        }

        // DELETE: api/Todo/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var todo = await _context.Todos.SingleOrDefaultAsync(m => m.Id == id);
            if (todo == null)
            {
                return NotFound();
            }
            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return Ok(todo);
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}