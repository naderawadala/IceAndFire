﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IceAndFire.Domain.DTO
{
    public record CharacterDto
    {
        public required string Name { get; set; }
        public string? Gender { get; set; }
        public string? Culture { get; set; }
        public string? Born { get; set; }
        public string? Died { get; set; }
        public List<string>? Titles { get; set; }
        public List<string>? Aliases { get; set; }
        public string? Father { get; set; }
        public string? Mother { get; set; }
        public string? Spouse { get; set; }
        public List<string>? Allegiances { get; set; }
        public List<string>? Books { get; set; }
        public List<string>? PovBooks { get; set; }
        public List<string>? TvSeries { get; set; }
        public List<string>? PlayedBy { get; set; }
    }
}
