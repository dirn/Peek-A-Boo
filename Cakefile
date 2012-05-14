fs               = require 'fs'
path             = require 'path'
{spawn, exec}    = require 'child_process'
CoffeeScript     = require 'coffee-script'
{parser, uglify} = require 'uglify-js'

javascripts = {
  'peekaboo/jquery.peekaboo.js': [
    'coffee/jquery.peekaboo.coffee'
  ]
}

Array::unique = ->
  output = {}
  output[@[key]] = @[key] for key in [0...@length]
  value for key, value of output

source_files = ->
  all_sources = []
  for javascript, sources of javascripts
    for source in sources
      all_sources.push source
  all_sources.unique()

version = ->
  "#{fs.readFileSync('VERSION')}".replace /[^0-9a-zA-Z.]*/gm, ''

version_tag = ->
  "v#{version()}"

write_javascript = (filename, body, trailing='') ->
  fs.writeFileSync filename, """
// Peek-A-Boo jQuery Plugin
// Version #{version()}
//
// Copyright (c) 2012, Andy Dirnberger
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without modification,
// are permitted provided that the following conditions are met:
//
//     1. Redistributions of source code must retain the above copyright notice,
//        this list of conditions and the following disclaimer.
//
//     2. Redistributions in binary form must reproduce the above copyright
//        notice, this list of conditions and the following disclaimer in the
//        documentation and/or other materials provided with the distribution.
//
//     3. Neither the name of Peek-A-Boo nor the names of its contributors may be used
//        to endorse or promote products derived from this software without
//        specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
// ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
// ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
#{body}#{trailing}
"""
  console.log "Wrote #{filename}"

task 'build', 'build Peek-A-Boo from source', build = (cb) ->
  file_name = null; file_contents = null
  try
    for javascript, sources of javascripts
      code = ''
      for source in sources
        file_name = source
        file_contents = "#{fs.readFileSync source}"
        code += CoffeeScript.compile file_contents
      write_javascript javascript, code
      unless process.env.MINIFY is 'false'
        write_javascript javascript.replace(/\.js$/,'.min.js'), (
          uglify.gen_code uglify.ast_squeeze uglify.ast_mangle parser.parse code
        ), ';'
    package_npm () ->
      cb() if typeof cb is 'function'
  catch e
    print_error e, file_name, file_contents

task 'watch', 'watch coffee/ for changes and build Peek-a-Boo', ->
  console.log "Watching for changes in coffee/"
  for file in source_files()
    # Coffeescript wasn't scoping file correctly-
    # without this closure the file name displayed
    # is incorrect.
    ((file) ->
      fs.watchFile file, (curr, prev) ->
        if +curr.mtime isnt +prev.mtime
          console.log "Saw change in #{file}"
          invoke 'build'
    )(file)

task 'package_npm', 'generate the package.json file for npm', package_npm = (cb) ->
  try
    package_file = 'package.json'
    package_obj = JSON.parse("#{fs.readFileSync package_file}")
    package_obj['version'] = version()
    fs.writeFileSync package_file, JSON.stringify(package_obj, null, 2)
    console.log "Wrote #{package_file}"
    cb() if typeof cb is 'function'
  catch e
    print_error e, package_file

print_error = (error, file_name, file_contents) ->
  line = error.message.match /line ([0-9]+):/
  if line && line[1] && line = parseInt(line[1])
    contents_lines = file_contents.split "\n"
    first = if line-4 < 0 then 0 else line-4
    last  = if line+3 > contents_lines.size then contents_lines.size else line+3
    console.log "Error compiling #{file_name}. \"#{error.message}\"\n"
    index = 0
    for line in contents_lines[first...last]
      index++
      line_number = first + 1 + index
      console.log "#{(' ' for [0..(3-(line_number.toString().length))]).join('')} #{line}"
  else
    console.log """
Error compiling #{file_name}:

  #{error.message}

"""
