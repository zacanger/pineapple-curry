#!/usr/bin/env node

// rewrite `cat(1)` in node!

/*
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */

const fs = require('fs')
const args = process.argv.slice(2)

if (!args[0]) {
  console.error('please specify file(s) to catenate')
} else {
  for (let i = 0; i < args.length; i++) {
    fs.createReadStream(args[i]).pipe(process.stdout)
  }
}

//
// below is a much more exhaustive, windows-friendly `cat(1)`.
//

const fs = require('fs')

function cat(result, file) {
  let stdout = ''
  const stderr = ''

  try {
    stdout = result.stdout + fs.readFileSync(file, 'utf8')
    stderr = result.stderr
  } catch (e) {
    stdout = result.stdout
    stderr =
      result.stderr +
      ['cat: ', file, ': ', 'No such file or directory.'].join('')
  }
  return { stdout: stdout, stderr: stderr }
}
const nl = (str) =>
  str.length > 0 && str[str.length - 1] !== '\n' ? str + '\n' : str
const doCat = (files) => {
  let results = files.reduce(cat, { stdout: '', stderr: '' })
  return { stdout: nl(results.stdout), stderr: nl(results.stderr) }
}

let results = doCat(process.argv.slice(2))

if (results.stderr.length) {
  process.stderr.write(results.stderr)
}
if (results.stdout.length) {
  process.stdout.write(results.stdout)
}

process.exit(results.stderr.length ? 1 : 0)
