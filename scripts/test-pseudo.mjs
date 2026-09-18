import { executeCode } from '../src/lib/pseudoRunner.ts'

let pass = 0, fail = 0
function eq(name, code, expected) {
  const r = executeCode(code)
  const ok = !r.error && r.output === expected
  if (ok) pass++
  else { fail++; console.log(`FAIL ${name}\n  input : ${JSON.stringify(code)}\n  expect: ${JSON.stringify(expected)}\n  got   : ${JSON.stringify(r.output)} ${r.error ? '(error: ' + r.errorMessage + ')' : ''}`) }
}
function err(name, code, fnStr) {
  const r = executeCode(code)
  const ok = r.error && (!fnStr || (r.errorMessage || '').includes(fnStr))
  if (ok) pass++
  else { fail++; console.log(`FAIL ${name} (harus error): ${JSON.stringify(r.output)} ${r.errorMessage || ''}`) }
}

eq('hello', 'tulis("Halo")', 'Halo')
eq('hello-korea', 'cetak("Halo")', 'Halo')
eq('variabel', 'nama <- "Budi"\ntulis("Halo ", nama)', 'Halo  Budi')
eq('assign-:=', 'x := 5\ntulis(x)', '5')
eq('aritmetika', 'tulis(2 + 3 * 4)', '14')
eq('kurung', 'tulis((2 + 3) * 4)', '20')
eq('div', 'tulis(10 div 3)', '3')
eq('mod', 'tulis(10 mod 3)', '1')
eq('pow', 'tulis(2 ** 3)', '8')
eq('float', 'tulis(7 / 2)', '3.5')
eq('perbandingan', 'tulis(5 > 3)', 'true')
eq('eq-=', 'tulis(5 = 5)', 'true')
eq('neq-<>', 'tulis(5 <> 4)', 'true')
eq('string-cmp', 'tulis("biru" < "abu")', 'false')
eq('logic-dan', 'tulis(5 > 3 dan 2 < 4)', 'true')
eq('logic-atau', 'tulis(1 > 2 atau 3 < 4)', 'true')
eq('logic-tidak', 'tulis(tidak 1 > 2)', 'true')
eq('boolean-lit', 'x <- benar\ntulis(x)', 'true')
eq('string-concat', 'nama <- "Andi"\ntulis("Hai, " + nama + "!")', 'Hai, Andi!')
eq('sep-end', 'tulis("a", "b", "c", sep="-")', 'a-b-c')

eq('jika-lulus', 'nilai <- 80\njika nilai >= 75 maka\ntulis("Lulus")\nselainnya\ntulis("Remidi")\nakhirjika', 'Lulus')
eq('jika-gagal', 'nilai <- 60\njika nilai >= 75 maka\ntulis("Lulus")\nselainnya\ntulis("Remidi")\nakhirjika', 'Remidi')
eq('jika-tanpa-else', 'x <- 2\njika x < 0\nx <- 0\nakhirjika\ntulis(x)', '2')
eq('if-english', 'n <- 10\nif n > 5 then\ncetak("Besar")\nendif', 'Besar')
eq('nested-jika', 'n <- 10\njika n > 0 maka\njika n > 5 maka\ntulis("positif besar")\nselainnya\ntulis("positif kecil")\nakhirjika\nselainnya\ntulis("negatif")\nakhirjika', 'positif besar')

eq('for-sum', 'total <- 0\nuntuk i <- 1 sampai 5\ntotal <- total + i\nakhiruntuk\ntulis(total)', '15')
eq('for-langkah', 'untuk i <- 1 sampai 9 langkah 2\ntulis(i)\nakhiruntuk', '1\n3\n5\n7\n9')
eq('for-menurun', 'untuk i <- 5 menurun sampai 1\ntulis(i)\nakhiruntuk', '5\n4\n3\n2\n1')
eq('for-english', 'for i <- 1 to 3\ncetak(i)\nendfor', '1\n2\n3')
eq('while', 'x <- 0\nselama x < 3\nx <- x + 1\ntulis(x)\nakhirsementara', '1\n2\n3')
eq('while-english', 'x <- 0\nwhile x < 3\nx <- x + 1\nendwhile\ncetak(x)', '3')
eq('break', 'untuk i <- 1 sampai 10\njika i = 5 maka\nkeluar\nakhirjika\ntulis(i)\nakhiruntuk', '1\n2\n3\n4')
eq('continue', 'untuk i <- 1 sampai 5\njika i = 3 maka\nlanjut\nakhirjika\ntulis(i)\nakhiruntuk', '1\n2\n4\n5')

eq('fungsi', 'fungsi tambah(a, b)\nkembalikan a + b\nakhirfungsi\ntulis(tambah(3, 4))', '7')
eq('fungsi-statement', 'fungsi sapa(nama)\ntulis("Halo " + nama)\nkembalikan panjang(nama)\nakhirfungsi\nx <- sapa("Budi")\ntulis(x)', 'Halo Budi\n4')
eq('function-english', 'function kuadrat(x)\nreturn x * x\nendfunction\ncetak(kuadrat(6))', '36')

eq('array-liter', 'nilai <- [80, 90, 70]\ntulis(nilai[1])', '80')
eq('array-1based', 'a <- [10, 20, 30]\ntulis(a[1], a[2], a[3])', '10 20 30')
eq('array-assign', 'a <- [1, 2, 3]\na[2] <- 99\ntulis(a)', '[1, 99, 3]')
eq('array-loop', 'a <- [5, 6, 7]\ntotal <- 0\nuntuk i <- 1 sampai 3\ntotal <- total + a[i]\nakhiruntuk\ntulis(total)', '18')
eq('panjang', 'a <- [1, 2, 3]\ntulis(panjang(a))', '3')
eq('len', 'tulis(len("kopi"))', '4')
eq('sum', 'tulis(sum([2, 4, 6]))', '12')
eq('minmax', 'tulis(min(3, 1, 2), max(3, 1, 2))', '1 3')
eq('abs', 'tulis(abs(-7))', '7')
eq('akar', 'tulis(akar(16))', '4')
eq('int', 'tulis(int("42") + 1)', '43')
eq('nested-loop', 'untuk i <- 1 sampai 2\nuntuk j <- 1 sampai 2\ntulis(i, "-", j)\nakhiruntuk\nakhiruntuk', '1 - 1\n1 - 2\n2 - 1\n2 - 2')

eq('skeleton', 'program luas;\ndeklarasi\n p, l, luas: integer\nalgoritma\n p <- 5\n l <- 4\n luas <- p * l\n tulis(luas)\nakhir', '20')
eq('komentar', '# komentar\nx <- 5\n// komentar juga\ntulis(x)', '5')
eq('input', 'nama <- baca()\ntulis("Halo " + nama)', 'Halo ')
eq('variable-expr-guard', 'a <- 10\nb <- a * 2\ntulis(b)', '20')

eq('menurun-belakang', 'untuk i <- 3 sampai 1 menurun\ntulis(i)\nakhiruntuk', '3\n2\n1')
eq('negatif', 'tulis(-2 * 3)', '-6')
eq('negatif-kurung', 'tulis(-(2 + 3))', '-5')
eq('kept-mul-pow', 'tulis(2 * 3 ** 2)', '18')
eq('expression-bound', 'a <- 5\nb <- 2\nuntuk i <- a sampai a + b\ntulis(i)\nakhiruntuk', '5\n6\n7')
eq('aug-tambah', 'x <- 10\nx <- x - 3\ntulis(x)', '7')
eq('agen-kondisi-kata', 'umur <- 20\njika umur >= 17 dan umur <= 60\nberarti <- "cukup umur"\nselainnya\nberarti <- "belum"\nakhirjika\ntulis(berarti)', 'cukup umur')
eq('string-panjang-index', 'kata <- "kopi"\ntulis(kata[2])', 'o')
eq('str-function', 'x <- str(12)\ntulis(panjang(x))', '2')

err('error-var', 'tulis(x)', 'belum terdefinisi')
err('error-indeks', 'a <- [1]\ntulis(a[5])', 'jangkauan')
err('error-loop', 'x <- 0\nselama x < 10\nx <- x - 1\nakhirsementara', 'tak terbatas')

console.log(`\n${pass} pass, ${fail} fail`)
if (fail) process.exit(1)