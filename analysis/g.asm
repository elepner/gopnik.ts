
;================ proc 0000:02c2  callers: 06a5a
  0000:02c2  push   bp
  0000:02c3  mov    bp, sp
  0000:02c5  xor    ax, ax
  0000:02c7  lcall  SYS:0f78:02cd StackCheck
  0000:02cc  mov    di, 0x3fcc
  0000:02cf  push   ds
  0000:02d0  push   di
  0000:02d1  lcall  SYS:0f78:05dd WriteLnEnd
  0000:02d6  lcall  SYS:0f78:0291 IOCheck
  0000:02db  mov    di, 0x3fcc
  0000:02de  push   ds
  0000:02df  push   di
  0000:02e0  lcall  SYS:0f78:05dd WriteLnEnd
  0000:02e5  lcall  SYS:0f78:0291 IOCheck
  0000:02ea  mov    di, 0x3fcc
  0000:02ed  push   ds
  0000:02ee  push   di
  0000:02ef  lcall  SYS:0f78:05dd WriteLnEnd
  0000:02f4  lcall  SYS:0f78:0291 IOCheck
  0000:02f9  mov    di, 0x3fcc
  0000:02fc  push   ds
  0000:02fd  push   di
  0000:02fe  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0303  lcall  SYS:0f78:0291 IOCheck
  0000:0308  mov    di, 0x3fcc
  0000:030b  push   ds
  0000:030c  push   di
  0000:030d  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0312  lcall  SYS:0f78:0291 IOCheck
  0000:0317  mov    di, 0    ; "                  ^0┌──── ┌────┐ ┌────┐  │    │  │    │  │    /"
  0000:031a  push   cs
  0000:031b  push   di
  0000:031c  xor    ax, ax
  0000:031e  push   ax
  0000:031f  xor    ax, ax
  0000:0321  push   ax
  0000:0322  xor    ax, ax
  0000:0324  push   ax
  0000:0325  xor    ax, ax
  0000:0327  push   ax
  0000:0328  xor    ax, ax
  0000:032a  push   ax
  0000:032b  lcall  U2:0eed:01c2 PrintLn
  0000:0330  mov    di, 0x40    ; "                  ^1│     │    │ │    │  │    │  │    │  │   / "
  0000:0333  push   cs
  0000:0334  push   di
  0000:0335  xor    ax, ax
  0000:0337  push   ax
  0000:0338  xor    ax, ax
  0000:033a  push   ax
  0000:033b  xor    ax, ax
  0000:033d  push   ax
  0000:033e  xor    ax, ax
  0000:0340  push   ax
  0000:0341  xor    ax, ax
  0000:0343  push   ax
  0000:0344  lcall  U2:0eed:01c2 PrintLn
  0000:0349  mov    di, 0x80    ; "                  ^2│     │    │ │    │  │    │  │    │  │  /  "
  0000:034c  push   cs
  0000:034d  push   di
  0000:034e  xor    ax, ax
  0000:0350  push   ax
  0000:0351  xor    ax, ax
  0000:0353  push   ax
  0000:0354  xor    ax, ax
  0000:0356  push   ax
  0000:0357  xor    ax, ax
  0000:0359  push   ax
  0000:035a  xor    ax, ax
  0000:035c  push   ax
  0000:035d  lcall  U2:0eed:01c2 PrintLn
  0000:0362  mov    di, 0xc0    ; "                  ^3│     │    │ │    │  ├────┤  │   /│  │_/   "
  0000:0365  push   cs
  0000:0366  push   di
  0000:0367  xor    ax, ax
  0000:0369  push   ax
  0000:036a  xor    ax, ax
  0000:036c  push   ax
  0000:036d  xor    ax, ax
  0000:036f  push   ax
  0000:0370  xor    ax, ax
  0000:0372  push   ax
  0000:0373  xor    ax, ax
  0000:0375  push   ax
  0000:0376  lcall  U2:0eed:01c2 PrintLn
  0000:037b  mov    di, 0x100    ; "                  ^4│     │    │ │    │  │    │  │  / │  │ \   "
  0000:037e  push   cs
  0000:037f  push   di
  0000:0380  xor    ax, ax
  0000:0382  push   ax
  0000:0383  xor    ax, ax
  0000:0385  push   ax
  0000:0386  xor    ax, ax
  0000:0388  push   ax
  0000:0389  xor    ax, ax
  0000:038b  push   ax
  0000:038c  xor    ax, ax
  0000:038e  push   ax
  0000:038f  lcall  U2:0eed:01c2 PrintLn
  0000:0394  mov    di, 0x140    ; "                  ^5│     │    │ │    │  │    │  │ /  │  │  \  "
  0000:0397  push   cs
  0000:0398  push   di
  0000:0399  xor    ax, ax
  0000:039b  push   ax
  0000:039c  xor    ax, ax
  0000:039e  push   ax
  0000:039f  xor    ax, ax
  0000:03a1  push   ax
  0000:03a2  xor    ax, ax
  0000:03a4  push   ax
  0000:03a5  xor    ax, ax
  0000:03a7  push   ax
  0000:03a8  lcall  U2:0eed:01c2 PrintLn
  0000:03ad  mov    di, 0x180    ; "                  ^6│     │    │ │    │  │    │  │/   │  │   \ "
  0000:03b0  push   cs
  0000:03b1  push   di
  0000:03b2  xor    ax, ax
  0000:03b4  push   ax
  0000:03b5  xor    ax, ax
  0000:03b7  push   ax
  0000:03b8  xor    ax, ax
  0000:03ba  push   ax
  0000:03bb  xor    ax, ax
  0000:03bd  push   ax
  0000:03be  xor    ax, ax
  0000:03c0  push   ax
  0000:03c1  lcall  U2:0eed:01c2 PrintLn
  0000:03c6  mov    di, 0x1c0    ; "                  ^7│     └────┘ │    │  │    │  │    │  │    \"
  0000:03c9  push   cs
  0000:03ca  push   di
  0000:03cb  xor    ax, ax
  0000:03cd  push   ax
  0000:03ce  xor    ax, ax
  0000:03d0  push   ax
  0000:03d1  xor    ax, ax
  0000:03d3  push   ax
  0000:03d4  xor    ax, ax
  0000:03d6  push   ax
  0000:03d7  xor    ax, ax
  0000:03d9  push   ax
  0000:03da  lcall  U2:0eed:01c2 PrintLn
  0000:03df  mov    di, 0x3fcc
  0000:03e2  push   ds
  0000:03e3  push   di
  0000:03e4  lcall  SYS:0f78:05dd WriteLnEnd
  0000:03e9  lcall  SYS:0f78:0291 IOCheck
  0000:03ee  mov    di, 0x200    ; "                                                ^0Версия 1.02"
  0000:03f1  push   cs
  0000:03f2  push   di
  0000:03f3  xor    ax, ax
  0000:03f5  push   ax
  0000:03f6  xor    ax, ax
  0000:03f8  push   ax
  0000:03f9  xor    ax, ax
  0000:03fb  push   ax
  0000:03fc  xor    ax, ax
  0000:03fe  push   ax
  0000:03ff  xor    ax, ax
  0000:0401  push   ax
  0000:0402  lcall  U2:0eed:01c2 PrintLn
  0000:0407  mov    di, 0x3fcc
  0000:040a  push   ds
  0000:040b  push   di
  0000:040c  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0411  lcall  SYS:0f78:0291 IOCheck
  0000:0416  mov    di, 0x3fcc
  0000:0419  push   ds
  0000:041a  push   di
  0000:041b  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0420  lcall  SYS:0f78:0291 IOCheck
  0000:0425  mov    di, 0x3fcc
  0000:0428  push   ds
  0000:0429  push   di
  0000:042a  lcall  SYS:0f78:05dd WriteLnEnd
  0000:042f  lcall  SYS:0f78:0291 IOCheck
  0000:0434  mov    di, 0x23e    ; "                          ^6Нажми какую-нибудь кнопку"
  0000:0437  push   cs
  0000:0438  push   di
  0000:0439  xor    ax, ax
  0000:043b  push   ax
  0000:043c  xor    ax, ax
  0000:043e  push   ax
  0000:043f  xor    ax, ax
  0000:0441  push   ax
  0000:0442  xor    ax, ax
  0000:0444  push   ax
  0000:0445  xor    ax, ax
  0000:0447  push   ax
  0000:0448  lcall  U2:0eed:01c2 PrintLn
  0000:044d  mov    di, 0x3fcc
  0000:0450  push   ds
  0000:0451  push   di
  0000:0452  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0457  lcall  SYS:0f78:0291 IOCheck
  0000:045c  mov    di, 0x3fcc
  0000:045f  push   ds
  0000:0460  push   di
  0000:0461  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0466  lcall  SYS:0f78:0291 IOCheck
  0000:046b  mov    di, 0x3fcc
  0000:046e  push   ds
  0000:046f  push   di
  0000:0470  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0475  lcall  SYS:0f78:0291 IOCheck
  0000:047a  mov    di, 0x3fcc
  0000:047d  push   ds
  0000:047e  push   di
  0000:047f  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0484  lcall  SYS:0f78:0291 IOCheck
  0000:0489  mov    di, 0x274    ; "     ^02003 year, June,Sept                                         ^2by V.P."
  0000:048c  push   cs
  0000:048d  push   di
  0000:048e  xor    ax, ax
  0000:0490  push   ax
  0000:0491  xor    ax, ax
  0000:0493  push   ax
  0000:0494  xor    ax, ax
  0000:0496  push   ax
  0000:0497  xor    ax, ax
  0000:0499  push   ax
  0000:049a  xor    ax, ax
  0000:049c  push   ax
  0000:049d  lcall  U2:0eed:01c2 PrintLn
  0000:04a2  mov    al, 0
  0000:04a4  push   ax
  0000:04a5  lcall  CRT:0f16:0263 TextColor
  0000:04aa  lcall  CRT:0f16:031a ReadKey
  0000:04af  mov    al, 0xf
  0000:04b1  push   ax
  0000:04b2  lcall  CRT:0f16:0263 TextColor
  0000:04b7  lcall  CRT:0f16:01cc ClrScr
  0000:04bc  pop    bp
  0000:04bd  ret    
; ---- data 0000:04be (653 bytes)
;   0000:04be str "                                      ^4Ты сдох."
;   0000:04ef str "                                    ^2Ты победил."
;   0000:0521 str "          ^"
;   0000:052d str "│    │ ┌────┐ ┌────┐  ┌────┐     │    │ ┌────┐ │    │ ┌────┐"
;   0000:056a str "│    │ │      │    │  │          │    │ │    │ │    │ │    │"
;   0000:05a7 str "│    │ │      │    │  │           \\  /  │    │ │    │ │    │"
;   0000:05e4 str "│   /│ │      │    │  │            \\/   │    │ │    │ │    │"
;   0000:0621 str "│  / │ │      ├────┘  ├────        /\\   │    │ ├────┤ │    │"
;   0000:065e str "│ /  │ │      │       │           /  \\  ├────┤ │    │ ├────┤"
;   0000:069b str "│/   │ │      │       │          │    │ │    │ │    │ │    │"
;   0000:06d8 str "│    │ │      │       └────┘     │    │ │    │ │    │ │    │"
;   0000:0715 str "                          ^6Нажми какую-нибудь кнопку"

;================ proc 0000:074b  callers: 00d0d 04fb4 05074
  0000:074b  push   bp
  0000:074c  mov    bp, sp
  0000:074e  mov    ax, 0x202
  0000:0751  lcall  SYS:0f78:02cd StackCheck
  0000:0756  sub    sp, 0x202
  0000:075a  lcall  CRT:0f16:01cc ClrScr
  0000:075f  cmp    byte ptr [bp + 4], 0
  0000:0763  jne    0x76b
  0000:0765  mov    byte ptr [bp - 1], 0x34
  0000:0769  jmp    0x76f
L0076b:
  0000:076b  mov    byte ptr [bp - 1], 0x32
L0076f:
  0000:076f  mov    di, 0x3fcc
  0000:0772  push   ds
  0000:0773  push   di
  0000:0774  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0779  lcall  SYS:0f78:0291 IOCheck
  0000:077e  mov    di, 0x3fcc
  0000:0781  push   ds
  0000:0782  push   di
  0000:0783  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0788  lcall  SYS:0f78:0291 IOCheck
  0000:078d  cmp    byte ptr [bp + 4], 0
  0000:0791  jne    0x7ae
  0000:0793  mov    di, 0x4be    ; "                                      ^4Ты сдох."
  0000:0796  push   cs
  0000:0797  push   di
  0000:0798  xor    ax, ax
  0000:079a  push   ax
  0000:079b  xor    ax, ax
  0000:079d  push   ax
  0000:079e  xor    ax, ax
  0000:07a0  push   ax
  0000:07a1  xor    ax, ax
  0000:07a3  push   ax
  0000:07a4  xor    ax, ax
  0000:07a6  push   ax
  0000:07a7  lcall  U2:0eed:01c2 PrintLn
  0000:07ac  jmp    0x7c7
L007ae:
  0000:07ae  mov    di, 0x4ef    ; "                                    ^2Ты победил."
  0000:07b1  push   cs
  0000:07b2  push   di
  0000:07b3  xor    ax, ax
  0000:07b5  push   ax
  0000:07b6  xor    ax, ax
  0000:07b8  push   ax
  0000:07b9  xor    ax, ax
  0000:07bb  push   ax
  0000:07bc  xor    ax, ax
  0000:07be  push   ax
  0000:07bf  xor    ax, ax
  0000:07c1  push   ax
  0000:07c2  lcall  U2:0eed:01c2 PrintLn
L007c7:
  0000:07c7  mov    di, 0x3fcc
  0000:07ca  push   ds
  0000:07cb  push   di
  0000:07cc  lcall  SYS:0f78:05dd WriteLnEnd
  0000:07d1  lcall  SYS:0f78:0291 IOCheck
  0000:07d6  mov    di, 0x3fcc
  0000:07d9  push   ds
  0000:07da  push   di
  0000:07db  lcall  SYS:0f78:05dd WriteLnEnd
  0000:07e0  lcall  SYS:0f78:0291 IOCheck
  0000:07e5  mov    di, 0x3fcc
  0000:07e8  push   ds
  0000:07e9  push   di
  0000:07ea  lcall  SYS:0f78:05dd WriteLnEnd
  0000:07ef  lcall  SYS:0f78:0291 IOCheck
  0000:07f4  lea    di, [bp - 0x202]
  0000:07f8  push   ss
  0000:07f9  push   di
  0000:07fa  mov    di, 0x521    ; "          ^"
  0000:07fd  push   cs
  0000:07fe  push   di
  0000:07ff  lcall  SYS:0f78:0ae7 StrLoad
  0000:0804  lea    di, [bp - 0x102]
  0000:0808  push   ss
  0000:0809  push   di
  0000:080a  mov    al, byte ptr [bp - 1]
  0000:080d  push   ax
  0000:080e  lcall  SYS:0f78:0c03 CharToStr
  0000:0813  lcall  SYS:0f78:0b66 StrConcat
  0000:0818  mov    di, 0x52d    ; "│    │ ┌────┐ ┌────┐  ┌────┐     │    │ ┌────┐ │    │ ┌────┐"
  0000:081b  push   cs
  0000:081c  push   di
  0000:081d  lcall  SYS:0f78:0b66 StrConcat
  0000:0822  xor    ax, ax
  0000:0824  push   ax
  0000:0825  xor    ax, ax
  0000:0827  push   ax
  0000:0828  xor    ax, ax
  0000:082a  push   ax
  0000:082b  xor    ax, ax
  0000:082d  push   ax
  0000:082e  xor    ax, ax
  0000:0830  push   ax
  0000:0831  lcall  U2:0eed:01c2 PrintLn
  0000:0836  lea    di, [bp - 0x202]
  0000:083a  push   ss
  0000:083b  push   di
  0000:083c  mov    di, 0x521    ; "          ^"
  0000:083f  push   cs
  0000:0840  push   di
  0000:0841  lcall  SYS:0f78:0ae7 StrLoad
  0000:0846  lea    di, [bp - 0x102]
  0000:084a  push   ss
  0000:084b  push   di
  0000:084c  mov    al, byte ptr [bp - 1]
  0000:084f  push   ax
  0000:0850  lcall  SYS:0f78:0c03 CharToStr
  0000:0855  lcall  SYS:0f78:0b66 StrConcat
  0000:085a  mov    di, 0x56a    ; "│    │ │      │    │  │          │    │ │    │ │    │ │    │"
  0000:085d  push   cs
  0000:085e  push   di
  0000:085f  lcall  SYS:0f78:0b66 StrConcat
  0000:0864  xor    ax, ax
  0000:0866  push   ax
  0000:0867  xor    ax, ax
  0000:0869  push   ax
  0000:086a  xor    ax, ax
  0000:086c  push   ax
  0000:086d  xor    ax, ax
  0000:086f  push   ax
  0000:0870  xor    ax, ax
  0000:0872  push   ax
  0000:0873  lcall  U2:0eed:01c2 PrintLn
  0000:0878  lea    di, [bp - 0x202]
  0000:087c  push   ss
  0000:087d  push   di
  0000:087e  mov    di, 0x521    ; "          ^"
  0000:0881  push   cs
  0000:0882  push   di
  0000:0883  lcall  SYS:0f78:0ae7 StrLoad
  0000:0888  lea    di, [bp - 0x102]
  0000:088c  push   ss
  0000:088d  push   di
  0000:088e  mov    al, byte ptr [bp - 1]
  0000:0891  push   ax
  0000:0892  lcall  SYS:0f78:0c03 CharToStr
  0000:0897  lcall  SYS:0f78:0b66 StrConcat
  0000:089c  mov    di, 0x5a7    ; "│    │ │      │    │  │           \  /  │    │ │    │ │    │"
  0000:089f  push   cs
  0000:08a0  push   di
  0000:08a1  lcall  SYS:0f78:0b66 StrConcat
  0000:08a6  xor    ax, ax
  0000:08a8  push   ax
  0000:08a9  xor    ax, ax
  0000:08ab  push   ax
  0000:08ac  xor    ax, ax
  0000:08ae  push   ax
  0000:08af  xor    ax, ax
  0000:08b1  push   ax
  0000:08b2  xor    ax, ax
  0000:08b4  push   ax
  0000:08b5  lcall  U2:0eed:01c2 PrintLn
  0000:08ba  lea    di, [bp - 0x202]
  0000:08be  push   ss
  0000:08bf  push   di
  0000:08c0  mov    di, 0x521    ; "          ^"
  0000:08c3  push   cs
  0000:08c4  push   di
  0000:08c5  lcall  SYS:0f78:0ae7 StrLoad
  0000:08ca  lea    di, [bp - 0x102]
  0000:08ce  push   ss
  0000:08cf  push   di
  0000:08d0  mov    al, byte ptr [bp - 1]
  0000:08d3  push   ax
  0000:08d4  lcall  SYS:0f78:0c03 CharToStr
  0000:08d9  lcall  SYS:0f78:0b66 StrConcat
  0000:08de  mov    di, 0x5e4    ; "│   /│ │      │    │  │            \/   │    │ │    │ │    │"
  0000:08e1  push   cs
  0000:08e2  push   di
  0000:08e3  lcall  SYS:0f78:0b66 StrConcat
  0000:08e8  xor    ax, ax
  0000:08ea  push   ax
  0000:08eb  xor    ax, ax
  0000:08ed  push   ax
  0000:08ee  xor    ax, ax
  0000:08f0  push   ax
  0000:08f1  xor    ax, ax
  0000:08f3  push   ax
  0000:08f4  xor    ax, ax
  0000:08f6  push   ax
  0000:08f7  lcall  U2:0eed:01c2 PrintLn
  0000:08fc  lea    di, [bp - 0x202]
  0000:0900  push   ss
  0000:0901  push   di
  0000:0902  mov    di, 0x521    ; "          ^"
  0000:0905  push   cs
  0000:0906  push   di
  0000:0907  lcall  SYS:0f78:0ae7 StrLoad
  0000:090c  lea    di, [bp - 0x102]
  0000:0910  push   ss
  0000:0911  push   di
  0000:0912  mov    al, byte ptr [bp - 1]
  0000:0915  push   ax
  0000:0916  lcall  SYS:0f78:0c03 CharToStr
  0000:091b  lcall  SYS:0f78:0b66 StrConcat
  0000:0920  mov    di, 0x621    ; "│  / │ │      ├────┘  ├────        /\   │    │ ├────┤ │    │"
  0000:0923  push   cs
  0000:0924  push   di
  0000:0925  lcall  SYS:0f78:0b66 StrConcat
  0000:092a  xor    ax, ax
  0000:092c  push   ax
  0000:092d  xor    ax, ax
  0000:092f  push   ax
  0000:0930  xor    ax, ax
  0000:0932  push   ax
  0000:0933  xor    ax, ax
  0000:0935  push   ax
  0000:0936  xor    ax, ax
  0000:0938  push   ax
  0000:0939  lcall  U2:0eed:01c2 PrintLn
  0000:093e  lea    di, [bp - 0x202]
  0000:0942  push   ss
  0000:0943  push   di
  0000:0944  mov    di, 0x521    ; "          ^"
  0000:0947  push   cs
  0000:0948  push   di
  0000:0949  lcall  SYS:0f78:0ae7 StrLoad
  0000:094e  lea    di, [bp - 0x102]
  0000:0952  push   ss
  0000:0953  push   di
  0000:0954  mov    al, byte ptr [bp - 1]
  0000:0957  push   ax
  0000:0958  lcall  SYS:0f78:0c03 CharToStr
  0000:095d  lcall  SYS:0f78:0b66 StrConcat
  0000:0962  mov    di, 0x65e    ; "│ /  │ │      │       │           /  \  ├────┤ │    │ ├────┤"
  0000:0965  push   cs
  0000:0966  push   di
  0000:0967  lcall  SYS:0f78:0b66 StrConcat
  0000:096c  xor    ax, ax
  0000:096e  push   ax
  0000:096f  xor    ax, ax
  0000:0971  push   ax
  0000:0972  xor    ax, ax
  0000:0974  push   ax
  0000:0975  xor    ax, ax
  0000:0977  push   ax
  0000:0978  xor    ax, ax
  0000:097a  push   ax
  0000:097b  lcall  U2:0eed:01c2 PrintLn
  0000:0980  lea    di, [bp - 0x202]
  0000:0984  push   ss
  0000:0985  push   di
  0000:0986  mov    di, 0x521    ; "          ^"
  0000:0989  push   cs
  0000:098a  push   di
  0000:098b  lcall  SYS:0f78:0ae7 StrLoad
  0000:0990  lea    di, [bp - 0x102]
  0000:0994  push   ss
  0000:0995  push   di
  0000:0996  mov    al, byte ptr [bp - 1]
  0000:0999  push   ax
  0000:099a  lcall  SYS:0f78:0c03 CharToStr
  0000:099f  lcall  SYS:0f78:0b66 StrConcat
  0000:09a4  mov    di, 0x69b    ; "│/   │ │      │       │          │    │ │    │ │    │ │    │"
  0000:09a7  push   cs
  0000:09a8  push   di
  0000:09a9  lcall  SYS:0f78:0b66 StrConcat
  0000:09ae  xor    ax, ax
  0000:09b0  push   ax
  0000:09b1  xor    ax, ax
  0000:09b3  push   ax
  0000:09b4  xor    ax, ax
  0000:09b6  push   ax
  0000:09b7  xor    ax, ax
  0000:09b9  push   ax
  0000:09ba  xor    ax, ax
  0000:09bc  push   ax
  0000:09bd  lcall  U2:0eed:01c2 PrintLn
  0000:09c2  lea    di, [bp - 0x202]
  0000:09c6  push   ss
  0000:09c7  push   di
  0000:09c8  mov    di, 0x521    ; "          ^"
  0000:09cb  push   cs
  0000:09cc  push   di
  0000:09cd  lcall  SYS:0f78:0ae7 StrLoad
  0000:09d2  lea    di, [bp - 0x102]
  0000:09d6  push   ss
  0000:09d7  push   di
  0000:09d8  mov    al, byte ptr [bp - 1]
  0000:09db  push   ax
  0000:09dc  lcall  SYS:0f78:0c03 CharToStr
  0000:09e1  lcall  SYS:0f78:0b66 StrConcat
  0000:09e6  mov    di, 0x6d8    ; "│    │ │      │       └────┘     │    │ │    │ │    │ │    │"
  0000:09e9  push   cs
  0000:09ea  push   di
  0000:09eb  lcall  SYS:0f78:0b66 StrConcat
  0000:09f0  xor    ax, ax
  0000:09f2  push   ax
  0000:09f3  xor    ax, ax
  0000:09f5  push   ax
  0000:09f6  xor    ax, ax
  0000:09f8  push   ax
  0000:09f9  xor    ax, ax
  0000:09fb  push   ax
  0000:09fc  xor    ax, ax
  0000:09fe  push   ax
  0000:09ff  lcall  U2:0eed:01c2 PrintLn
  0000:0a04  mov    di, 0x3fcc
  0000:0a07  push   ds
  0000:0a08  push   di
  0000:0a09  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a0e  lcall  SYS:0f78:0291 IOCheck
  0000:0a13  mov    di, 0x3fcc
  0000:0a16  push   ds
  0000:0a17  push   di
  0000:0a18  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a1d  lcall  SYS:0f78:0291 IOCheck
  0000:0a22  mov    di, 0x3fcc
  0000:0a25  push   ds
  0000:0a26  push   di
  0000:0a27  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a2c  lcall  SYS:0f78:0291 IOCheck
  0000:0a31  mov    di, 0x3fcc
  0000:0a34  push   ds
  0000:0a35  push   di
  0000:0a36  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a3b  lcall  SYS:0f78:0291 IOCheck
  0000:0a40  mov    di, 0x3fcc
  0000:0a43  push   ds
  0000:0a44  push   di
  0000:0a45  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a4a  lcall  SYS:0f78:0291 IOCheck
  0000:0a4f  mov    di, 0x715    ; "                          ^6Нажми какую-нибудь кнопку"
  0000:0a52  push   cs
  0000:0a53  push   di
  0000:0a54  xor    ax, ax
  0000:0a56  push   ax
  0000:0a57  xor    ax, ax
  0000:0a59  push   ax
  0000:0a5a  xor    ax, ax
  0000:0a5c  push   ax
  0000:0a5d  xor    ax, ax
  0000:0a5f  push   ax
  0000:0a60  xor    ax, ax
  0000:0a62  push   ax
  0000:0a63  lcall  U2:0eed:01c2 PrintLn
  0000:0a68  mov    di, 0x3fcc
  0000:0a6b  push   ds
  0000:0a6c  push   di
  0000:0a6d  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a72  lcall  SYS:0f78:0291 IOCheck
  0000:0a77  mov    di, 0x3fcc
  0000:0a7a  push   ds
  0000:0a7b  push   di
  0000:0a7c  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a81  lcall  SYS:0f78:0291 IOCheck
  0000:0a86  mov    di, 0x3fcc
  0000:0a89  push   ds
  0000:0a8a  push   di
  0000:0a8b  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a90  lcall  SYS:0f78:0291 IOCheck
  0000:0a95  mov    di, 0x3fcc
  0000:0a98  push   ds
  0000:0a99  push   di
  0000:0a9a  lcall  SYS:0f78:05dd WriteLnEnd
  0000:0a9f  lcall  SYS:0f78:0291 IOCheck
  0000:0aa4  mov    al, 0
  0000:0aa6  push   ax
  0000:0aa7  lcall  CRT:0f16:0263 TextColor
  0000:0aac  lcall  CRT:0f16:031a ReadKey
  0000:0ab1  mov    al, 0xf
  0000:0ab3  push   ax
  0000:0ab4  lcall  CRT:0f16:0263 TextColor
  0000:0ab9  lcall  CRT:0f16:01cc ClrScr
  0000:0abe  xor    ax, ax
  0000:0ac0  lcall  SYS:0f78:0116 Halt
  0000:0ac5  mov    sp, bp
  0000:0ac7  pop    bp
  0000:0ac8  ret    2
; ---- data 0000:0acb (33 bytes)
;   0000:0acb str "^"
;   0000:0acd str "Т^"
;   0000:0ad0 str "Ы ^"
;   0000:0ad4 str "С^"
;   0000:0ad7 str "У^"
;   0000:0ada str "П^"
;   0000:0add str "Е^"
;   0000:0ae0 str "Р ^"
;   0000:0ae4 str "Г^"
;   0000:0ae7 str "О^"
;   0000:0aea str "П"

;================ proc 0000:0aec  callers: 05133
  0000:0aec  push   bp
  0000:0aed  mov    bp, sp
  0000:0aef  mov    ax, 0xb0c
  0000:0af2  lcall  SYS:0f78:02cd StackCheck
  0000:0af7  sub    sp, 0xb0c
  0000:0afb  mov    byte ptr [bp - 0xb], 1
  0000:0aff  jmp    0xb04
L00b01:
  0000:0b01  inc    byte ptr [bp - 0xb]
L00b04:
  0000:0b04  mov    al, byte ptr [bp - 0xb]
  0000:0b07  xor    ah, ah
  0000:0b09  dec    ax
  0000:0b0a  cdq    
  0000:0b0b  mov    cx, 8
  0000:0b0e  idiv   cx
  0000:0b10  xchg   dx, ax
  0000:0b11  add    ax, 0x30
  0000:0b14  mov    dl, al
  0000:0b16  mov    al, byte ptr [bp - 0xb]
  0000:0b19  xor    ah, ah
  0000:0b1b  mov    di, ax
  0000:0b1d  mov    byte ptr [bp + di - 0xb], dl
  0000:0b20  cmp    byte ptr [bp - 0xb], 0xa
  0000:0b24  jne    0xb01
  0000:0b26  mov    byte ptr [bp - 0xc], 0
L00b2a:
  0000:0b2a  mov    byte ptr [bp - 0xb], 1
  0000:0b2e  jmp    0xb33
L00b30:
  0000:0b30  inc    byte ptr [bp - 0xb]
L00b33:
  0000:0b33  mov    al, byte ptr [bp - 0xc]
  0000:0b36  xor    ah, ah
  0000:0b38  mov    dx, ax
  0000:0b3a  mov    al, byte ptr [bp - 0xb]
  0000:0b3d  xor    ah, ah
  0000:0b3f  add    ax, dx
  0000:0b41  dec    ax
  0000:0b42  cdq    
  0000:0b43  mov    cx, 8
  0000:0b46  idiv   cx
  0000:0b48  xchg   dx, ax
  0000:0b49  add    ax, 0x30
  0000:0b4c  mov    dl, al
  0000:0b4e  mov    al, byte ptr [bp - 0xb]
  0000:0b51  xor    ah, ah
  0000:0b53  mov    di, ax
  0000:0b55  mov    byte ptr [bp + di - 0xb], dl
  0000:0b58  cmp    byte ptr [bp - 0xb], 0xa
  0000:0b5c  jne    0xb30
  0000:0b5e  mov    ax, 0x1388
  0000:0b61  push   ax
  0000:0b62  lcall  CRT:0f16:02a8 Delay
  0000:0b67  lcall  CRT:0f16:01cc ClrScr
  0000:0b6c  mov    byte ptr [bp - 0xb], 1
  0000:0b70  jmp    0xb75
L00b72:
  0000:0b72  inc    byte ptr [bp - 0xb]
L00b75:
  0000:0b75  mov    di, 0x3fcc
  0000:0b78  push   ds
  0000:0b79  push   di
  0000:0b7a  mov    al, 0x20
  0000:0b7c  push   ax
  0000:0b7d  xor    ax, ax
  0000:0b7f  push   ax
  0000:0b80  lcall  SYS:0f78:067b WriteChar
  0000:0b85  lcall  SYS:0f78:05fe WriteEnd
  0000:0b8a  lcall  SYS:0f78:0291 IOCheck
  0000:0b8f  cmp    byte ptr [bp - 0xb], 0x20
  0000:0b93  jne    0xb72
  0000:0b95  lea    di, [bp - 0x20c]
  0000:0b99  push   ss
  0000:0b9a  push   di
  0000:0b9b  mov    di, 0xacb    ; "^"
  0000:0b9e  push   cs
  0000:0b9f  push   di
  0000:0ba0  lcall  SYS:0f78:0ae7 StrLoad
  0000:0ba5  lea    di, [bp - 0x10c]
  0000:0ba9  push   ss
  0000:0baa  push   di
  0000:0bab  mov    al, byte ptr [bp - 0xa]
  0000:0bae  push   ax
  0000:0baf  lcall  SYS:0f78:0c03 CharToStr
  0000:0bb4  lcall  SYS:0f78:0b66 StrConcat
  0000:0bb9  mov    di, 0xacd    ; "Т^"
  0000:0bbc  push   cs
  0000:0bbd  push   di
  0000:0bbe  lcall  SYS:0f78:0b66 StrConcat
  0000:0bc3  lea    di, [bp - 0x30c]
  0000:0bc7  push   ss
  0000:0bc8  push   di
  0000:0bc9  mov    al, byte ptr [bp - 9]
  0000:0bcc  push   ax
  0000:0bcd  lcall  SYS:0f78:0c03 CharToStr
  0000:0bd2  lcall  SYS:0f78:0b66 StrConcat
  0000:0bd7  mov    di, 0xad0    ; "Ы ^"
  0000:0bda  push   cs
  0000:0bdb  push   di
  0000:0bdc  lcall  SYS:0f78:0b66 StrConcat
  0000:0be1  lea    di, [bp - 0x40c]
  0000:0be5  push   ss
  0000:0be6  push   di
  0000:0be7  mov    al, byte ptr [bp - 8]
  0000:0bea  push   ax
  0000:0beb  lcall  SYS:0f78:0c03 CharToStr
  0000:0bf0  lcall  SYS:0f78:0b66 StrConcat
  0000:0bf5  mov    di, 0xad4    ; "С^"
  0000:0bf8  push   cs
  0000:0bf9  push   di
  0000:0bfa  lcall  SYS:0f78:0b66 StrConcat
  0000:0bff  lea    di, [bp - 0x50c]
  0000:0c03  push   ss
  0000:0c04  push   di
  0000:0c05  mov    al, byte ptr [bp - 7]
  0000:0c08  push   ax
  0000:0c09  lcall  SYS:0f78:0c03 CharToStr
  0000:0c0e  lcall  SYS:0f78:0b66 StrConcat
  0000:0c13  mov    di, 0xad7    ; "У^"
  0000:0c16  push   cs
  0000:0c17  push   di
  0000:0c18  lcall  SYS:0f78:0b66 StrConcat
  0000:0c1d  lea    di, [bp - 0x60c]
  0000:0c21  push   ss
  0000:0c22  push   di
  0000:0c23  mov    al, byte ptr [bp - 6]
  0000:0c26  push   ax
  0000:0c27  lcall  SYS:0f78:0c03 CharToStr
  0000:0c2c  lcall  SYS:0f78:0b66 StrConcat
  0000:0c31  mov    di, 0xada    ; "П^"
  0000:0c34  push   cs
  0000:0c35  push   di
  0000:0c36  lcall  SYS:0f78:0b66 StrConcat
  0000:0c3b  lea    di, [bp - 0x70c]
  0000:0c3f  push   ss
  0000:0c40  push   di
  0000:0c41  mov    al, byte ptr [bp - 5]
  0000:0c44  push   ax
  0000:0c45  lcall  SYS:0f78:0c03 CharToStr
  0000:0c4a  lcall  SYS:0f78:0b66 StrConcat
  0000:0c4f  mov    di, 0xadd    ; "Е^"
  0000:0c52  push   cs
  0000:0c53  push   di
  0000:0c54  lcall  SYS:0f78:0b66 StrConcat
  0000:0c59  lea    di, [bp - 0x80c]
  0000:0c5d  push   ss
  0000:0c5e  push   di
  0000:0c5f  mov    al, byte ptr [bp - 4]
  0000:0c62  push   ax
  0000:0c63  lcall  SYS:0f78:0c03 CharToStr
  0000:0c68  lcall  SYS:0f78:0b66 StrConcat
  0000:0c6d  mov    di, 0xae0    ; "Р ^"
  0000:0c70  push   cs
  0000:0c71  push   di
  0000:0c72  lcall  SYS:0f78:0b66 StrConcat
  0000:0c77  lea    di, [bp - 0x90c]
  0000:0c7b  push   ss
  0000:0c7c  push   di
  0000:0c7d  mov    al, byte ptr [bp - 3]
  0000:0c80  push   ax
  0000:0c81  lcall  SYS:0f78:0c03 CharToStr
  0000:0c86  lcall  SYS:0f78:0b66 StrConcat
  0000:0c8b  mov    di, 0xae4    ; "Г^"
  0000:0c8e  push   cs
  0000:0c8f  push   di
  0000:0c90  lcall  SYS:0f78:0b66 StrConcat
  0000:0c95  lea    di, [bp - 0xa0c]
  0000:0c99  push   ss
  0000:0c9a  push   di
  0000:0c9b  mov    al, byte ptr [bp - 2]
  0000:0c9e  push   ax
  0000:0c9f  lcall  SYS:0f78:0c03 CharToStr
  0000:0ca4  lcall  SYS:0f78:0b66 StrConcat
  0000:0ca9  mov    di, 0xae7    ; "О^"
  0000:0cac  push   cs
  0000:0cad  push   di
  0000:0cae  lcall  SYS:0f78:0b66 StrConcat
  0000:0cb3  lea    di, [bp - 0xb0c]
  0000:0cb7  push   ss
  0000:0cb8  push   di
  0000:0cb9  mov    al, byte ptr [bp - 1]
  0000:0cbc  push   ax
  0000:0cbd  lcall  SYS:0f78:0c03 CharToStr
  0000:0cc2  lcall  SYS:0f78:0b66 StrConcat
  0000:0cc7  mov    di, 0xaea    ; "П"
  0000:0cca  push   cs
  0000:0ccb  push   di
  0000:0ccc  lcall  SYS:0f78:0b66 StrConcat
  0000:0cd1  xor    ax, ax
  0000:0cd3  push   ax
  0000:0cd4  xor    ax, ax
  0000:0cd6  push   ax
  0000:0cd7  xor    ax, ax
  0000:0cd9  push   ax
  0000:0cda  xor    ax, ax
  0000:0cdc  push   ax
  0000:0cdd  xor    ax, ax
  0000:0cdf  push   ax
  0000:0ce0  lcall  U2:0eed:01c2 PrintLn
  0000:0ce5  cmp    byte ptr [bp - 0xc], 8
  0000:0ce9  jae    0xcf0
  0000:0ceb  inc    byte ptr [bp - 0xc]
  0000:0cee  jmp    0xcf4
L00cf0:
  0000:0cf0  mov    byte ptr [bp - 0xc], 0
L00cf4:
  0000:0cf4  lcall  CRT:0f16:0308 KeyPressed
  0000:0cf9  or     al, al
  0000:0cfb  jne    0xd00
  0000:0cfd  jmp    0xb2a
L00d00:
  0000:0d00  lcall  CRT:0f16:031a ReadKey
  0000:0d05  lcall  CRT:0f16:031a ReadKey
  0000:0d0a  mov    al, 1
  0000:0d0c  push   ax
  0000:0d0d  call   0x74b
  0000:0d10  mov    sp, bp
  0000:0d12  pop    bp
  0000:0d13  ret    

;================ proc 0000:0d14  callers: 0e181 0dc0e 0ddf6 0c3d0 0b5b8
  0000:0d14  push   bp
  0000:0d15  mov    bp, sp
  0000:0d17  mov    ax, 4
  0000:0d1a  lcall  SYS:0f78:02cd StackCheck
  0000:0d1f  sub    sp, 4
  0000:0d22  mov    ax, 0x33
  0000:0d25  push   ax
  0000:0d26  lcall  SYS:0f78:114b Random
  0000:0d2b  inc    ax
  0000:0d2c  mov    word ptr [g3952], ax
  0000:0d2f  mov    byte ptr [bp - 1], 1
  0000:0d33  jmp    0xd38
L00d35:
  0000:0d35  inc    byte ptr [bp - 1]
L00d38:
  0000:0d38  mov    al, byte ptr [bp - 1]
  0000:0d3b  xor    ah, ah
  0000:0d3d  mov    dx, ax
  0000:0d3f  mov    ax, word ptr [g3952]
  0000:0d42  sub    ax, dx
  0000:0d44  or     ax, ax
  0000:0d46  jge    0xd5b
  0000:0d48  mov    al, byte ptr [bp - 1]
  0000:0d4b  xor    ah, ah
  0000:0d4d  mov    dx, ax
  0000:0d4f  mov    ax, 0xa
  0000:0d52  sub    ax, dx
  0000:0d54  mov    word ptr [g3952], ax
  0000:0d57  jmp    0xd6a
; ---- data 0000:0d59 (2 bytes)
;   0000:0d59 db eb
;   0000:0d5a db 09
L00d5b:
  0000:0d5b  mov    al, byte ptr [bp - 1]
  0000:0d5e  xor    ah, ah
  0000:0d60  sub    word ptr [g3952], ax
  0000:0d64  cmp    byte ptr [bp - 1], 0xa
  0000:0d68  jne    0xd35
L00d6a:
  0000:0d6a  mov    al, byte ptr [g3692]
  0000:0d6d  xor    ah, ah
  0000:0d6f  push   ax
  0000:0d70  lcall  SYS:0f78:114b Random
  0000:0d75  xor    dx, dx
  0000:0d77  mov    cx, ax
  0000:0d79  mov    bx, dx
  0000:0d7b  mov    ax, word ptr [g3952]
  0000:0d7e  cdq    
  0000:0d7f  add    ax, cx
  0000:0d81  adc    dx, bx
  0000:0d83  mov    word ptr [g3952], ax
  0000:0d86  cmp    byte ptr [g3693], 0
  0000:0d8b  je     0xd9a
  0000:0d8d  mov    ax, 4
  0000:0d90  push   ax
  0000:0d91  lcall  SYS:0f78:114b Random
  0000:0d96  add    word ptr [g3952], ax
L00d9a:
  0000:0d9a  cmp    word ptr [g3952], 9
  0000:0d9f  jle    0xda7
  0000:0da1  mov    word ptr [g3952], 9
L00da7:
  0000:0da7  cmp    byte ptr [bp + 4], 1
  0000:0dab  jne    0xdba
  0000:0dad  cmp    word ptr [g3952], 7
  0000:0db2  jle    0xdba
  0000:0db4  mov    word ptr [g3952], 7
L00dba:
  0000:0dba  cmp    byte ptr [bp + 4], 2
  0000:0dbe  jne    0xdc6
  0000:0dc0  mov    word ptr [g3952], 8
L00dc6:
  0000:0dc6  mov    al, byte ptr [g3692]
  0000:0dc9  xor    ah, ah
  0000:0dcb  push   ax
  0000:0dcc  lcall  SYS:0f78:114b Random
  0000:0dd1  shl    ax, 1
  0000:0dd3  shl    ax, 1
  0000:0dd5  xor    dx, dx
  0000:0dd7  push   dx
  0000:0dd8  push   ax
  0000:0dd9  mov    ax, 5
  0000:0ddc  push   ax
  0000:0ddd  lcall  SYS:0f78:114b Random
  0000:0de2  xor    dx, dx
  0000:0de4  lcall  SYS:0f78:1125 RFloat
  0000:0de9  push   dx
  0000:0dea  push   bx
  0000:0deb  push   ax
  0000:0dec  mov    ax, 2
  0000:0def  push   ax
  0000:0df0  lcall  SYS:0f78:114b Random
  0000:0df5  inc    ax
  0000:0df6  xor    dx, dx
  0000:0df8  lcall  SYS:0f78:1125 RFloat
  0000:0dfd  push   dx
  0000:0dfe  push   bx
  0000:0dff  push   ax
  0000:0e00  mov    ax, 2
  0000:0e03  push   ax
  0000:0e04  lcall  SYS:0f78:114b Random
  0000:0e09  inc    ax
  0000:0e0a  xor    dx, dx
  0000:0e0c  mov    cx, ax
  0000:0e0e  mov    bx, dx
  0000:0e10  mov    ax, word ptr [g38a6]
  0000:0e13  cdq    
  0000:0e14  lcall  SYS:0f78:09d2 LongMul
  0000:0e19  lcall  SYS:0f78:1125 RFloat
  0000:0e1e  pop    cx
  0000:0e1f  pop    si
  0000:0e20  pop    di
  0000:0e21  lcall  SYS:0f78:1117 RDiv
  0000:0e26  pop    cx
  0000:0e27  pop    si
  0000:0e28  pop    di
  0000:0e29  lcall  SYS:0f78:10ff RAdd
  0000:0e2e  mov    cx, 0x82
  0000:0e31  xor    si, si
  0000:0e33  xor    di, di
  0000:0e35  lcall  SYS:0f78:1105 RSub
  0000:0e3a  lcall  SYS:0f78:1131 RRound
  0000:0e3f  pop    cx
  0000:0e40  pop    bx
  0000:0e41  add    ax, cx
  0000:0e43  adc    dx, bx
  0000:0e45  mov    word ptr [g395c], ax
  0000:0e48  cmp    word ptr [g395c], 0
  0000:0e4d  jge    0xe54
  0000:0e4f  xor    ax, ax
  0000:0e51  mov    word ptr [g395c], ax
L00e54:
  0000:0e54  cmp    byte ptr [g3693], 0
  0000:0e59  je     0xe79
  0000:0e5b  mov    ax, word ptr [g395c]
  0000:0e5e  cdq    
  0000:0e5f  lcall  SYS:0f78:1125 RFloat
  0000:0e64  mov    cx, 0x81
  0000:0e67  xor    si, si
  0000:0e69  mov    di, 0x4000
  0000:0e6c  lcall  SYS:0f78:1111 RMul
  0000:0e71  lcall  SYS:0f78:1131 RRound
  0000:0e76  mov    word ptr [g395c], ax
L00e79:
  0000:0e79  xor    ax, ax
  0000:0e7b  mov    word ptr [g3954], ax
  0000:0e7e  xor    ax, ax
  0000:0e80  mov    word ptr [g3956], ax
  0000:0e83  xor    ax, ax
  0000:0e85  mov    word ptr [g3958], ax
  0000:0e88  xor    ax, ax
  0000:0e8a  mov    word ptr [g395a], ax
  0000:0e8d  mov    di, word ptr [g3952]
  0000:0e91  shl    di, 1
  0000:0e93  shl    di, 1
  0000:0e95  mov    al, byte ptr [di + 5]
  0000:0e99  xor    ah, ah
  0000:0e9b  mov    bx, ax
  0000:0e9d  mov    di, word ptr [g3952]
  0000:0ea1  shl    di, 1
  0000:0ea3  shl    di, 1
  0000:0ea5  mov    al, byte ptr [di + 4]
  0000:0ea9  xor    ah, ah
  0000:0eab  mov    cx, ax
  0000:0ead  mov    di, word ptr [g3952]
  0000:0eb1  shl    di, 1
  0000:0eb3  shl    di, 1
  0000:0eb5  mov    al, byte ptr [di + 3]
  0000:0eb9  xor    ah, ah
  0000:0ebb  mov    dx, ax
  0000:0ebd  mov    di, word ptr [g3952]
  0000:0ec1  shl    di, 1
  0000:0ec3  shl    di, 1
  0000:0ec5  mov    al, byte ptr [di + 2]
  0000:0ec9  xor    ah, ah
  0000:0ecb  add    ax, dx
  0000:0ecd  add    ax, cx
  0000:0ecf  add    ax, bx
  0000:0ed1  mov    byte ptr [bp - 2], al
  0000:0ed4  mov    ax, word ptr [g395c]
  0000:0ed7  shl    ax, 1
  0000:0ed9  mov    dx, ax
  0000:0edb  mov    al, byte ptr [bp - 2]
  0000:0ede  xor    ah, ah
  0000:0ee0  add    ax, dx
  0000:0ee2  mov    byte ptr [bp - 4], al
  0000:0ee5  mov    al, 1
  0000:0ee7  cmp    al, byte ptr [bp - 4]
  0000:0eea  jbe    0xeef
  0000:0eec  jmp    0xff3
L00eef:
  0000:0eef  mov    byte ptr [bp - 1], al
  0000:0ef2  jmp    0xef7
L00ef4:
  0000:0ef4  inc    byte ptr [bp - 1]
L00ef7:
  0000:0ef7  mov    al, byte ptr [bp - 2]
  0000:0efa  xor    ah, ah
  0000:0efc  push   ax
  0000:0efd  lcall  SYS:0f78:114b Random
  0000:0f02  inc    ax
  0000:0f03  mov    byte ptr [bp - 3], al
  0000:0f06  mov    al, byte ptr [bp - 3]
  0000:0f09  mov    di, word ptr [g3952]
  0000:0f0d  shl    di, 1
  0000:0f0f  shl    di, 1
  0000:0f11  cmp    al, byte ptr [di + 2]
  0000:0f15  ja     0xf1e
  0000:0f17  inc    word ptr [g3954]
  0000:0f1b  jmp    0xfe8
L00f1e:
  0000:0f1e  mov    di, word ptr [g3952]
  0000:0f22  shl    di, 1
  0000:0f24  shl    di, 1
  0000:0f26  mov    al, byte ptr [di + 2]
  0000:0f2a  xor    ah, ah
  0000:0f2c  mov    dx, ax
  0000:0f2e  mov    di, word ptr [g3952]
  0000:0f32  shl    di, 1
  0000:0f34  shl    di, 1
  0000:0f36  mov    al, byte ptr [di + 3]
  0000:0f3a  xor    ah, ah
  0000:0f3c  add    ax, dx
  0000:0f3e  mov    dx, ax
  0000:0f40  mov    al, byte ptr [bp - 3]
  0000:0f43  xor    ah, ah
  0000:0f45  cmp    ax, dx
  0000:0f47  jg     0xf50
  0000:0f49  inc    word ptr [g3956]
  0000:0f4d  jmp    0xfe8
L00f50:
  0000:0f50  mov    di, word ptr [g3952]
  0000:0f54  shl    di, 1
  0000:0f56  shl    di, 1
  0000:0f58  mov    al, byte ptr [di + 2]
  0000:0f5c  xor    ah, ah
  0000:0f5e  mov    cx, ax
  0000:0f60  mov    di, word ptr [g3952]
  0000:0f64  shl    di, 1
  0000:0f66  shl    di, 1
  0000:0f68  mov    al, byte ptr [di + 3]
  0000:0f6c  xor    ah, ah
  0000:0f6e  mov    dx, ax
  0000:0f70  mov    di, word ptr [g3952]
  0000:0f74  shl    di, 1
  0000:0f76  shl    di, 1
  0000:0f78  mov    al, byte ptr [di + 4]
  0000:0f7c  xor    ah, ah
  0000:0f7e  add    ax, dx
  0000:0f80  add    ax, cx
  0000:0f82  mov    dx, ax
  0000:0f84  mov    al, byte ptr [bp - 3]
  0000:0f87  xor    ah, ah
  0000:0f89  cmp    ax, dx
  0000:0f8b  jg     0xf93
  0000:0f8d  inc    word ptr [g3958]
  0000:0f91  jmp    0xfe8
L00f93:
  0000:0f93  mov    di, word ptr [g3952]
  0000:0f97  shl    di, 1
  0000:0f99  shl    di, 1
  0000:0f9b  mov    al, byte ptr [di + 2]
  0000:0f9f  xor    ah, ah
  0000:0fa1  mov    bx, ax
  0000:0fa3  mov    di, word ptr [g3952]
  0000:0fa7  shl    di, 1
  0000:0fa9  shl    di, 1
  0000:0fab  mov    al, byte ptr [di + 3]
  0000:0faf  xor    ah, ah
  0000:0fb1  mov    cx, ax
  0000:0fb3  mov    di, word ptr [g3952]
  0000:0fb7  shl    di, 1
  0000:0fb9  shl    di, 1
  0000:0fbb  mov    al, byte ptr [di + 4]
  0000:0fbf  xor    ah, ah
  0000:0fc1  mov    dx, ax
  0000:0fc3  mov    di, word ptr [g3952]
  0000:0fc7  shl    di, 1
  0000:0fc9  shl    di, 1
  0000:0fcb  mov    al, byte ptr [di + 5]
  0000:0fcf  xor    ah, ah
  0000:0fd1  add    ax, dx
  0000:0fd3  add    ax, cx
  0000:0fd5  add    ax, bx
  0000:0fd7  mov    dx, ax
  0000:0fd9  mov    al, byte ptr [bp - 3]
  0000:0fdc  xor    ah, ah
  0000:0fde  cmp    ax, dx
  0000:0fe0  jg     0xfe8
  0000:0fe2  inc    word ptr [g395a]
  0000:0fe6  jmp    0xfe8
L00fe8:
  0000:0fe8  mov    al, byte ptr [bp - 1]
  0000:0feb  cmp    al, byte ptr [bp - 4]
  0000:0fee  je     0xff3
  0000:0ff0  jmp    0xef4
L00ff3:
  0000:0ff3  mov    ax, word ptr [g3954]
  0000:0ff6  cdq    
  0000:0ff7  mov    cx, 2
  0000:0ffa  idiv   cx
  0000:0ffc  mov    word ptr [g395e], ax
  0000:0fff  mov    ax, word ptr [g3954]
  0000:1002  mov    word ptr [g3960], ax
  0000:1005  mov    ax, word ptr [g3958]
  0000:1008  mov    si, ax
  0000:100a  shl    ax, 1
  0000:100c  shl    ax, 1
  0000:100e  add    ax, si
  0000:1010  add    ax, word ptr [g3954]
  0000:1014  add    ax, 0xa
  0000:1017  mov    word ptr [g3964], ax
  0000:101a  mov    ax, word ptr [g3964]
  0000:101d  mov    word ptr [g3962], ax
  0000:1020  mov    byte ptr [g3966], 0
  0000:1025  mov    byte ptr [g3967], 0
  0000:102a  mov    ax, 6
  0000:102d  push   ax
  0000:102e  lcall  SYS:0f78:114b Random
  0000:1033  xor    dx, dx
  0000:1035  push   dx
  0000:1036  push   ax
  0000:1037  mov    ax, word ptr [g3952]
  0000:103a  mul    word ptr [g395c]
  0000:103e  cdq    
  0000:103f  lcall  SYS:0f78:1125 RFloat
  0000:1044  mov    cx, 0x83
  0000:1047  xor    si, si
  0000:1049  mov    di, 0x2000
  0000:104c  lcall  SYS:0f78:1117 RDiv
  0000:1051  lcall  SYS:0f78:1131 RRound
  0000:1056  push   dx
  0000:1057  push   ax
  0000:1058  mov    ax, word ptr [g395c]
  0000:105b  cdq    
  0000:105c  mov    cx, 2
  0000:105f  idiv   cx
  0000:1061  cdq    
  0000:1062  pop    cx
  0000:1063  pop    bx
  0000:1064  add    ax, cx
  0000:1066  adc    dx, bx
  0000:1068  push   dx
  0000:1069  push   ax
  0000:106a  mov    ax, word ptr [g3952]
  0000:106d  mul    word ptr [g395c]
  0000:1071  cdq    
  0000:1072  lcall  SYS:0f78:1125 RFloat
  0000:1077  mov    cx, 0x83
  0000:107a  xor    si, si
  0000:107c  mov    di, 0x2000
  0000:107f  lcall  SYS:0f78:1117 RDiv
  0000:1084  lcall  SYS:0f78:1131 RRound
  0000:1089  push   dx
  0000:108a  push   ax
  0000:108b  mov    ax, word ptr [g395c]
  0000:108e  cdq    
  0000:108f  mov    cx, 2
  0000:1092  idiv   cx
  0000:1094  cdq    
  0000:1095  pop    cx
  0000:1096  pop    bx
  0000:1097  add    ax, cx
  0000:1099  adc    dx, bx
  0000:109b  push   ax
  0000:109c  lcall  SYS:0f78:114b Random
  0000:10a1  shl    ax, 1
  0000:10a3  xor    dx, dx
  0000:10a5  pop    cx
  0000:10a6  pop    bx
  0000:10a7  sub    ax, cx
  0000:10a9  sbb    dx, bx
  0000:10ab  pop    cx
  0000:10ac  pop    bx
  0000:10ad  add    ax, cx
  0000:10af  adc    dx, bx
  0000:10b1  mov    word ptr [g396e], ax
  0000:10b4  cmp    word ptr [g396e], 0
  0000:10b9  jge    0x10c0
  0000:10bb  xor    ax, ax
  0000:10bd  mov    word ptr [g396e], ax
L010c0:
  0000:10c0  mov    ax, 6
  0000:10c3  push   ax
  0000:10c4  lcall  SYS:0f78:114b Random
  0000:10c9  xor    dx, dx
  0000:10cb  push   dx
  0000:10cc  push   ax
  0000:10cd  mov    ax, word ptr [g3952]
  0000:10d0  mul    word ptr [g395c]
  0000:10d4  cdq    
  0000:10d5  lcall  SYS:0f78:1125 RFloat
  0000:10da  mov    cx, 0x83
  0000:10dd  xor    si, si
  0000:10df  mov    di, 0x2000
  0000:10e2  lcall  SYS:0f78:1117 RDiv
  0000:10e7  lcall  SYS:0f78:1131 RRound
  0000:10ec  push   dx
  0000:10ed  push   ax
  0000:10ee  mov    ax, word ptr [g395c]
  0000:10f1  cdq    
  0000:10f2  mov    cx, 2
  0000:10f5  idiv   cx
  0000:10f7  cdq    
  0000:10f8  pop    cx
  0000:10f9  pop    bx
  0000:10fa  add    ax, cx
  0000:10fc  adc    dx, bx
  0000:10fe  mov    cx, 2
  0000:1101  xor    bx, bx
  0000:1103  lcall  SYS:0f78:0a0f LongDiv
  0000:1108  push   dx
  0000:1109  push   ax
  0000:110a  mov    ax, word ptr [g3952]
  0000:110d  mul    word ptr [g395c]
  0000:1111  cdq    
  0000:1112  lcall  SYS:0f78:1125 RFloat
  0000:1117  mov    cx, 0x83
  0000:111a  xor    si, si
  0000:111c  mov    di, 0x2000
  0000:111f  lcall  SYS:0f78:1117 RDiv
  0000:1124  lcall  SYS:0f78:1131 RRound
  0000:1129  push   dx
  0000:112a  push   ax
  0000:112b  mov    ax, word ptr [g395c]
  0000:112e  cdq    
  0000:112f  mov    cx, 2
  0000:1132  idiv   cx
  0000:1134  cdq    
  0000:1135  pop    cx
  0000:1136  pop    bx
  0000:1137  add    ax, cx
  0000:1139  adc    dx, bx
  0000:113b  push   ax
  0000:113c  lcall  SYS:0f78:114b Random
  0000:1141  xor    dx, dx
  0000:1143  pop    cx
  0000:1144  pop    bx
  0000:1145  sub    ax, cx
  0000:1147  sbb    dx, bx
  0000:1149  pop    cx
  0000:114a  pop    bx
  0000:114b  add    ax, cx
  0000:114d  adc    dx, bx
  0000:114f  mov    word ptr [g396c], ax
  0000:1152  cmp    word ptr [g396c], 0
  0000:1157  jge    0x115e
  0000:1159  xor    ax, ax
  0000:115b  mov    word ptr [g396c], ax
L0115e:
  0000:115e  mov    ax, 2
  0000:1161  push   ax
  0000:1162  lcall  SYS:0f78:114b Random
  0000:1167  xor    dx, dx
  0000:1169  push   dx
  0000:116a  push   ax
  0000:116b  mov    ax, word ptr [g395c]
  0000:116e  cdq    
  0000:116f  mov    cx, 0xa
  0000:1172  idiv   cx
  0000:1174  cdq    
  0000:1175  pop    cx
  0000:1176  pop    bx
  0000:1177  add    ax, cx
  0000:1179  adc    dx, bx
  0000:117b  add    ax, 1
  0000:117e  adc    dx, 0
  0000:1181  mov    word ptr [g396a], ax
  0000:1184  mov    al, byte ptr [g3692]
  0000:1187  xor    ah, ah
  0000:1189  dec    ax
  0000:118a  imul   ax
  0000:118c  shl    ax, 1
  0000:118e  shl    ax, 1
  0000:1190  cdq    
  0000:1191  mov    cx, 2
  0000:1194  idiv   cx
  0000:1196  push   ax
  0000:1197  lcall  SYS:0f78:114b Random
  0000:119c  xor    dx, dx
  0000:119e  push   dx
  0000:119f  push   ax
  0000:11a0  mov    al, byte ptr [g3692]
  0000:11a3  xor    ah, ah
  0000:11a5  dec    ax
  0000:11a6  imul   ax
  0000:11a8  shl    ax, 1
  0000:11aa  shl    ax, 1
  0000:11ac  cdq    
  0000:11ad  mov    cx, 2
  0000:11b0  idiv   cx
  0000:11b2  cdq    
  0000:11b3  pop    cx
  0000:11b4  pop    bx
  0000:11b5  add    ax, cx
  0000:11b7  adc    dx, bx
  0000:11b9  mov    byte ptr [g3968], al
  0000:11bc  mov    sp, bp
  0000:11be  pop    bp
  0000:11bf  ret    2

;================ proc 0000:11c2  callers: 0ae27 0ae33
  0000:11c2  push   bp
  0000:11c3  mov    bp, sp
  0000:11c5  mov    ax, 4
  0000:11c8  lcall  SYS:0f78:02cd StackCheck
  0000:11cd  sub    sp, 4
  0000:11d0  mov    word ptr [g3952], 0xa
  0000:11d6  cmp    byte ptr [bp + 4], 0
  0000:11da  jne    0x11ff
  0000:11dc  mov    word ptr [g395c], 0x7d
  0000:11e2  mov    word ptr [g3954], 0x29
  0000:11e8  mov    word ptr [g3956], 0x32
  0000:11ee  mov    word ptr [g3958], 0x7b
  0000:11f4  mov    word ptr [g395a], 0x24
  0000:11fa  mov    byte ptr [g3968], 0x3c
L011ff:
  0000:11ff  cmp    byte ptr [bp + 4], 1
  0000:1203  jne    0x1228
  0000:1205  mov    word ptr [g395c], 0xa0
  0000:120b  mov    word ptr [g3954], 0x32
  0000:1211  mov    word ptr [g3956], 0x3c
  0000:1217  mov    word ptr [g3958], 0xbc
  0000:121d  mov    word ptr [g395a], 0x20
  0000:1223  mov    byte ptr [g3968], 0x50
L01228:
  0000:1228  mov    ax, word ptr [g3954]
  0000:122b  cdq    
  0000:122c  mov    cx, 2
  0000:122f  idiv   cx
  0000:1231  mov    word ptr [g395e], ax
  0000:1234  mov    ax, word ptr [g3954]
  0000:1237  mov    word ptr [g3960], ax
  0000:123a  mov    ax, word ptr [g3958]
  0000:123d  mov    si, ax
  0000:123f  shl    ax, 1
  0000:1241  shl    ax, 1
  0000:1243  add    ax, si
  0000:1245  add    ax, word ptr [g3954]
  0000:1249  add    ax, 0xa
  0000:124c  mov    word ptr [g3964], ax
  0000:124f  mov    ax, word ptr [g3964]
  0000:1252  mov    word ptr [g3962], ax
  0000:1255  mov    byte ptr [g3966], 0
  0000:125a  mov    byte ptr [g3967], 0
  0000:125f  xor    ax, ax
  0000:1261  mov    word ptr [g396c], ax
  0000:1264  xor    ax, ax
  0000:1266  mov    word ptr [g396a], ax
  0000:1269  xor    ax, ax
  0000:126b  mov    word ptr [g396e], ax
  0000:126e  mov    sp, bp
  0000:1270  pop    bp
  0000:1271  ret    2
; ---- data 0000:1274 (212 bytes)
;   0000:1274 str "Не в этой жизни."
;   0000:1285 str " - "
;   0000:1289 str "^2Это "
;   0000:1290 str " # уровня"
;   0000:129a str "Сл:# Лв:# Жв:# Уд:#"
;   0000:12ae str "Урон #-#"
;   0000:12b7 str "^4Сломана челюсть  "
;   0000:12cb str "^4Сломана нога  "
;   0000:12dc str "^"
;   0000:12de str "Здоровье #/#  "
;   0000:12ed str "Точность #%"
;   0000:12f9 str "Точность 90% "
;   0000:1307 str "   Второй удар #%"
;   0000:1319 str "- # ударов,  Точность # удара #%"
;   0000:133a str "^2Броня #    "

;================ proc 0000:1348  callers: 04c49
  0000:1348  push   bp
  0000:1349  mov    bp, sp
  0000:134b  mov    ax, 0x406
  0000:134e  lcall  SYS:0f78:02cd StackCheck
  0000:1353  sub    sp, 0x406
  0000:1357  mov    byte ptr [bp - 0x100], 0
  0000:135c  cmp    word ptr [g395c], 0x28
  0000:1361  jg     0x1382
  0000:1363  mov    di, word ptr [g395c]
  0000:1367  mov    cl, 8
  0000:1369  shl    di, cl
  0000:136b  add    di, 0xb42
  0000:136f  push   ds
  0000:1370  push   di
  0000:1371  lea    di, [bp - 0x200]
  0000:1375  push   ss
  0000:1376  push   di
  0000:1377  mov    ax, 0xff
  0000:137a  push   ax
  0000:137b  lcall  SYS:0f78:0b01 StrStore
  0000:1380  jmp    0x1396
L01382:
  0000:1382  mov    di, 0x1274    ; "Не в этой жизни."
  0000:1385  push   cs
  0000:1386  push   di
  0000:1387  lea    di, [bp - 0x200]
  0000:138b  push   ss
  0000:138c  push   di
  0000:138d  mov    ax, 0xff
  0000:1390  push   ax
  0000:1391  lcall  SYS:0f78:0b01 StrStore
L01396:
  0000:1396  lea    di, [bp - 0x306]
  0000:139a  push   ss
  0000:139b  push   di
  0000:139c  mov    di, 0x1285    ; " - "
  0000:139f  push   cs
  0000:13a0  push   di
  0000:13a1  lcall  SYS:0f78:0ae7 StrLoad
  0000:13a6  lea    di, [bp - 0x200]
  0000:13aa  push   ss
  0000:13ab  push   di
  0000:13ac  lcall  SYS:0f78:0b66 StrConcat
  0000:13b1  lea    di, [bp - 0x200]
  0000:13b5  push   ss
  0000:13b6  push   di
  0000:13b7  mov    ax, 0xff
  0000:13ba  push   ax
  0000:13bb  lcall  SYS:0f78:0b01 StrStore
  0000:13c0  cmp    word ptr [g3952], 8
  0000:13c5  jl     0x13cc
  0000:13c7  mov    byte ptr [bp - 0x200], 0
L013cc:
  0000:13cc  lea    di, [bp - 0x306]
  0000:13d0  push   ss
  0000:13d1  push   di
  0000:13d2  mov    di, 0x1289    ; "^2Это "
  0000:13d5  push   cs
  0000:13d6  push   di
  0000:13d7  lcall  SYS:0f78:0ae7 StrLoad
  0000:13dc  mov    di, word ptr [g3952]
  0000:13e0  mov    cl, 8
  0000:13e2  shl    di, cl
  0000:13e4  add    di, 0x2e
  0000:13e8  push   ds
  0000:13e9  push   di
  0000:13ea  lcall  SYS:0f78:0b66 StrConcat
  0000:13ef  mov    di, 0x1290    ; " # уровня"
  0000:13f2  push   cs
  0000:13f3  push   di
  0000:13f4  lcall  SYS:0f78:0b66 StrConcat
  0000:13f9  lea    di, [bp - 0x200]
  0000:13fd  push   ss
  0000:13fe  push   di
  0000:13ff  lcall  SYS:0f78:0b66 StrConcat
  0000:1404  push   word ptr [g395c]
  0000:1408  xor    ax, ax
  0000:140a  push   ax
  0000:140b  xor    ax, ax
  0000:140d  push   ax
  0000:140e  xor    ax, ax
  0000:1410  push   ax
  0000:1411  xor    ax, ax
  0000:1413  push   ax
  0000:1414  lcall  U2:0eed:01c2 PrintLn
  0000:1419  mov    di, 0x129a    ; "Сл:# Лв:# Жв:# Уд:#"
  0000:141c  push   cs
  0000:141d  push   di
  0000:141e  push   word ptr [g3954]
  0000:1422  push   word ptr [g3956]
  0000:1426  push   word ptr [g3958]
  0000:142a  push   word ptr [g395a]
  0000:142e  xor    ax, ax
  0000:1430  push   ax
  0000:1431  lcall  U2:0eed:01c2 PrintLn
  0000:1436  mov    di, 0x12ae    ; "Урон #-#"
  0000:1439  push   cs
  0000:143a  push   di
  0000:143b  push   word ptr [g395e]
  0000:143f  push   word ptr [g3960]
  0000:1443  xor    ax, ax
  0000:1445  push   ax
  0000:1446  xor    ax, ax
  0000:1448  push   ax
  0000:1449  xor    ax, ax
  0000:144b  push   ax
  0000:144c  lcall  U2:0eed:01c2 PrintLn
  0000:1451  mov    byte ptr [bp - 0x100], 0
  0000:1456  cmp    byte ptr [g3966], 1
  0000:145b  jne    0x1487
  0000:145d  lea    di, [bp - 0x306]
  0000:1461  push   ss
  0000:1462  push   di
  0000:1463  lea    di, [bp - 0x100]
  0000:1467  push   ss
  0000:1468  push   di
  0000:1469  lcall  SYS:0f78:0ae7 StrLoad
  0000:146e  mov    di, 0x12b7    ; "^4Сломана челюсть  "
  0000:1471  push   cs
  0000:1472  push   di
  0000:1473  lcall  SYS:0f78:0b66 StrConcat
  0000:1478  lea    di, [bp - 0x100]
  0000:147c  push   ss
  0000:147d  push   di
  0000:147e  mov    ax, 0xff
  0000:1481  push   ax
  0000:1482  lcall  SYS:0f78:0b01 StrStore
L01487:
  0000:1487  cmp    byte ptr [g3967], 1
  0000:148c  jne    0x14b8
  0000:148e  lea    di, [bp - 0x306]
  0000:1492  push   ss
  0000:1493  push   di
  0000:1494  lea    di, [bp - 0x100]
  0000:1498  push   ss
  0000:1499  push   di
  0000:149a  lcall  SYS:0f78:0ae7 StrLoad
  0000:149f  mov    di, 0x12cb    ; "^4Сломана нога  "
  0000:14a2  push   cs
  0000:14a3  push   di
  0000:14a4  lcall  SYS:0f78:0b66 StrConcat
  0000:14a9  lea    di, [bp - 0x100]
  0000:14ad  push   ss
  0000:14ae  push   di
  0000:14af  mov    ax, 0xff
  0000:14b2  push   ax
  0000:14b3  lcall  SYS:0f78:0b01 StrStore
L014b8:
  0000:14b8  mov    byte ptr [bp - 0x201], 0x34
  0000:14bd  mov    ax, word ptr [g3964]
  0000:14c0  cdq    
  0000:14c1  lcall  SYS:0f78:1125 RFloat
  0000:14c6  push   dx
  0000:14c7  push   bx
  0000:14c8  push   ax
  0000:14c9  mov    ax, word ptr [g3962]
  0000:14cc  cdq    
  0000:14cd  lcall  SYS:0f78:1125 RFloat
  0000:14d2  pop    cx
  0000:14d3  pop    si
  0000:14d4  pop    di
  0000:14d5  lcall  SYS:0f78:1117 RDiv
  0000:14da  mov    cx, 0x7f
  0000:14dd  xor    si, si
  0000:14df  xor    di, di
  0000:14e1  lcall  SYS:0f78:1121 RCmp
  0000:14e6  jbe    0x14ed
  0000:14e8  mov    byte ptr [bp - 0x201], 0x36
L014ed:
  0000:14ed  mov    ax, word ptr [g3964]
  0000:14f0  cdq    
  0000:14f1  lcall  SYS:0f78:1125 RFloat
  0000:14f6  push   dx
  0000:14f7  push   bx
  0000:14f8  push   ax
  0000:14f9  mov    ax, word ptr [g3962]
  0000:14fc  cdq    
  0000:14fd  lcall  SYS:0f78:1125 RFloat
  0000:1502  pop    cx
  0000:1503  pop    si
  0000:1504  pop    di
  0000:1505  lcall  SYS:0f78:1117 RDiv
  0000:150a  mov    cx, 0x80
  0000:150d  xor    si, si
  0000:150f  xor    di, di
  0000:1511  lcall  SYS:0f78:1121 RCmp
  0000:1516  jbe    0x151d
  0000:1518  mov    byte ptr [bp - 0x201], 0x32
L0151d:
  0000:151d  lea    di, [bp - 0x406]
  0000:1521  push   ss
  0000:1522  push   di
  0000:1523  mov    di, 0x12dc    ; "^"
  0000:1526  push   cs
  0000:1527  push   di
  0000:1528  lcall  SYS:0f78:0ae7 StrLoad
  0000:152d  lea    di, [bp - 0x306]
  0000:1531  push   ss
  0000:1532  push   di
  0000:1533  mov    al, byte ptr [bp - 0x201]
  0000:1537  push   ax
  0000:1538  lcall  SYS:0f78:0c03 CharToStr
  0000:153d  lcall  SYS:0f78:0b66 StrConcat
  0000:1542  mov    di, 0x12de    ; "Здоровье #/#  "
  0000:1545  push   cs
  0000:1546  push   di
  0000:1547  lcall  SYS:0f78:0b66 StrConcat
  0000:154c  lea    di, [bp - 0x100]
  0000:1550  push   ss
  0000:1551  push   di
  0000:1552  lcall  SYS:0f78:0b66 StrConcat
  0000:1557  push   word ptr [g3962]
  0000:155b  push   word ptr [g3964]
  0000:155f  xor    ax, ax
  0000:1561  push   ax
  0000:1562  xor    ax, ax
  0000:1564  push   ax
  0000:1565  xor    ax, ax
  0000:1567  push   ax
  0000:1568  lcall  U2:0eed:01c2 PrintLn
  0000:156d  mov    ax, word ptr [g3956]
  0000:1570  mov    word ptr [bp - 0x204], ax
  0000:1574  cmp    word ptr [bp - 0x204], 0xe
  0000:1579  jg     0x15a4
  0000:157b  mov    di, 0x12ed    ; "Точность #%"
  0000:157e  push   cs
  0000:157f  push   di
  0000:1580  mov    ax, word ptr [bp - 0x204]
  0000:1584  mov    si, ax
  0000:1586  shl    ax, 1
  0000:1588  shl    ax, 1
  0000:158a  add    ax, si
  0000:158c  add    ax, 0x14
  0000:158f  push   ax
  0000:1590  xor    ax, ax
  0000:1592  push   ax
  0000:1593  xor    ax, ax
  0000:1595  push   ax
  0000:1596  xor    ax, ax
  0000:1598  push   ax
  0000:1599  xor    ax, ax
  0000:159b  push   ax
  0000:159c  lcall  U2:0eed:01c2 PrintLn
  0000:15a1  jmp    0x1638
L015a4:
  0000:15a4  mov    di, 0x12f9    ; "Точность 90% "
  0000:15a7  push   cs
  0000:15a8  push   di
  0000:15a9  xor    ax, ax
  0000:15ab  push   ax
  0000:15ac  xor    ax, ax
  0000:15ae  push   ax
  0000:15af  xor    ax, ax
  0000:15b1  push   ax
  0000:15b2  xor    ax, ax
  0000:15b4  push   ax
  0000:15b5  xor    ax, ax
  0000:15b7  push   ax
  0000:15b8  lcall  U2:0eed:0000 Print
  0000:15bd  mov    ax, word ptr [bp - 0x204]
  0000:15c1  sub    ax, 0xe
  0000:15c4  mov    word ptr [bp - 0x204], ax
  0000:15c8  mov    word ptr [bp - 0x206], 1
L015ce:
  0000:15ce  cmp    word ptr [bp - 0x204], 0x12
  0000:15d3  jle    0x15e0
  0000:15d5  sub    word ptr [bp - 0x204], 0x12
  0000:15da  inc    word ptr [bp - 0x206]
  0000:15de  jmp    0x15ce
L015e0:
  0000:15e0  cmp    word ptr [bp - 0x206], 1
  0000:15e5  jne    0x160a
  0000:15e7  mov    di, 0x1307    ; "   Второй удар #%"
  0000:15ea  push   cs
  0000:15eb  push   di
  0000:15ec  mov    ax, word ptr [bp - 0x204]
  0000:15f0  mov    si, ax
  0000:15f2  shl    ax, 1
  0000:15f4  shl    ax, 1
  0000:15f6  add    ax, si
  0000:15f8  push   ax
  0000:15f9  xor    ax, ax
  0000:15fb  push   ax
  0000:15fc  xor    ax, ax
  0000:15fe  push   ax
  0000:15ff  xor    ax, ax
  0000:1601  push   ax
  0000:1602  xor    ax, ax
  0000:1604  push   ax
  0000:1605  lcall  U2:0eed:01c2 PrintLn
L0160a:
  0000:160a  cmp    word ptr [bp - 0x206], 1
  0000:160f  jle    0x1638
  0000:1611  mov    di, 0x1319    ; "- # ударов,  Точность # удара #%"
  0000:1614  push   cs
  0000:1615  push   di
  0000:1616  push   word ptr [bp - 0x206]
  0000:161a  mov    ax, word ptr [bp - 0x206]
  0000:161e  inc    ax
  0000:161f  push   ax
  0000:1620  mov    ax, word ptr [bp - 0x204]
  0000:1624  mov    si, ax
  0000:1626  shl    ax, 1
  0000:1628  shl    ax, 1
  0000:162a  add    ax, si
  0000:162c  push   ax
  0000:162d  xor    ax, ax
  0000:162f  push   ax
  0000:1630  xor    ax, ax
  0000:1632  push   ax
  0000:1633  lcall  U2:0eed:01c2 PrintLn
L01638:
  0000:1638  cmp    byte ptr [g3968], 0
  0000:163d  jbe    0x165b
  0000:163f  mov    di, 0x133a    ; "^2Броня #    "
  0000:1642  push   cs
  0000:1643  push   di
  0000:1644  mov    al, byte ptr [g3968]
  0000:1647  xor    ah, ah
  0000:1649  push   ax
  0000:164a  xor    ax, ax
  0000:164c  push   ax
  0000:164d  xor    ax, ax
  0000:164f  push   ax
  0000:1650  xor    ax, ax
  0000:1652  push   ax
  0000:1653  xor    ax, ax
  0000:1655  push   ax
  0000:1656  lcall  U2:0eed:01c2 PrintLn
L0165b:
  0000:165b  mov    sp, bp
  0000:165d  pop    bp
  0000:165e  ret    
; ---- data 0000:165f (932 bytes)
;   0000:165f str "7777"
;   0000:1664 str "^2Ты "
;   0000:166a str " # уровня - "
;   0000:1677 str "^2А зовут тебя: "
;   0000:1688 str "^6Сейчас у тебя # опыта, А для прокачки надо #"
;   0000:16b7 str "Сл:^"
;   0000:16bc str "#^7 Лв:^"
;   0000:16c5 str "#^7 Жв:^"
;   0000:16ce str "#^7 Уд:^"
;   0000:16d7 str "#"
;   0000:16d9 str "Феньки: "
;   0000:16e2 str "^1Крестик(Удача +2) "
;   0000:16f7 str "^1Кольцо \"Гс\"(Удача +1) "
;   0000:1710 str "Мощные феньки: "
;   0000:1720 str "^1Кольцо \"Пг\"(Всё +1) "
;   0000:1737 str "^1Мега Кольцо(Всё +4) "
;   0000:174e str "^1Кольцо \"Гп\"(Самолечение) "
;   0000:176a str "^1У тебя есть мобильник"
;   0000:1782 str "^1У тебя есть тёмные очки"
;   0000:179c str "^1На тебе зоновская наколка"
;   0000:17b8 str "^1У тебя есть пистолет"
;   0000:17cf str "^1 с гушителем"
;   0000:17de str "^1! патронов - #"
;   0000:17ef str "^6 А птронов-то мало "
;   0000:1805 str "^1.^4 Правда без патронов"
;   0000:181f str "^"
;   0000:1821 str "Урон #-#    "
;   0000:182e str "^1Бутсы(+1) "
;   0000:183b str "^4Бутсы "
;   0000:1844 str "^1Понтовые бутсы(Урон+2) "
;   0000:185e str "^1Кастет(+2) "
;   0000:186c str "^4Кастет "
;   0000:1876 str "^1Дубинка(+4)  "
;   0000:1886 str "^4Дубинка "
;   0000:1891 str "^1Нож(+6) "
;   0000:189c str "^4Нож "
;   0000:18a3 str "^1Тесак(Урон+9) "
;   0000:18b4 str "^4Сломана челюсть  "
;   0000:18c8 str "^1Зубная защита  "
;   0000:18da str "^4Сломана нога  "
;   0000:18eb str "^6Обдолбаный  "
;   0000:18fa str "Здоровье #/#  "
;   0000:1909 str "Точность #%"
;   0000:1915 str "Точность 90% "
;   0000:1923 str "   Второй удар #%"
;   0000:1935 str "- # ударов,  Точность # удара #%"
;   0000:1956 str "^2Броня #    "
;   0000:1964 str "^4Abibas "
;   0000:196e str "^1Костюм Adidas(+2) "
;   0000:1983 str "^1Костюм Abibas(+1) "
;   0000:1998 str "^4Кожанка "
;   0000:19a3 str "^1Крутая кожанка(+4) "
;   0000:19b9 str "^1Кожанка(+2) "
;   0000:19c8 str "Косяки #"
;   0000:19d1 str "Пиво #.#л."
;   0000:19dc str "^4Пива нет"
;   0000:19e7 str "Бабки #"
;   0000:19ef str "^4Нету бабок"
;   0000:19fc str "Хлам #"

;================ proc 0000:1a03  callers: 0ec89 0ee36 04c35 0512b
  0000:1a03  push   bp
  0000:1a04  mov    bp, sp
  0000:1a06  mov    ax, 0x606
  0000:1a09  lcall  SYS:0f78:02cd StackCheck
  0000:1a0e  sub    sp, 0x606
  0000:1a12  mov    di, 0x165f    ; "7777"
  0000:1a15  push   cs
  0000:1a16  push   di
  0000:1a17  lea    di, [bp - 0x100]
  0000:1a1b  push   ss
  0000:1a1c  push   di
  0000:1a1d  mov    ax, 0xff
  0000:1a20  push   ax
  0000:1a21  lcall  SYS:0f78:0b01 StrStore
  0000:1a26  lea    di, [bp - 0x206]
  0000:1a2a  push   ss
  0000:1a2b  push   di
  0000:1a2c  mov    di, 0x1664    ; "^2Ты "
  0000:1a2f  push   cs
  0000:1a30  push   di
  0000:1a31  lcall  SYS:0f78:0ae7 StrLoad
  0000:1a36  mov    di, word ptr [g389c]
  0000:1a3a  mov    cl, 8
  0000:1a3c  shl    di, cl
  0000:1a3e  add    di, 0x2e
  0000:1a42  push   ds
  0000:1a43  push   di
  0000:1a44  lcall  SYS:0f78:0b66 StrConcat
  0000:1a49  mov    di, 0x166a    ; " # уровня - "
  0000:1a4c  push   cs
  0000:1a4d  push   di
  0000:1a4e  lcall  SYS:0f78:0b66 StrConcat
  0000:1a53  mov    di, word ptr [g38a6]
  0000:1a57  mov    cl, 8
  0000:1a59  shl    di, cl
  0000:1a5b  add    di, 0xb42
  0000:1a5f  push   ds
  0000:1a60  push   di
  0000:1a61  lcall  SYS:0f78:0b66 StrConcat
  0000:1a66  push   word ptr [g38a6]
  0000:1a6a  xor    ax, ax
  0000:1a6c  push   ax
  0000:1a6d  xor    ax, ax
  0000:1a6f  push   ax
  0000:1a70  xor    ax, ax
  0000:1a72  push   ax
  0000:1a73  xor    ax, ax
  0000:1a75  push   ax
  0000:1a76  lcall  U2:0eed:01c2 PrintLn
  0000:1a7b  lea    di, [bp - 0x206]
  0000:1a7f  push   ss
  0000:1a80  push   di
  0000:1a81  mov    di, 0x1677    ; "^2А зовут тебя: "
  0000:1a84  push   cs
  0000:1a85  push   di
  0000:1a86  lcall  SYS:0f78:0ae7 StrLoad
  0000:1a8b  mov    di, 0x379c
  0000:1a8e  push   ds
  0000:1a8f  push   di
  0000:1a90  lcall  SYS:0f78:0b66 StrConcat
  0000:1a95  xor    ax, ax
  0000:1a97  push   ax
  0000:1a98  xor    ax, ax
  0000:1a9a  push   ax
  0000:1a9b  xor    ax, ax
  0000:1a9d  push   ax
  0000:1a9e  xor    ax, ax
  0000:1aa0  push   ax
  0000:1aa1  xor    ax, ax
  0000:1aa3  push   ax
  0000:1aa4  lcall  U2:0eed:01c2 PrintLn
  0000:1aa9  cmp    word ptr [g38a6], 0x27
  0000:1aae  jg     0x1acb
  0000:1ab0  mov    di, 0x1688    ; "^6Сейчас у тебя # опыта, А для прокачки надо #"
  0000:1ab3  push   cs
  0000:1ab4  push   di
  0000:1ab5  push   word ptr [g38ce]
  0000:1ab9  push   word ptr [g38d0]
  0000:1abd  xor    ax, ax
  0000:1abf  push   ax
  0000:1ac0  xor    ax, ax
  0000:1ac2  push   ax
  0000:1ac3  xor    ax, ax
  0000:1ac5  push   ax
  0000:1ac6  lcall  U2:0eed:01c2 PrintLn
L01acb:
  0000:1acb  cmp    byte ptr [g38cd], 0
  0000:1ad0  ja     0x1ae0
  0000:1ad2  cmp    byte ptr [g38bf], 0
  0000:1ad7  jne    0x1ae0
  0000:1ad9  cmp    byte ptr [g38c0], 0
  0000:1ade  je     0x1ae5
L01ae0:
  0000:1ae0  mov    byte ptr [bp - 0xff], 0x31
L01ae5:
  0000:1ae5  cmp    byte ptr [g38bf], 0
  0000:1aea  jne    0x1af3
  0000:1aec  cmp    byte ptr [g38c0], 0
  0000:1af1  je     0x1afd
L01af3:
  0000:1af3  mov    byte ptr [bp - 0xfe], 0x31
  0000:1af8  mov    byte ptr [bp - 0xfd], 0x31
L01afd:
  0000:1afd  cmp    byte ptr [g38bd], 0
  0000:1b02  jne    0x1b19
  0000:1b04  cmp    byte ptr [g38be], 0
  0000:1b09  jne    0x1b19
  0000:1b0b  cmp    byte ptr [g38bf], 0
  0000:1b10  jne    0x1b19
  0000:1b12  cmp    byte ptr [g38c0], 0
  0000:1b17  je     0x1b1e
L01b19:
  0000:1b19  mov    byte ptr [bp - 0xfc], 0x31
L01b1e:
  0000:1b1e  lea    di, [bp - 0x306]
  0000:1b22  push   ss
  0000:1b23  push   di
  0000:1b24  mov    di, 0x16b7    ; "Сл:^"
  0000:1b27  push   cs
  0000:1b28  push   di
  0000:1b29  lcall  SYS:0f78:0ae7 StrLoad
  0000:1b2e  lea    di, [bp - 0x206]
  0000:1b32  push   ss
  0000:1b33  push   di
  0000:1b34  mov    al, byte ptr [bp - 0xff]
  0000:1b38  push   ax
  0000:1b39  lcall  SYS:0f78:0c03 CharToStr
  0000:1b3e  lcall  SYS:0f78:0b66 StrConcat
  0000:1b43  mov    di, 0x16bc    ; "#^7 Лв:^"
  0000:1b46  push   cs
  0000:1b47  push   di
  0000:1b48  lcall  SYS:0f78:0b66 StrConcat
  0000:1b4d  lea    di, [bp - 0x406]
  0000:1b51  push   ss
  0000:1b52  push   di
  0000:1b53  mov    al, byte ptr [bp - 0xfe]
  0000:1b57  push   ax
  0000:1b58  lcall  SYS:0f78:0c03 CharToStr
  0000:1b5d  lcall  SYS:0f78:0b66 StrConcat
  0000:1b62  mov    di, 0x16c5    ; "#^7 Жв:^"
  0000:1b65  push   cs
  0000:1b66  push   di
  0000:1b67  lcall  SYS:0f78:0b66 StrConcat
  0000:1b6c  lea    di, [bp - 0x506]
  0000:1b70  push   ss
  0000:1b71  push   di
  0000:1b72  mov    al, byte ptr [bp - 0xfd]
  0000:1b76  push   ax
  0000:1b77  lcall  SYS:0f78:0c03 CharToStr
  0000:1b7c  lcall  SYS:0f78:0b66 StrConcat
  0000:1b81  mov    di, 0x16ce    ; "#^7 Уд:^"
  0000:1b84  push   cs
  0000:1b85  push   di
  0000:1b86  lcall  SYS:0f78:0b66 StrConcat
  0000:1b8b  lea    di, [bp - 0x606]
  0000:1b8f  push   ss
  0000:1b90  push   di
  0000:1b91  mov    al, byte ptr [bp - 0xfc]
  0000:1b95  push   ax
  0000:1b96  lcall  SYS:0f78:0c03 CharToStr
  0000:1b9b  lcall  SYS:0f78:0b66 StrConcat
  0000:1ba0  mov    di, 0x16d7    ; "#"
  0000:1ba3  push   cs
  0000:1ba4  push   di
  0000:1ba5  lcall  SYS:0f78:0b66 StrConcat
  0000:1baa  push   word ptr [g389e]
  0000:1bae  push   word ptr [g38a0]
  0000:1bb2  push   word ptr [g38a2]
  0000:1bb6  push   word ptr [g38a4]
  0000:1bba  xor    ax, ax
  0000:1bbc  push   ax
  0000:1bbd  lcall  U2:0eed:01c2 PrintLn
  0000:1bc2  cmp    byte ptr [g38bd], 0
  0000:1bc7  jne    0x1bd0
  0000:1bc9  cmp    byte ptr [g38be], 0
  0000:1bce  je     0x1c38
L01bd0:
  0000:1bd0  mov    di, 0x16d9    ; "Феньки: "
  0000:1bd3  push   cs
  0000:1bd4  push   di
  0000:1bd5  xor    ax, ax
  0000:1bd7  push   ax
  0000:1bd8  xor    ax, ax
  0000:1bda  push   ax
  0000:1bdb  xor    ax, ax
  0000:1bdd  push   ax
  0000:1bde  xor    ax, ax
  0000:1be0  push   ax
  0000:1be1  xor    ax, ax
  0000:1be3  push   ax
  0000:1be4  lcall  U2:0eed:0000 Print
  0000:1be9  cmp    byte ptr [g38bd], 0
  0000:1bee  je     0x1c09
  0000:1bf0  mov    di, 0x16e2    ; "^1Крестик(Удача +2) "
  0000:1bf3  push   cs
  0000:1bf4  push   di
  0000:1bf5  xor    ax, ax
  0000:1bf7  push   ax
  0000:1bf8  xor    ax, ax
  0000:1bfa  push   ax
  0000:1bfb  xor    ax, ax
  0000:1bfd  push   ax
  0000:1bfe  xor    ax, ax
  0000:1c00  push   ax
  0000:1c01  xor    ax, ax
  0000:1c03  push   ax
  0000:1c04  lcall  U2:0eed:0000 Print
L01c09:
  0000:1c09  cmp    byte ptr [g38be], 0
  0000:1c0e  je     0x1c29
  0000:1c10  mov    di, 0x16f7    ; "^1Кольцо "Гс"(Удача +1) "
  0000:1c13  push   cs
  0000:1c14  push   di
  0000:1c15  xor    ax, ax
  0000:1c17  push   ax
  0000:1c18  xor    ax, ax
  0000:1c1a  push   ax
  0000:1c1b  xor    ax, ax
  0000:1c1d  push   ax
  0000:1c1e  xor    ax, ax
  0000:1c20  push   ax
  0000:1c21  xor    ax, ax
  0000:1c23  push   ax
  0000:1c24  lcall  U2:0eed:0000 Print
L01c29:
  0000:1c29  mov    di, 0x3fcc
  0000:1c2c  push   ds
  0000:1c2d  push   di
  0000:1c2e  lcall  SYS:0f78:05dd WriteLnEnd
  0000:1c33  lcall  SYS:0f78:0291 IOCheck
L01c38:
  0000:1c38  cmp    byte ptr [g38bf], 0
  0000:1c3d  jne    0x1c50
  0000:1c3f  cmp    byte ptr [g38c0], 0
  0000:1c44  jne    0x1c50
  0000:1c46  cmp    byte ptr [g38c1], 0
  0000:1c4b  jne    0x1c50
  0000:1c4d  jmp    0x1cd8
L01c50:
  0000:1c50  mov    di, 0x1710    ; "Мощные феньки: "
  0000:1c53  push   cs
  0000:1c54  push   di
  0000:1c55  xor    ax, ax
  0000:1c57  push   ax
  0000:1c58  xor    ax, ax
  0000:1c5a  push   ax
  0000:1c5b  xor    ax, ax
  0000:1c5d  push   ax
  0000:1c5e  xor    ax, ax
  0000:1c60  push   ax
  0000:1c61  xor    ax, ax
  0000:1c63  push   ax
  0000:1c64  lcall  U2:0eed:0000 Print
  0000:1c69  cmp    byte ptr [g38bf], 0
  0000:1c6e  je     0x1c89
  0000:1c70  mov    di, 0x1720    ; "^1Кольцо "Пг"(Всё +1) "
  0000:1c73  push   cs
  0000:1c74  push   di
  0000:1c75  xor    ax, ax
  0000:1c77  push   ax
  0000:1c78  xor    ax, ax
  0000:1c7a  push   ax
  0000:1c7b  xor    ax, ax
  0000:1c7d  push   ax
  0000:1c7e  xor    ax, ax
  0000:1c80  push   ax
  0000:1c81  xor    ax, ax
  0000:1c83  push   ax
  0000:1c84  lcall  U2:0eed:0000 Print
L01c89:
  0000:1c89  cmp    byte ptr [g38c0], 0
  0000:1c8e  je     0x1ca9
  0000:1c90  mov    di, 0x1737    ; "^1Мега Кольцо(Всё +4) "
  0000:1c93  push   cs
  0000:1c94  push   di
  0000:1c95  xor    ax, ax
  0000:1c97  push   ax
  0000:1c98  xor    ax, ax
  0000:1c9a  push   ax
  0000:1c9b  xor    ax, ax
  0000:1c9d  push   ax
  0000:1c9e  xor    ax, ax
  0000:1ca0  push   ax
  0000:1ca1  xor    ax, ax
  0000:1ca3  push   ax
  0000:1ca4  lcall  U2:0eed:0000 Print
L01ca9:
  0000:1ca9  cmp    byte ptr [g38c1], 0
  0000:1cae  je     0x1cc9
  0000:1cb0  mov    di, 0x174e    ; "^1Кольцо "Гп"(Самолечение) "
  0000:1cb3  push   cs
  0000:1cb4  push   di
  0000:1cb5  xor    ax, ax
  0000:1cb7  push   ax
  0000:1cb8  xor    ax, ax
  0000:1cba  push   ax
  0000:1cbb  xor    ax, ax
  0000:1cbd  push   ax
  0000:1cbe  xor    ax, ax
  0000:1cc0  push   ax
  0000:1cc1  xor    ax, ax
  0000:1cc3  push   ax
  0000:1cc4  lcall  U2:0eed:0000 Print
L01cc9:
  0000:1cc9  mov    di, 0x3fcc
  0000:1ccc  push   ds
  0000:1ccd  push   di
  0000:1cce  lcall  SYS:0f78:05dd WriteLnEnd
  0000:1cd3  lcall  SYS:0f78:0291 IOCheck
L01cd8:
  0000:1cd8  cmp    byte ptr [g38bb], 0
  0000:1cdd  je     0x1cf8
  0000:1cdf  mov    di, 0x176a    ; "^1У тебя есть мобильник"
  0000:1ce2  push   cs
  0000:1ce3  push   di
  0000:1ce4  xor    ax, ax
  0000:1ce6  push   ax
  0000:1ce7  xor    ax, ax
  0000:1ce9  push   ax
  0000:1cea  xor    ax, ax
  0000:1cec  push   ax
  0000:1ced  xor    ax, ax
  0000:1cef  push   ax
  0000:1cf0  xor    ax, ax
  0000:1cf2  push   ax
  0000:1cf3  lcall  U2:0eed:01c2 PrintLn
L01cf8:
  0000:1cf8  cmp    byte ptr [g38b3], 0
  0000:1cfd  je     0x1d18
  0000:1cff  mov    di, 0x1782    ; "^1У тебя есть тёмные очки"
  0000:1d02  push   cs
  0000:1d03  push   di
  0000:1d04  xor    ax, ax
  0000:1d06  push   ax
  0000:1d07  xor    ax, ax
  0000:1d09  push   ax
  0000:1d0a  xor    ax, ax
  0000:1d0c  push   ax
  0000:1d0d  xor    ax, ax
  0000:1d0f  push   ax
  0000:1d10  xor    ax, ax
  0000:1d12  push   ax
  0000:1d13  lcall  U2:0eed:01c2 PrintLn
L01d18:
  0000:1d18  cmp    byte ptr [g38bc], 0
  0000:1d1d  je     0x1d38
  0000:1d1f  mov    di, 0x179c    ; "^1На тебе зоновская наколка"
  0000:1d22  push   cs
  0000:1d23  push   di
  0000:1d24  xor    ax, ax
  0000:1d26  push   ax
  0000:1d27  xor    ax, ax
  0000:1d29  push   ax
  0000:1d2a  xor    ax, ax
  0000:1d2c  push   ax
  0000:1d2d  xor    ax, ax
  0000:1d2f  push   ax
  0000:1d30  xor    ax, ax
  0000:1d32  push   ax
  0000:1d33  lcall  U2:0eed:01c2 PrintLn
L01d38:
  0000:1d38  cmp    byte ptr [g394d], 0
  0000:1d3d  jne    0x1d42
  0000:1d3f  jmp    0x1e01
L01d42:
  0000:1d42  mov    di, 0x3fcc
  0000:1d45  push   ds
  0000:1d46  push   di
  0000:1d47  lcall  SYS:0f78:05dd WriteLnEnd
  0000:1d4c  lcall  SYS:0f78:0291 IOCheck
  0000:1d51  mov    di, 0x17b8    ; "^1У тебя есть пистолет"
  0000:1d54  push   cs
  0000:1d55  push   di
  0000:1d56  xor    ax, ax
  0000:1d58  push   ax
  0000:1d59  xor    ax, ax
  0000:1d5b  push   ax
  0000:1d5c  xor    ax, ax
  0000:1d5e  push   ax
  0000:1d5f  xor    ax, ax
  0000:1d61  push   ax
  0000:1d62  xor    ax, ax
  0000:1d64  push   ax
  0000:1d65  lcall  U2:0eed:0000 Print
  0000:1d6a  cmp    byte ptr [g394e], 0
  0000:1d6f  je     0x1d8a
  0000:1d71  mov    di, 0x17cf    ; "^1 с гушителем"
  0000:1d74  push   cs
  0000:1d75  push   di
  0000:1d76  xor    ax, ax
  0000:1d78  push   ax
  0000:1d79  xor    ax, ax
  0000:1d7b  push   ax
  0000:1d7c  xor    ax, ax
  0000:1d7e  push   ax
  0000:1d7f  xor    ax, ax
  0000:1d81  push   ax
  0000:1d82  xor    ax, ax
  0000:1d84  push   ax
  0000:1d85  lcall  U2:0eed:0000 Print
L01d8a:
  0000:1d8a  cmp    word ptr [g394f], 0
  0000:1d8f  jle    0x1dab
  0000:1d91  mov    di, 0x17de    ; "^1! патронов - #"
  0000:1d94  push   cs
  0000:1d95  push   di
  0000:1d96  push   word ptr [g394f]
  0000:1d9a  xor    ax, ax
  0000:1d9c  push   ax
  0000:1d9d  xor    ax, ax
  0000:1d9f  push   ax
  0000:1da0  xor    ax, ax
  0000:1da2  push   ax
  0000:1da3  xor    ax, ax
  0000:1da5  push   ax
  0000:1da6  lcall  U2:0eed:01c2 PrintLn
L01dab:
  0000:1dab  cmp    word ptr [g394f], 2
  0000:1db0  jg     0x1dd2
  0000:1db2  cmp    word ptr [g394f], 0
  0000:1db7  jle    0x1dd2
  0000:1db9  mov    di, 0x17ef    ; "^6 А птронов-то мало "
  0000:1dbc  push   cs
  0000:1dbd  push   di
  0000:1dbe  xor    ax, ax
  0000:1dc0  push   ax
  0000:1dc1  xor    ax, ax
  0000:1dc3  push   ax
  0000:1dc4  xor    ax, ax
  0000:1dc6  push   ax
  0000:1dc7  xor    ax, ax
  0000:1dc9  push   ax
  0000:1dca  xor    ax, ax
  0000:1dcc  push   ax
  0000:1dcd  lcall  U2:0eed:01c2 PrintLn
L01dd2:
  0000:1dd2  cmp    word ptr [g394f], 0
  0000:1dd7  jg     0x1df2
  0000:1dd9  mov    di, 0x1805    ; "^1.^4 Правда без патронов"
  0000:1ddc  push   cs
  0000:1ddd  push   di
  0000:1dde  xor    ax, ax
  0000:1de0  push   ax
  0000:1de1  xor    ax, ax
  0000:1de3  push   ax
  0000:1de4  xor    ax, ax
  0000:1de6  push   ax
  0000:1de7  xor    ax, ax
  0000:1de9  push   ax
  0000:1dea  xor    ax, ax
  0000:1dec  push   ax
  0000:1ded  lcall  U2:0eed:01c2 PrintLn
L01df2:
  0000:1df2  mov    di, 0x3fcc
  0000:1df5  push   ds
  0000:1df6  push   di
  0000:1df7  lcall  SYS:0f78:05dd WriteLnEnd
  0000:1dfc  lcall  SYS:0f78:0291 IOCheck
L01e01:
  0000:1e01  mov    byte ptr [bp - 0x101], 0x37
  0000:1e06  cmp    byte ptr [g38cd], 0
  0000:1e0b  ja     0x1e37
  0000:1e0d  cmp    byte ptr [g38b5], 0
  0000:1e12  jne    0x1e37
  0000:1e14  cmp    byte ptr [g38b8], 0
  0000:1e19  jne    0x1e37
  0000:1e1b  cmp    byte ptr [g38ba], 0
  0000:1e20  jne    0x1e37
  0000:1e22  cmp    byte ptr [g394b], 0
  0000:1e27  jne    0x1e37
  0000:1e29  cmp    byte ptr [g38c2], 0
  0000:1e2e  jne    0x1e37
  0000:1e30  cmp    byte ptr [g394c], 0
  0000:1e35  je     0x1e3c
L01e37:
  0000:1e37  mov    byte ptr [bp - 0x101], 0x31
L01e3c:
  0000:1e3c  lea    di, [bp - 0x306]
  0000:1e40  push   ss
  0000:1e41  push   di
  0000:1e42  mov    di, 0x181f    ; "^"
  0000:1e45  push   cs
  0000:1e46  push   di
  0000:1e47  lcall  SYS:0f78:0ae7 StrLoad
  0000:1e4c  lea    di, [bp - 0x206]
  0000:1e50  push   ss
  0000:1e51  push   di
  0000:1e52  mov    al, byte ptr [bp - 0x101]
  0000:1e56  push   ax
  0000:1e57  lcall  SYS:0f78:0c03 CharToStr
  0000:1e5c  lcall  SYS:0f78:0b66 StrConcat
  0000:1e61  mov    di, 0x1821    ; "Урон #-#    "
  0000:1e64  push   cs
  0000:1e65  push   di
  0000:1e66  lcall  SYS:0f78:0b66 StrConcat
  0000:1e6b  push   word ptr [g38a8]
  0000:1e6f  push   word ptr [g38aa]
  0000:1e73  xor    ax, ax
  0000:1e75  push   ax
  0000:1e76  xor    ax, ax
  0000:1e78  push   ax
  0000:1e79  xor    ax, ax
  0000:1e7b  push   ax
  0000:1e7c  lcall  U2:0eed:0000 Print
  0000:1e81  cmp    byte ptr [g38b5], 0
  0000:1e86  je     0x1ea8
  0000:1e88  cmp    byte ptr [g38b8], 0
  0000:1e8d  jne    0x1ea8
  0000:1e8f  mov    di, 0x182e    ; "^1Бутсы(+1) "
  0000:1e92  push   cs
  0000:1e93  push   di
  0000:1e94  xor    ax, ax
  0000:1e96  push   ax
  0000:1e97  xor    ax, ax
  0000:1e99  push   ax
  0000:1e9a  xor    ax, ax
  0000:1e9c  push   ax
  0000:1e9d  xor    ax, ax
  0000:1e9f  push   ax
  0000:1ea0  xor    ax, ax
  0000:1ea2  push   ax
  0000:1ea3  lcall  U2:0eed:0000 Print
L01ea8:
  0000:1ea8  cmp    byte ptr [g38b5], 0
  0000:1ead  je     0x1ecf
  0000:1eaf  cmp    byte ptr [g38b8], 0
  0000:1eb4  je     0x1ecf
  0000:1eb6  mov    di, 0x183b    ; "^4Бутсы "
  0000:1eb9  push   cs
  0000:1eba  push   di
  0000:1ebb  xor    ax, ax
  0000:1ebd  push   ax
  0000:1ebe  xor    ax, ax
  0000:1ec0  push   ax
  0000:1ec1  xor    ax, ax
  0000:1ec3  push   ax
  0000:1ec4  xor    ax, ax
  0000:1ec6  push   ax
  0000:1ec7  xor    ax, ax
  0000:1ec9  push   ax
  0000:1eca  lcall  U2:0eed:0000 Print
L01ecf:
  0000:1ecf  cmp    byte ptr [g38b8], 0
  0000:1ed4  je     0x1eef
  0000:1ed6  mov    di, 0x1844    ; "^1Понтовые бутсы(Урон+2) "
  0000:1ed9  push   cs
  0000:1eda  push   di
  0000:1edb  xor    ax, ax
  0000:1edd  push   ax
  0000:1ede  xor    ax, ax
  0000:1ee0  push   ax
  0000:1ee1  xor    ax, ax
  0000:1ee3  push   ax
  0000:1ee4  xor    ax, ax
  0000:1ee6  push   ax
  0000:1ee7  xor    ax, ax
  0000:1ee9  push   ax
  0000:1eea  lcall  U2:0eed:0000 Print
L01eef:
  0000:1eef  cmp    byte ptr [g38ba], 0
  0000:1ef4  je     0x1f24
  0000:1ef6  cmp    byte ptr [g38c2], 0
  0000:1efb  jne    0x1f24
  0000:1efd  cmp    byte ptr [g394b], 0
  0000:1f02  jne    0x1f24
  0000:1f04  cmp    byte ptr [g394c], 0
  0000:1f09  jne    0x1f24
  0000:1f0b  mov    di, 0x185e    ; "^1Кастет(+2) "
  0000:1f0e  push   cs
  0000:1f0f  push   di
  0000:1f10  xor    ax, ax
  0000:1f12  push   ax
  0000:1f13  xor    ax, ax
  0000:1f15  push   ax
  0000:1f16  xor    ax, ax
  0000:1f18  push   ax
  0000:1f19  xor    ax, ax
  0000:1f1b  push   ax
  0000:1f1c  xor    ax, ax
  0000:1f1e  push   ax
  0000:1f1f  lcall  U2:0eed:0000 Print
L01f24:
  0000:1f24  cmp    byte ptr [g38ba], 0
  0000:1f29  je     0x1f59
  0000:1f2b  cmp    byte ptr [g38c2], 0
  0000:1f30  jne    0x1f40
  0000:1f32  cmp    byte ptr [g394b], 0
  0000:1f37  jne    0x1f40
  0000:1f39  cmp    byte ptr [g394c], 0
  0000:1f3e  je     0x1f59
L01f40:
  0000:1f40  mov    di, 0x186c    ; "^4Кастет "
  0000:1f43  push   cs
  0000:1f44  push   di
  0000:1f45  xor    ax, ax
  0000:1f47  push   ax
  0000:1f48  xor    ax, ax
  0000:1f4a  push   ax
  0000:1f4b  xor    ax, ax
  0000:1f4d  push   ax
  0000:1f4e  xor    ax, ax
  0000:1f50  push   ax
  0000:1f51  xor    ax, ax
  0000:1f53  push   ax
  0000:1f54  lcall  U2:0eed:0000 Print
L01f59:
  0000:1f59  cmp    byte ptr [g394b], 0
  0000:1f5e  je     0x1f87
  0000:1f60  cmp    byte ptr [g38c2], 0
  0000:1f65  jne    0x1f87
  0000:1f67  cmp    byte ptr [g394c], 0
  0000:1f6c  jne    0x1f87
  0000:1f6e  mov    di, 0x1876    ; "^1Дубинка(+4)  "
  0000:1f71  push   cs
  0000:1f72  push   di
  0000:1f73  xor    ax, ax
  0000:1f75  push   ax
  0000:1f76  xor    ax, ax
  0000:1f78  push   ax
  0000:1f79  xor    ax, ax
  0000:1f7b  push   ax
  0000:1f7c  xor    ax, ax
  0000:1f7e  push   ax
  0000:1f7f  xor    ax, ax
  0000:1f81  push   ax
  0000:1f82  lcall  U2:0eed:0000 Print
L01f87:
  0000:1f87  cmp    byte ptr [g394b], 0
  0000:1f8c  je     0x1fb5
  0000:1f8e  cmp    byte ptr [g38c2], 0
  0000:1f93  jne    0x1f9c
  0000:1f95  cmp    byte ptr [g394c], 0
  0000:1f9a  je     0x1fb5
L01f9c:
  0000:1f9c  mov    di, 0x1886    ; "^4Дубинка "
  0000:1f9f  push   cs
  0000:1fa0  push   di
  0000:1fa1  xor    ax, ax
  0000:1fa3  push   ax
  0000:1fa4  xor    ax, ax
  0000:1fa6  push   ax
  0000:1fa7  xor    ax, ax
  0000:1fa9  push   ax
  0000:1faa  xor    ax, ax
  0000:1fac  push   ax
  0000:1fad  xor    ax, ax
  0000:1faf  push   ax
  0000:1fb0  lcall  U2:0eed:0000 Print
L01fb5:
  0000:1fb5  cmp    byte ptr [g38c2], 0
  0000:1fba  je     0x1fdc
  0000:1fbc  cmp    byte ptr [g394c], 0
  0000:1fc1  jne    0x1fdc
  0000:1fc3  mov    di, 0x1891    ; "^1Нож(+6) "
  0000:1fc6  push   cs
  0000:1fc7  push   di
  0000:1fc8  xor    ax, ax
  0000:1fca  push   ax
  0000:1fcb  xor    ax, ax
  0000:1fcd  push   ax
  0000:1fce  xor    ax, ax
  0000:1fd0  push   ax
  0000:1fd1  xor    ax, ax
  0000:1fd3  push   ax
  0000:1fd4  xor    ax, ax
  0000:1fd6  push   ax
  0000:1fd7  lcall  U2:0eed:0000 Print
L01fdc:
  0000:1fdc  cmp    byte ptr [g38c2], 0
  0000:1fe1  je     0x2003
  0000:1fe3  cmp    byte ptr [g394c], 0
  0000:1fe8  je     0x2003
  0000:1fea  mov    di, 0x189c    ; "^4Нож "
  0000:1fed  push   cs
  0000:1fee  push   di
  0000:1fef  xor    ax, ax
  0000:1ff1  push   ax
  0000:1ff2  xor    ax, ax
  0000:1ff4  push   ax
  0000:1ff5  xor    ax, ax
  0000:1ff7  push   ax
  0000:1ff8  xor    ax, ax
  0000:1ffa  push   ax
  0000:1ffb  xor    ax, ax
  0000:1ffd  push   ax
  0000:1ffe  lcall  U2:0eed:0000 Print
L02003:
  0000:2003  cmp    byte ptr [g394c], 0
  0000:2008  je     0x2023
  0000:200a  mov    di, 0x18a3    ; "^1Тесак(Урон+9) "
  0000:200d  push   cs
  0000:200e  push   di
  0000:200f  xor    ax, ax
  0000:2011  push   ax
  0000:2012  xor    ax, ax
  0000:2014  push   ax
  0000:2015  xor    ax, ax
  0000:2017  push   ax
  0000:2018  xor    ax, ax
  0000:201a  push   ax
  0000:201b  xor    ax, ax
  0000:201d  push   ax
  0000:201e  lcall  U2:0eed:0000 Print
L02023:
  0000:2023  mov    di, 0x3fcc
  0000:2026  push   ds
  0000:2027  push   di
  0000:2028  lcall  SYS:0f78:05dd WriteLnEnd
  0000:202d  lcall  SYS:0f78:0291 IOCheck
  0000:2032  mov    byte ptr [bp - 0x100], 0
  0000:2037  cmp    byte ptr [g38b0], 1
  0000:203c  jne    0x2068
  0000:203e  lea    di, [bp - 0x206]
  0000:2042  push   ss
  0000:2043  push   di
  0000:2044  lea    di, [bp - 0x100]
  0000:2048  push   ss
  0000:2049  push   di
  0000:204a  lcall  SYS:0f78:0ae7 StrLoad
  0000:204f  mov    di, 0x18b4    ; "^4Сломана челюсть  "
  0000:2052  push   cs
  0000:2053  push   di
  0000:2054  lcall  SYS:0f78:0b66 StrConcat
  0000:2059  lea    di, [bp - 0x100]
  0000:205d  push   ss
  0000:205e  push   di
  0000:205f  mov    ax, 0xff
  0000:2062  push   ax
  0000:2063  lcall  SYS:0f78:0b01 StrStore
L02068:
  0000:2068  cmp    byte ptr [g394a], 1
  0000:206d  jne    0x2099
  0000:206f  lea    di, [bp - 0x206]
  0000:2073  push   ss
  0000:2074  push   di
  0000:2075  lea    di, [bp - 0x100]
  0000:2079  push   ss
  0000:207a  push   di
  0000:207b  lcall  SYS:0f78:0ae7 StrLoad
  0000:2080  mov    di, 0x18c8    ; "^1Зубная защита  "
  0000:2083  push   cs
  0000:2084  push   di
  0000:2085  lcall  SYS:0f78:0b66 StrConcat
  0000:208a  lea    di, [bp - 0x100]
  0000:208e  push   ss
  0000:208f  push   di
  0000:2090  mov    ax, 0xff
  0000:2093  push   ax
  0000:2094  lcall  SYS:0f78:0b01 StrStore
L02099:
  0000:2099  cmp    byte ptr [g38b1], 1
  0000:209e  jne    0x20ca
  0000:20a0  lea    di, [bp - 0x206]
  0000:20a4  push   ss
  0000:20a5  push   di
  0000:20a6  lea    di, [bp - 0x100]
  0000:20aa  push   ss
  0000:20ab  push   di
  0000:20ac  lcall  SYS:0f78:0ae7 StrLoad
  0000:20b1  mov    di, 0x18da    ; "^4Сломана нога  "
  0000:20b4  push   cs
  0000:20b5  push   di
  0000:20b6  lcall  SYS:0f78:0b66 StrConcat
  0000:20bb  lea    di, [bp - 0x100]
  0000:20bf  push   ss
  0000:20c0  push   di
  0000:20c1  mov    ax, 0xff
  0000:20c4  push   ax
  0000:20c5  lcall  SYS:0f78:0b01 StrStore
L020ca:
  0000:20ca  cmp    byte ptr [g38cd], 0
  0000:20cf  jbe    0x20fb
  0000:20d1  lea    di, [bp - 0x206]
  0000:20d5  push   ss
  0000:20d6  push   di
  0000:20d7  lea    di, [bp - 0x100]
  0000:20db  push   ss
  0000:20dc  push   di
  0000:20dd  lcall  SYS:0f78:0ae7 StrLoad
  0000:20e2  mov    di, 0x18eb    ; "^6Обдолбаный  "
  0000:20e5  push   cs
  0000:20e6  push   di
  0000:20e7  lcall  SYS:0f78:0b66 StrConcat
  0000:20ec  lea    di, [bp - 0x100]
  0000:20f0  push   ss
  0000:20f1  push   di
  0000:20f2  mov    ax, 0xff
  0000:20f5  push   ax
  0000:20f6  lcall  SYS:0f78:0b01 StrStore
L020fb:
  0000:20fb  mov    byte ptr [bp - 0x101], 0x34
  0000:2100  mov    ax, word ptr [g38ae]
  0000:2103  cdq    
  0000:2104  lcall  SYS:0f78:1125 RFloat
  0000:2109  push   dx
  0000:210a  push   bx
  0000:210b  push   ax
  0000:210c  mov    ax, word ptr [g38ac]
  0000:210f  cdq    
  0000:2110  lcall  SYS:0f78:1125 RFloat
  0000:2115  pop    cx
  0000:2116  pop    si
  0000:2117  pop    di
  0000:2118  lcall  SYS:0f78:1117 RDiv
  0000:211d  mov    cx, 0x7f
  0000:2120  xor    si, si
  0000:2122  xor    di, di
  0000:2124  lcall  SYS:0f78:1121 RCmp
  0000:2129  jbe    0x2130
  0000:212b  mov    byte ptr [bp - 0x101], 0x36
L02130:
  0000:2130  mov    ax, word ptr [g38ae]
  0000:2133  cdq    
  0000:2134  lcall  SYS:0f78:1125 RFloat
  0000:2139  push   dx
  0000:213a  push   bx
  0000:213b  push   ax
  0000:213c  mov    ax, word ptr [g38ac]
  0000:213f  cdq    
  0000:2140  lcall  SYS:0f78:1125 RFloat
  0000:2145  pop    cx
  0000:2146  pop    si
  0000:2147  pop    di
  0000:2148  lcall  SYS:0f78:1117 RDiv
  0000:214d  mov    cx, 0x80
  0000:2150  xor    si, si
  0000:2152  xor    di, di
  0000:2154  lcall  SYS:0f78:1121 RCmp
  0000:2159  jbe    0x2160
  0000:215b  mov    byte ptr [bp - 0x101], 0x32
L02160:
  0000:2160  lea    di, [bp - 0x306]
  0000:2164  push   ss
  0000:2165  push   di
  0000:2166  mov    di, 0x181f    ; "^"
  0000:2169  push   cs
  0000:216a  push   di
  0000:216b  lcall  SYS:0f78:0ae7 StrLoad
  0000:2170  lea    di, [bp - 0x206]
  0000:2174  push   ss
  0000:2175  push   di
  0000:2176  mov    al, byte ptr [bp - 0x101]
  0000:217a  push   ax
  0000:217b  lcall  SYS:0f78:0c03 CharToStr
  0000:2180  lcall  SYS:0f78:0b66 StrConcat
  0000:2185  mov    di, 0x18fa    ; "Здоровье #/#  "
  0000:2188  push   cs
  0000:2189  push   di
  0000:218a  lcall  SYS:0f78:0b66 StrConcat
  0000:218f  lea    di, [bp - 0x100]
  0000:2193  push   ss
  0000:2194  push   di
  0000:2195  lcall  SYS:0f78:0b66 StrConcat
  0000:219a  push   word ptr [g38ac]
  0000:219e  push   word ptr [g38ae]
  0000:21a2  xor    ax, ax
  0000:21a4  push   ax
  0000:21a5  xor    ax, ax
  0000:21a7  push   ax
  0000:21a8  xor    ax, ax
  0000:21aa  push   ax
  0000:21ab  lcall  U2:0eed:01c2 PrintLn
  0000:21b0  mov    ax, word ptr [g38a0]
  0000:21b3  mov    word ptr [bp - 0x104], ax
  0000:21b7  cmp    word ptr [bp - 0x104], 0xe
  0000:21bc  jg     0x21e7
  0000:21be  mov    di, 0x1909    ; "Точность #%"
  0000:21c1  push   cs
  0000:21c2  push   di
  0000:21c3  mov    ax, word ptr [bp - 0x104]
  0000:21c7  mov    si, ax
  0000:21c9  shl    ax, 1
  0000:21cb  shl    ax, 1
  0000:21cd  add    ax, si
  0000:21cf  add    ax, 0x14
  0000:21d2  push   ax
  0000:21d3  xor    ax, ax
  0000:21d5  push   ax
  0000:21d6  xor    ax, ax
  0000:21d8  push   ax
  0000:21d9  xor    ax, ax
  0000:21db  push   ax
  0000:21dc  xor    ax, ax
  0000:21de  push   ax
  0000:21df  lcall  U2:0eed:01c2 PrintLn
  0000:21e4  jmp    0x227b
L021e7:
  0000:21e7  mov    di, 0x1915    ; "Точность 90% "
  0000:21ea  push   cs
  0000:21eb  push   di
  0000:21ec  xor    ax, ax
  0000:21ee  push   ax
  0000:21ef  xor    ax, ax
  0000:21f1  push   ax
  0000:21f2  xor    ax, ax
  0000:21f4  push   ax
  0000:21f5  xor    ax, ax
  0000:21f7  push   ax
  0000:21f8  xor    ax, ax
  0000:21fa  push   ax
  0000:21fb  lcall  U2:0eed:0000 Print
  0000:2200  mov    ax, word ptr [bp - 0x104]
  0000:2204  sub    ax, 0xe
  0000:2207  mov    word ptr [bp - 0x104], ax
  0000:220b  mov    word ptr [bp - 0x106], 1
L02211:
  0000:2211  cmp    word ptr [bp - 0x104], 0x12
  0000:2216  jle    0x2223
  0000:2218  sub    word ptr [bp - 0x104], 0x12
  0000:221d  inc    word ptr [bp - 0x106]
  0000:2221  jmp    0x2211
L02223:
  0000:2223  cmp    word ptr [bp - 0x106], 1
  0000:2228  jne    0x224d
  0000:222a  mov    di, 0x1923    ; "   Второй удар #%"
  0000:222d  push   cs
  0000:222e  push   di
  0000:222f  mov    ax, word ptr [bp - 0x104]
  0000:2233  mov    si, ax
  0000:2235  shl    ax, 1
  0000:2237  shl    ax, 1
  0000:2239  add    ax, si
  0000:223b  push   ax
  0000:223c  xor    ax, ax
  0000:223e  push   ax
  0000:223f  xor    ax, ax
  0000:2241  push   ax
  0000:2242  xor    ax, ax
  0000:2244  push   ax
  0000:2245  xor    ax, ax
  0000:2247  push   ax
  0000:2248  lcall  U2:0eed:01c2 PrintLn
L0224d:
  0000:224d  cmp    word ptr [bp - 0x106], 1
  0000:2252  jle    0x227b
  0000:2254  mov    di, 0x1935    ; "- # ударов,  Точность # удара #%"
  0000:2257  push   cs
  0000:2258  push   di
  0000:2259  push   word ptr [bp - 0x106]
  0000:225d  mov    ax, word ptr [bp - 0x106]
  0000:2261  inc    ax
  0000:2262  push   ax
  0000:2263  mov    ax, word ptr [bp - 0x104]
  0000:2267  mov    si, ax
  0000:2269  shl    ax, 1
  0000:226b  shl    ax, 1
  0000:226d  add    ax, si
  0000:226f  push   ax
  0000:2270  xor    ax, ax
  0000:2272  push   ax
  0000:2273  xor    ax, ax
  0000:2275  push   ax
  0000:2276  lcall  U2:0eed:01c2 PrintLn
L0227b:
  0000:227b  cmp    byte ptr [g38b2], 0
  0000:2280  ja     0x2285
  0000:2282  jmp    0x23b4
L02285:
  0000:2285  mov    di, 0x1956    ; "^2Броня #    "
  0000:2288  push   cs
  0000:2289  push   di
  0000:228a  mov    al, byte ptr [g38b2]
  0000:228d  xor    ah, ah
  0000:228f  push   ax
  0000:2290  xor    ax, ax
  0000:2292  push   ax
  0000:2293  xor    ax, ax
  0000:2295  push   ax
  0000:2296  xor    ax, ax
  0000:2298  push   ax
  0000:2299  xor    ax, ax
  0000:229b  push   ax
  0000:229c  lcall  U2:0eed:0000 Print
  0000:22a1  cmp    byte ptr [g38b4], 0
  0000:22a6  je     0x22fc
  0000:22a8  cmp    byte ptr [g38b7], 0
  0000:22ad  je     0x22e3
  0000:22af  mov    di, 0x1964    ; "^4Abibas "
  0000:22b2  push   cs
  0000:22b3  push   di
  0000:22b4  xor    ax, ax
  0000:22b6  push   ax
  0000:22b7  xor    ax, ax
  0000:22b9  push   ax
  0000:22ba  xor    ax, ax
  0000:22bc  push   ax
  0000:22bd  xor    ax, ax
  0000:22bf  push   ax
  0000:22c0  xor    ax, ax
  0000:22c2  push   ax
  0000:22c3  lcall  U2:0eed:0000 Print
  0000:22c8  mov    di, 0x196e    ; "^1Костюм Adidas(+2) "
  0000:22cb  push   cs
  0000:22cc  push   di
  0000:22cd  xor    ax, ax
  0000:22cf  push   ax
  0000:22d0  xor    ax, ax
  0000:22d2  push   ax
  0000:22d3  xor    ax, ax
  0000:22d5  push   ax
  0000:22d6  xor    ax, ax
  0000:22d8  push   ax
  0000:22d9  xor    ax, ax
  0000:22db  push   ax
  0000:22dc  lcall  U2:0eed:0000 Print
  0000:22e1  jmp    0x22fc
L022e3:
  0000:22e3  mov    di, 0x1983    ; "^1Костюм Abibas(+1) "
  0000:22e6  push   cs
  0000:22e7  push   di
  0000:22e8  xor    ax, ax
  0000:22ea  push   ax
  0000:22eb  xor    ax, ax
  0000:22ed  push   ax
  0000:22ee  xor    ax, ax
  0000:22f0  push   ax
  0000:22f1  xor    ax, ax
  0000:22f3  push   ax
  0000:22f4  xor    ax, ax
  0000:22f6  push   ax
  0000:22f7  lcall  U2:0eed:0000 Print
L022fc:
  0000:22fc  cmp    byte ptr [g38b7], 0
  0000:2301  je     0x2323
  0000:2303  cmp    byte ptr [g38b4], 0
  0000:2308  jne    0x2323
  0000:230a  mov    di, 0x196e    ; "^1Костюм Adidas(+2) "
  0000:230d  push   cs
  0000:230e  push   di
  0000:230f  xor    ax, ax
  0000:2311  push   ax
  0000:2312  xor    ax, ax
  0000:2314  push   ax
  0000:2315  xor    ax, ax
  0000:2317  push   ax
  0000:2318  xor    ax, ax
  0000:231a  push   ax
  0000:231b  xor    ax, ax
  0000:231d  push   ax
  0000:231e  lcall  U2:0eed:0000 Print
L02323:
  0000:2323  cmp    byte ptr [g38b6], 0
  0000:2328  je     0x237e
  0000:232a  cmp    byte ptr [g38b9], 0
  0000:232f  je     0x2365
  0000:2331  mov    di, 0x1998    ; "^4Кожанка "
  0000:2334  push   cs
  0000:2335  push   di
  0000:2336  xor    ax, ax
  0000:2338  push   ax
  0000:2339  xor    ax, ax
  0000:233b  push   ax
  0000:233c  xor    ax, ax
  0000:233e  push   ax
  0000:233f  xor    ax, ax
  0000:2341  push   ax
  0000:2342  xor    ax, ax
  0000:2344  push   ax
  0000:2345  lcall  U2:0eed:0000 Print
  0000:234a  mov    di, 0x19a3    ; "^1Крутая кожанка(+4) "
  0000:234d  push   cs
  0000:234e  push   di
  0000:234f  xor    ax, ax
  0000:2351  push   ax
  0000:2352  xor    ax, ax
  0000:2354  push   ax
  0000:2355  xor    ax, ax
  0000:2357  push   ax
  0000:2358  xor    ax, ax
  0000:235a  push   ax
  0000:235b  xor    ax, ax
  0000:235d  push   ax
  0000:235e  lcall  U2:0eed:0000 Print
  0000:2363  jmp    0x237e
L02365:
  0000:2365  mov    di, 0x19b9    ; "^1Кожанка(+2) "
  0000:2368  push   cs
  0000:2369  push   di
  0000:236a  xor    ax, ax
  0000:236c  push   ax
  0000:236d  xor    ax, ax
  0000:236f  push   ax
  0000:2370  xor    ax, ax
  0000:2372  push   ax
  0000:2373  xor    ax, ax
  0000:2375  push   ax
  0000:2376  xor    ax, ax
  0000:2378  push   ax
  0000:2379  lcall  U2:0eed:0000 Print
L0237e:
  0000:237e  cmp    byte ptr [g38b9], 0
  0000:2383  je     0x23a5
  0000:2385  cmp    byte ptr [g38b6], 0
  0000:238a  jne    0x23a5
  0000:238c  mov    di, 0x19a3    ; "^1Крутая кожанка(+4) "
  0000:238f  push   cs
  0000:2390  push   di
  0000:2391  xor    ax, ax
  0000:2393  push   ax
  0000:2394  xor    ax, ax
  0000:2396  push   ax
  0000:2397  xor    ax, ax
  0000:2399  push   ax
  0000:239a  xor    ax, ax
  0000:239c  push   ax
  0000:239d  xor    ax, ax
  0000:239f  push   ax
  0000:23a0  lcall  U2:0eed:0000 Print
L023a5:
  0000:23a5  mov    di, 0x3fcc
  0000:23a8  push   ds
  0000:23a9  push   di
  0000:23aa  lcall  SYS:0f78:05dd WriteLnEnd
  0000:23af  lcall  SYS:0f78:0291 IOCheck
L023b4:
  0000:23b4  cmp    word ptr [g38c5], 0
  0000:23b9  jle    0x23d5
  0000:23bb  mov    di, 0x19c8    ; "Косяки #"
  0000:23be  push   cs
  0000:23bf  push   di
  0000:23c0  push   word ptr [g38c5]
  0000:23c4  xor    ax, ax
  0000:23c6  push   ax
  0000:23c7  xor    ax, ax
  0000:23c9  push   ax
  0000:23ca  xor    ax, ax
  0000:23cc  push   ax
  0000:23cd  xor    ax, ax
  0000:23cf  push   ax
  0000:23d0  lcall  U2:0eed:01c2 PrintLn
L023d5:
  0000:23d5  cmp    word ptr [g38c3], 0
  0000:23da  jle    0x2415
  0000:23dc  mov    di, 0x19d1    ; "Пиво #.#л."
  0000:23df  push   cs
  0000:23e0  push   di
  0000:23e1  mov    ax, word ptr [g38c3]
  0000:23e4  cdq    
  0000:23e5  mov    cx, 2
  0000:23e8  idiv   cx
  0000:23ea  push   ax
  0000:23eb  mov    ax, word ptr [g38c3]
  0000:23ee  cdq    
  0000:23ef  mov    cx, 2
  0000:23f2  idiv   cx
  0000:23f4  xchg   dx, ax
  0000:23f5  mov    si, ax
  0000:23f7  shl    ax, 1
  0000:23f9  shl    ax, 1
  0000:23fb  add    ax, si
  0000:23fd  cdq    
  0000:23fe  mov    cx, 0xa
  0000:2401  idiv   cx
  0000:2403  xchg   dx, ax
  0000:2404  push   ax
  0000:2405  xor    ax, ax
  0000:2407  push   ax
  0000:2408  xor    ax, ax
  0000:240a  push   ax
  0000:240b  xor    ax, ax
  0000:240d  push   ax
  0000:240e  lcall  U2:0eed:01c2 PrintLn
  0000:2413  jmp    0x242e
L02415:
  0000:2415  mov    di, 0x19dc    ; "^4Пива нет"
  0000:2418  push   cs
  0000:2419  push   di
  0000:241a  xor    ax, ax
  0000:241c  push   ax
  0000:241d  xor    ax, ax
  0000:241f  push   ax
  0000:2420  xor    ax, ax
  0000:2422  push   ax
  0000:2423  xor    ax, ax
  0000:2425  push   ax
  0000:2426  xor    ax, ax
  0000:2428  push   ax
  0000:2429  lcall  U2:0eed:01c2 PrintLn
L0242e:
  0000:242e  cmp    word ptr [g38c7], 0
  0000:2433  jle    0x2451
  0000:2435  mov    di, 0x19e7    ; "Бабки #"
  0000:2438  push   cs
  0000:2439  push   di
  0000:243a  push   word ptr [g38c7]
  0000:243e  xor    ax, ax
  0000:2440  push   ax
  0000:2441  xor    ax, ax
  0000:2443  push   ax
  0000:2444  xor    ax, ax
  0000:2446  push   ax
  0000:2447  xor    ax, ax
  0000:2449  push   ax
  0000:244a  lcall  U2:0eed:01c2 PrintLn
  0000:244f  jmp    0x246a
L02451:
  0000:2451  mov    di, 0x19ef    ; "^4Нету бабок"
  0000:2454  push   cs
  0000:2455  push   di
  0000:2456  xor    ax, ax
  0000:2458  push   ax
  0000:2459  xor    ax, ax
  0000:245b  push   ax
  0000:245c  xor    ax, ax
  0000:245e  push   ax
  0000:245f  xor    ax, ax
  0000:2461  push   ax
  0000:2462  xor    ax, ax
  0000:2464  push   ax
  0000:2465  lcall  U2:0eed:01c2 PrintLn
L0246a:
  0000:246a  cmp    word ptr [g38c9], 0
  0000:246f  jle    0x248b
  0000:2471  mov    di, 0x19fc    ; "Хлам #"
  0000:2474  push   cs
  0000:2475  push   di
  0000:2476  push   word ptr [g38c9]
  0000:247a  xor    ax, ax
  0000:247c  push   ax
  0000:247d  xor    ax, ax
  0000:247f  push   ax
  0000:2480  xor    ax, ax
  0000:2482  push   ax
  0000:2483  xor    ax, ax
  0000:2485  push   ax
  0000:2486  lcall  U2:0eed:01c2 PrintLn
L0248b:
  0000:248b  mov    sp, bp
  0000:248d  pop    bp
  0000:248e  ret    
; ---- data 0000:248f (151 bytes)
;   0000:248f str "^1Понтовость увеличивается: "
;   0000:24ac str "^1Сила +1 "
;   0000:24b7 str "1"
;   0000:24b9 str "^1Ловкость +1 "
;   0000:24c8 str "2"
;   0000:24ca str "^1Живучесть +1 "
;   0000:24da str "3"
;   0000:24dc str "^1Удача +1 "
;   0000:24e8 str "4"
;   0000:24ea str "^6Сейчас у тебя # качков опыта. До слеующей прокачки надо #"

;================ proc 0000:2526  callers: 0e7df 0e124 0e21c 05148 05835 0523b 05097 0dec5 …10
  0000:2526  push   bp
  0000:2527  mov    bp, sp
  0000:2529  mov    ax, 0x10c
  0000:252c  lcall  SYS:0f78:02cd StackCheck
  0000:2531  sub    sp, 0x10c
  0000:2535  mov    ax, word ptr [g38ce]
  0000:2538  cmp    ax, word ptr [g38d0]
  0000:253c  jge    0x2541
  0000:253e  jmp    0x28c1
L02541:
  0000:2541  xor    ax, ax
  0000:2543  mov    word ptr [bp - 2], ax
L02546:
  0000:2546  mov    ax, word ptr [g38ce]
  0000:2549  sub    ax, word ptr [g38d0]
  0000:254d  mov    word ptr [g38ce], ax
  0000:2550  add    word ptr [g38d0], 0xa
  0000:2555  inc    word ptr [bp - 2]
  0000:2558  mov    ax, word ptr [g38ce]
  0000:255b  cmp    ax, word ptr [g38d0]
  0000:255f  jge    0x2546
  0000:2561  mov    ax, word ptr [bp - 2]
  0000:2564  mov    word ptr [bp - 0xc], ax
  0000:2567  mov    ax, 1
  0000:256a  cmp    ax, word ptr [bp - 0xc]
  0000:256d  jle    0x2572
  0000:256f  jmp    0x28a0
L02572:
  0000:2572  mov    word ptr [bp - 4], ax
  0000:2575  jmp    0x257a
L02577:
  0000:2577  inc    word ptr [bp - 4]
L0257a:
  0000:257a  cmp    byte ptr [bp + 4], 0
  0000:257e  jne    0x258a
  0000:2580  cmp    word ptr [g38a6], 0x28
  0000:2585  jne    0x258a
  0000:2587  jmp    0x28a0
L0258a:
  0000:258a  mov    ax, word ptr [g38a6]
  0000:258d  inc    ax
  0000:258e  mov    word ptr [g38a6], ax
  0000:2591  mov    di, 0x248f    ; "^1Понтовость увеличивается: "
  0000:2594  push   cs
  0000:2595  push   di
  0000:2596  xor    ax, ax
  0000:2598  push   ax
  0000:2599  xor    ax, ax
  0000:259b  push   ax
  0000:259c  xor    ax, ax
  0000:259e  push   ax
  0000:259f  xor    ax, ax
  0000:25a1  push   ax
  0000:25a2  xor    ax, ax
  0000:25a4  push   ax
  0000:25a5  lcall  U2:0eed:0000 Print
  0000:25aa  mov    di, word ptr [g389c]
  0000:25ae  shl    di, 1
  0000:25b0  shl    di, 1
  0000:25b2  mov    al, byte ptr [di + 5]
  0000:25b6  xor    ah, ah
  0000:25b8  mov    bx, ax
  0000:25ba  mov    di, word ptr [g389c]
  0000:25be  shl    di, 1
  0000:25c0  shl    di, 1
  0000:25c2  mov    al, byte ptr [di + 4]
  0000:25c6  xor    ah, ah
  0000:25c8  mov    cx, ax
  0000:25ca  mov    di, word ptr [g389c]
  0000:25ce  shl    di, 1
  0000:25d0  shl    di, 1
  0000:25d2  mov    al, byte ptr [di + 3]
  0000:25d6  xor    ah, ah
  0000:25d8  mov    dx, ax
  0000:25da  mov    di, word ptr [g389c]
  0000:25de  shl    di, 1
  0000:25e0  shl    di, 1
  0000:25e2  mov    al, byte ptr [di + 2]
  0000:25e6  xor    ah, ah
  0000:25e8  add    ax, dx
  0000:25ea  add    ax, cx
  0000:25ec  add    ax, bx
  0000:25ee  mov    word ptr [bp - 6], ax
  0000:25f1  mov    word ptr [bp - 8], 1
  0000:25f6  jmp    0x25fb
L025f8:
  0000:25f8  inc    word ptr [bp - 8]
L025fb:
  0000:25fb  push   word ptr [bp - 6]
  0000:25fe  lcall  SYS:0f78:114b Random
  0000:2603  inc    ax
  0000:2604  mov    word ptr [bp - 0xa], ax
  0000:2607  mov    di, word ptr [g389c]
  0000:260b  shl    di, 1
  0000:260d  shl    di, 1
  0000:260f  mov    al, byte ptr [di + 2]
  0000:2613  xor    ah, ah
  0000:2615  cmp    ax, word ptr [bp - 0xa]
  0000:2618  jge    0x261d
  0000:261a  jmp    0x26a0
L0261d:
  0000:261d  inc    word ptr [g389e]
  0000:2621  mov    di, 0x24ac    ; "^1Сила +1 "
  0000:2624  push   cs
  0000:2625  push   di
  0000:2626  xor    ax, ax
  0000:2628  push   ax
  0000:2629  xor    ax, ax
  0000:262b  push   ax
  0000:262c  xor    ax, ax
  0000:262e  push   ax
  0000:262f  xor    ax, ax
  0000:2631  push   ax
  0000:2632  xor    ax, ax
  0000:2634  push   ax
  0000:2635  lcall  U2:0eed:0000 Print
  0000:263a  cmp    word ptr [g38a6], 0x28
  0000:263f  jg     0x267f
  0000:2641  lea    di, [bp - 0x10c]
  0000:2645  push   ss
  0000:2646  push   di
  0000:2647  mov    di, word ptr [g38a6]
  0000:264b  mov    si, di
  0000:264d  shl    di, 1
  0000:264f  add    di, si
  0000:2651  add    di, 0x38cf
  0000:2655  push   ds
  0000:2656  push   di
  0000:2657  lcall  SYS:0f78:0ae7 StrLoad
  0000:265c  mov    di, 0x24b7    ; "1"
  0000:265f  push   cs
  0000:2660  push   di
  0000:2661  lcall  SYS:0f78:0b66 StrConcat
  0000:2666  mov    di, word ptr [g38a6]
  0000:266a  mov    si, di
  0000:266c  shl    di, 1
  0000:266e  add    di, si
  0000:2670  add    di, 0x38cf
  0000:2674  push   ds
  0000:2675  push   di
  0000:2676  mov    ax, 2
  0000:2679  push   ax
  0000:267a  lcall  SYS:0f78:0b01 StrStore
L0267f:
  0000:267f  inc    word ptr [g38aa]
  0000:2683  mov    ax, word ptr [g389e]
  0000:2686  cdq    
  0000:2687  mov    cx, 2
  0000:268a  idiv   cx
  0000:268c  xchg   dx, ax
  0000:268d  or     ax, ax
  0000:268f  jne    0x2695
  0000:2691  inc    word ptr [g38a8]
L02695:
  0000:2695  inc    word ptr [g38ae]
  0000:2699  inc    word ptr [g38ac]
  0000:269d  jmp    0x287d
L026a0:
  0000:26a0  mov    di, word ptr [g389c]
  0000:26a4  shl    di, 1
  0000:26a6  shl    di, 1
  0000:26a8  mov    al, byte ptr [di + 2]
  0000:26ac  xor    ah, ah
  0000:26ae  mov    dx, ax
  0000:26b0  mov    di, word ptr [g389c]
  0000:26b4  shl    di, 1
  0000:26b6  shl    di, 1
  0000:26b8  mov    al, byte ptr [di + 3]
  0000:26bc  xor    ah, ah
  0000:26be  add    ax, dx
  0000:26c0  cmp    ax, word ptr [bp - 0xa]
  0000:26c3  jl     0x272a
  0000:26c5  inc    word ptr [g38a0]
  0000:26c9  mov    di, 0x24b9    ; "^1Ловкость +1 "
  0000:26cc  push   cs
  0000:26cd  push   di
  0000:26ce  xor    ax, ax
  0000:26d0  push   ax
  0000:26d1  xor    ax, ax
  0000:26d3  push   ax
  0000:26d4  xor    ax, ax
  0000:26d6  push   ax
  0000:26d7  xor    ax, ax
  0000:26d9  push   ax
  0000:26da  xor    ax, ax
  0000:26dc  push   ax
  0000:26dd  lcall  U2:0eed:0000 Print
  0000:26e2  cmp    word ptr [g38a6], 0x28
  0000:26e7  jg     0x2727
  0000:26e9  lea    di, [bp - 0x10c]
  0000:26ed  push   ss
  0000:26ee  push   di
  0000:26ef  mov    di, word ptr [g38a6]
  0000:26f3  mov    si, di
  0000:26f5  shl    di, 1
  0000:26f7  add    di, si
  0000:26f9  add    di, 0x38cf
  0000:26fd  push   ds
  0000:26fe  push   di
  0000:26ff  lcall  SYS:0f78:0ae7 StrLoad
  0000:2704  mov    di, 0x24c8    ; "2"
  0000:2707  push   cs
  0000:2708  push   di
  0000:2709  lcall  SYS:0f78:0b66 StrConcat
  0000:270e  mov    di, word ptr [g38a6]
  0000:2712  mov    si, di
  0000:2714  shl    di, 1
  0000:2716  add    di, si
  0000:2718  add    di, 0x38cf
  0000:271c  push   ds
  0000:271d  push   di
  0000:271e  mov    ax, 2
  0000:2721  push   ax
  0000:2722  lcall  SYS:0f78:0b01 StrStore
L02727:
  0000:2727  jmp    0x287d
L0272a:
  0000:272a  mov    di, word ptr [g389c]
  0000:272e  shl    di, 1
  0000:2730  shl    di, 1
  0000:2732  mov    al, byte ptr [di + 2]
  0000:2736  xor    ah, ah
  0000:2738  mov    cx, ax
  0000:273a  mov    di, word ptr [g389c]
  0000:273e  shl    di, 1
  0000:2740  shl    di, 1
  0000:2742  mov    al, byte ptr [di + 3]
  0000:2746  xor    ah, ah
  0000:2748  mov    dx, ax
  0000:274a  mov    di, word ptr [g389c]
  0000:274e  shl    di, 1
  0000:2750  shl    di, 1
  0000:2752  mov    al, byte ptr [di + 4]
  0000:2756  xor    ah, ah
  0000:2758  add    ax, dx
  0000:275a  add    ax, cx
  0000:275c  cmp    ax, word ptr [bp - 0xa]
  0000:275f  jl     0x27d0
  0000:2761  inc    word ptr [g38a2]
  0000:2765  mov    di, 0x24ca    ; "^1Живучесть +1 "
  0000:2768  push   cs
  0000:2769  push   di
  0000:276a  xor    ax, ax
  0000:276c  push   ax
  0000:276d  xor    ax, ax
  0000:276f  push   ax
  0000:2770  xor    ax, ax
  0000:2772  push   ax
  0000:2773  xor    ax, ax
  0000:2775  push   ax
  0000:2776  xor    ax, ax
  0000:2778  push   ax
  0000:2779  lcall  U2:0eed:0000 Print
  0000:277e  cmp    word ptr [g38a6], 0x28
  0000:2783  jg     0x27c3
  0000:2785  lea    di, [bp - 0x10c]
  0000:2789  push   ss
  0000:278a  push   di
  0000:278b  mov    di, word ptr [g38a6]
  0000:278f  mov    si, di
  0000:2791  shl    di, 1
  0000:2793  add    di, si
  0000:2795  add    di, 0x38cf
  0000:2799  push   ds
  0000:279a  push   di
  0000:279b  lcall  SYS:0f78:0ae7 StrLoad
  0000:27a0  mov    di, 0x24da    ; "3"
  0000:27a3  push   cs
  0000:27a4  push   di
  0000:27a5  lcall  SYS:0f78:0b66 StrConcat
  0000:27aa  mov    di, word ptr [g38a6]
  0000:27ae  mov    si, di
  0000:27b0  shl    di, 1
  0000:27b2  add    di, si
  0000:27b4  add    di, 0x38cf
  0000:27b8  push   ds
  0000:27b9  push   di
  0000:27ba  mov    ax, 2
  0000:27bd  push   ax
  0000:27be  lcall  SYS:0f78:0b01 StrStore
L027c3:
  0000:27c3  add    word ptr [g38ae], 5
  0000:27c8  add    word ptr [g38ac], 5
  0000:27cd  jmp    0x287d
L027d0:
  0000:27d0  mov    di, word ptr [g389c]
  0000:27d4  shl    di, 1
  0000:27d6  shl    di, 1
  0000:27d8  mov    al, byte ptr [di + 2]
  0000:27dc  xor    ah, ah
  0000:27de  mov    bx, ax
  0000:27e0  mov    di, word ptr [g389c]
  0000:27e4  shl    di, 1
  0000:27e6  shl    di, 1
  0000:27e8  mov    al, byte ptr [di + 3]
  0000:27ec  xor    ah, ah
  0000:27ee  mov    cx, ax
  0000:27f0  mov    di, word ptr [g389c]
  0000:27f4  shl    di, 1
  0000:27f6  shl    di, 1
  0000:27f8  mov    al, byte ptr [di + 4]
  0000:27fc  xor    ah, ah
  0000:27fe  mov    dx, ax
  0000:2800  mov    di, word ptr [g389c]
  0000:2804  shl    di, 1
  0000:2806  shl    di, 1
  0000:2808  mov    al, byte ptr [di + 5]
  0000:280c  xor    ah, ah
  0000:280e  add    ax, dx
  0000:2810  add    ax, cx
  0000:2812  add    ax, bx
  0000:2814  cmp    ax, word ptr [bp - 0xa]
  0000:2817  jl     0x287d
  0000:2819  inc    word ptr [g38a4]
  0000:281d  mov    di, 0x24dc    ; "^1Удача +1 "
  0000:2820  push   cs
  0000:2821  push   di
  0000:2822  xor    ax, ax
  0000:2824  push   ax
  0000:2825  xor    ax, ax
  0000:2827  push   ax
  0000:2828  xor    ax, ax
  0000:282a  push   ax
  0000:282b  xor    ax, ax
  0000:282d  push   ax
  0000:282e  xor    ax, ax
  0000:2830  push   ax
  0000:2831  lcall  U2:0eed:0000 Print
  0000:2836  cmp    word ptr [g38a6], 0x28
  0000:283b  jg     0x287b
  0000:283d  lea    di, [bp - 0x10c]
  0000:2841  push   ss
  0000:2842  push   di
  0000:2843  mov    di, word ptr [g38a6]
  0000:2847  mov    si, di
  0000:2849  shl    di, 1
  0000:284b  add    di, si
  0000:284d  add    di, 0x38cf
  0000:2851  push   ds
  0000:2852  push   di
  0000:2853  lcall  SYS:0f78:0ae7 StrLoad
  0000:2858  mov    di, 0x24e8    ; "4"
  0000:285b  push   cs
  0000:285c  push   di
  0000:285d  lcall  SYS:0f78:0b66 StrConcat
  0000:2862  mov    di, word ptr [g38a6]
  0000:2866  mov    si, di
  0000:2868  shl    di, 1
  0000:286a  add    di, si
  0000:286c  add    di, 0x38cf
  0000:2870  push   ds
  0000:2871  push   di
  0000:2872  mov    ax, 2
  0000:2875  push   ax
  0000:2876  lcall  SYS:0f78:0b01 StrStore
L0287b:
  0000:287b  jmp    0x287d
L0287d:
  0000:287d  cmp    word ptr [bp - 8], 2
  0000:2881  je     0x2886
  0000:2883  jmp    0x25f8
L02886:
  0000:2886  mov    di, 0x3fcc
  0000:2889  push   ds
  0000:288a  push   di
  0000:288b  lcall  SYS:0f78:05dd WriteLnEnd
  0000:2890  lcall  SYS:0f78:0291 IOCheck
  0000:2895  mov    ax, word ptr [bp - 4]
  0000:2898  cmp    ax, word ptr [bp - 0xc]
  0000:289b  je     0x28a0
  0000:289d  jmp    0x2577
L028a0:
  0000:28a0  cmp    byte ptr [bp + 4], 0
  0000:28a4  jne    0x28c1
  0000:28a6  mov    di, 0x24ea    ; "^6Сейчас у тебя # качков опыта. До слеующей прокачки надо #"
  0000:28a9  push   cs
  0000:28aa  push   di
  0000:28ab  push   word ptr [g38ce]
  0000:28af  push   word ptr [g38d0]
  0000:28b3  xor    ax, ax
  0000:28b5  push   ax
  0000:28b6  xor    ax, ax
  0000:28b8  push   ax
  0000:28b9  xor    ax, ax
  0000:28bb  push   ax
  0000:28bc  lcall  U2:0eed:01c2 PrintLn
L028c1:
  0000:28c1  mov    sp, bp
  0000:28c3  pop    bp
  0000:28c4  ret    2
; ---- data 0000:28c7 (253 bytes)
;   0000:28c7 str "h"
;   0000:28c9 str "mh"
;   0000:28cc str "^4Ты не можешь пить пиво из-за сломаной челюсти."
;   0000:28fd str "^2Пиво прибавляет #з. "
;   0000:2914 str "^2Здоровья:#/#. Осталось #.#л. пива"
;   0000:2938 str "^2Пиво прибавляет #з. Здоровья:#/#. Осталось #.#л. пива"
;   0000:2970 str "^4Пива нету"
;   0000:297c str "^6Блин только тупить не надо - и так здоровья до фига."
;   0000:29b3 str "^4Кончилось пиво"

;================ proc 0000:29c4  callers: 0e966 04b00
  0000:29c4  push   bp
  0000:29c5  mov    bp, sp
  0000:29c7  mov    ax, 0x102
  0000:29ca  lcall  SYS:0f78:02cd StackCheck
  0000:29cf  sub    sp, 0x102
  0000:29d3  mov    bx, ss
  0000:29d5  mov    es, bx
  0000:29d7  mov    bx, ds
  0000:29d9  cld    
  0000:29da  lea    di, [bp - 0x100]
  0000:29de  lds    si, ptr [bp + 4]
  0000:29e1  lodsb  al, byte ptr [si]
  0000:29e2  stosb  byte ptr es:[di], al
  0000:29e3  xchg   cx, ax
  0000:29e4  xor    ch, ch
  0000:29e6  rep movsb byte ptr es:[di], byte ptr [si]
  0000:29e8  mov    ds, bx
  0000:29ea  lea    di, [bp - 0x100]
  0000:29ee  push   ss
  0000:29ef  push   di
  0000:29f0  mov    di, 0x28c7    ; "h"
  0000:29f3  push   cs
  0000:29f4  push   di
  0000:29f5  lcall  SYS:0f78:0bd8 StrCmp
  0000:29fa  je     0x2a11
  0000:29fc  lea    di, [bp - 0x100]
  0000:2a00  push   ss
  0000:2a01  push   di
  0000:2a02  mov    di, 0x28c9    ; "mh"
  0000:2a05  push   cs
  0000:2a06  push   di
  0000:2a07  lcall  SYS:0f78:0bd8 StrCmp
  0000:2a0c  je     0x2a11
  0000:2a0e  jmp    0x2c58
L02a11:
  0000:2a11  mov    ax, word ptr [g38ac]
  0000:2a14  mov    word ptr [bp - 0x102], ax
  0000:2a18  cmp    byte ptr [g38b0], 1
  0000:2a1d  jne    0x2a3b
  0000:2a1f  mov    di, 0x28cc    ; "^4Ты не можешь пить пиво из-за сломаной челюсти."
  0000:2a22  push   cs
  0000:2a23  push   di
  0000:2a24  xor    ax, ax
  0000:2a26  push   ax
  0000:2a27  xor    ax, ax
  0000:2a29  push   ax
  0000:2a2a  xor    ax, ax
  0000:2a2c  push   ax
  0000:2a2d  xor    ax, ax
  0000:2a2f  push   ax
  0000:2a30  xor    ax, ax
  0000:2a32  push   ax
  0000:2a33  lcall  U2:0eed:01c2 PrintLn
  0000:2a38  jmp    0x2baa
L02a3b:
  0000:2a3b  mov    ax, word ptr [g38ac]
  0000:2a3e  cmp    ax, word ptr [g38ae]
  0000:2a42  jl     0x2a47
  0000:2a44  jmp    0x2b67
L02a47:
  0000:2a47  cmp    word ptr [g38c3], 0
  0000:2a4c  jg     0x2a51
  0000:2a4e  jmp    0x2b3a
L02a51:
  0000:2a51  dec    word ptr [g38c3]
  0000:2a55  mov    ax, word ptr [g38ae]
  0000:2a58  sub    ax, word ptr [g38ac]
  0000:2a5c  cmp    ax, 5
  0000:2a5f  jl     0x2a64
  0000:2a61  jmp    0x2ae7
L02a64:
  0000:2a64  lea    di, [bp - 0x100]
  0000:2a68  push   ss
  0000:2a69  push   di
  0000:2a6a  mov    di, 0x28c7    ; "h"
  0000:2a6d  push   cs
  0000:2a6e  push   di
  0000:2a6f  lcall  SYS:0f78:0bd8 StrCmp
  0000:2a74  jne    0x2a94
  0000:2a76  mov    di, 0x28fd    ; "^2Пиво прибавляет #з. "
  0000:2a79  push   cs
  0000:2a7a  push   di
  0000:2a7b  mov    ax, word ptr [g38ae]
  0000:2a7e  sub    ax, word ptr [g38ac]
  0000:2a82  push   ax
  0000:2a83  xor    ax, ax
  0000:2a85  push   ax
  0000:2a86  xor    ax, ax
  0000:2a88  push   ax
  0000:2a89  xor    ax, ax
  0000:2a8b  push   ax
  0000:2a8c  xor    ax, ax
  0000:2a8e  push   ax
  0000:2a8f  lcall  U2:0eed:0000 Print
L02a94:
  0000:2a94  mov    ax, word ptr [g38ae]
  0000:2a97  mov    word ptr [g38ac], ax
  0000:2a9a  lea    di, [bp - 0x100]
  0000:2a9e  push   ss
  0000:2a9f  push   di
  0000:2aa0  mov    di, 0x28c7    ; "h"
  0000:2aa3  push   cs
  0000:2aa4  push   di
  0000:2aa5  lcall  SYS:0f78:0bd8 StrCmp
  0000:2aaa  jne    0x2ae5
  0000:2aac  mov    di, 0x2914    ; "^2Здоровья:#/#. Осталось #.#л. пива"
  0000:2aaf  push   cs
  0000:2ab0  push   di
  0000:2ab1  push   word ptr [g38ac]
  0000:2ab5  push   word ptr [g38ae]
  0000:2ab9  mov    ax, word ptr [g38c3]
  0000:2abc  cdq    
  0000:2abd  mov    cx, 2
  0000:2ac0  idiv   cx
  0000:2ac2  push   ax
  0000:2ac3  mov    ax, word ptr [g38c3]
  0000:2ac6  cdq    
  0000:2ac7  mov    cx, 2
  0000:2aca  idiv   cx
  0000:2acc  xchg   dx, ax
  0000:2acd  mov    si, ax
  0000:2acf  shl    ax, 1
  0000:2ad1  shl    ax, 1
  0000:2ad3  add    ax, si
  0000:2ad5  cdq    
  0000:2ad6  mov    cx, 0xa
  0000:2ad9  idiv   cx
  0000:2adb  xchg   dx, ax
  0000:2adc  push   ax
  0000:2add  xor    ax, ax
  0000:2adf  push   ax
  0000:2ae0  lcall  U2:0eed:01c2 PrintLn
L02ae5:
  0000:2ae5  jmp    0x2b38
L02ae7:
  0000:2ae7  add    word ptr [g38ac], 5
  0000:2aec  lea    di, [bp - 0x100]
  0000:2af0  push   ss
  0000:2af1  push   di
  0000:2af2  mov    di, 0x28c7    ; "h"
  0000:2af5  push   cs
  0000:2af6  push   di
  0000:2af7  lcall  SYS:0f78:0bd8 StrCmp
  0000:2afc  jne    0x2b38
  0000:2afe  mov    di, 0x2938    ; "^2Пиво прибавляет #з. Здоровья:#/#. Осталось #.#л. пива"
  0000:2b01  push   cs
  0000:2b02  push   di
  0000:2b03  mov    ax, 5
  0000:2b06  push   ax
  0000:2b07  push   word ptr [g38ac]
  0000:2b0b  push   word ptr [g38ae]
  0000:2b0f  mov    ax, word ptr [g38c3]
  0000:2b12  cdq    
  0000:2b13  mov    cx, 2
  0000:2b16  idiv   cx
  0000:2b18  push   ax
  0000:2b19  mov    ax, word ptr [g38c3]
  0000:2b1c  cdq    
  0000:2b1d  mov    cx, 2
  0000:2b20  idiv   cx
  0000:2b22  xchg   dx, ax
  0000:2b23  mov    si, ax
  0000:2b25  shl    ax, 1
  0000:2b27  shl    ax, 1
  0000:2b29  add    ax, si
  0000:2b2b  cdq    
  0000:2b2c  mov    cx, 0xa
  0000:2b2f  idiv   cx
  0000:2b31  xchg   dx, ax
  0000:2b32  push   ax
  0000:2b33  lcall  U2:0eed:01c2 PrintLn
L02b38:
  0000:2b38  jmp    0x2b65
L02b3a:
  0000:2b3a  lea    di, [bp - 0x100]
  0000:2b3e  push   ss
  0000:2b3f  push   di
  0000:2b40  mov    di, 0x28c7    ; "h"
  0000:2b43  push   cs
  0000:2b44  push   di
  0000:2b45  lcall  SYS:0f78:0bd8 StrCmp
  0000:2b4a  jne    0x2b65
  0000:2b4c  mov    di, 0x2970    ; "^4Пива нету"
  0000:2b4f  push   cs
  0000:2b50  push   di
  0000:2b51  xor    ax, ax
  0000:2b53  push   ax
  0000:2b54  xor    ax, ax
  0000:2b56  push   ax
  0000:2b57  xor    ax, ax
  0000:2b59  push   ax
  0000:2b5a  xor    ax, ax
  0000:2b5c  push   ax
  0000:2b5d  xor    ax, ax
  0000:2b5f  push   ax
  0000:2b60  lcall  U2:0eed:01c2 PrintLn
L02b65:
  0000:2b65  jmp    0x2b83
L02b67:
  0000:2b67  mov    di, 0x297c    ; "^6Блин только тупить не надо - и так здоровья до фига."
  0000:2b6a  push   cs
  0000:2b6b  push   di
  0000:2b6c  xor    ax, ax
  0000:2b6e  push   ax
  0000:2b6f  xor    ax, ax
  0000:2b71  push   ax
  0000:2b72  xor    ax, ax
  0000:2b74  push   ax
  0000:2b75  xor    ax, ax
  0000:2b77  push   ax
  0000:2b78  xor    ax, ax
  0000:2b7a  push   ax
  0000:2b7b  lcall  U2:0eed:01c2 PrintLn
  0000:2b80  jmp    0x2c58
L02b83:
  0000:2b83  lea    di, [bp - 0x100]
  0000:2b87  push   ss
  0000:2b88  push   di
  0000:2b89  mov    di, 0x28c7    ; "h"
  0000:2b8c  push   cs
  0000:2b8d  push   di
  0000:2b8e  lcall  SYS:0f78:0bd8 StrCmp
  0000:2b93  jne    0x2b97
  0000:2b95  jmp    0x2baa
L02b97:
  0000:2b97  mov    ax, word ptr [g38ac]
  0000:2b9a  cmp    ax, word ptr [g38ae]
  0000:2b9e  jge    0x2baa
  0000:2ba0  cmp    word ptr [g38c3], 0
  0000:2ba5  jle    0x2baa
  0000:2ba7  jmp    0x2a3b
L02baa:
  0000:2baa  lea    di, [bp - 0x100]
  0000:2bae  push   ss
  0000:2baf  push   di
  0000:2bb0  mov    di, 0x28c9    ; "mh"
  0000:2bb3  push   cs
  0000:2bb4  push   di
  0000:2bb5  lcall  SYS:0f78:0bd8 StrCmp
  0000:2bba  je     0x2bbf
  0000:2bbc  jmp    0x2c58
L02bbf:
  0000:2bbf  mov    ax, word ptr [g38ac]
  0000:2bc2  cmp    ax, word ptr [bp - 0x102]
  0000:2bc6  je     0x2c06
  0000:2bc8  mov    di, 0x2938    ; "^2Пиво прибавляет #з. Здоровья:#/#. Осталось #.#л. пива"
  0000:2bcb  push   cs
  0000:2bcc  push   di
  0000:2bcd  mov    ax, word ptr [g38ac]
  0000:2bd0  sub    ax, word ptr [bp - 0x102]
  0000:2bd4  push   ax
  0000:2bd5  push   word ptr [g38ac]
  0000:2bd9  push   word ptr [g38ae]
  0000:2bdd  mov    ax, word ptr [g38c3]
  0000:2be0  cdq    
  0000:2be1  mov    cx, 2
  0000:2be4  idiv   cx
  0000:2be6  push   ax
  0000:2be7  mov    ax, word ptr [g38c3]
  0000:2bea  cdq    
  0000:2beb  mov    cx, 2
  0000:2bee  idiv   cx
  0000:2bf0  xchg   dx, ax
  0000:2bf1  mov    si, ax
  0000:2bf3  shl    ax, 1
  0000:2bf5  shl    ax, 1
  0000:2bf7  add    ax, si
  0000:2bf9  cdq    
  0000:2bfa  mov    cx, 0xa
  0000:2bfd  idiv   cx
  0000:2bff  xchg   dx, ax
  0000:2c00  push   ax
  0000:2c01  lcall  U2:0eed:01c2 PrintLn
L02c06:
  0000:2c06  mov    ax, word ptr [g38ac]
  0000:2c09  cmp    ax, word ptr [bp - 0x102]
  0000:2c0d  je     0x2c2f
  0000:2c0f  cmp    word ptr [g38c3], 0
  0000:2c14  jg     0x2c2f
  0000:2c16  mov    di, 0x29b3    ; "^4Кончилось пиво"
  0000:2c19  push   cs
  0000:2c1a  push   di
  0000:2c1b  xor    ax, ax
  0000:2c1d  push   ax
  0000:2c1e  xor    ax, ax
  0000:2c20  push   ax
  0000:2c21  xor    ax, ax
  0000:2c23  push   ax
  0000:2c24  xor    ax, ax
  0000:2c26  push   ax
  0000:2c27  xor    ax, ax
  0000:2c29  push   ax
  0000:2c2a  lcall  U2:0eed:01c2 PrintLn
L02c2f:
  0000:2c2f  mov    ax, word ptr [g38ac]
  0000:2c32  cmp    ax, word ptr [bp - 0x102]
  0000:2c36  jne    0x2c58
  0000:2c38  cmp    word ptr [g38c3], 0
  0000:2c3d  jg     0x2c58
  0000:2c3f  mov    di, 0x2970    ; "^4Пива нету"
  0000:2c42  push   cs
  0000:2c43  push   di
  0000:2c44  xor    ax, ax
  0000:2c46  push   ax
  0000:2c47  xor    ax, ax
  0000:2c49  push   ax
  0000:2c4a  xor    ax, ax
  0000:2c4c  push   ax
  0000:2c4d  xor    ax, ax
  0000:2c4f  push   ax
  0000:2c50  xor    ax, ax
  0000:2c52  push   ax
  0000:2c53  lcall  U2:0eed:01c2 PrintLn
L02c58:
  0000:2c58  mov    sp, bp
  0000:2c5a  pop    bp
  0000:2c5b  ret    4
; ---- data 0000:2c5e (4275 bytes)
;   0000:2c5e str "Слышь Вась.."
;   0000:2c6b str "^4А чё ваще?"
;   0000:2c78 str "^4Пацан ты из какого района?"
;   0000:2c95 str "А ты по пинкам суди!"
;   0000:2caa str "^4Эй мудак?!"
;   0000:2cb7 str "^4Блин! это же "
;   0000:2cc7 str "^4 - известный "
;   0000:2cd7 str "^4Я МАНЬЯК!!!"
;   0000:2ce5 str "Рад познакомиться - "
;   0000:2cfa str "^4Отдай кошелёк урод!"
;   0000:2d10 str "^2Ну вот мы и встретились мудак!"
;   0000:2d31 str "^4Чё те нада козёл?!"
;   0000:2d46 str "^2Урыть тебя ублюдок!"
;   0000:2d5c str "^4Ну ты меня достал ща урою!"
;   0000:2d79 str "^6Тут заходит настоящий ректор."
;   0000:2d99 str "^4Мудак! ты тупой дебил, думал что я идиот?"
;   0000:2dc5 str "^2Я думаю ты сконил!"
;   0000:2dda str "^4Ну тада сдохни!"
;   0000:2dec str "^2Из-за твоей хорошей ловкости враг сможет пнуть тебя раз # вместо #"
;   0000:2e31 str "^4Из-за хорошей ловкости врага ты сможешь пнуть его раз # вместо #"
;   0000:2e74 str "^7Начинают собираться зрители"
;   0000:2e92 str "Зрители:^6Мочи его, мочи!"
;   0000:2eac str "Зрители:^6Врежь ему!"
;   0000:2ec1 str "Зрители:^6Блин долго ты ещё будешь мудиться?"
;   0000:2eee str "Зрители:^6Да вы только посмотрите на эти пинки!"
;   0000:2f1e str "Зрители:^6Не подкачай "
;   0000:2f35 str ", я на тебя трёшку поставил!"
;   0000:2f52 str "Зрители:^6Чё-тут за батва?"
;   0000:2f6d str "Зрители:^6Я знаю вон того мудака, он уже нескольких запинал!"
;   0000:2faa str "Зрители:^6Чё так слабо бьёшь?! Пинай сильнее!"
;   0000:2fd8 str "Зрители:^6Дерьмово дерётесь придурки"
;   0000:2ffd str "^2А ты: Заткнись мудак, а то щас тебя запинаю!"
;   0000:302c str "Зрители:^6Да, а помнишь мы вчера также одного пинали, пинали.. А потом подошла его братва.."
;   0000:3088 str "Зрители:^6Это чё реслинг?"
;   0000:30a2 str "Зрители:^6Двинь ему в рыло!"
;   0000:30be str "Зрители:^6И куда менты смотрят?"
;   0000:30de str "Зрители:^6Пинай!"
;   0000:30ef str "Зрители:^6Врежь гаду!"
;   0000:3105 str "Зрители:^6Господа делайте ваши ставки!"
;   0000:312c str "Зрители:^6Ну чё там? Какой счет?"
;   0000:314d str "Зрители:^6Ну и кого там "
;   0000:3166 str " ^6сегодня пинает?"
;   0000:3179 str "^0Битва\\"
;   0000:3182 str "k"
;   0000:3184 str "^2Точный удар!!!"
;   0000:3195 str "^2Не хило приложил!!!"
;   0000:31ab str "^2Двойной урон!!!"
;   0000:31bd str "^2Ты сломал врагу челюсть. ^4Враг: А! козёл!"
;   0000:31ea str "^2Ты сломал врагу ногу. ^4Враг: Ну что за урод!"
;   0000:321a str "^2Ты пнул врага на #з. У него осталось #"
;   0000:3243 str "^4Ты промазал"
;   0000:3251 str "^2Из-за большой ловкости ты можешь пнуть ещё раз"
;   0000:3282 str "^4Враг:Сдохни урод!!"
;   0000:3297 str "^4Тебе не хило врезали!"
;   0000:32af str "^4Враг:Получи гнида!!"
;   0000:32c5 str "^4Враг сломал тебе челюсть."
;   0000:32e1 str "^4Враг сломал тебе челюсть, даже защита не помогла."
;   0000:3315 str "^2Защита спасла твои кривые клыки."
;   0000:3338 str "^4Враг сломал тебе ногу."
;   0000:3351 str "^4Он пнул тебя на #з. У тебя осталось #"
;   0000:3379 str "^2Враг промазал"
;   0000:3389 str "^4Из-за большой ловкости враг может пнуть ещё раз"
;   0000:33bb str "run"
;   0000:33bf str "^4Ректор: Кудa? Стоять! Бейся до конца трусливый урод!"
;   0000:33f6 str "^4Ты не можешь убежать на сломаной ноге."
;   0000:341f str "^4Враг: Трусливый засранец! "
;   0000:343c str "^4Сила -1 "
;   0000:3447 str "^4Ловкость -1 "
;   0000:3456 str "^4Живучесть -1 "
;   0000:3466 str "^4Удача -1 "
;   0000:3472 str "^4Такого конявого непустят в местный притон!"
;   0000:349f str "^4Враг: Засранец!"
;   0000:34b1 str "kos"
;   0000:34b5 str "^4Ты не схавать колёса из-за сломаной челюсти."
;   0000:34e4 str "^2Колёса прибавляют #з. "
;   0000:34fd str "^2Здоровья:#/#. Осталось # косяков"
;   0000:3520 str "^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косяков"
;   0000:3559 str "^2Сила +2."
;   0000:3564 str "^4У тебя нет косяков"
;   0000:3579 str "^6Ты неможешь схавать ещё один косяк."
;   0000:359f str "s"
;   0000:35a1 str "sv"
;   0000:35a4 str "e"
;   0000:35a6 str "^2Подошли пацаны - Ща начнется!"
;   0000:35c6 str "v"
;   0000:35c8 str "^2Подошли пацаны - Ща начнется!."
;   0000:35e9 str "^4Ни кто не хочет за тебя впрягаться."
;   0000:360f str "^6Сначала надо скорешиться с местной гопотой."
;   0000:363d str "^6Тебе надо продержатся до подхода братвы # пинка."
;   0000:3670 str "^2Они уже здесь."
;   0000:3681 str "^2Врага отпинали на #з. У него осталось #"
;   0000:36ab str "^2Подошли пацаны."
;   0000:36bd str "^2Твою подмогу отпинали."
;   0000:36d6 str "^4Подмоге надоело столько парится из-за мало понтового мудака"
;   0000:3714 str "f"
;   0000:3716 str "^6Тельзя тут стрелять! Менты накроют!"
;   0000:373c str "^2Ты выстрелил и ранил врага на #з. У него осталось #з., осталось патронов #"
;   0000:3789 str "^2Это был хреновый выстрел."
;   0000:37a5 str "^6Чё за батва? Блин патроны кончились!"
;   0000:37cc str "^4Ты сдох. Ректор тебя замочил. Ты так и не доказал свою крутизну."
;   0000:380f str "^1Тебе повезло знакомые пацаны отвезли тебя в больницу а то бы ты сдох."
;   0000:3857 str "^4Ты сдох."
;   0000:3862 str "^1Ты замочил самого ректора!!! ТЫ САМЫЙ КРУТОЙ!!!"
;   0000:3894 str "^1Вновь сила торжествует над интелектом."
;   0000:38bd str "^1После этого сразу началась анархия и полный беспредел."
;   0000:38f6 str "^1И не стыдно тебе гоп чёртов?"
;   0000:3915 str "^1А результат:"
;   0000:3924 str "^1Ты замочил самого ректора!!!^6 о чёрт! да это ж не ректор был."
;   0000:3965 str "^6Это был проректор СУНЦа!"
;   0000:3980 str "^2Враг сдох."
;   0000:398d str "^6За отпин врага ты получаешь # качков опыта"
;   0000:39ba str "^6Ты запинал слишком слабого мудака для увеличения понтовости"
;   0000:39f8 str "^6Сейчас у тебя # качков опыта, А для прокачки надо #"
;   0000:3a2e str "^1Пиво победителю!"
;   0000:3a41 str "^1Поновость улутшилась на столько, что тебе можно заходить в местный притон!"
;   0000:3a8e str "^1Оба на! Колечко! Вот свезло, так свезло!"
;   0000:3ab9 str "^1Кольцо \"Помоги Господи\""
;   0000:3ad3 str "^1\"Мега Кольцо\"!"
;   0000:3ae4 str "^1Ваще полезное кольцо \"Господи помилуй\""
;   0000:3b0d str "^1Восст. жизни - 3, 5% - самозарост переломов"
;   0000:3b3b str "^1А у нарка был косячок"
;   0000:3b53 str "^1Ты нашёл крестик: удача +2"
;   0000:3b70 str "^1Ты нашёл кольцо \"Господи спаси\": удача +1"
;   0000:3b9c str "^1Ты нашёл мобилу"
;   0000:3bae str "^1Ты надыбал кастет(урон+2)"
;   0000:3bca str "^6Но у тебя есть более мощное оружие"
;   0000:3bef str "^1Ты отобрал у врага дубинку(урон+4)"
;   0000:3c14 str "^1Ты нашёл тёмные очки."
;   0000:3c2c str "^1Ты нашел ножик(урон+6)."
;   0000:3c46 str "^6Но утебя есть тесак который круче."
;   0000:3c6b str "^1Ты нашел тесак(урон+9)!!! - ужасное оружие."
;   0000:3c99 str "^2Ты отпинал этого мудака - пацаны этого незабудут. Понтовость улутшилась на #."
;   0000:3ce9 str "^6Ты получаешь # качков опыта за помощь"

;================ proc 0000:3d11  callers: 0ae2d 0ae39 0e222 0dc5b 0ddfc 0c436 0b829
  0000:3d11  push   bp
  0000:3d12  mov    bp, sp
  0000:3d14  mov    ax, 0x218
  0000:3d17  lcall  SYS:0f78:02cd StackCheck
  0000:3d1c  sub    sp, 0x218
  0000:3d20  mov    byte ptr [bp - 1], 0
  0000:3d24  mov    al, byte ptr [bp + 4]
  0000:3d27  cmp    al, 0
  0000:3d29  je     0x3d32
  0000:3d2b  cmp    al, 6
  0000:3d2d  je     0x3d32
  0000:3d2f  jmp    0x3e8d
L03d32:
  0000:3d32  mov    ax, word ptr [g3952]
  0000:3d35  cmp    ax, 0
  0000:3d38  je     0x3d44
  0000:3d3a  cmp    ax, 1
  0000:3d3d  je     0x3d44
  0000:3d3f  cmp    ax, 2
  0000:3d42  jne    0x3d79
L03d44:
  0000:3d44  mov    di, 0x2c5e    ; "Слышь Вась.."
  0000:3d47  push   cs
  0000:3d48  push   di
  0000:3d49  xor    ax, ax
  0000:3d4b  push   ax
  0000:3d4c  xor    ax, ax
  0000:3d4e  push   ax
  0000:3d4f  xor    ax, ax
  0000:3d51  push   ax
  0000:3d52  xor    ax, ax
  0000:3d54  push   ax
  0000:3d55  xor    ax, ax
  0000:3d57  push   ax
  0000:3d58  lcall  U2:0eed:01c2 PrintLn
  0000:3d5d  mov    di, 0x2c6b    ; "^4А чё ваще?"
  0000:3d60  push   cs
  0000:3d61  push   di
  0000:3d62  xor    ax, ax
  0000:3d64  push   ax
  0000:3d65  xor    ax, ax
  0000:3d67  push   ax
  0000:3d68  xor    ax, ax
  0000:3d6a  push   ax
  0000:3d6b  xor    ax, ax
  0000:3d6d  push   ax
  0000:3d6e  xor    ax, ax
  0000:3d70  push   ax
  0000:3d71  lcall  U2:0eed:01c2 PrintLn
  0000:3d76  jmp    0x3e8a
L03d79:
  0000:3d79  cmp    ax, 3
  0000:3d7c  je     0x3d8d
  0000:3d7e  cmp    ax, 4
  0000:3d81  je     0x3d8d
  0000:3d83  cmp    ax, 5
  0000:3d86  je     0x3d8d
  0000:3d88  cmp    ax, 6
  0000:3d8b  jne    0x3dc2
L03d8d:
  0000:3d8d  mov    di, 0x2c78    ; "^4Пацан ты из какого района?"
  0000:3d90  push   cs
  0000:3d91  push   di
  0000:3d92  xor    ax, ax
  0000:3d94  push   ax
  0000:3d95  xor    ax, ax
  0000:3d97  push   ax
  0000:3d98  xor    ax, ax
  0000:3d9a  push   ax
  0000:3d9b  xor    ax, ax
  0000:3d9d  push   ax
  0000:3d9e  xor    ax, ax
  0000:3da0  push   ax
  0000:3da1  lcall  U2:0eed:01c2 PrintLn
  0000:3da6  mov    di, 0x2c95    ; "А ты по пинкам суди!"
  0000:3da9  push   cs
  0000:3daa  push   di
  0000:3dab  xor    ax, ax
  0000:3dad  push   ax
  0000:3dae  xor    ax, ax
  0000:3db0  push   ax
  0000:3db1  xor    ax, ax
  0000:3db3  push   ax
  0000:3db4  xor    ax, ax
  0000:3db6  push   ax
  0000:3db7  xor    ax, ax
  0000:3db9  push   ax
  0000:3dba  lcall  U2:0eed:01c2 PrintLn
  0000:3dbf  jmp    0x3e8a
L03dc2:
  0000:3dc2  cmp    ax, 7
  0000:3dc5  jne    0x3de3
  0000:3dc7  mov    di, 0x2caa    ; "^4Эй мудак?!"
  0000:3dca  push   cs
  0000:3dcb  push   di
  0000:3dcc  xor    ax, ax
  0000:3dce  push   ax
  0000:3dcf  xor    ax, ax
  0000:3dd1  push   ax
  0000:3dd2  xor    ax, ax
  0000:3dd4  push   ax
  0000:3dd5  xor    ax, ax
  0000:3dd7  push   ax
  0000:3dd8  xor    ax, ax
  0000:3dda  push   ax
  0000:3ddb  lcall  U2:0eed:01c2 PrintLn
  0000:3de0  jmp    0x3e8a
L03de3:
  0000:3de3  cmp    ax, 8
  0000:3de6  jne    0x3e35
  0000:3de8  lea    di, [bp - 0x218]
  0000:3dec  push   ss
  0000:3ded  push   di
  0000:3dee  mov    di, 0x2cb7    ; "^4Блин! это же "
  0000:3df1  push   cs
  0000:3df2  push   di
  0000:3df3  lcall  SYS:0f78:0ae7 StrLoad
  0000:3df8  mov    di, 0x379c
  0000:3dfb  push   ds
  0000:3dfc  push   di
  0000:3dfd  lcall  SYS:0f78:0b66 StrConcat
  0000:3e02  mov    di, 0x2cc7    ; "^4 - известный "
  0000:3e05  push   cs
  0000:3e06  push   di
  0000:3e07  lcall  SYS:0f78:0b66 StrConcat
  0000:3e0c  mov    di, word ptr [g389c]
  0000:3e10  mov    cl, 8
  0000:3e12  shl    di, cl
  0000:3e14  add    di, 0x2e
  0000:3e18  push   ds
  0000:3e19  push   di
  0000:3e1a  lcall  SYS:0f78:0b66 StrConcat
  0000:3e1f  xor    ax, ax
  0000:3e21  push   ax
  0000:3e22  xor    ax, ax
  0000:3e24  push   ax
  0000:3e25  xor    ax, ax
  0000:3e27  push   ax
  0000:3e28  xor    ax, ax
  0000:3e2a  push   ax
  0000:3e2b  xor    ax, ax
  0000:3e2d  push   ax
  0000:3e2e  lcall  U2:0eed:01c2 PrintLn
  0000:3e33  jmp    0x3e8a
L03e35:
  0000:3e35  cmp    ax, 9
  0000:3e38  jne    0x3e8a
  0000:3e3a  mov    di, 0x2cd7    ; "^4Я МАНЬЯК!!!"
  0000:3e3d  push   cs
  0000:3e3e  push   di
  0000:3e3f  xor    ax, ax
  0000:3e41  push   ax
  0000:3e42  xor    ax, ax
  0000:3e44  push   ax
  0000:3e45  xor    ax, ax
  0000:3e47  push   ax
  0000:3e48  xor    ax, ax
  0000:3e4a  push   ax
  0000:3e4b  xor    ax, ax
  0000:3e4d  push   ax
  0000:3e4e  lcall  U2:0eed:01c2 PrintLn
  0000:3e53  lea    di, [bp - 0x218]
  0000:3e57  push   ss
  0000:3e58  push   di
  0000:3e59  mov    di, 0x2ce5    ; "Рад познакомиться - "
  0000:3e5c  push   cs
  0000:3e5d  push   di
  0000:3e5e  lcall  SYS:0f78:0ae7 StrLoad
  0000:3e63  mov    di, word ptr [g389c]
  0000:3e67  mov    cl, 8
  0000:3e69  shl    di, cl
  0000:3e6b  add    di, 0x2e
  0000:3e6f  push   ds
  0000:3e70  push   di
  0000:3e71  lcall  SYS:0f78:0b66 StrConcat
  0000:3e76  xor    ax, ax
  0000:3e78  push   ax
  0000:3e79  xor    ax, ax
  0000:3e7b  push   ax
  0000:3e7c  xor    ax, ax
  0000:3e7e  push   ax
  0000:3e7f  xor    ax, ax
  0000:3e81  push   ax
  0000:3e82  xor    ax, ax
  0000:3e84  push   ax
  0000:3e85  lcall  U2:0eed:01c2 PrintLn
L03e8a:
  0000:3e8a  jmp    0x3fa7
L03e8d:
  0000:3e8d  cmp    al, 1
  0000:3e8f  jne    0x3ead
  0000:3e91  mov    di, 0x2cfa    ; "^4Отдай кошелёк урод!"
  0000:3e94  push   cs
  0000:3e95  push   di
  0000:3e96  xor    ax, ax
  0000:3e98  push   ax
  0000:3e99  xor    ax, ax
  0000:3e9b  push   ax
  0000:3e9c  xor    ax, ax
  0000:3e9e  push   ax
  0000:3e9f  xor    ax, ax
  0000:3ea1  push   ax
  0000:3ea2  xor    ax, ax
  0000:3ea4  push   ax
  0000:3ea5  lcall  U2:0eed:01c2 PrintLn
  0000:3eaa  jmp    0x3fa7
L03ead:
  0000:3ead  cmp    al, 3
  0000:3eaf  jne    0x3f2b
  0000:3eb1  mov    di, 0x2d10    ; "^2Ну вот мы и встретились мудак!"
  0000:3eb4  push   cs
  0000:3eb5  push   di
  0000:3eb6  xor    ax, ax
  0000:3eb8  push   ax
  0000:3eb9  xor    ax, ax
  0000:3ebb  push   ax
  0000:3ebc  xor    ax, ax
  0000:3ebe  push   ax
  0000:3ebf  xor    ax, ax
  0000:3ec1  push   ax
  0000:3ec2  xor    ax, ax
  0000:3ec4  push   ax
  0000:3ec5  lcall  U2:0eed:01c2 PrintLn
  0000:3eca  lcall  CRT:0f16:031a ReadKey
  0000:3ecf  mov    di, 0x2d31    ; "^4Чё те нада козёл?!"
  0000:3ed2  push   cs
  0000:3ed3  push   di
  0000:3ed4  xor    ax, ax
  0000:3ed6  push   ax
  0000:3ed7  xor    ax, ax
  0000:3ed9  push   ax
  0000:3eda  xor    ax, ax
  0000:3edc  push   ax
  0000:3edd  xor    ax, ax
  0000:3edf  push   ax
  0000:3ee0  xor    ax, ax
  0000:3ee2  push   ax
  0000:3ee3  lcall  U2:0eed:01c2 PrintLn
  0000:3ee8  lcall  CRT:0f16:031a ReadKey
  0000:3eed  mov    di, 0x2d46    ; "^2Урыть тебя ублюдок!"
  0000:3ef0  push   cs
  0000:3ef1  push   di
  0000:3ef2  xor    ax, ax
  0000:3ef4  push   ax
  0000:3ef5  xor    ax, ax
  0000:3ef7  push   ax
  0000:3ef8  xor    ax, ax
  0000:3efa  push   ax
  0000:3efb  xor    ax, ax
  0000:3efd  push   ax
  0000:3efe  xor    ax, ax
  0000:3f00  push   ax
  0000:3f01  lcall  U2:0eed:01c2 PrintLn
  0000:3f06  lcall  CRT:0f16:031a ReadKey
  0000:3f0b  mov    di, 0x2d5c    ; "^4Ну ты меня достал ща урою!"
  0000:3f0e  push   cs
  0000:3f0f  push   di
  0000:3f10  xor    ax, ax
  0000:3f12  push   ax
  0000:3f13  xor    ax, ax
  0000:3f15  push   ax
  0000:3f16  xor    ax, ax
  0000:3f18  push   ax
  0000:3f19  xor    ax, ax
  0000:3f1b  push   ax
  0000:3f1c  xor    ax, ax
  0000:3f1e  push   ax
  0000:3f1f  lcall  U2:0eed:01c2 PrintLn
  0000:3f24  lcall  CRT:0f16:031a ReadKey
  0000:3f29  jmp    0x3fa7
L03f2b:
  0000:3f2b  cmp    al, 4
  0000:3f2d  jne    0x3fa7
  0000:3f2f  mov    di, 0x2d79    ; "^6Тут заходит настоящий ректор."
  0000:3f32  push   cs
  0000:3f33  push   di
  0000:3f34  xor    ax, ax
  0000:3f36  push   ax
  0000:3f37  xor    ax, ax
  0000:3f39  push   ax
  0000:3f3a  xor    ax, ax
  0000:3f3c  push   ax
  0000:3f3d  xor    ax, ax
  0000:3f3f  push   ax
  0000:3f40  xor    ax, ax
  0000:3f42  push   ax
  0000:3f43  lcall  U2:0eed:01c2 PrintLn
  0000:3f48  lcall  CRT:0f16:031a ReadKey
  0000:3f4d  mov    di, 0x2d99    ; "^4Мудак! ты тупой дебил, думал что я идиот?"
  0000:3f50  push   cs
  0000:3f51  push   di
  0000:3f52  xor    ax, ax
  0000:3f54  push   ax
  0000:3f55  xor    ax, ax
  0000:3f57  push   ax
  0000:3f58  xor    ax, ax
  0000:3f5a  push   ax
  0000:3f5b  xor    ax, ax
  0000:3f5d  push   ax
  0000:3f5e  xor    ax, ax
  0000:3f60  push   ax
  0000:3f61  lcall  U2:0eed:01c2 PrintLn
  0000:3f66  lcall  CRT:0f16:031a ReadKey
  0000:3f6b  mov    di, 0x2dc5    ; "^2Я думаю ты сконил!"
  0000:3f6e  push   cs
  0000:3f6f  push   di
  0000:3f70  xor    ax, ax
  0000:3f72  push   ax
  0000:3f73  xor    ax, ax
  0000:3f75  push   ax
  0000:3f76  xor    ax, ax
  0000:3f78  push   ax
  0000:3f79  xor    ax, ax
  0000:3f7b  push   ax
  0000:3f7c  xor    ax, ax
  0000:3f7e  push   ax
  0000:3f7f  lcall  U2:0eed:01c2 PrintLn
  0000:3f84  lcall  CRT:0f16:031a ReadKey
  0000:3f89  mov    di, 0x2dda    ; "^4Ну тада сдохни!"
  0000:3f8c  push   cs
  0000:3f8d  push   di
  0000:3f8e  xor    ax, ax
  0000:3f90  push   ax
  0000:3f91  xor    ax, ax
  0000:3f93  push   ax
  0000:3f94  xor    ax, ax
  0000:3f96  push   ax
  0000:3f97  xor    ax, ax
  0000:3f99  push   ax
  0000:3f9a  xor    ax, ax
  0000:3f9c  push   ax
  0000:3f9d  lcall  U2:0eed:01c2 PrintLn
  0000:3fa2  lcall  CRT:0f16:031a ReadKey
L03fa7:
  0000:3fa7  mov    ax, word ptr [g3956]
  0000:3faa  add    ax, 4
  0000:3fad  mov    word ptr [bp - 0x10e], ax
  0000:3fb1  mov    ax, word ptr [g38a0]
  0000:3fb4  add    ax, 4
  0000:3fb7  mov    word ptr [bp - 0x110], ax
  0000:3fbb  cmp    word ptr [bp - 0x10e], 0xa
  0000:3fc0  jle    0x3fec
L03fc2:
  0000:3fc2  cmp    word ptr [bp - 0x110], 0x12
  0000:3fc7  jle    0x3fec
  0000:3fc9  cmp    word ptr [bp - 0x10e], 0x1c
  0000:3fce  jl     0x3fe2
  0000:3fd0  mov    ax, word ptr [bp - 0x10e]
  0000:3fd4  sub    ax, 0x12
  0000:3fd7  mov    word ptr [bp - 0x10e], ax
  0000:3fdb  sub    word ptr [bp - 0x110], 0x12
  0000:3fe0  jmp    0x3fea
L03fe2:
  0000:3fe2  mov    word ptr [bp - 0x10e], 0xa
  0000:3fe8  jmp    0x3fec
L03fea:
  0000:3fea  jmp    0x3fc2
L03fec:
  0000:3fec  mov    ax, word ptr [g3956]
  0000:3fef  add    ax, 4
  0000:3ff2  cmp    ax, 0x12
  0000:3ff5  jle    0x4042
  0000:3ff7  mov    ax, word ptr [g3956]
  0000:3ffa  add    ax, 4
  0000:3ffd  cdq    
  0000:3ffe  mov    cx, 0x12
  0000:4001  idiv   cx
  0000:4003  mov    bx, ax
  0000:4005  mov    ax, word ptr [bp - 0x10e]
  0000:4009  cdq    
  0000:400a  mov    cx, 0x12
  0000:400d  idiv   cx
  0000:400f  cmp    ax, bx
  0000:4011  jge    0x4042
  0000:4013  mov    di, 0x2dec    ; "^2Из-за твоей хорошей ловкости враг сможет пнуть тебя раз # вместо #"
  0000:4016  push   cs
  0000:4017  push   di
  0000:4018  mov    ax, word ptr [bp - 0x10e]
  0000:401c  dec    ax
  0000:401d  cdq    
  0000:401e  mov    cx, 0x12
  0000:4021  idiv   cx
  0000:4023  inc    ax
  0000:4024  push   ax
  0000:4025  mov    ax, word ptr [g3956]
  0000:4028  add    ax, 4
  0000:402b  dec    ax
  0000:402c  cdq    
  0000:402d  mov    cx, 0x12
  0000:4030  idiv   cx
  0000:4032  inc    ax
  0000:4033  push   ax
  0000:4034  xor    ax, ax
  0000:4036  push   ax
  0000:4037  xor    ax, ax
  0000:4039  push   ax
  0000:403a  xor    ax, ax
  0000:403c  push   ax
  0000:403d  lcall  U2:0eed:01c2 PrintLn
L04042:
  0000:4042  mov    ax, word ptr [bp - 0x10e]
  0000:4046  mov    word ptr [bp - 0x116], ax
  0000:404a  mov    ax, word ptr [g38a0]
  0000:404d  add    ax, 4
  0000:4050  mov    word ptr [bp - 0x10e], ax
  0000:4054  mov    ax, word ptr [g3956]
  0000:4057  add    ax, 4
  0000:405a  mov    word ptr [bp - 0x110], ax
  0000:405e  cmp    word ptr [bp - 0x10e], 0xa
  0000:4063  jle    0x408f
L04065:
  0000:4065  cmp    word ptr [bp - 0x110], 0x12
  0000:406a  jle    0x408f
  0000:406c  cmp    word ptr [bp - 0x10e], 0x1c
  0000:4071  jl     0x4085
  0000:4073  mov    ax, word ptr [bp - 0x10e]
  0000:4077  sub    ax, 0x12
  0000:407a  mov    word ptr [bp - 0x10e], ax
  0000:407e  sub    word ptr [bp - 0x110], 0x12
  0000:4083  jmp    0x408d
L04085:
  0000:4085  mov    word ptr [bp - 0x10e], 0xa
  0000:408b  jmp    0x408f
L0408d:
  0000:408d  jmp    0x4065
L0408f:
  0000:408f  mov    ax, word ptr [g38a0]
  0000:4092  add    ax, 4
  0000:4095  cmp    ax, 0x12
  0000:4098  jle    0x40e5
  0000:409a  mov    ax, word ptr [g38a0]
  0000:409d  add    ax, 4
  0000:40a0  cdq    
  0000:40a1  mov    cx, 0x12
  0000:40a4  idiv   cx
  0000:40a6  mov    bx, ax
  0000:40a8  mov    ax, word ptr [bp - 0x10e]
  0000:40ac  cdq    
  0000:40ad  mov    cx, 0x12
  0000:40b0  idiv   cx
  0000:40b2  cmp    ax, bx
  0000:40b4  jge    0x40e5
  0000:40b6  mov    di, 0x2e31    ; "^4Из-за хорошей ловкости врага ты сможешь пнуть его раз # вместо #"
  0000:40b9  push   cs
  0000:40ba  push   di
  0000:40bb  mov    ax, word ptr [bp - 0x10e]
  0000:40bf  dec    ax
  0000:40c0  cdq    
  0000:40c1  mov    cx, 0x12
  0000:40c4  idiv   cx
  0000:40c6  inc    ax
  0000:40c7  push   ax
  0000:40c8  mov    ax, word ptr [g38a0]
  0000:40cb  add    ax, 4
  0000:40ce  dec    ax
  0000:40cf  cdq    
  0000:40d0  mov    cx, 0x12
  0000:40d3  idiv   cx
  0000:40d5  inc    ax
  0000:40d6  push   ax
  0000:40d7  xor    ax, ax
  0000:40d9  push   ax
  0000:40da  xor    ax, ax
  0000:40dc  push   ax
  0000:40dd  xor    ax, ax
  0000:40df  push   ax
  0000:40e0  lcall  U2:0eed:01c2 PrintLn
L040e5:
  0000:40e5  mov    ax, word ptr [bp - 0x10e]
  0000:40e9  mov    word ptr [bp - 0x118], ax
  0000:40ed  mov    byte ptr [bp - 0x113], 0
L040f2:
  0000:40f2  cmp    byte ptr [bp - 0x113], 5
  0000:40f7  jae    0x411d
  0000:40f9  inc    byte ptr [bp - 0x113]
  0000:40fd  cmp    byte ptr [bp - 0x113], 5
  0000:4102  jne    0x411d
  0000:4104  mov    di, 0x2e74    ; "^7Начинают собираться зрители"
  0000:4107  push   cs
  0000:4108  push   di
  0000:4109  xor    ax, ax
  0000:410b  push   ax
  0000:410c  xor    ax, ax
  0000:410e  push   ax
  0000:410f  xor    ax, ax
  0000:4111  push   ax
  0000:4112  xor    ax, ax
  0000:4114  push   ax
  0000:4115  xor    ax, ax
  0000:4117  push   ax
  0000:4118  lcall  U2:0eed:01c2 PrintLn
L0411d:
  0000:411d  cmp    byte ptr [g3c83], 0
  0000:4122  je     0x4127
  0000:4124  jmp    0x43f6
L04127:
  0000:4127  cmp    byte ptr [bp - 0x113], 5
  0000:412c  je     0x4131
  0000:412e  jmp    0x43f6
L04131:
  0000:4131  mov    ax, 0xa
  0000:4134  push   ax
  0000:4135  lcall  SYS:0f78:114b Random
  0000:413a  or     ax, ax
  0000:413c  je     0x4141
  0000:413e  jmp    0x43f6
L04141:
  0000:4141  mov    ax, 0x12
  0000:4144  push   ax
  0000:4145  lcall  SYS:0f78:114b Random
  0000:414a  cmp    ax, 0
  0000:414d  jne    0x416b
  0000:414f  mov    di, 0x2e92    ; "Зрители:^6Мочи его, мочи!"
  0000:4152  push   cs
  0000:4153  push   di
  0000:4154  xor    ax, ax
  0000:4156  push   ax
  0000:4157  xor    ax, ax
  0000:4159  push   ax
  0000:415a  xor    ax, ax
  0000:415c  push   ax
  0000:415d  xor    ax, ax
  0000:415f  push   ax
  0000:4160  xor    ax, ax
  0000:4162  push   ax
  0000:4163  lcall  U2:0eed:01c2 PrintLn
  0000:4168  jmp    0x43f6
L0416b:
  0000:416b  cmp    ax, 1
  0000:416e  jne    0x418c
  0000:4170  mov    di, 0x2eac    ; "Зрители:^6Врежь ему!"
  0000:4173  push   cs
  0000:4174  push   di
  0000:4175  xor    ax, ax
  0000:4177  push   ax
  0000:4178  xor    ax, ax
  0000:417a  push   ax
  0000:417b  xor    ax, ax
  0000:417d  push   ax
  0000:417e  xor    ax, ax
  0000:4180  push   ax
  0000:4181  xor    ax, ax
  0000:4183  push   ax
  0000:4184  lcall  U2:0eed:01c2 PrintLn
  0000:4189  jmp    0x43f6
L0418c:
  0000:418c  cmp    ax, 2
  0000:418f  jne    0x41ad
  0000:4191  mov    di, 0x2ec1    ; "Зрители:^6Блин долго ты ещё будешь мудиться?"
  0000:4194  push   cs
  0000:4195  push   di
  0000:4196  xor    ax, ax
  0000:4198  push   ax
  0000:4199  xor    ax, ax
  0000:419b  push   ax
  0000:419c  xor    ax, ax
  0000:419e  push   ax
  0000:419f  xor    ax, ax
  0000:41a1  push   ax
  0000:41a2  xor    ax, ax
  0000:41a4  push   ax
  0000:41a5  lcall  U2:0eed:01c2 PrintLn
  0000:41aa  jmp    0x43f6
L041ad:
  0000:41ad  cmp    ax, 3
  0000:41b0  jne    0x41ce
  0000:41b2  mov    di, 0x2eee    ; "Зрители:^6Да вы только посмотрите на эти пинки!"
  0000:41b5  push   cs
  0000:41b6  push   di
  0000:41b7  xor    ax, ax
  0000:41b9  push   ax
  0000:41ba  xor    ax, ax
  0000:41bc  push   ax
  0000:41bd  xor    ax, ax
  0000:41bf  push   ax
  0000:41c0  xor    ax, ax
  0000:41c2  push   ax
  0000:41c3  xor    ax, ax
  0000:41c5  push   ax
  0000:41c6  lcall  U2:0eed:01c2 PrintLn
  0000:41cb  jmp    0x43f6
L041ce:
  0000:41ce  cmp    ax, 4
  0000:41d1  jne    0x4217
  0000:41d3  lea    di, [bp - 0x218]
  0000:41d7  push   ss
  0000:41d8  push   di
  0000:41d9  mov    di, 0x2f1e    ; "Зрители:^6Не подкачай "
  0000:41dc  push   cs
  0000:41dd  push   di
  0000:41de  lcall  SYS:0f78:0ae7 StrLoad
  0000:41e3  mov    di, word ptr [g389c]
  0000:41e7  mov    cl, 8
  0000:41e9  shl    di, cl
  0000:41eb  add    di, 0x2e
  0000:41ef  push   ds
  0000:41f0  push   di
  0000:41f1  lcall  SYS:0f78:0b66 StrConcat
  0000:41f6  mov    di, 0x2f35    ; ", я на тебя трёшку поставил!"
  0000:41f9  push   cs
  0000:41fa  push   di
  0000:41fb  lcall  SYS:0f78:0b66 StrConcat
  0000:4200  xor    ax, ax
  0000:4202  push   ax
  0000:4203  xor    ax, ax
  0000:4205  push   ax
  0000:4206  xor    ax, ax
  0000:4208  push   ax
  0000:4209  xor    ax, ax
  0000:420b  push   ax
  0000:420c  xor    ax, ax
  0000:420e  push   ax
  0000:420f  lcall  U2:0eed:01c2 PrintLn
  0000:4214  jmp    0x43f6
L04217:
  0000:4217  cmp    ax, 5
  0000:421a  jne    0x4238
  0000:421c  mov    di, 0x2f52    ; "Зрители:^6Чё-тут за батва?"
  0000:421f  push   cs
  0000:4220  push   di
  0000:4221  xor    ax, ax
  0000:4223  push   ax
  0000:4224  xor    ax, ax
  0000:4226  push   ax
  0000:4227  xor    ax, ax
  0000:4229  push   ax
  0000:422a  xor    ax, ax
  0000:422c  push   ax
  0000:422d  xor    ax, ax
  0000:422f  push   ax
  0000:4230  lcall  U2:0eed:01c2 PrintLn
  0000:4235  jmp    0x43f6
L04238:
  0000:4238  cmp    ax, 6
  0000:423b  jne    0x4259
  0000:423d  mov    di, 0x2f6d    ; "Зрители:^6Я знаю вон того мудака, он уже нескольких запинал!"
  0000:4240  push   cs
  0000:4241  push   di
  0000:4242  xor    ax, ax
  0000:4244  push   ax
  0000:4245  xor    ax, ax
  0000:4247  push   ax
  0000:4248  xor    ax, ax
  0000:424a  push   ax
  0000:424b  xor    ax, ax
  0000:424d  push   ax
  0000:424e  xor    ax, ax
  0000:4250  push   ax
  0000:4251  lcall  U2:0eed:01c2 PrintLn
  0000:4256  jmp    0x43f6
L04259:
  0000:4259  cmp    ax, 7
  0000:425c  jne    0x427a
  0000:425e  mov    di, 0x2faa    ; "Зрители:^6Чё так слабо бьёшь?! Пинай сильнее!"
  0000:4261  push   cs
  0000:4262  push   di
  0000:4263  xor    ax, ax
  0000:4265  push   ax
  0000:4266  xor    ax, ax
  0000:4268  push   ax
  0000:4269  xor    ax, ax
  0000:426b  push   ax
  0000:426c  xor    ax, ax
  0000:426e  push   ax
  0000:426f  xor    ax, ax
  0000:4271  push   ax
  0000:4272  lcall  U2:0eed:01c2 PrintLn
  0000:4277  jmp    0x43f6
L0427a:
  0000:427a  cmp    ax, 8
  0000:427d  jne    0x42b4
  0000:427f  mov    di, 0x2fd8    ; "Зрители:^6Дерьмово дерётесь придурки"
  0000:4282  push   cs
  0000:4283  push   di
  0000:4284  xor    ax, ax
  0000:4286  push   ax
  0000:4287  xor    ax, ax
  0000:4289  push   ax
  0000:428a  xor    ax, ax
  0000:428c  push   ax
  0000:428d  xor    ax, ax
  0000:428f  push   ax
  0000:4290  xor    ax, ax
  0000:4292  push   ax
  0000:4293  lcall  U2:0eed:01c2 PrintLn
  0000:4298  mov    di, 0x2ffd    ; "^2А ты: Заткнись мудак, а то щас тебя запинаю!"
  0000:429b  push   cs
  0000:429c  push   di
  0000:429d  xor    ax, ax
  0000:429f  push   ax
  0000:42a0  xor    ax, ax
  0000:42a2  push   ax
  0000:42a3  xor    ax, ax
  0000:42a5  push   ax
  0000:42a6  xor    ax, ax
  0000:42a8  push   ax
  0000:42a9  xor    ax, ax
  0000:42ab  push   ax
  0000:42ac  lcall  U2:0eed:01c2 PrintLn
  0000:42b1  jmp    0x43f6
L042b4:
  0000:42b4  cmp    ax, 9
  0000:42b7  jne    0x42d5
  0000:42b9  mov    di, 0x302c    ; "Зрители:^6Да, а помнишь мы вчера также одного пинали, пинали.. А потом подошла его братва.."
  0000:42bc  push   cs
  0000:42bd  push   di
  0000:42be  xor    ax, ax
  0000:42c0  push   ax
  0000:42c1  xor    ax, ax
  0000:42c3  push   ax
  0000:42c4  xor    ax, ax
  0000:42c6  push   ax
  0000:42c7  xor    ax, ax
  0000:42c9  push   ax
  0000:42ca  xor    ax, ax
  0000:42cc  push   ax
  0000:42cd  lcall  U2:0eed:01c2 PrintLn
  0000:42d2  jmp    0x43f6
L042d5:
  0000:42d5  cmp    ax, 0xa
  0000:42d8  jne    0x42f6
  0000:42da  mov    di, 0x3088    ; "Зрители:^6Это чё реслинг?"
  0000:42dd  push   cs
  0000:42de  push   di
  0000:42df  xor    ax, ax
  0000:42e1  push   ax
  0000:42e2  xor    ax, ax
  0000:42e4  push   ax
  0000:42e5  xor    ax, ax
  0000:42e7  push   ax
  0000:42e8  xor    ax, ax
  0000:42ea  push   ax
  0000:42eb  xor    ax, ax
  0000:42ed  push   ax
  0000:42ee  lcall  U2:0eed:01c2 PrintLn
  0000:42f3  jmp    0x43f6
L042f6:
  0000:42f6  cmp    ax, 0xb
  0000:42f9  jne    0x4317
  0000:42fb  mov    di, 0x30a2    ; "Зрители:^6Двинь ему в рыло!"
  0000:42fe  push   cs
  0000:42ff  push   di
  0000:4300  xor    ax, ax
  0000:4302  push   ax
  0000:4303  xor    ax, ax
  0000:4305  push   ax
  0000:4306  xor    ax, ax
  0000:4308  push   ax
  0000:4309  xor    ax, ax
  0000:430b  push   ax
  0000:430c  xor    ax, ax
  0000:430e  push   ax
  0000:430f  lcall  U2:0eed:01c2 PrintLn
  0000:4314  jmp    0x43f6
L04317:
  0000:4317  cmp    ax, 0xc
  0000:431a  jne    0x4338
  0000:431c  mov    di, 0x30be    ; "Зрители:^6И куда менты смотрят?"
  0000:431f  push   cs
  0000:4320  push   di
  0000:4321  xor    ax, ax
  0000:4323  push   ax
  0000:4324  xor    ax, ax
  0000:4326  push   ax
  0000:4327  xor    ax, ax
  0000:4329  push   ax
  0000:432a  xor    ax, ax
  0000:432c  push   ax
  0000:432d  xor    ax, ax
  0000:432f  push   ax
  0000:4330  lcall  U2:0eed:01c2 PrintLn
  0000:4335  jmp    0x43f6
L04338:
  0000:4338  cmp    ax, 0xd
  0000:433b  jne    0x4359
  0000:433d  mov    di, 0x30de    ; "Зрители:^6Пинай!"
  0000:4340  push   cs
  0000:4341  push   di
  0000:4342  xor    ax, ax
  0000:4344  push   ax
  0000:4345  xor    ax, ax
  0000:4347  push   ax
  0000:4348  xor    ax, ax
  0000:434a  push   ax
  0000:434b  xor    ax, ax
  0000:434d  push   ax
  0000:434e  xor    ax, ax
  0000:4350  push   ax
  0000:4351  lcall  U2:0eed:01c2 PrintLn
  0000:4356  jmp    0x43f6
L04359:
  0000:4359  cmp    ax, 0xe
  0000:435c  jne    0x4379
  0000:435e  mov    di, 0x30ef    ; "Зрители:^6Врежь гаду!"
  0000:4361  push   cs
  0000:4362  push   di
  0000:4363  xor    ax, ax
  0000:4365  push   ax
  0000:4366  xor    ax, ax
  0000:4368  push   ax
  0000:4369  xor    ax, ax
  0000:436b  push   ax
  0000:436c  xor    ax, ax
  0000:436e  push   ax
  0000:436f  xor    ax, ax
  0000:4371  push   ax
  0000:4372  lcall  U2:0eed:01c2 PrintLn
  0000:4377  jmp    0x43f6
L04379:
  0000:4379  cmp    ax, 0xf
  0000:437c  jne    0x4399
  0000:437e  mov    di, 0x3105    ; "Зрители:^6Господа делайте ваши ставки!"
  0000:4381  push   cs
  0000:4382  push   di
  0000:4383  xor    ax, ax
  0000:4385  push   ax
  0000:4386  xor    ax, ax
  0000:4388  push   ax
  0000:4389  xor    ax, ax
  0000:438b  push   ax
  0000:438c  xor    ax, ax
  0000:438e  push   ax
  0000:438f  xor    ax, ax
  0000:4391  push   ax
  0000:4392  lcall  U2:0eed:01c2 PrintLn
  0000:4397  jmp    0x43f6
L04399:
  0000:4399  cmp    ax, 0x10
  0000:439c  jne    0x43b9
  0000:439e  mov    di, 0x312c    ; "Зрители:^6Ну чё там? Какой счет?"
  0000:43a1  push   cs
  0000:43a2  push   di
  0000:43a3  xor    ax, ax
  0000:43a5  push   ax
  0000:43a6  xor    ax, ax
  0000:43a8  push   ax
  0000:43a9  xor    ax, ax
  0000:43ab  push   ax
  0000:43ac  xor    ax, ax
  0000:43ae  push   ax
  0000:43af  xor    ax, ax
  0000:43b1  push   ax
  0000:43b2  lcall  U2:0eed:01c2 PrintLn
  0000:43b7  jmp    0x43f6
L043b9:
  0000:43b9  cmp    ax, 0x11
  0000:43bc  jne    0x43f6
  0000:43be  lea    di, [bp - 0x218]
  0000:43c2  push   ss
  0000:43c3  push   di
  0000:43c4  mov    di, 0x314d    ; "Зрители:^6Ну и кого там "
  0000:43c7  push   cs
  0000:43c8  push   di
  0000:43c9  lcall  SYS:0f78:0ae7 StrLoad
  0000:43ce  mov    di, 0x379c
  0000:43d1  push   ds
  0000:43d2  push   di
  0000:43d3  lcall  SYS:0f78:0b66 StrConcat
  0000:43d8  mov    di, 0x3166    ; " ^6сегодня пинает?"
  0000:43db  push   cs
  0000:43dc  push   di
  0000:43dd  lcall  SYS:0f78:0b66 StrConcat
  0000:43e2  xor    ax, ax
  0000:43e4  push   ax
  0000:43e5  xor    ax, ax
  0000:43e7  push   ax
  0000:43e8  xor    ax, ax
  0000:43ea  push   ax
  0000:43eb  xor    ax, ax
  0000:43ed  push   ax
  0000:43ee  xor    ax, ax
  0000:43f0  push   ax
  0000:43f1  lcall  U2:0eed:01c2 PrintLn
L043f6:
  0000:43f6  mov    di, 0x3179    ; "^0Битва\"
  0000:43f9  push   cs
  0000:43fa  push   di
  0000:43fb  xor    ax, ax
  0000:43fd  push   ax
  0000:43fe  xor    ax, ax
  0000:4400  push   ax
  0000:4401  xor    ax, ax
  0000:4403  push   ax
  0000:4404  xor    ax, ax
  0000:4406  push   ax
  0000:4407  xor    ax, ax
  0000:4409  push   ax
  0000:440a  lcall  U2:0eed:0000 Print
  0000:440f  mov    di, 0x3ecc
  0000:4412  push   ds
  0000:4413  push   di
  0000:4414  mov    di, 0x3a72
  0000:4417  push   ds
  0000:4418  push   di
  0000:4419  mov    ax, 0xff
  0000:441c  push   ax
  0000:441d  lcall  SYS:0f78:06c6 ReadStr
  0000:4422  lcall  SYS:0f78:059d ReadLnEnd
  0000:4427  lcall  SYS:0f78:0291 IOCheck
  0000:442c  mov    di, 0x3a72
  0000:442f  push   ds
  0000:4430  push   di
  0000:4431  lcall  U2:0eed:0216 LowerCase
  0000:4436  mov    di, 0x3a72
  0000:4439  push   ds
  0000:443a  push   di
  0000:443b  mov    di, 0x3182    ; "k"
  0000:443e  push   cs
  0000:443f  push   di
  0000:4440  lcall  SYS:0f78:0bd8 StrCmp
  0000:4445  je     0x444a
  0000:4447  jmp    0x48d7
L0444a:
  0000:444a  mov    ax, word ptr [g38a0]
  0000:444d  add    ax, 4
  0000:4450  mov    word ptr [bp - 0x10e], ax
  0000:4454  mov    ax, word ptr [bp - 0x118]
  0000:4458  mov    word ptr [bp - 0x10e], ax
L0445c:
  0000:445c  mov    ax, 0x64
  0000:445f  push   ax
  0000:4460  lcall  SYS:0f78:114b Random
  0000:4465  inc    ax
  0000:4466  mov    word ptr [bp - 0x112], ax
  0000:446a  mov    ax, word ptr [bp - 0x10e]
  0000:446e  mov    si, ax
  0000:4470  shl    ax, 1
  0000:4472  shl    ax, 1
  0000:4474  add    ax, si
  0000:4476  cmp    ax, word ptr [bp - 0x112]
  0000:447a  jge    0x447f
  0000:447c  jmp    0x460b
L0447f:
  0000:447f  cmp    word ptr [bp - 0x112], 0x5a
  0000:4484  jle    0x4489
  0000:4486  jmp    0x460b
L04489:
  0000:4489  mov    ax, word ptr [g3962]
  0000:448c  mov    word ptr [bp - 4], ax
  0000:448f  mov    ax, word ptr [g38aa]
  0000:4492  sub    ax, word ptr [g38a8]
  0000:4496  push   ax
  0000:4497  lcall  SYS:0f78:114b Random
  0000:449c  xor    dx, dx
  0000:449e  mov    cx, ax
  0000:44a0  mov    bx, dx
  0000:44a2  mov    ax, word ptr [g38a8]
  0000:44a5  cdq    
  0000:44a6  add    ax, cx
  0000:44a8  adc    dx, bx
  0000:44aa  add    ax, 1
  0000:44ad  adc    dx, 0
  0000:44b0  mov    word ptr [bp - 0x10c], ax
  0000:44b4  mov    ax, 0x64
  0000:44b7  push   ax
  0000:44b8  lcall  SYS:0f78:114b Random
  0000:44bd  inc    ax
  0000:44be  xor    dx, dx
  0000:44c0  mov    cx, ax
  0000:44c2  mov    bx, dx
  0000:44c4  mov    ax, word ptr [g38a4]
  0000:44c7  mov    si, ax
  0000:44c9  shl    ax, 1
  0000:44cb  add    ax, si
  0000:44cd  cdq    
  0000:44ce  cmp    dx, bx
  0000:44d0  jg     0x44d8
  0000:44d2  jl     0x4546
  0000:44d4  cmp    ax, cx
  0000:44d6  jbe    0x4546
L044d8:
  0000:44d8  mov    ax, word ptr [g38aa]
  0000:44db  add    word ptr [bp - 0x10c], ax
  0000:44df  mov    ax, 3
  0000:44e2  push   ax
  0000:44e3  lcall  SYS:0f78:114b Random
  0000:44e8  cmp    ax, 0
  0000:44eb  jne    0x4508
  0000:44ed  mov    di, 0x3184    ; "^2Точный удар!!!"
  0000:44f0  push   cs
  0000:44f1  push   di
  0000:44f2  xor    ax, ax
  0000:44f4  push   ax
  0000:44f5  xor    ax, ax
  0000:44f7  push   ax
  0000:44f8  xor    ax, ax
  0000:44fa  push   ax
  0000:44fb  xor    ax, ax
  0000:44fd  push   ax
  0000:44fe  xor    ax, ax
  0000:4500  push   ax
  0000:4501  lcall  U2:0eed:01c2 PrintLn
  0000:4506  jmp    0x4546
L04508:
  0000:4508  cmp    ax, 1
  0000:450b  jne    0x4528
  0000:450d  mov    di, 0x3195    ; "^2Не хило приложил!!!"
  0000:4510  push   cs
  0000:4511  push   di
  0000:4512  xor    ax, ax
  0000:4514  push   ax
  0000:4515  xor    ax, ax
  0000:4517  push   ax
  0000:4518  xor    ax, ax
  0000:451a  push   ax
  0000:451b  xor    ax, ax
  0000:451d  push   ax
  0000:451e  xor    ax, ax
  0000:4520  push   ax
  0000:4521  lcall  U2:0eed:01c2 PrintLn
  0000:4526  jmp    0x4546
L04528:
  0000:4528  cmp    ax, 2
  0000:452b  jne    0x4546
  0000:452d  mov    di, 0x31ab    ; "^2Двойной урон!!!"
  0000:4530  push   cs
  0000:4531  push   di
  0000:4532  xor    ax, ax
  0000:4534  push   ax
  0000:4535  xor    ax, ax
  0000:4537  push   ax
  0000:4538  xor    ax, ax
  0000:453a  push   ax
  0000:453b  xor    ax, ax
  0000:453d  push   ax
  0000:453e  xor    ax, ax
  0000:4540  push   ax
  0000:4541  lcall  U2:0eed:01c2 PrintLn
L04546:
  0000:4546  mov    al, byte ptr [g3968]
  0000:4549  xor    ah, ah
  0000:454b  sub    word ptr [bp - 0x10c], ax
  0000:454f  cmp    word ptr [bp - 0x10c], 0
  0000:4554  jge    0x455c
  0000:4556  xor    ax, ax
  0000:4558  mov    word ptr [bp - 0x10c], ax
L0455c:
  0000:455c  mov    ax, word ptr [bp - 0x10c]
  0000:4560  sub    word ptr [g3962], ax
  0000:4564  mov    ax, word ptr [g395a]
  0000:4567  mov    si, ax
  0000:4569  shl    ax, 1
  0000:456b  add    ax, si
  0000:456d  add    ax, 0xc8
  0000:4570  push   ax
  0000:4571  lcall  SYS:0f78:114b Random
  0000:4576  inc    ax
  0000:4577  xor    dx, dx
  0000:4579  mov    cx, ax
  0000:457b  mov    bx, dx
  0000:457d  mov    ax, word ptr [g38a4]
  0000:4580  mov    si, ax
  0000:4582  shl    ax, 1
  0000:4584  add    ax, si
  0000:4586  cdq    
  0000:4587  cmp    dx, bx
  0000:4589  jg     0x4591
  0000:458b  jl     0x45ea
  0000:458d  cmp    ax, cx
  0000:458f  jbe    0x45ea
L04591:
  0000:4591  mov    ax, 2
  0000:4594  push   ax
  0000:4595  lcall  SYS:0f78:114b Random
  0000:459a  or     ax, ax
  0000:459c  jne    0x45c5
  0000:459e  cmp    byte ptr [g3966], 0
  0000:45a3  jne    0x45c3
  0000:45a5  mov    di, 0x31bd    ; "^2Ты сломал врагу челюсть. ^4Враг: А! козёл!"
  0000:45a8  push   cs
  0000:45a9  push   di
  0000:45aa  xor    ax, ax
  0000:45ac  push   ax
  0000:45ad  xor    ax, ax
  0000:45af  push   ax
  0000:45b0  xor    ax, ax
  0000:45b2  push   ax
  0000:45b3  xor    ax, ax
  0000:45b5  push   ax
  0000:45b6  xor    ax, ax
  0000:45b8  push   ax
  0000:45b9  lcall  U2:0eed:01c2 PrintLn
  0000:45be  mov    byte ptr [g3966], 1
L045c3:
  0000:45c3  jmp    0x45ea
L045c5:
  0000:45c5  cmp    byte ptr [g3967], 0
  0000:45ca  jne    0x45ea
  0000:45cc  mov    di, 0x31ea    ; "^2Ты сломал врагу ногу. ^4Враг: Ну что за урод!"
  0000:45cf  push   cs
  0000:45d0  push   di
  0000:45d1  xor    ax, ax
  0000:45d3  push   ax
  0000:45d4  xor    ax, ax
  0000:45d6  push   ax
  0000:45d7  xor    ax, ax
  0000:45d9  push   ax
  0000:45da  xor    ax, ax
  0000:45dc  push   ax
  0000:45dd  xor    ax, ax
  0000:45df  push   ax
  0000:45e0  lcall  U2:0eed:01c2 PrintLn
  0000:45e5  mov    byte ptr [g3967], 1
L045ea:
  0000:45ea  mov    di, 0x321a    ; "^2Ты пнул врага на #з. У него осталось #"
  0000:45ed  push   cs
  0000:45ee  push   di
  0000:45ef  mov    ax, word ptr [bp - 4]
  0000:45f2  sub    ax, word ptr [g3962]
  0000:45f6  push   ax
  0000:45f7  push   word ptr [g3962]
  0000:45fb  xor    ax, ax
  0000:45fd  push   ax
  0000:45fe  xor    ax, ax
  0000:4600  push   ax
  0000:4601  xor    ax, ax
  0000:4603  push   ax
  0000:4604  lcall  U2:0eed:01c2 PrintLn
  0000:4609  jmp    0x4624
L0460b:
  0000:460b  mov    di, 0x3243    ; "^4Ты промазал"
  0000:460e  push   cs
  0000:460f  push   di
  0000:4610  xor    ax, ax
  0000:4612  push   ax
  0000:4613  xor    ax, ax
  0000:4615  push   ax
  0000:4616  xor    ax, ax
  0000:4618  push   ax
  0000:4619  xor    ax, ax
  0000:461b  push   ax
  0000:461c  xor    ax, ax
  0000:461e  push   ax
  0000:461f  lcall  U2:0eed:01c2 PrintLn
L04624:
  0000:4624  sub    word ptr [bp - 0x10e], 0x12
  0000:4629  cmp    word ptr [g3962], 0
  0000:462e  jg     0x4632
  0000:4630  jmp    0x4663
L04632:
  0000:4632  cmp    word ptr [bp - 0x10e], 0
  0000:4637  jle    0x4652
  0000:4639  mov    di, 0x3251    ; "^2Из-за большой ловкости ты можешь пнуть ещё раз"
  0000:463c  push   cs
  0000:463d  push   di
  0000:463e  xor    ax, ax
  0000:4640  push   ax
  0000:4641  xor    ax, ax
  0000:4643  push   ax
  0000:4644  xor    ax, ax
  0000:4646  push   ax
  0000:4647  xor    ax, ax
  0000:4649  push   ax
  0000:464a  xor    ax, ax
  0000:464c  push   ax
  0000:464d  lcall  U2:0eed:01c2 PrintLn
L04652:
  0000:4652  cmp    word ptr [bp - 0x10e], 0
  0000:4657  jle    0x4663
  0000:4659  cmp    word ptr [g3962], 0
  0000:465e  jl     0x4663
  0000:4660  jmp    0x445c
L04663:
  0000:4663  mov    ax, word ptr [g3956]
  0000:4666  add    ax, 4
  0000:4669  mov    word ptr [bp - 0x10e], ax
  0000:466d  mov    ax, word ptr [bp - 0x116]
  0000:4671  mov    word ptr [bp - 0x10e], ax
  0000:4675  cmp    word ptr [g3962], 0
  0000:467a  jg     0x467f
  0000:467c  jmp    0x48d7
L0467f:
  0000:467f  mov    ax, 0x64
  0000:4682  push   ax
  0000:4683  lcall  SYS:0f78:114b Random
  0000:4688  inc    ax
  0000:4689  mov    word ptr [bp - 0x112], ax
  0000:468d  mov    ax, word ptr [bp - 0x10e]
  0000:4691  mov    si, ax
  0000:4693  shl    ax, 1
  0000:4695  shl    ax, 1
  0000:4697  add    ax, si
  0000:4699  cmp    ax, word ptr [bp - 0x112]
  0000:469d  jge    0x46a2
  0000:469f  jmp    0x4888
L046a2:
  0000:46a2  cmp    word ptr [bp - 0x112], 0x5a
  0000:46a7  jle    0x46ac
  0000:46a9  jmp    0x4888
L046ac:
  0000:46ac  mov    ax, word ptr [g38ac]
  0000:46af  mov    word ptr [bp - 4], ax
  0000:46b2  mov    ax, word ptr [g3960]
  0000:46b5  sub    ax, word ptr [g395e]
  0000:46b9  push   ax
  0000:46ba  lcall  SYS:0f78:114b Random
  0000:46bf  xor    dx, dx
  0000:46c1  mov    cx, ax
  0000:46c3  mov    bx, dx
  0000:46c5  mov    ax, word ptr [g395e]
  0000:46c8  cdq    
  0000:46c9  add    ax, cx
  0000:46cb  adc    dx, bx
  0000:46cd  add    ax, 1
  0000:46d0  adc    dx, 0
  0000:46d3  mov    word ptr [bp - 0x10c], ax
  0000:46d7  mov    ax, 0x64
  0000:46da  push   ax
  0000:46db  lcall  SYS:0f78:114b Random
  0000:46e0  inc    ax
  0000:46e1  xor    dx, dx
  0000:46e3  mov    cx, ax
  0000:46e5  mov    bx, dx
  0000:46e7  mov    ax, word ptr [g395a]
  0000:46ea  mov    si, ax
  0000:46ec  shl    ax, 1
  0000:46ee  add    ax, si
  0000:46f0  cdq    
  0000:46f1  cmp    dx, bx
  0000:46f3  jg     0x46fb
  0000:46f5  jl     0x4769
  0000:46f7  cmp    ax, cx
  0000:46f9  jbe    0x4769
L046fb:
  0000:46fb  mov    ax, word ptr [g3960]
  0000:46fe  add    word ptr [bp - 0x10c], ax
  0000:4702  mov    ax, 3
  0000:4705  push   ax
  0000:4706  lcall  SYS:0f78:114b Random
  0000:470b  cmp    ax, 0
  0000:470e  jne    0x472b
  0000:4710  mov    di, 0x3282    ; "^4Враг:Сдохни урод!!"
  0000:4713  push   cs
  0000:4714  push   di
  0000:4715  xor    ax, ax
  0000:4717  push   ax
  0000:4718  xor    ax, ax
  0000:471a  push   ax
  0000:471b  xor    ax, ax
  0000:471d  push   ax
  0000:471e  xor    ax, ax
  0000:4720  push   ax
  0000:4721  xor    ax, ax
  0000:4723  push   ax
  0000:4724  lcall  U2:0eed:01c2 PrintLn
  0000:4729  jmp    0x4769
L0472b:
  0000:472b  cmp    ax, 1
  0000:472e  jne    0x474b
  0000:4730  mov    di, 0x3297    ; "^4Тебе не хило врезали!"
  0000:4733  push   cs
  0000:4734  push   di
  0000:4735  xor    ax, ax
  0000:4737  push   ax
  0000:4738  xor    ax, ax
  0000:473a  push   ax
  0000:473b  xor    ax, ax
  0000:473d  push   ax
  0000:473e  xor    ax, ax
  0000:4740  push   ax
  0000:4741  xor    ax, ax
  0000:4743  push   ax
  0000:4744  lcall  U2:0eed:01c2 PrintLn
  0000:4749  jmp    0x4769
L0474b:
  0000:474b  cmp    ax, 2
  0000:474e  jne    0x4769
  0000:4750  mov    di, 0x32af    ; "^4Враг:Получи гнида!!"
  0000:4753  push   cs
  0000:4754  push   di
  0000:4755  xor    ax, ax
  0000:4757  push   ax
  0000:4758  xor    ax, ax
  0000:475a  push   ax
  0000:475b  xor    ax, ax
  0000:475d  push   ax
  0000:475e  xor    ax, ax
  0000:4760  push   ax
  0000:4761  xor    ax, ax
  0000:4763  push   ax
  0000:4764  lcall  U2:0eed:01c2 PrintLn
L04769:
  0000:4769  mov    al, byte ptr [g38b2]
  0000:476c  xor    ah, ah
  0000:476e  sub    word ptr [bp - 0x10c], ax
  0000:4772  cmp    word ptr [bp - 0x10c], 0
  0000:4777  jge    0x477f
  0000:4779  xor    ax, ax
  0000:477b  mov    word ptr [bp - 0x10c], ax
L0477f:
  0000:477f  mov    ax, word ptr [bp - 0x10c]
  0000:4783  sub    word ptr [g38ac], ax
  0000:4787  mov    ax, word ptr [g38a4]
  0000:478a  mov    si, ax
  0000:478c  shl    ax, 1
  0000:478e  add    ax, si
  0000:4790  add    ax, 0xc8
  0000:4793  push   ax
  0000:4794  lcall  SYS:0f78:114b Random
  0000:4799  inc    ax
  0000:479a  xor    dx, dx
  0000:479c  mov    cx, ax
  0000:479e  mov    bx, dx
  0000:47a0  mov    ax, word ptr [g395a]
  0000:47a3  mov    si, ax
  0000:47a5  shl    ax, 1
  0000:47a7  add    ax, si
  0000:47a9  cdq    
  0000:47aa  cmp    dx, bx
  0000:47ac  jg     0x47ba
  0000:47ae  jge    0x47b3
  0000:47b0  jmp    0x4867
L047b3:
  0000:47b3  cmp    ax, cx
  0000:47b5  ja     0x47ba
  0000:47b7  jmp    0x4867
L047ba:
  0000:47ba  mov    ax, 2
  0000:47bd  push   ax
  0000:47be  lcall  SYS:0f78:114b Random
  0000:47c3  or     ax, ax
  0000:47c5  jne    0x4842
  0000:47c7  cmp    byte ptr [g38b0], 0
  0000:47cc  jne    0x4840
  0000:47ce  cmp    byte ptr [g394a], 0
  0000:47d3  jne    0x47f3
  0000:47d5  mov    di, 0x32c5    ; "^4Враг сломал тебе челюсть."
  0000:47d8  push   cs
  0000:47d9  push   di
  0000:47da  xor    ax, ax
  0000:47dc  push   ax
  0000:47dd  xor    ax, ax
  0000:47df  push   ax
  0000:47e0  xor    ax, ax
  0000:47e2  push   ax
  0000:47e3  xor    ax, ax
  0000:47e5  push   ax
  0000:47e6  xor    ax, ax
  0000:47e8  push   ax
  0000:47e9  lcall  U2:0eed:01c2 PrintLn
  0000:47ee  mov    byte ptr [g38b0], 1
L047f3:
  0000:47f3  cmp    byte ptr [g394a], 0
  0000:47f8  je     0x4840
  0000:47fa  mov    ax, 4
  0000:47fd  push   ax
  0000:47fe  lcall  SYS:0f78:114b Random
  0000:4803  or     ax, ax
  0000:4805  jne    0x4827
  0000:4807  mov    di, 0x32e1    ; "^4Враг сломал тебе челюсть, даже защита не помогла."
  0000:480a  push   cs
  0000:480b  push   di
  0000:480c  xor    ax, ax
  0000:480e  push   ax
  0000:480f  xor    ax, ax
  0000:4811  push   ax
  0000:4812  xor    ax, ax
  0000:4814  push   ax
  0000:4815  xor    ax, ax
  0000:4817  push   ax
  0000:4818  xor    ax, ax
  0000:481a  push   ax
  0000:481b  lcall  U2:0eed:01c2 PrintLn
  0000:4820  mov    byte ptr [g38b0], 1
  0000:4825  jmp    0x4840
L04827:
  0000:4827  mov    di, 0x3315    ; "^2Защита спасла твои кривые клыки."
  0000:482a  push   cs
  0000:482b  push   di
  0000:482c  xor    ax, ax
  0000:482e  push   ax
  0000:482f  xor    ax, ax
  0000:4831  push   ax
  0000:4832  xor    ax, ax
  0000:4834  push   ax
  0000:4835  xor    ax, ax
  0000:4837  push   ax
  0000:4838  xor    ax, ax
  0000:483a  push   ax
  0000:483b  lcall  U2:0eed:01c2 PrintLn
L04840:
  0000:4840  jmp    0x4867
L04842:
  0000:4842  cmp    byte ptr [g38b1], 0
  0000:4847  jne    0x4867
  0000:4849  mov    di, 0x3338    ; "^4Враг сломал тебе ногу."
  0000:484c  push   cs
  0000:484d  push   di
  0000:484e  xor    ax, ax
  0000:4850  push   ax
  0000:4851  xor    ax, ax
  0000:4853  push   ax
  0000:4854  xor    ax, ax
  0000:4856  push   ax
  0000:4857  xor    ax, ax
  0000:4859  push   ax
  0000:485a  xor    ax, ax
  0000:485c  push   ax
  0000:485d  lcall  U2:0eed:01c2 PrintLn
  0000:4862  mov    byte ptr [g38b1], 1
L04867:
  0000:4867  mov    di, 0x3351    ; "^4Он пнул тебя на #з. У тебя осталось #"
  0000:486a  push   cs
  0000:486b  push   di
  0000:486c  mov    ax, word ptr [bp - 4]
  0000:486f  sub    ax, word ptr [g38ac]
  0000:4873  push   ax
  0000:4874  push   word ptr [g38ac]
  0000:4878  xor    ax, ax
  0000:487a  push   ax
  0000:487b  xor    ax, ax
  0000:487d  push   ax
  0000:487e  xor    ax, ax
  0000:4880  push   ax
  0000:4881  lcall  U2:0eed:01c2 PrintLn
  0000:4886  jmp    0x48a1
L04888:
  0000:4888  mov    di, 0x3379    ; "^2Враг промазал"
  0000:488b  push   cs
  0000:488c  push   di
  0000:488d  xor    ax, ax
  0000:488f  push   ax
  0000:4890  xor    ax, ax
  0000:4892  push   ax
  0000:4893  xor    ax, ax
  0000:4895  push   ax
  0000:4896  xor    ax, ax
  0000:4898  push   ax
  0000:4899  xor    ax, ax
  0000:489b  push   ax
  0000:489c  lcall  U2:0eed:01c2 PrintLn
L048a1:
  0000:48a1  sub    word ptr [bp - 0x10e], 0x12
  0000:48a6  cmp    word ptr [bp - 0x10e], 0
  0000:48ab  jle    0x48c6
  0000:48ad  mov    di, 0x3389    ; "^4Из-за большой ловкости враг может пнуть ещё раз"
  0000:48b0  push   cs
  0000:48b1  push   di
  0000:48b2  xor    ax, ax
  0000:48b4  push   ax
  0000:48b5  xor    ax, ax
  0000:48b7  push   ax
  0000:48b8  xor    ax, ax
  0000:48ba  push   ax
  0000:48bb  xor    ax, ax
  0000:48bd  push   ax
  0000:48be  xor    ax, ax
  0000:48c0  push   ax
  0000:48c1  lcall  U2:0eed:01c2 PrintLn
L048c6:
  0000:48c6  cmp    word ptr [bp - 0x10e], 0
  0000:48cb  jle    0x48d7
  0000:48cd  cmp    word ptr [g38ac], 0
  0000:48d2  jl     0x48d7
  0000:48d4  jmp    0x467f
L048d7:
  0000:48d7  mov    di, 0x3a72
  0000:48da  push   ds
  0000:48db  push   di
  0000:48dc  mov    di, 0x33bb    ; "run"
  0000:48df  push   cs
  0000:48e0  push   di
  0000:48e1  lcall  SYS:0f78:0bd8 StrCmp
  0000:48e6  je     0x48eb
  0000:48e8  jmp    0x4afb
L048eb:
  0000:48eb  cmp    byte ptr [g3c83], 1
  0000:48f0  jne    0x490e
  0000:48f2  mov    di, 0x33bf    ; "^4Ректор: Кудa? Стоять! Бейся до конца трусливый урод!"
  0000:48f5  push   cs
  0000:48f6  push   di
  0000:48f7  xor    ax, ax
  0000:48f9  push   ax
  0000:48fa  xor    ax, ax
  0000:48fc  push   ax
  0000:48fd  xor    ax, ax
  0000:48ff  push   ax
  0000:4900  xor    ax, ax
  0000:4902  push   ax
  0000:4903  xor    ax, ax
  0000:4905  push   ax
  0000:4906  lcall  U2:0eed:01c2 PrintLn
  0000:490b  jmp    0x4afb
L0490e:
  0000:490e  cmp    byte ptr [g38b1], 1
  0000:4913  jne    0x4931
  0000:4915  mov    di, 0x33f6    ; "^4Ты не можешь убежать на сломаной ноге."
  0000:4918  push   cs
  0000:4919  push   di
  0000:491a  xor    ax, ax
  0000:491c  push   ax
  0000:491d  xor    ax, ax
  0000:491f  push   ax
  0000:4920  xor    ax, ax
  0000:4922  push   ax
  0000:4923  xor    ax, ax
  0000:4925  push   ax
  0000:4926  xor    ax, ax
  0000:4928  push   ax
  0000:4929  lcall  U2:0eed:01c2 PrintLn
  0000:492e  jmp    0x4afb
L04931:
  0000:4931  cmp    word ptr [g38a6], 0
  0000:4936  jg     0x493b
  0000:4938  jmp    0x4ade
L0493b:
  0000:493b  mov    di, 0x341f    ; "^4Враг: Трусливый засранец! "
  0000:493e  push   cs
  0000:493f  push   di
  0000:4940  xor    ax, ax
  0000:4942  push   ax
  0000:4943  xor    ax, ax
  0000:4945  push   ax
  0000:4946  xor    ax, ax
  0000:4948  push   ax
  0000:4949  xor    ax, ax
  0000:494b  push   ax
  0000:494c  xor    ax, ax
  0000:494e  push   ax
  0000:494f  lcall  U2:0eed:0000 Print
  0000:4954  mov    di, word ptr [g38a6]
  0000:4958  mov    si, di
  0000:495a  shl    di, 1
  0000:495c  add    di, si
  0000:495e  add    di, 0x38cf
  0000:4962  push   ds
  0000:4963  push   di
  0000:4964  lea    di, [bp - 0x10a]
  0000:4968  push   ss
  0000:4969  push   di
  0000:496a  mov    ax, 0xff
  0000:496d  push   ax
  0000:496e  lcall  SYS:0f78:0b01 StrStore
  0000:4973  mov    di, word ptr [g38a6]
  0000:4977  mov    si, di
  0000:4979  shl    di, 1
  0000:497b  add    di, si
  0000:497d  mov    byte ptr [di + 0x38cf], 0
  0000:4982  mov    word ptr [bp - 6], 1
  0000:4987  jmp    0x498c
L04989:
  0000:4989  inc    word ptr [bp - 6]
L0498c:
  0000:498c  mov    di, word ptr [bp - 6]
  0000:498f  cmp    byte ptr [bp + di - 0x10a], 0x31
  0000:4994  jne    0x49e0
  0000:4996  dec    word ptr [g389e]
  0000:499a  mov    di, 0x343c    ; "^4Сила -1 "
  0000:499d  push   cs
  0000:499e  push   di
  0000:499f  xor    ax, ax
  0000:49a1  push   ax
  0000:49a2  xor    ax, ax
  0000:49a4  push   ax
  0000:49a5  xor    ax, ax
  0000:49a7  push   ax
  0000:49a8  xor    ax, ax
  0000:49aa  push   ax
  0000:49ab  xor    ax, ax
  0000:49ad  push   ax
  0000:49ae  lcall  U2:0eed:0000 Print
  0000:49b3  dec    word ptr [g38aa]
  0000:49b7  mov    ax, word ptr [g389e]
  0000:49ba  cdq    
  0000:49bb  mov    cx, 2
  0000:49be  idiv   cx
  0000:49c0  xchg   dx, ax
  0000:49c1  cmp    ax, 1
  0000:49c4  jne    0x49ca
  0000:49c6  dec    word ptr [g38a8]
L049ca:
  0000:49ca  dec    word ptr [g38ae]
  0000:49ce  mov    ax, word ptr [g38ac]
  0000:49d1  cmp    ax, word ptr [g38ae]
  0000:49d5  jle    0x49dd
  0000:49d7  mov    ax, word ptr [g38ae]
  0000:49da  mov    word ptr [g38ac], ax
L049dd:
  0000:49dd  jmp    0x4a6f
L049e0:
  0000:49e0  mov    di, word ptr [bp - 6]
  0000:49e3  cmp    byte ptr [bp + di - 0x10a], 0x32
  0000:49e8  jne    0x4a09
  0000:49ea  dec    word ptr [g38a0]
  0000:49ee  mov    di, 0x3447    ; "^4Ловкость -1 "
  0000:49f1  push   cs
  0000:49f2  push   di
  0000:49f3  xor    ax, ax
  0000:49f5  push   ax
  0000:49f6  xor    ax, ax
  0000:49f8  push   ax
  0000:49f9  xor    ax, ax
  0000:49fb  push   ax
  0000:49fc  xor    ax, ax
  0000:49fe  push   ax
  0000:49ff  xor    ax, ax
  0000:4a01  push   ax
  0000:4a02  lcall  U2:0eed:0000 Print
  0000:4a07  jmp    0x4a6f
L04a09:
  0000:4a09  mov    di, word ptr [bp - 6]
  0000:4a0c  cmp    byte ptr [bp + di - 0x10a], 0x33
  0000:4a11  jne    0x4a46
  0000:4a13  dec    word ptr [g38a2]
  0000:4a17  mov    di, 0x3456    ; "^4Живучесть -1 "
  0000:4a1a  push   cs
  0000:4a1b  push   di
  0000:4a1c  xor    ax, ax
  0000:4a1e  push   ax
  0000:4a1f  xor    ax, ax
  0000:4a21  push   ax
  0000:4a22  xor    ax, ax
  0000:4a24  push   ax
  0000:4a25  xor    ax, ax
  0000:4a27  push   ax
  0000:4a28  xor    ax, ax
  0000:4a2a  push   ax
  0000:4a2b  lcall  U2:0eed:0000 Print
  0000:4a30  sub    word ptr [g38ae], 5
  0000:4a35  mov    ax, word ptr [g38ac]
  0000:4a38  cmp    ax, word ptr [g38ae]
  0000:4a3c  jle    0x4a44
  0000:4a3e  mov    ax, word ptr [g38ae]
  0000:4a41  mov    word ptr [g38ac], ax
L04a44:
  0000:4a44  jmp    0x4a6f
L04a46:
  0000:4a46  mov    di, word ptr [bp - 6]
  0000:4a49  cmp    byte ptr [bp + di - 0x10a], 0x34
  0000:4a4e  jne    0x4a6f
  0000:4a50  dec    word ptr [g38a4]
  0000:4a54  mov    di, 0x3466    ; "^4Удача -1 "
  0000:4a57  push   cs
  0000:4a58  push   di
  0000:4a59  xor    ax, ax
  0000:4a5b  push   ax
  0000:4a5c  xor    ax, ax
  0000:4a5e  push   ax
  0000:4a5f  xor    ax, ax
  0000:4a61  push   ax
  0000:4a62  xor    ax, ax
  0000:4a64  push   ax
  0000:4a65  xor    ax, ax
  0000:4a67  push   ax
  0000:4a68  lcall  U2:0eed:0000 Print
  0000:4a6d  jmp    0x4a6f
L04a6f:
  0000:4a6f  cmp    word ptr [bp - 6], 2
  0000:4a73  je     0x4a78
  0000:4a75  jmp    0x4989
L04a78:
  0000:4a78  mov    di, 0x3fcc
  0000:4a7b  push   ds
  0000:4a7c  push   di
  0000:4a7d  lcall  SYS:0f78:05dd WriteLnEnd
  0000:4a82  lcall  SYS:0f78:0291 IOCheck
  0000:4a87  cmp    word ptr [g389c], 5
  0000:4a8c  je     0x4ac3
  0000:4a8e  mov    al, byte ptr [g3692]
  0000:4a91  xor    ah, ah
  0000:4a93  dec    ax
  0000:4a94  mov    dx, 0xa
  0000:4a97  mul    dx
  0000:4a99  mov    dx, ax
  0000:4a9b  mov    ax, word ptr [g38a6]
  0000:4a9e  sub    ax, dx
  0000:4aa0  cmp    ax, 3
  0000:4aa3  jne    0x4ac3
  0000:4aa5  mov    byte ptr [g3696], 1
  0000:4aaa  mov    di, 0x3472    ; "^4Такого конявого непустят в местный притон!"
  0000:4aad  push   cs
  0000:4aae  push   di
  0000:4aaf  xor    ax, ax
  0000:4ab1  push   ax
  0000:4ab2  xor    ax, ax
  0000:4ab4  push   ax
  0000:4ab5  xor    ax, ax
  0000:4ab7  push   ax
  0000:4ab8  xor    ax, ax
  0000:4aba  push   ax
  0000:4abb  xor    ax, ax
  0000:4abd  push   ax
  0000:4abe  lcall  U2:0eed:01c2 PrintLn
L04ac3:
  0000:4ac3  dec    word ptr [g38a6]
  0000:4ac7  sub    word ptr [g38d0], 0xa
  0000:4acc  mov    ax, word ptr [g38ce]
  0000:4acf  cmp    ax, word ptr [g38d0]
  0000:4ad3  jl     0x4adc
  0000:4ad5  mov    ax, word ptr [g38d0]
  0000:4ad8  dec    ax
  0000:4ad9  mov    word ptr [g38ce], ax
L04adc:
  0000:4adc  jmp    0x4af7
L04ade:
  0000:4ade  mov    di, 0x349f    ; "^4Враг: Засранец!"
  0000:4ae1  push   cs
  0000:4ae2  push   di
  0000:4ae3  xor    ax, ax
  0000:4ae5  push   ax
  0000:4ae6  xor    ax, ax
  0000:4ae8  push   ax
  0000:4ae9  xor    ax, ax
  0000:4aeb  push   ax
  0000:4aec  xor    ax, ax
  0000:4aee  push   ax
  0000:4aef  xor    ax, ax
  0000:4af1  push   ax
  0000:4af2  lcall  U2:0eed:01c2 PrintLn
L04af7:
  0000:4af7  mov    byte ptr [bp - 1], 1
L04afb:
  0000:4afb  mov    di, 0x3a72
  0000:4afe  push   ds
  0000:4aff  push   di
  0000:4b00  call   0x29c4
  0000:4b03  mov    di, 0x3a72
  0000:4b06  push   ds
  0000:4b07  push   di
  0000:4b08  mov    di, 0x34b1    ; "kos"
  0000:4b0b  push   cs
  0000:4b0c  push   di
  0000:4b0d  lcall  SYS:0f78:0bd8 StrCmp
  0000:4b12  je     0x4b17
  0000:4b14  jmp    0x4c24
L04b17:
  0000:4b17  cmp    byte ptr [g38b0], 1
  0000:4b1c  jne    0x4b3a
  0000:4b1e  mov    di, 0x34b5    ; "^4Ты не схавать колёса из-за сломаной челюсти."
  0000:4b21  push   cs
  0000:4b22  push   di
  0000:4b23  xor    ax, ax
  0000:4b25  push   ax
  0000:4b26  xor    ax, ax
  0000:4b28  push   ax
  0000:4b29  xor    ax, ax
  0000:4b2b  push   ax
  0000:4b2c  xor    ax, ax
  0000:4b2e  push   ax
  0000:4b2f  xor    ax, ax
  0000:4b31  push   ax
  0000:4b32  lcall  U2:0eed:01c2 PrintLn
  0000:4b37  jmp    0x4c24
L04b3a:
  0000:4b3a  cmp    byte ptr [g38cd], 0
  0000:4b3f  je     0x4b44
  0000:4b41  jmp    0x4c0b
L04b44:
  0000:4b44  cmp    word ptr [g38c5], 0
  0000:4b49  jg     0x4b4e
  0000:4b4b  jmp    0x4bf0
L04b4e:
  0000:4b4e  dec    word ptr [g38c5]
  0000:4b52  mov    byte ptr [g38cd], 3
  0000:4b57  add    word ptr [g389e], 2
  0000:4b5c  inc    word ptr [g38a8]
  0000:4b60  add    word ptr [g38aa], 2
  0000:4b65  mov    ax, word ptr [g38ae]
  0000:4b68  sub    ax, word ptr [g38ac]
  0000:4b6c  cmp    ax, 0xa
  0000:4b6f  jge    0x4bb3
  0000:4b71  mov    di, 0x34e4    ; "^2Колёса прибавляют #з. "
  0000:4b74  push   cs
  0000:4b75  push   di
  0000:4b76  mov    ax, word ptr [g38ae]
  0000:4b79  sub    ax, word ptr [g38ac]
  0000:4b7d  push   ax
  0000:4b7e  xor    ax, ax
  0000:4b80  push   ax
  0000:4b81  xor    ax, ax
  0000:4b83  push   ax
  0000:4b84  xor    ax, ax
  0000:4b86  push   ax
  0000:4b87  xor    ax, ax
  0000:4b89  push   ax
  0000:4b8a  lcall  U2:0eed:0000 Print
  0000:4b8f  mov    ax, word ptr [g38ae]
  0000:4b92  mov    word ptr [g38ac], ax
  0000:4b95  mov    di, 0x34fd    ; "^2Здоровья:#/#. Осталось # косяков"
  0000:4b98  push   cs
  0000:4b99  push   di
  0000:4b9a  push   word ptr [g38ac]
  0000:4b9e  push   word ptr [g38ae]
  0000:4ba2  push   word ptr [g38c5]
  0000:4ba6  xor    ax, ax
  0000:4ba8  push   ax
  0000:4ba9  xor    ax, ax
  0000:4bab  push   ax
  0000:4bac  lcall  U2:0eed:01c2 PrintLn
  0000:4bb1  jmp    0x4bd5
L04bb3:
  0000:4bb3  add    word ptr [g38ac], 0xa
  0000:4bb8  mov    di, 0x3520    ; "^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косяков"
  0000:4bbb  push   cs
  0000:4bbc  push   di
  0000:4bbd  mov    ax, 0xa
  0000:4bc0  push   ax
  0000:4bc1  push   word ptr [g38ac]
  0000:4bc5  push   word ptr [g38ae]
  0000:4bc9  push   word ptr [g38c5]
  0000:4bcd  xor    ax, ax
  0000:4bcf  push   ax
  0000:4bd0  lcall  U2:0eed:01c2 PrintLn
L04bd5:
  0000:4bd5  mov    di, 0x3559    ; "^2Сила +2."
  0000:4bd8  push   cs
  0000:4bd9  push   di
  0000:4bda  xor    ax, ax
  0000:4bdc  push   ax
  0000:4bdd  xor    ax, ax
  0000:4bdf  push   ax
  0000:4be0  xor    ax, ax
  0000:4be2  push   ax
  0000:4be3  xor    ax, ax
  0000:4be5  push   ax
  0000:4be6  xor    ax, ax
  0000:4be8  push   ax
  0000:4be9  lcall  U2:0eed:01c2 PrintLn
  0000:4bee  jmp    0x4c09
L04bf0:
  0000:4bf0  mov    di, 0x3564    ; "^4У тебя нет косяков"
  0000:4bf3  push   cs
  0000:4bf4  push   di
  0000:4bf5  xor    ax, ax
  0000:4bf7  push   ax
  0000:4bf8  xor    ax, ax
  0000:4bfa  push   ax
  0000:4bfb  xor    ax, ax
  0000:4bfd  push   ax
  0000:4bfe  xor    ax, ax
  0000:4c00  push   ax
  0000:4c01  xor    ax, ax
  0000:4c03  push   ax
  0000:4c04  lcall  U2:0eed:01c2 PrintLn
L04c09:
  0000:4c09  jmp    0x4c24
L04c0b:
  0000:4c0b  mov    di, 0x3579    ; "^6Ты неможешь схавать ещё один косяк."
  0000:4c0e  push   cs
  0000:4c0f  push   di
  0000:4c10  xor    ax, ax
  0000:4c12  push   ax
  0000:4c13  xor    ax, ax
  0000:4c15  push   ax
  0000:4c16  xor    ax, ax
  0000:4c18  push   ax
  0000:4c19  xor    ax, ax
  0000:4c1b  push   ax
  0000:4c1c  xor    ax, ax
  0000:4c1e  push   ax
  0000:4c1f  lcall  U2:0eed:01c2 PrintLn
L04c24:
  0000:4c24  mov    di, 0x3a72
  0000:4c27  push   ds
  0000:4c28  push   di
  0000:4c29  mov    di, 0x359f    ; "s"
  0000:4c2c  push   cs
  0000:4c2d  push   di
  0000:4c2e  lcall  SYS:0f78:0bd8 StrCmp
  0000:4c33  jne    0x4c38
  0000:4c35  call   0x1a03
L04c38:
  0000:4c38  mov    di, 0x3a72
  0000:4c3b  push   ds
  0000:4c3c  push   di
  0000:4c3d  mov    di, 0x35a1    ; "sv"
  0000:4c40  push   cs
  0000:4c41  push   di
  0000:4c42  lcall  SYS:0f78:0bd8 StrCmp
  0000:4c47  jne    0x4c4c
  0000:4c49  call   0x1348
L04c4c:
  0000:4c4c  mov    di, 0x3a72
  0000:4c4f  push   ds
  0000:4c50  push   di
  0000:4c51  mov    di, 0x35a4    ; "e"
  0000:4c54  push   cs
  0000:4c55  push   di
  0000:4c56  lcall  SYS:0f78:0bd8 StrCmp
  0000:4c5b  jne    0x4c64
  0000:4c5d  xor    ax, ax
  0000:4c5f  lcall  SYS:0f78:0116 Halt
L04c64:
  0000:4c64  cmp    word ptr [g3c80], 1
  0000:4c69  jl     0x4ca0
  0000:4c6b  mov    di, 0x3a72
  0000:4c6e  push   ds
  0000:4c6f  push   di
  0000:4c70  mov    di, 0x3182    ; "k"
  0000:4c73  push   cs
  0000:4c74  push   di
  0000:4c75  lcall  SYS:0f78:0bd8 StrCmp
  0000:4c7a  jne    0x4ca0
  0000:4c7c  inc    word ptr [g3c80]
  0000:4c80  cmp    word ptr [g3c80], 3
  0000:4c85  jne    0x4ca0
  0000:4c87  mov    di, 0x35a6    ; "^2Подошли пацаны - Ща начнется!"
  0000:4c8a  push   cs
  0000:4c8b  push   di
  0000:4c8c  xor    ax, ax
  0000:4c8e  push   ax
  0000:4c8f  xor    ax, ax
  0000:4c91  push   ax
  0000:4c92  xor    ax, ax
  0000:4c94  push   ax
  0000:4c95  xor    ax, ax
  0000:4c97  push   ax
  0000:4c98  xor    ax, ax
  0000:4c9a  push   ax
  0000:4c9b  lcall  U2:0eed:01c2 PrintLn
L04ca0:
  0000:4ca0  mov    di, 0x3a72
  0000:4ca3  push   ds
  0000:4ca4  push   di
  0000:4ca5  mov    di, 0x35c6    ; "v"
  0000:4ca8  push   cs
  0000:4ca9  push   di
  0000:4caa  lcall  SYS:0f78:0bd8 StrCmp
  0000:4caf  je     0x4cb4
  0000:4cb1  jmp    0x4d93
L04cb4:
  0000:4cb4  cmp    byte ptr [g3696], 1
  0000:4cb9  jne    0x4d03
  0000:4cbb  mov    al, byte ptr [g3692]
  0000:4cbe  xor    ah, ah
  0000:4cc0  mov    dx, 0xa
  0000:4cc3  mul    dx
  0000:4cc5  add    ax, 0xa
  0000:4cc8  cmp    ax, word ptr [g38cb]
  0000:4ccc  jg     0x4d03
  0000:4cce  cmp    word ptr [g3c80], 0
  0000:4cd3  jne    0x4cdb
  0000:4cd5  mov    word ptr [g3c80], 1
L04cdb:
  0000:4cdb  cmp    byte ptr [g38bb], 1
  0000:4ce0  jne    0x4d01
  0000:4ce2  mov    word ptr [g3c80], 3
  0000:4ce8  mov    di, 0x35c8    ; "^2Подошли пацаны - Ща начнется!."
  0000:4ceb  push   cs
  0000:4cec  push   di
  0000:4ced  xor    ax, ax
  0000:4cef  push   ax
  0000:4cf0  xor    ax, ax
  0000:4cf2  push   ax
  0000:4cf3  xor    ax, ax
  0000:4cf5  push   ax
  0000:4cf6  xor    ax, ax
  0000:4cf8  push   ax
  0000:4cf9  xor    ax, ax
  0000:4cfb  push   ax
  0000:4cfc  lcall  U2:0eed:01c2 PrintLn
L04d01:
  0000:4d01  jmp    0x4d3e
L04d03:
  0000:4d03  cmp    byte ptr [g3696], 0
  0000:4d08  je     0x4d25
  0000:4d0a  mov    di, 0x35e9    ; "^4Ни кто не хочет за тебя впрягаться."
  0000:4d0d  push   cs
  0000:4d0e  push   di
  0000:4d0f  xor    ax, ax
  0000:4d11  push   ax
  0000:4d12  xor    ax, ax
  0000:4d14  push   ax
  0000:4d15  xor    ax, ax
  0000:4d17  push   ax
  0000:4d18  xor    ax, ax
  0000:4d1a  push   ax
  0000:4d1b  xor    ax, ax
  0000:4d1d  push   ax
  0000:4d1e  lcall  U2:0eed:01c2 PrintLn
  0000:4d23  jmp    0x4d3e
L04d25:
  0000:4d25  mov    di, 0x360f    ; "^6Сначала надо скорешиться с местной гопотой."
  0000:4d28  push   cs
  0000:4d29  push   di
  0000:4d2a  xor    ax, ax
  0000:4d2c  push   ax
  0000:4d2d  xor    ax, ax
  0000:4d2f  push   ax
  0000:4d30  xor    ax, ax
  0000:4d32  push   ax
  0000:4d33  xor    ax, ax
  0000:4d35  push   ax
  0000:4d36  xor    ax, ax
  0000:4d38  push   ax
  0000:4d39  lcall  U2:0eed:01c2 PrintLn
L04d3e:
  0000:4d3e  cmp    word ptr [g3c80], 0
  0000:4d43  jle    0x4d93
  0000:4d45  cmp    word ptr [g3c80], 3
  0000:4d4a  jge    0x4d6c
  0000:4d4c  mov    di, 0x363d    ; "^6Тебе надо продержатся до подхода братвы # пинка."
  0000:4d4f  push   cs
  0000:4d50  push   di
  0000:4d51  mov    ax, 3
  0000:4d54  sub    ax, word ptr [g3c80]
  0000:4d58  push   ax
  0000:4d59  xor    ax, ax
  0000:4d5b  push   ax
  0000:4d5c  xor    ax, ax
  0000:4d5e  push   ax
  0000:4d5f  xor    ax, ax
  0000:4d61  push   ax
  0000:4d62  xor    ax, ax
  0000:4d64  push   ax
  0000:4d65  lcall  U2:0eed:01c2 PrintLn
  0000:4d6a  jmp    0x4d93
L04d6c:
  0000:4d6c  cmp    word ptr [g3c80], 3
  0000:4d71  jne    0x4d7a
  0000:4d73  cmp    byte ptr [g38bb], 0
  0000:4d78  jne    0x4d93
L04d7a:
  0000:4d7a  mov    di, 0x3670    ; "^2Они уже здесь."
  0000:4d7d  push   cs
  0000:4d7e  push   di
  0000:4d7f  xor    ax, ax
  0000:4d81  push   ax
  0000:4d82  xor    ax, ax
  0000:4d84  push   ax
  0000:4d85  xor    ax, ax
  0000:4d87  push   ax
  0000:4d88  xor    ax, ax
  0000:4d8a  push   ax
  0000:4d8b  xor    ax, ax
  0000:4d8d  push   ax
  0000:4d8e  lcall  U2:0eed:01c2 PrintLn
L04d93:
  0000:4d93  cmp    word ptr [g3962], 0
  0000:4d98  jg     0x4d9d
  0000:4d9a  jmp    0x4e9e
L04d9d:
  0000:4d9d  cmp    word ptr [g3c80], 3
  0000:4da2  jge    0x4da7
  0000:4da4  jmp    0x4e9e
L04da7:
  0000:4da7  mov    ax, word ptr [g3962]
  0000:4daa  mov    word ptr [bp - 4], ax
  0000:4dad  mov    al, byte ptr [g3692]
  0000:4db0  xor    ah, ah
  0000:4db2  shl    ax, 1
  0000:4db4  shl    ax, 1
  0000:4db6  push   ax
  0000:4db7  lcall  SYS:0f78:114b Random
  0000:4dbc  mov    dx, ax
  0000:4dbe  mov    al, byte ptr [g3692]
  0000:4dc1  xor    ah, ah
  0000:4dc3  mov    si, ax
  0000:4dc5  shl    ax, 1
  0000:4dc7  add    ax, si
  0000:4dc9  add    ax, dx
  0000:4dcb  mov    word ptr [bp - 0x10c], ax
  0000:4dcf  mov    al, byte ptr [g3968]
  0000:4dd2  xor    ah, ah
  0000:4dd4  cdq    
  0000:4dd5  mov    cx, 3
  0000:4dd8  idiv   cx
  0000:4dda  sub    word ptr [bp - 0x10c], ax
  0000:4dde  cmp    word ptr [bp - 0x10c], 0
  0000:4de3  jge    0x4deb
  0000:4de5  xor    ax, ax
  0000:4de7  mov    word ptr [bp - 0x10c], ax
L04deb:
  0000:4deb  mov    ax, word ptr [bp - 0x10c]
  0000:4def  sub    word ptr [g3962], ax
  0000:4df3  mov    di, 0x3681    ; "^2Врага отпинали на #з. У него осталось #"
  0000:4df6  push   cs
  0000:4df7  push   di
  0000:4df8  mov    ax, word ptr [bp - 4]
  0000:4dfb  sub    ax, word ptr [g3962]
  0000:4dff  push   ax
  0000:4e00  push   word ptr [g3962]
  0000:4e04  xor    ax, ax
  0000:4e06  push   ax
  0000:4e07  xor    ax, ax
  0000:4e09  push   ax
  0000:4e0a  xor    ax, ax
  0000:4e0c  push   ax
  0000:4e0d  lcall  U2:0eed:01c2 PrintLn
  0000:4e12  mov    ax, 2
  0000:4e15  push   ax
  0000:4e16  lcall  SYS:0f78:114b Random
  0000:4e1b  or     ax, ax
  0000:4e1d  jne    0x4e43
  0000:4e1f  inc    word ptr [g3c80]
  0000:4e23  cmp    word ptr [g3c80], 3
  0000:4e28  jne    0x4e43
  0000:4e2a  mov    di, 0x36ab    ; "^2Подошли пацаны."
  0000:4e2d  push   cs
  0000:4e2e  push   di
  0000:4e2f  xor    ax, ax
  0000:4e31  push   ax
  0000:4e32  xor    ax, ax
  0000:4e34  push   ax
  0000:4e35  xor    ax, ax
  0000:4e37  push   ax
  0000:4e38  xor    ax, ax
  0000:4e3a  push   ax
  0000:4e3b  xor    ax, ax
  0000:4e3d  push   ax
  0000:4e3e  lcall  U2:0eed:01c2 PrintLn
L04e43:
  0000:4e43  cmp    word ptr [g3c80], 7
  0000:4e48  jne    0x4e68
  0000:4e4a  xor    ax, ax
  0000:4e4c  mov    word ptr [g3c80], ax
  0000:4e4f  mov    di, 0x36bd    ; "^2Твою подмогу отпинали."
  0000:4e52  push   cs
  0000:4e53  push   di
  0000:4e54  xor    ax, ax
  0000:4e56  push   ax
  0000:4e57  xor    ax, ax
  0000:4e59  push   ax
  0000:4e5a  xor    ax, ax
  0000:4e5c  push   ax
  0000:4e5d  xor    ax, ax
  0000:4e5f  push   ax
  0000:4e60  xor    ax, ax
  0000:4e62  push   ax
  0000:4e63  lcall  U2:0eed:01c2 PrintLn
L04e68:
  0000:4e68  mov    al, byte ptr [g3692]
  0000:4e6b  xor    ah, ah
  0000:4e6d  mov    si, ax
  0000:4e6f  shl    ax, 1
  0000:4e71  shl    ax, 1
  0000:4e73  add    ax, si
  0000:4e75  sub    word ptr [g38cb], ax
  0000:4e79  cmp    word ptr [g38cb], 0
  0000:4e7e  jg     0x4e9e
  0000:4e80  xor    ax, ax
  0000:4e82  mov    word ptr [g3c80], ax
  0000:4e85  mov    di, 0x36d6    ; "^4Подмоге надоело столько парится из-за мало понтового мудака"
  0000:4e88  push   cs
  0000:4e89  push   di
  0000:4e8a  xor    ax, ax
  0000:4e8c  push   ax
  0000:4e8d  xor    ax, ax
  0000:4e8f  push   ax
  0000:4e90  xor    ax, ax
  0000:4e92  push   ax
  0000:4e93  xor    ax, ax
  0000:4e95  push   ax
  0000:4e96  xor    ax, ax
  0000:4e98  push   ax
  0000:4e99  lcall  U2:0eed:01c2 PrintLn
L04e9e:
  0000:4e9e  mov    di, 0x3a72
  0000:4ea1  push   ds
  0000:4ea2  push   di
  0000:4ea3  mov    di, 0x3714    ; "f"
  0000:4ea6  push   cs
  0000:4ea7  push   di
  0000:4ea8  lcall  SYS:0f78:0bd8 StrCmp
  0000:4ead  je     0x4eb2
  0000:4eaf  jmp    0x4f82
L04eb2:
  0000:4eb2  cmp    byte ptr [g394d], 0
  0000:4eb7  jne    0x4ebc
  0000:4eb9  jmp    0x4f82
L04ebc:
  0000:4ebc  cmp    byte ptr [g3693], 0
  0000:4ec1  jne    0x4ee6
  0000:4ec3  cmp    byte ptr [g394e], 0
  0000:4ec8  jne    0x4ee6
  0000:4eca  mov    di, 0x3716    ; "^6Тельзя тут стрелять! Менты накроют!"
  0000:4ecd  push   cs
  0000:4ece  push   di
  0000:4ecf  xor    ax, ax
  0000:4ed1  push   ax
  0000:4ed2  xor    ax, ax
  0000:4ed4  push   ax
  0000:4ed5  xor    ax, ax
  0000:4ed7  push   ax
  0000:4ed8  xor    ax, ax
  0000:4eda  push   ax
  0000:4edb  xor    ax, ax
  0000:4edd  push   ax
  0000:4ede  lcall  U2:0eed:01c2 PrintLn
  0000:4ee3  jmp    0x4f82
L04ee6:
  0000:4ee6  cmp    word ptr [g394f], 0
  0000:4eeb  jle    0x4f69
  0000:4eed  dec    word ptr [g394f]
  0000:4ef1  mov    ax, 0x32
  0000:4ef4  push   ax
  0000:4ef5  lcall  SYS:0f78:114b Random
  0000:4efa  xor    dx, dx
  0000:4efc  mov    cx, ax
  0000:4efe  mov    bx, dx
  0000:4f00  mov    ax, word ptr [g38a0]
  0000:4f03  cdq    
  0000:4f04  cmp    dx, bx
  0000:4f06  jg     0x4f0e
  0000:4f08  jl     0x4f4e
  0000:4f0a  cmp    ax, cx
  0000:4f0c  jbe    0x4f4e
L04f0e:
  0000:4f0e  mov    ax, word ptr [g3962]
  0000:4f11  mov    word ptr [bp - 4], ax
  0000:4f14  mov    ax, 0xa
  0000:4f17  push   ax
  0000:4f18  lcall  SYS:0f78:114b Random
  0000:4f1d  add    ax, 0x14
  0000:4f20  mov    word ptr [bp - 0x10c], ax
  0000:4f24  mov    ax, word ptr [bp - 0x10c]
  0000:4f28  sub    word ptr [g3962], ax
  0000:4f2c  mov    di, 0x373c    ; "^2Ты выстрелил и ранил врага на #з. У него осталось #з., осталось патронов #"
  0000:4f2f  push   cs
  0000:4f30  push   di
  0000:4f31  mov    ax, word ptr [bp - 4]
  0000:4f34  sub    ax, word ptr [g3962]
  0000:4f38  push   ax
  0000:4f39  push   word ptr [g3962]
  0000:4f3d  push   word ptr [g394f]
  0000:4f41  xor    ax, ax
  0000:4f43  push   ax
  0000:4f44  xor    ax, ax
  0000:4f46  push   ax
  0000:4f47  lcall  U2:0eed:01c2 PrintLn
  0000:4f4c  jmp    0x4f67
L04f4e:
  0000:4f4e  mov    di, 0x3789    ; "^2Это был хреновый выстрел."
  0000:4f51  push   cs
  0000:4f52  push   di
  0000:4f53  xor    ax, ax
  0000:4f55  push   ax
  0000:4f56  xor    ax, ax
  0000:4f58  push   ax
  0000:4f59  xor    ax, ax
  0000:4f5b  push   ax
  0000:4f5c  xor    ax, ax
  0000:4f5e  push   ax
  0000:4f5f  xor    ax, ax
  0000:4f61  push   ax
  0000:4f62  lcall  U2:0eed:01c2 PrintLn
L04f67:
  0000:4f67  jmp    0x4f82
L04f69:
  0000:4f69  mov    di, 0x37a5    ; "^6Чё за батва? Блин патроны кончились!"
  0000:4f6c  push   cs
  0000:4f6d  push   di
  0000:4f6e  xor    ax, ax
  0000:4f70  push   ax
  0000:4f71  xor    ax, ax
  0000:4f73  push   ax
  0000:4f74  xor    ax, ax
  0000:4f76  push   ax
  0000:4f77  xor    ax, ax
  0000:4f79  push   ax
  0000:4f7a  xor    ax, ax
  0000:4f7c  push   ax
  0000:4f7d  lcall  U2:0eed:01c2 PrintLn
L04f82:
  0000:4f82  cmp    word ptr [g38ac], 0
  0000:4f87  jle    0x4f8c
  0000:4f89  jmp    0x507b
L04f8c:
  0000:4f8c  cmp    byte ptr [g3c83], 1
  0000:4f91  jne    0x4fba
  0000:4f93  mov    di, 0x37cc    ; "^4Ты сдох. Ректор тебя замочил. Ты так и не доказал свою крутизну."
  0000:4f96  push   cs
  0000:4f97  push   di
  0000:4f98  xor    ax, ax
  0000:4f9a  push   ax
  0000:4f9b  xor    ax, ax
  0000:4f9d  push   ax
  0000:4f9e  xor    ax, ax
  0000:4fa0  push   ax
  0000:4fa1  xor    ax, ax
  0000:4fa3  push   ax
  0000:4fa4  xor    ax, ax
  0000:4fa6  push   ax
  0000:4fa7  lcall  U2:0eed:01c2 PrintLn
  0000:4fac  lcall  CRT:0f16:031a ReadKey
  0000:4fb1  mov    al, 0
  0000:4fb3  push   ax
  0000:4fb4  call   0x74b
  0000:4fb7  jmp    0x507b
L04fba:
  0000:4fba  cmp    byte ptr [g3696], 1
  0000:4fbf  je     0x4fc4
  0000:4fc1  jmp    0x5053
L04fc4:
  0000:4fc4  cmp    word ptr [g38cb], 0xa
  0000:4fc9  jge    0x4fce
  0000:4fcb  jmp    0x5053
L04fce:
  0000:4fce  mov    di, 0x380f    ; "^1Тебе повезло знакомые пацаны отвезли тебя в больницу а то бы ты сдох."
  0000:4fd1  push   cs
  0000:4fd2  push   di
  0000:4fd3  xor    ax, ax
  0000:4fd5  push   ax
  0000:4fd6  xor    ax, ax
  0000:4fd8  push   ax
  0000:4fd9  xor    ax, ax
  0000:4fdb  push   ax
  0000:4fdc  xor    ax, ax
  0000:4fde  push   ax
  0000:4fdf  xor    ax, ax
  0000:4fe1  push   ax
  0000:4fe2  lcall  U2:0eed:01c2 PrintLn
  0000:4fe7  sub    word ptr [g38cb], 0xa
  0000:4fec  mov    ax, word ptr [g38ae]
  0000:4fef  cdq    
  0000:4ff0  lcall  SYS:0f78:1125 RFloat
  0000:4ff5  mov    cx, 0x83
  0000:4ff8  xor    si, si
  0000:4ffa  mov    di, 0x2000
  0000:4ffd  lcall  SYS:0f78:1117 RDiv
  0000:5002  mov    cx, 0x82
  0000:5005  xor    si, si
  0000:5007  mov    di, 0x4000
  0000:500a  lcall  SYS:0f78:1111 RMul
  0000:500f  lcall  SYS:0f78:1131 RRound
  0000:5014  sub    word ptr [g38c7], ax
  0000:5018  mov    ax, word ptr [g38ae]
  0000:501b  mov    word ptr [g38ac], ax
  0000:501e  cmp    byte ptr [g38b0], 1
  0000:5023  je     0x502c
  0000:5025  cmp    byte ptr [g38b1], 1
  0000:502a  jne    0x503b
L0502c:
  0000:502c  sub    word ptr [g38c7], 7
  0000:5031  mov    byte ptr [g38b0], 0
  0000:5036  mov    byte ptr [g38b1], 0
L0503b:
  0000:503b  cmp    word ptr [g38c7], 0
  0000:5040  jge    0x5051
  0000:5042  mov    ax, word ptr [g38cb]
  0000:5045  add    ax, word ptr [g38c7]
  0000:5049  mov    word ptr [g38cb], ax
  0000:504c  xor    ax, ax
  0000:504e  mov    word ptr [g38c7], ax
L05051:
  0000:5051  jmp    0x5077
L05053:
  0000:5053  mov    di, 0x3857    ; "^4Ты сдох."
  0000:5056  push   cs
  0000:5057  push   di
  0000:5058  xor    ax, ax
  0000:505a  push   ax
  0000:505b  xor    ax, ax
  0000:505d  push   ax
  0000:505e  xor    ax, ax
  0000:5060  push   ax
  0000:5061  xor    ax, ax
  0000:5063  push   ax
  0000:5064  xor    ax, ax
  0000:5066  push   ax
  0000:5067  lcall  U2:0eed:01c2 PrintLn
  0000:506c  lcall  CRT:0f16:031a ReadKey
  0000:5071  mov    al, 0
  0000:5073  push   ax
  0000:5074  call   0x74b
L05077:
  0000:5077  mov    byte ptr [bp - 1], 1
L0507b:
  0000:507b  cmp    word ptr [g3962], 0
  0000:5080  jle    0x5085
  0000:5082  jmp    0x5838
L05085:
  0000:5085  cmp    byte ptr [bp + 4], 4
  0000:5089  je     0x508e
  0000:508b  jmp    0x5139
L0508e:
  0000:508e  mov    ax, word ptr [g38d0]
  0000:5091  mov    word ptr [g38ce], ax
  0000:5094  mov    al, 1
  0000:5096  push   ax
  0000:5097  call   0x2526
  0000:509a  mov    di, 0x3862    ; "^1Ты замочил самого ректора!!! ТЫ САМЫЙ КРУТОЙ!!!"
  0000:509d  push   cs
  0000:509e  push   di
  0000:509f  xor    ax, ax
  0000:50a1  push   ax
  0000:50a2  xor    ax, ax
  0000:50a4  push   ax
  0000:50a5  xor    ax, ax
  0000:50a7  push   ax
  0000:50a8  xor    ax, ax
  0000:50aa  push   ax
  0000:50ab  xor    ax, ax
  0000:50ad  push   ax
  0000:50ae  lcall  U2:0eed:01c2 PrintLn
  0000:50b3  lcall  CRT:0f16:031a ReadKey
  0000:50b8  mov    di, 0x3894    ; "^1Вновь сила торжествует над интелектом."
  0000:50bb  push   cs
  0000:50bc  push   di
  0000:50bd  xor    ax, ax
  0000:50bf  push   ax
  0000:50c0  xor    ax, ax
  0000:50c2  push   ax
  0000:50c3  xor    ax, ax
  0000:50c5  push   ax
  0000:50c6  xor    ax, ax
  0000:50c8  push   ax
  0000:50c9  xor    ax, ax
  0000:50cb  push   ax
  0000:50cc  lcall  U2:0eed:01c2 PrintLn
  0000:50d1  lcall  CRT:0f16:031a ReadKey
  0000:50d6  mov    di, 0x38bd    ; "^1После этого сразу началась анархия и полный беспредел."
  0000:50d9  push   cs
  0000:50da  push   di
  0000:50db  xor    ax, ax
  0000:50dd  push   ax
  0000:50de  xor    ax, ax
  0000:50e0  push   ax
  0000:50e1  xor    ax, ax
  0000:50e3  push   ax
  0000:50e4  xor    ax, ax
  0000:50e6  push   ax
  0000:50e7  xor    ax, ax
  0000:50e9  push   ax
  0000:50ea  lcall  U2:0eed:01c2 PrintLn
  0000:50ef  lcall  CRT:0f16:031a ReadKey
  0000:50f4  mov    di, 0x38f6    ; "^1И не стыдно тебе гоп чёртов?"
  0000:50f7  push   cs
  0000:50f8  push   di
  0000:50f9  xor    ax, ax
  0000:50fb  push   ax
  0000:50fc  xor    ax, ax
  0000:50fe  push   ax
  0000:50ff  xor    ax, ax
  0000:5101  push   ax
  0000:5102  xor    ax, ax
  0000:5104  push   ax
  0000:5105  xor    ax, ax
  0000:5107  push   ax
  0000:5108  lcall  U2:0eed:01c2 PrintLn
  0000:510d  lcall  CRT:0f16:031a ReadKey
  0000:5112  mov    di, 0x3915    ; "^1А результат:"
  0000:5115  push   cs
  0000:5116  push   di
  0000:5117  xor    ax, ax
  0000:5119  push   ax
  0000:511a  xor    ax, ax
  0000:511c  push   ax
  0000:511d  xor    ax, ax
  0000:511f  push   ax
  0000:5120  xor    ax, ax
  0000:5122  push   ax
  0000:5123  xor    ax, ax
  0000:5125  push   ax
  0000:5126  lcall  U2:0eed:01c2 PrintLn
  0000:512b  call   0x1a03
  0000:512e  lcall  CRT:0f16:031a ReadKey
  0000:5133  call   0xaec
  0000:5136  jmp    0x5838
L05139:
  0000:5139  cmp    byte ptr [bp + 4], 3
  0000:513d  jne    0x5189
  0000:513f  mov    ax, word ptr [g38d0]
  0000:5142  mov    word ptr [g38ce], ax
  0000:5145  mov    al, 1
  0000:5147  push   ax
  0000:5148  call   0x2526
  0000:514b  mov    di, 0x3924    ; "^1Ты замочил самого ректора!!!^6 о чёрт! да это ж не ректор был."
  0000:514e  push   cs
  0000:514f  push   di
  0000:5150  xor    ax, ax
  0000:5152  push   ax
  0000:5153  xor    ax, ax
  0000:5155  push   ax
  0000:5156  xor    ax, ax
  0000:5158  push   ax
  0000:5159  xor    ax, ax
  0000:515b  push   ax
  0000:515c  xor    ax, ax
  0000:515e  push   ax
  0000:515f  lcall  U2:0eed:01c2 PrintLn
  0000:5164  lcall  CRT:0f16:031a ReadKey
  0000:5169  mov    di, 0x3965    ; "^6Это был проректор СУНЦа!"
  0000:516c  push   cs
  0000:516d  push   di
  0000:516e  xor    ax, ax
  0000:5170  push   ax
  0000:5171  xor    ax, ax
  0000:5173  push   ax
  0000:5174  xor    ax, ax
  0000:5176  push   ax
  0000:5177  xor    ax, ax
  0000:5179  push   ax
  0000:517a  xor    ax, ax
  0000:517c  push   ax
  0000:517d  lcall  U2:0eed:01c2 PrintLn
  0000:5182  lcall  CRT:0f16:031a ReadKey
  0000:5187  jmp    0x51a2
L05189:
  0000:5189  mov    di, 0x3980    ; "^2Враг сдох."
  0000:518c  push   cs
  0000:518d  push   di
  0000:518e  xor    ax, ax
  0000:5190  push   ax
  0000:5191  xor    ax, ax
  0000:5193  push   ax
  0000:5194  xor    ax, ax
  0000:5196  push   ax
  0000:5197  xor    ax, ax
  0000:5199  push   ax
  0000:519a  xor    ax, ax
  0000:519c  push   ax
  0000:519d  lcall  U2:0eed:01c2 PrintLn
L051a2:
  0000:51a2  mov    byte ptr [bp - 1], 1
  0000:51a6  cmp    byte ptr [bp + 4], 3
  0000:51aa  je     0x51b2
  0000:51ac  cmp    byte ptr [bp + 4], 4
  0000:51b0  jne    0x51b4
L051b2:
  0000:51b2  jmp    0x51ed
L051b4:
  0000:51b4  mov    di, 0x398d    ; "^6За отпин врага ты получаешь # качков опыта"
  0000:51b7  push   cs
  0000:51b8  push   di
  0000:51b9  mov    ax, word ptr [g3954]
  0000:51bc  add    ax, word ptr [g3956]
  0000:51c0  add    ax, word ptr [g3958]
  0000:51c4  add    ax, word ptr [g395a]
  0000:51c8  push   ax
  0000:51c9  xor    ax, ax
  0000:51cb  push   ax
  0000:51cc  xor    ax, ax
  0000:51ce  push   ax
  0000:51cf  xor    ax, ax
  0000:51d1  push   ax
  0000:51d2  xor    ax, ax
  0000:51d4  push   ax
  0000:51d5  lcall  U2:0eed:01c2 PrintLn
  0000:51da  mov    ax, word ptr [g3954]
  0000:51dd  add    ax, word ptr [g3956]
  0000:51e1  add    ax, word ptr [g3958]
  0000:51e5  add    ax, word ptr [g395a]
  0000:51e9  add    word ptr [g38ce], ax
L051ed:
  0000:51ed  mov    ax, word ptr [g38ce]
  0000:51f0  cmp    ax, word ptr [g38d0]
  0000:51f4  jge    0x5238
  0000:51f6  cmp    byte ptr [bp + 4], 3
  0000:51fa  je     0x5236
  0000:51fc  cmp    byte ptr [bp + 4], 4
  0000:5200  je     0x5236
  0000:5202  mov    di, 0x39ba    ; "^6Ты запинал слишком слабого мудака для увеличения понтовости"
  0000:5205  push   cs
  0000:5206  push   di
  0000:5207  xor    ax, ax
  0000:5209  push   ax
  0000:520a  xor    ax, ax
  0000:520c  push   ax
  0000:520d  xor    ax, ax
  0000:520f  push   ax
  0000:5210  xor    ax, ax
  0000:5212  push   ax
  0000:5213  xor    ax, ax
  0000:5215  push   ax
  0000:5216  lcall  U2:0eed:01c2 PrintLn
  0000:521b  mov    di, 0x39f8    ; "^6Сейчас у тебя # качков опыта, А для прокачки надо #"
  0000:521e  push   cs
  0000:521f  push   di
  0000:5220  push   word ptr [g38ce]
  0000:5224  push   word ptr [g38d0]
  0000:5228  xor    ax, ax
  0000:522a  push   ax
  0000:522b  xor    ax, ax
  0000:522d  push   ax
  0000:522e  xor    ax, ax
  0000:5230  push   ax
  0000:5231  lcall  U2:0eed:01c2 PrintLn
L05236:
  0000:5236  jmp    0x523e
L05238:
  0000:5238  mov    al, 0
  0000:523a  push   ax
  0000:523b  call   0x2526
L0523e:
  0000:523e  mov    ax, word ptr [g396a]
  0000:5241  add    word ptr [g38c3], ax
  0000:5245  mov    ax, word ptr [g396c]
  0000:5248  add    word ptr [g38c7], ax
  0000:524c  mov    ax, word ptr [g396e]
  0000:524f  add    word ptr [g38c9], ax
  0000:5253  mov    di, 0x3a2e    ; "^1Пиво победителю!"
  0000:5256  push   cs
  0000:5257  push   di
  0000:5258  xor    ax, ax
  0000:525a  push   ax
  0000:525b  xor    ax, ax
  0000:525d  push   ax
  0000:525e  xor    ax, ax
  0000:5260  push   ax
  0000:5261  xor    ax, ax
  0000:5263  push   ax
  0000:5264  xor    ax, ax
  0000:5266  push   ax
  0000:5267  lcall  U2:0eed:01c2 PrintLn
  0000:526c  add    word ptr [g38ac], 5
  0000:5271  mov    ax, word ptr [g38ac]
  0000:5274  cmp    ax, word ptr [g38ae]
  0000:5278  jle    0x5280
  0000:527a  mov    ax, word ptr [g38ae]
  0000:527d  mov    word ptr [g38ac], ax
L05280:
  0000:5280  mov    ax, word ptr [g395c]
  0000:5283  cdq    
  0000:5284  mov    cx, 3
  0000:5287  idiv   cx
  0000:5289  mov    dx, ax
  0000:528b  mov    ax, word ptr [g3952]
  0000:528e  inc    ax
  0000:528f  add    ax, dx
  0000:5291  add    word ptr [g38cb], ax
  0000:5295  cmp    byte ptr [g3696], 0
  0000:529a  jne    0x52d1
  0000:529c  mov    al, byte ptr [g3692]
  0000:529f  xor    ah, ah
  0000:52a1  dec    ax
  0000:52a2  mov    dx, 0xa
  0000:52a5  mul    dx
  0000:52a7  mov    dx, ax
  0000:52a9  mov    ax, word ptr [g38a6]
  0000:52ac  sub    ax, dx
  0000:52ae  cmp    ax, 3
  0000:52b1  jl     0x52d1
  0000:52b3  mov    byte ptr [g3696], 1
  0000:52b8  mov    di, 0x3a41    ; "^1Поновость улутшилась на столько, что тебе можно заходить в местный притон!"
  0000:52bb  push   cs
  0000:52bc  push   di
  0000:52bd  xor    ax, ax
  0000:52bf  push   ax
  0000:52c0  xor    ax, ax
  0000:52c2  push   ax
  0000:52c3  xor    ax, ax
  0000:52c5  push   ax
  0000:52c6  xor    ax, ax
  0000:52c8  push   ax
  0000:52c9  xor    ax, ax
  0000:52cb  push   ax
  0000:52cc  lcall  U2:0eed:01c2 PrintLn
L052d1:
  0000:52d1  mov    ax, 0x1e
  0000:52d4  push   ax
  0000:52d5  lcall  SYS:0f78:114b Random
  0000:52da  or     ax, ax
  0000:52dc  jbe    0x52e1
  0000:52de  jmp    0x53f7
L052e1:
  0000:52e1  cmp    byte ptr [g38bf], 0
  0000:52e6  je     0x52f6
  0000:52e8  cmp    byte ptr [g38c0], 0
  0000:52ed  je     0x52f6
  0000:52ef  cmp    byte ptr [g38c1], 0
  0000:52f4  jne    0x530f
L052f6:
  0000:52f6  mov    di, 0x3a8e    ; "^1Оба на! Колечко! Вот свезло, так свезло!"
  0000:52f9  push   cs
  0000:52fa  push   di
  0000:52fb  xor    ax, ax
  0000:52fd  push   ax
  0000:52fe  xor    ax, ax
  0000:5300  push   ax
  0000:5301  xor    ax, ax
  0000:5303  push   ax
  0000:5304  xor    ax, ax
  0000:5306  push   ax
  0000:5307  xor    ax, ax
  0000:5309  push   ax
  0000:530a  lcall  U2:0eed:01c2 PrintLn
L0530f:
  0000:530f  cmp    byte ptr [g38bf], 0
  0000:5314  jne    0x536a
  0000:5316  mov    di, 0x3ab9    ; "^1Кольцо "Помоги Господи""
  0000:5319  push   cs
  0000:531a  push   di
  0000:531b  xor    ax, ax
  0000:531d  push   ax
  0000:531e  xor    ax, ax
  0000:5320  push   ax
  0000:5321  xor    ax, ax
  0000:5323  push   ax
  0000:5324  xor    ax, ax
  0000:5326  push   ax
  0000:5327  xor    ax, ax
  0000:5329  push   ax
  0000:532a  lcall  U2:0eed:01c2 PrintLn
  0000:532f  inc    word ptr [g389e]
  0000:5333  inc    word ptr [g38a0]
  0000:5337  inc    word ptr [g38a2]
  0000:533b  inc    word ptr [g38a4]
  0000:533f  add    word ptr [g38ae], 6
  0000:5344  add    word ptr [g38ac], 6
  0000:5349  inc    word ptr [g38aa]
  0000:534d  mov    ax, word ptr [g389e]
  0000:5350  cdq    
  0000:5351  mov    cx, 2
  0000:5354  idiv   cx
  0000:5356  xchg   dx, ax
  0000:5357  mov    dx, ax
  0000:5359  mov    ax, 1
  0000:535c  sub    ax, dx
  0000:535e  add    word ptr [g38a8], ax
  0000:5362  mov    byte ptr [g38bf], 1
  0000:5367  jmp    0x53f7
L0536a:
  0000:536a  cmp    byte ptr [g38c0], 0
  0000:536f  jne    0x53b9
  0000:5371  mov    di, 0x3ad3    ; "^1"Мега Кольцо"!"
  0000:5374  push   cs
  0000:5375  push   di
  0000:5376  xor    ax, ax
  0000:5378  push   ax
  0000:5379  xor    ax, ax
  0000:537b  push   ax
  0000:537c  xor    ax, ax
  0000:537e  push   ax
  0000:537f  xor    ax, ax
  0000:5381  push   ax
  0000:5382  xor    ax, ax
  0000:5384  push   ax
  0000:5385  lcall  U2:0eed:01c2 PrintLn
  0000:538a  add    word ptr [g389e], 4
  0000:538f  add    word ptr [g38a0], 4
  0000:5394  add    word ptr [g38a2], 4
  0000:5399  add    word ptr [g38a4], 4
  0000:539e  add    word ptr [g38ae], 0x18
  0000:53a3  add    word ptr [g38ac], 0x18
  0000:53a8  add    word ptr [g38aa], 4
  0000:53ad  add    word ptr [g38a8], 2
  0000:53b2  mov    byte ptr [g38c0], 1
  0000:53b7  jmp    0x53f7
L053b9:
  0000:53b9  cmp    byte ptr [g38c1], 0
  0000:53be  jne    0x53f7
  0000:53c0  mov    di, 0x3ae4    ; "^1Ваще полезное кольцо "Господи помилуй""
  0000:53c3  push   cs
  0000:53c4  push   di
  0000:53c5  xor    ax, ax
  0000:53c7  push   ax
  0000:53c8  xor    ax, ax
  0000:53ca  push   ax
  0000:53cb  xor    ax, ax
  0000:53cd  push   ax
  0000:53ce  xor    ax, ax
  0000:53d0  push   ax
  0000:53d1  xor    ax, ax
  0000:53d3  push   ax
  0000:53d4  lcall  U2:0eed:01c2 PrintLn
  0000:53d9  mov    di, 0x3b0d    ; "^1Восст. жизни - 3, 5% - самозарост переломов"
  0000:53dc  push   cs
  0000:53dd  push   di
  0000:53de  xor    ax, ax
  0000:53e0  push   ax
  0000:53e1  xor    ax, ax
  0000:53e3  push   ax
  0000:53e4  xor    ax, ax
  0000:53e6  push   ax
  0000:53e7  xor    ax, ax
  0000:53e9  push   ax
  0000:53ea  xor    ax, ax
  0000:53ec  push   ax
  0000:53ed  lcall  U2:0eed:01c2 PrintLn
  0000:53f2  mov    byte ptr [g38c1], 1
L053f7:
  0000:53f7  mov    al, byte ptr [g3692]
  0000:53fa  xor    ah, ah
  0000:53fc  mov    dx, 0x19
  0000:53ff  mul    dx
  0000:5401  push   ax
  0000:5402  lcall  SYS:0f78:114b Random
  0000:5407  xor    dx, dx
  0000:5409  mov    cx, ax
  0000:540b  mov    bx, dx
  0000:540d  mov    ax, word ptr [g38a4]
  0000:5410  cdq    
  0000:5411  cmp    dx, bx
  0000:5413  jg     0x541b
  0000:5415  jl     0x5449
  0000:5417  cmp    ax, cx
  0000:5419  jb     0x5449
L0541b:
  0000:541b  mov    ax, word ptr [g3952]
  0000:541e  cmp    ax, 2
  0000:5421  jne    0x5449
  0000:5423  mov    ax, 3
  0000:5426  push   ax
  0000:5427  lcall  SYS:0f78:114b Random
  0000:542c  add    word ptr [g38c5], ax
  0000:5430  mov    di, 0x3b3b    ; "^1А у нарка был косячок"
  0000:5433  push   cs
  0000:5434  push   di
  0000:5435  xor    ax, ax
  0000:5437  push   ax
  0000:5438  xor    ax, ax
  0000:543a  push   ax
  0000:543b  xor    ax, ax
  0000:543d  push   ax
  0000:543e  xor    ax, ax
  0000:5440  push   ax
  0000:5441  xor    ax, ax
  0000:5443  push   ax
  0000:5444  lcall  U2:0eed:01c2 PrintLn
L05449:
  0000:5449  mov    al, byte ptr [g3692]
  0000:544c  xor    ah, ah
  0000:544e  mov    dx, 0x28
  0000:5451  mul    dx
  0000:5453  push   ax
  0000:5454  lcall  SYS:0f78:114b Random
  0000:5459  xor    dx, dx
  0000:545b  mov    cx, ax
  0000:545d  mov    bx, dx
  0000:545f  mov    ax, word ptr [g38a4]
  0000:5462  cdq    
  0000:5463  cmp    dx, bx
  0000:5465  jg     0x5473
  0000:5467  jge    0x546c
  0000:5469  jmp    0x57ce
L0546c:
  0000:546c  cmp    ax, cx
  0000:546e  jae    0x5473
  0000:5470  jmp    0x57ce
L05473:
  0000:5473  mov    ax, word ptr [g3952]
  0000:5476  cmp    ax, 1
  0000:5479  je     0x547e
  0000:547b  jmp    0x5515
L0547e:
  0000:547e  mov    ax, 3
  0000:5481  push   ax
  0000:5482  lcall  SYS:0f78:114b Random
  0000:5487  cmp    ax, 0
  0000:548a  jne    0x54b8
  0000:548c  cmp    byte ptr [g38bd], 0
  0000:5491  jne    0x54b6
  0000:5493  add    word ptr [g38a4], 2
  0000:5498  mov    di, 0x3b53    ; "^1Ты нашёл крестик: удача +2"
  0000:549b  push   cs
  0000:549c  push   di
  0000:549d  xor    ax, ax
  0000:549f  push   ax
  0000:54a0  xor    ax, ax
  0000:54a2  push   ax
  0000:54a3  xor    ax, ax
  0000:54a5  push   ax
  0000:54a6  xor    ax, ax
  0000:54a8  push   ax
  0000:54a9  xor    ax, ax
  0000:54ab  push   ax
  0000:54ac  lcall  U2:0eed:01c2 PrintLn
  0000:54b1  mov    byte ptr [g38bd], 1
L054b6:
  0000:54b6  jmp    0x5512
L054b8:
  0000:54b8  cmp    ax, 1
  0000:54bb  jne    0x54e8
  0000:54bd  cmp    byte ptr [g38be], 0
  0000:54c2  jne    0x54e6
  0000:54c4  inc    word ptr [g38a4]
  0000:54c8  mov    di, 0x3b70    ; "^1Ты нашёл кольцо "Господи спаси": удача +1"
  0000:54cb  push   cs
  0000:54cc  push   di
  0000:54cd  xor    ax, ax
  0000:54cf  push   ax
  0000:54d0  xor    ax, ax
  0000:54d2  push   ax
  0000:54d3  xor    ax, ax
  0000:54d5  push   ax
  0000:54d6  xor    ax, ax
  0000:54d8  push   ax
  0000:54d9  xor    ax, ax
  0000:54db  push   ax
  0000:54dc  lcall  U2:0eed:01c2 PrintLn
  0000:54e1  mov    byte ptr [g38be], 1
L054e6:
  0000:54e6  jmp    0x5512
L054e8:
  0000:54e8  cmp    ax, 2
  0000:54eb  jne    0x5512
  0000:54ed  cmp    byte ptr [g38bb], 0
  0000:54f2  jne    0x5512
  0000:54f4  mov    di, 0x3b9c    ; "^1Ты нашёл мобилу"
  0000:54f7  push   cs
  0000:54f8  push   di
  0000:54f9  xor    ax, ax
  0000:54fb  push   ax
  0000:54fc  xor    ax, ax
  0000:54fe  push   ax
  0000:54ff  xor    ax, ax
  0000:5501  push   ax
  0000:5502  xor    ax, ax
  0000:5504  push   ax
  0000:5505  xor    ax, ax
  0000:5507  push   ax
  0000:5508  lcall  U2:0eed:01c2 PrintLn
  0000:550d  mov    byte ptr [g38bb], 1
L05512:
  0000:5512  jmp    0x57ce
L05515:
  0000:5515  cmp    ax, 3
  0000:5518  je     0x552c
  0000:551a  cmp    ax, 4
  0000:551d  je     0x552c
  0000:551f  cmp    ax, 5
  0000:5522  je     0x552c
  0000:5524  cmp    ax, 6
  0000:5527  je     0x552c
  0000:5529  jmp    0x560e
L0552c:
  0000:552c  mov    ax, 2
  0000:552f  push   ax
  0000:5530  lcall  SYS:0f78:114b Random
  0000:5535  cmp    ax, 0
  0000:5538  jne    0x559b
  0000:553a  cmp    byte ptr [g38ba], 0
  0000:553f  jne    0x5599
  0000:5541  mov    byte ptr [g38ba], 1
  0000:5546  mov    di, 0x3bae    ; "^1Ты надыбал кастет(урон+2)"
  0000:5549  push   cs
  0000:554a  push   di
  0000:554b  xor    ax, ax
  0000:554d  push   ax
  0000:554e  xor    ax, ax
  0000:5550  push   ax
  0000:5551  xor    ax, ax
  0000:5553  push   ax
  0000:5554  xor    ax, ax
  0000:5556  push   ax
  0000:5557  xor    ax, ax
  0000:5559  push   ax
  0000:555a  lcall  U2:0eed:01c2 PrintLn
  0000:555f  cmp    byte ptr [g38c2], 0
  0000:5564  jne    0x5580
  0000:5566  cmp    byte ptr [g394b], 0
  0000:556b  jne    0x5580
  0000:556d  cmp    byte ptr [g394c], 0
  0000:5572  jne    0x5580
  0000:5574  add    word ptr [g38a8], 2
  0000:5579  add    word ptr [g38aa], 2
  0000:557e  jmp    0x5599
L05580:
  0000:5580  mov    di, 0x3bca    ; "^6Но у тебя есть более мощное оружие"
  0000:5583  push   cs
  0000:5584  push   di
  0000:5585  xor    ax, ax
  0000:5587  push   ax
  0000:5588  xor    ax, ax
  0000:558a  push   ax
  0000:558b  xor    ax, ax
  0000:558d  push   ax
  0000:558e  xor    ax, ax
  0000:5590  push   ax
  0000:5591  xor    ax, ax
  0000:5593  push   ax
  0000:5594  lcall  U2:0eed:01c2 PrintLn
L05599:
  0000:5599  jmp    0x560b
L0559b:
  0000:559b  cmp    ax, 1
  0000:559e  jne    0x560b
  0000:55a0  cmp    byte ptr [g394b], 0
  0000:55a5  jne    0x560b
  0000:55a7  mov    byte ptr [g394b], 1
  0000:55ac  mov    di, 0x3bef    ; "^1Ты отобрал у врага дубинку(урон+4)"
  0000:55af  push   cs
  0000:55b0  push   di
  0000:55b1  xor    ax, ax
  0000:55b3  push   ax
  0000:55b4  xor    ax, ax
  0000:55b6  push   ax
  0000:55b7  xor    ax, ax
  0000:55b9  push   ax
  0000:55ba  xor    ax, ax
  0000:55bc  push   ax
  0000:55bd  xor    ax, ax
  0000:55bf  push   ax
  0000:55c0  lcall  U2:0eed:01c2 PrintLn
  0000:55c5  cmp    byte ptr [g38c2], 0
  0000:55ca  jne    0x55f2
  0000:55cc  cmp    byte ptr [g394c], 0
  0000:55d1  jne    0x55f2
  0000:55d3  cmp    byte ptr [g38ba], 0
  0000:55d8  je     0x55e6
  0000:55da  add    word ptr [g38a8], 2
  0000:55df  add    word ptr [g38aa], 2
  0000:55e4  jmp    0x55f0
L055e6:
  0000:55e6  add    word ptr [g38a8], 4
  0000:55eb  add    word ptr [g38aa], 4
L055f0:
  0000:55f0  jmp    0x560b
L055f2:
  0000:55f2  mov    di, 0x3bca    ; "^6Но у тебя есть более мощное оружие"
  0000:55f5  push   cs
  0000:55f6  push   di
  0000:55f7  xor    ax, ax
  0000:55f9  push   ax
  0000:55fa  xor    ax, ax
  0000:55fc  push   ax
  0000:55fd  xor    ax, ax
  0000:55ff  push   ax
  0000:5600  xor    ax, ax
  0000:5602  push   ax
  0000:5603  xor    ax, ax
  0000:5605  push   ax
  0000:5606  lcall  U2:0eed:01c2 PrintLn
L0560b:
  0000:560b  jmp    0x57ce
L0560e:
  0000:560e  cmp    ax, 7
  0000:5611  jne    0x5675
  0000:5613  mov    ax, 2
  0000:5616  push   ax
  0000:5617  lcall  SYS:0f78:114b Random
  0000:561c  cmp    ax, 0
  0000:561f  jne    0x5648
  0000:5621  cmp    byte ptr [g38b3], 0
  0000:5626  jne    0x5646
  0000:5628  mov    byte ptr [g38b3], 1
  0000:562d  mov    di, 0x3c14    ; "^1Ты нашёл тёмные очки."
  0000:5630  push   cs
  0000:5631  push   di
  0000:5632  xor    ax, ax
  0000:5634  push   ax
  0000:5635  xor    ax, ax
  0000:5637  push   ax
  0000:5638  xor    ax, ax
  0000:563a  push   ax
  0000:563b  xor    ax, ax
  0000:563d  push   ax
  0000:563e  xor    ax, ax
  0000:5640  push   ax
  0000:5641  lcall  U2:0eed:01c2 PrintLn
L05646:
  0000:5646  jmp    0x5672
L05648:
  0000:5648  cmp    ax, 1
  0000:564b  jne    0x5672
  0000:564d  cmp    byte ptr [g38bb], 0
  0000:5652  jne    0x5672
  0000:5654  mov    di, 0x3b9c    ; "^1Ты нашёл мобилу"
  0000:5657  push   cs
  0000:5658  push   di
  0000:5659  xor    ax, ax
  0000:565b  push   ax
  0000:565c  xor    ax, ax
  0000:565e  push   ax
  0000:565f  xor    ax, ax
  0000:5661  push   ax
  0000:5662  xor    ax, ax
  0000:5664  push   ax
  0000:5665  xor    ax, ax
  0000:5667  push   ax
  0000:5668  lcall  U2:0eed:01c2 PrintLn
  0000:566d  mov    byte ptr [g38bb], 1
L05672:
  0000:5672  jmp    0x57ce
L05675:
  0000:5675  cmp    ax, 9
  0000:5678  je     0x567d
  0000:567a  jmp    0x57ce
L0567d:
  0000:567d  mov    ax, 2
  0000:5680  push   ax
  0000:5681  lcall  SYS:0f78:114b Random
  0000:5686  cmp    ax, 0
  0000:5689  je     0x568e
  0000:568b  jmp    0x572c
L0568e:
  0000:568e  cmp    byte ptr [g38c2], 0
  0000:5693  je     0x5698
  0000:5695  jmp    0x5729
L05698:
  0000:5698  mov    byte ptr [g38c2], 1
  0000:569d  mov    di, 0x3c2c    ; "^1Ты нашел ножик(урон+6)."
  0000:56a0  push   cs
  0000:56a1  push   di
  0000:56a2  xor    ax, ax
  0000:56a4  push   ax
  0000:56a5  xor    ax, ax
  0000:56a7  push   ax
  0000:56a8  xor    ax, ax
  0000:56aa  push   ax
  0000:56ab  xor    ax, ax
  0000:56ad  push   ax
  0000:56ae  xor    ax, ax
  0000:56b0  push   ax
  0000:56b1  lcall  U2:0eed:01c2 PrintLn
  0000:56b6  mov    al, 1
  0000:56b8  or     al, al
  0000:56ba  je     0x56c3
  0000:56bc  cmp    byte ptr [g394b], 0
  0000:56c1  je     0x56c7
L056c3:
  0000:56c3  mov    al, 0
  0000:56c5  jmp    0x56c9
L056c7:
  0000:56c7  mov    al, 1
L056c9:
  0000:56c9  cmp    al, byte ptr [g38ba]
  0000:56cd  jne    0x56d9
  0000:56cf  add    word ptr [g38a8], 4
  0000:56d4  add    word ptr [g38aa], 4
L056d9:
  0000:56d9  cmp    byte ptr [g394b], 0
  0000:56de  je     0x56ea
  0000:56e0  add    word ptr [g38a8], 2
  0000:56e5  add    word ptr [g38aa], 2
L056ea:
  0000:56ea  cmp    byte ptr [g38ba], 0
  0000:56ef  jne    0x5709
  0000:56f1  cmp    byte ptr [g394b], 0
  0000:56f6  jne    0x5709
  0000:56f8  cmp    byte ptr [g394c], 0
  0000:56fd  jne    0x5709
  0000:56ff  add    word ptr [g38a8], 6
  0000:5704  add    word ptr [g38aa], 6
L05709:
  0000:5709  cmp    byte ptr [g394c], 0
  0000:570e  je     0x5729
  0000:5710  mov    di, 0x3c46    ; "^6Но утебя есть тесак который круче."
  0000:5713  push   cs
  0000:5714  push   di
  0000:5715  xor    ax, ax
  0000:5717  push   ax
  0000:5718  xor    ax, ax
  0000:571a  push   ax
  0000:571b  xor    ax, ax
  0000:571d  push   ax
  0000:571e  xor    ax, ax
  0000:5720  push   ax
  0000:5721  xor    ax, ax
  0000:5723  push   ax
  0000:5724  lcall  U2:0eed:01c2 PrintLn
L05729:
  0000:5729  jmp    0x57ce
L0572c:
  0000:572c  cmp    ax, 1
  0000:572f  je     0x5734
  0000:5731  jmp    0x57ce
L05734:
  0000:5734  cmp    byte ptr [g394c], 0
  0000:5739  je     0x573e
  0000:573b  jmp    0x57ce
L0573e:
  0000:573e  mov    byte ptr [g394c], 1
  0000:5743  mov    di, 0x3c6b    ; "^1Ты нашел тесак(урон+9)!!! - ужасное оружие."
  0000:5746  push   cs
  0000:5747  push   di
  0000:5748  xor    ax, ax
  0000:574a  push   ax
  0000:574b  xor    ax, ax
  0000:574d  push   ax
  0000:574e  xor    ax, ax
  0000:5750  push   ax
  0000:5751  xor    ax, ax
  0000:5753  push   ax
  0000:5754  xor    ax, ax
  0000:5756  push   ax
  0000:5757  lcall  U2:0eed:01c2 PrintLn
  0000:575c  mov    al, 1
  0000:575e  or     al, al
  0000:5760  je     0x5770
  0000:5762  cmp    byte ptr [g394b], 0
  0000:5767  jne    0x5770
  0000:5769  cmp    byte ptr [g38c2], 0
  0000:576e  je     0x5774
L05770:
  0000:5770  mov    al, 0
  0000:5772  jmp    0x5776
L05774:
  0000:5774  mov    al, 1
L05776:
  0000:5776  cmp    al, byte ptr [g38ba]
  0000:577a  jne    0x5786
  0000:577c  add    word ptr [g38a8], 7
  0000:5781  add    word ptr [g38aa], 7
L05786:
  0000:5786  cmp    byte ptr [g394b], 0
  0000:578b  je     0x579e
  0000:578d  cmp    byte ptr [g38c2], 0
  0000:5792  jne    0x579e
  0000:5794  add    word ptr [g38a8], 5
  0000:5799  add    word ptr [g38aa], 5
L0579e:
  0000:579e  cmp    byte ptr [g38c2], 0
  0000:57a3  je     0x57af
  0000:57a5  add    word ptr [g38a8], 3
  0000:57aa  add    word ptr [g38aa], 3
L057af:
  0000:57af  cmp    byte ptr [g38ba], 0
  0000:57b4  jne    0x57ce
  0000:57b6  cmp    byte ptr [g394b], 0
  0000:57bb  jne    0x57ce
  0000:57bd  cmp    byte ptr [g38c2], 0
  0000:57c2  jne    0x57ce
  0000:57c4  add    word ptr [g38a8], 9
  0000:57c9  add    word ptr [g38aa], 9
L057ce:
  0000:57ce  cmp    byte ptr [bp + 4], 6
  0000:57d2  jne    0x5838
  0000:57d4  mov    al, byte ptr [g3692]
  0000:57d7  xor    ah, ah
  0000:57d9  mov    dx, 0x14
  0000:57dc  mul    dx
  0000:57de  add    word ptr [g38cb], ax
  0000:57e2  mov    di, 0x3c99    ; "^2Ты отпинал этого мудака - пацаны этого незабудут. Понтовость улутшилась на #."
  0000:57e5  push   cs
  0000:57e6  push   di
  0000:57e7  mov    al, byte ptr [g3692]
  0000:57ea  xor    ah, ah
  0000:57ec  mov    dx, 0x14
  0000:57ef  mul    dx
  0000:57f1  push   ax
  0000:57f2  xor    ax, ax
  0000:57f4  push   ax
  0000:57f5  xor    ax, ax
  0000:57f7  push   ax
  0000:57f8  xor    ax, ax
  0000:57fa  push   ax
  0000:57fb  xor    ax, ax
  0000:57fd  push   ax
  0000:57fe  lcall  U2:0eed:01c2 PrintLn
  0000:5803  mov    di, 0x3ce9    ; "^6Ты получаешь # качков опыта за помощь"
  0000:5806  push   cs
  0000:5807  push   di
  0000:5808  mov    al, byte ptr [g3692]
  0000:580b  xor    ah, ah
  0000:580d  mov    dx, 0xa
  0000:5810  mul    dx
  0000:5812  push   ax
  0000:5813  xor    ax, ax
  0000:5815  push   ax
  0000:5816  xor    ax, ax
  0000:5818  push   ax
  0000:5819  xor    ax, ax
  0000:581b  push   ax
  0000:581c  xor    ax, ax
  0000:581e  push   ax
  0000:581f  lcall  U2:0eed:01c2 PrintLn
  0000:5824  mov    al, byte ptr [g3692]
  0000:5827  xor    ah, ah
  0000:5829  mov    dx, 0xa
  0000:582c  mul    dx
  0000:582e  add    word ptr [g38ce], ax
  0000:5832  mov    al, 0
  0000:5834  push   ax
  0000:5835  call   0x2526
L05838:
  0000:5838  cmp    byte ptr [bp - 1], 0
  0000:583c  jne    0x5841
  0000:583e  jmp    0x40f2
L05841:
  0000:5841  xor    ax, ax
  0000:5843  mov    word ptr [g3c80], ax
  0000:5846  mov    sp, bp
  0000:5848  pop    bp
  0000:5849  ret    2
; ---- data 0000:584c (1801 bytes)
;   0000:584c str "^0Ну слушай, "
;   0000:585a str " "
;   0000:585c str " ^0,в чем тут батва"
;   0000:5870 str "^0 Вначале ты должен выбрать свой характер."
;   0000:589c str "^0 Например "
;   0000:58a9 str ":"
;   0000:58ab str "^0 Всего навыки в сумме составляют 12, а сила у тебя # - значит при получении"
;   0000:58f9 str "^0 нового уровня понтовости # из 12 шансов что увеличиться сила. То же и с "
;   0000:5945 str "^0 остальными навыками. Шансы не меняются."
;   0000:5970 str "^0"
;   0000:5973 str "^0 Сила - увеличивает урон, и довавляет 1 здоровья"
;   0000:59a6 str "^0 Ловкость -  +5% попадания если больше 90% то можно бить дважды."
;   0000:59e9 str "^0 Живучесть - 5 здоровья"
;   0000:5a03 str "^0 Удача - будет чаще везти по жизни"
;   0000:5a28 str "^0 "
;   0000:5a2c str "^0 Здоровье = 10+Живучесть*5+Сила"
;   0000:5a4e str "^0 Урон = (Сила/2)мин - (Сила)макс урону который нанесёшь "
;   0000:5a89 str "^0 Точность = (20+Ловкость*5)%"
;   0000:5aa8 str "^0 Броня - насколько уменьшается сила вражеского удара."
;   0000:5ae0 str "^0 Спомощью разных вещей можно улутшать навыки, урон, броню и т.д."
;   0000:5b23 str "^0 Заходя вразные места, ты узнаешь чего полезного можно из них получить."
;   0000:5b6d str "^0 Придя в новый район, ты должен находить все эти места снова."
;   0000:5bad str "^0 Хочешь спросить а че от них толку та?"
;   0000:5bd6 str "^0 Базар    - Покупаешь шмотки и еду. Можно воровать кошельки - Поднимай Удачу"
;   0000:5c25 str "^0 Больница - Лечить переломы и царапины"
;   0000:5c4e str "^0 Подруга  - Ты бомжуешь по кабакам и забыл че такое здоровый образ жизни. У неё"
;   0000:5ca0 str "^0            дома ты можешь пожить пару дней как человек - Поправить здоровье"
;   0000:5cef str "^0 Притон   - Там тусуются реальные пацаны, много че можно сделать, заходи туда"
;   0000:5d3f str "^0            почаще. А главное ты можешь позвать братву, если дела идут хреново,"
;   0000:5d91 str "^0            следи за притонной понтовостью."
;   0000:5dbf str "^0 Клуб     - Можно играть на бабло(Качай Удачу), но тамошние гопники не любят"
;   0000:5e0e str "^0            проигрывать"
;   0000:5e28 str "^0 Качалка  - Там можно повысить свои бойцовские навыки"
;   0000:5e60 str "^0 Барыги   - Продают вещи и арсенала гопника, им ты можешь спихнуть награбленый"
;   0000:5eb1 str "^0            хлам и продать ненужные вещи(Выделеные красным в твоей статистике)"
;   0000:5f02 str "^0Если не видать чё вверху - выйди и открой у G.exe:Свойства/Экран/Исходный размер"

;================ proc 0000:5f55  callers: 0eddc
  0000:5f55  push   bp
  0000:5f56  mov    bp, sp
  0000:5f58  mov    ax, 0x100
  0000:5f5b  lcall  SYS:0f78:02cd StackCheck
  0000:5f60  sub    sp, 0x100
  0000:5f64  lea    di, [bp - 0x100]
  0000:5f68  push   ss
  0000:5f69  push   di
  0000:5f6a  mov    di, 0x584c    ; "^0Ну слушай, "
  0000:5f6d  push   cs
  0000:5f6e  push   di
  0000:5f6f  lcall  SYS:0f78:0ae7 StrLoad
  0000:5f74  mov    di, word ptr [g389c]
  0000:5f78  mov    cl, 8
  0000:5f7a  shl    di, cl
  0000:5f7c  add    di, 0x2e
  0000:5f80  push   ds
  0000:5f81  push   di
  0000:5f82  lcall  SYS:0f78:0b66 StrConcat
  0000:5f87  mov    di, 0x585a    ; " "
  0000:5f8a  push   cs
  0000:5f8b  push   di
  0000:5f8c  lcall  SYS:0f78:0b66 StrConcat
  0000:5f91  mov    di, 0x379c
  0000:5f94  push   ds
  0000:5f95  push   di
  0000:5f96  lcall  SYS:0f78:0b66 StrConcat
  0000:5f9b  mov    di, 0x585c    ; " ^0,в чем тут батва"
  0000:5f9e  push   cs
  0000:5f9f  push   di
  0000:5fa0  lcall  SYS:0f78:0b66 StrConcat
  0000:5fa5  xor    ax, ax
  0000:5fa7  push   ax
  0000:5fa8  xor    ax, ax
  0000:5faa  push   ax
  0000:5fab  xor    ax, ax
  0000:5fad  push   ax
  0000:5fae  xor    ax, ax
  0000:5fb0  push   ax
  0000:5fb1  xor    ax, ax
  0000:5fb3  push   ax
  0000:5fb4  lcall  U2:0eed:01c2 PrintLn
  0000:5fb9  mov    di, 0x5870    ; "^0 Вначале ты должен выбрать свой характер."
  0000:5fbc  push   cs
  0000:5fbd  push   di
  0000:5fbe  xor    ax, ax
  0000:5fc0  push   ax
  0000:5fc1  xor    ax, ax
  0000:5fc3  push   ax
  0000:5fc4  xor    ax, ax
  0000:5fc6  push   ax
  0000:5fc7  xor    ax, ax
  0000:5fc9  push   ax
  0000:5fca  xor    ax, ax
  0000:5fcc  push   ax
  0000:5fcd  lcall  U2:0eed:01c2 PrintLn
  0000:5fd2  lea    di, [bp - 0x100]
  0000:5fd6  push   ss
  0000:5fd7  push   di
  0000:5fd8  mov    di, 0x589c    ; "^0 Например "
  0000:5fdb  push   cs
  0000:5fdc  push   di
  0000:5fdd  lcall  SYS:0f78:0ae7 StrLoad
  0000:5fe2  mov    di, word ptr [g389c]
  0000:5fe6  mov    cl, 8
  0000:5fe8  shl    di, cl
  0000:5fea  add    di, 0x2e
  0000:5fee  push   ds
  0000:5fef  push   di
  0000:5ff0  lcall  SYS:0f78:0b66 StrConcat
  0000:5ff5  mov    di, 0x58a9    ; ":"
  0000:5ff8  push   cs
  0000:5ff9  push   di
  0000:5ffa  lcall  SYS:0f78:0b66 StrConcat
  0000:5fff  xor    ax, ax
  0000:6001  push   ax
  0000:6002  xor    ax, ax
  0000:6004  push   ax
  0000:6005  xor    ax, ax
  0000:6007  push   ax
  0000:6008  xor    ax, ax
  0000:600a  push   ax
  0000:600b  xor    ax, ax
  0000:600d  push   ax
  0000:600e  lcall  U2:0eed:01c2 PrintLn
  0000:6013  mov    di, 0x58ab    ; "^0 Всего навыки в сумме составляют 12, а сила у тебя # - значит при получении"
  0000:6016  push   cs
  0000:6017  push   di
  0000:6018  mov    di, word ptr [g389c]
  0000:601c  shl    di, 1
  0000:601e  shl    di, 1
  0000:6020  mov    al, byte ptr [di + 2]
  0000:6024  xor    ah, ah
  0000:6026  push   ax
  0000:6027  xor    ax, ax
  0000:6029  push   ax
  0000:602a  xor    ax, ax
  0000:602c  push   ax
  0000:602d  xor    ax, ax
  0000:602f  push   ax
  0000:6030  xor    ax, ax
  0000:6032  push   ax
  0000:6033  lcall  U2:0eed:01c2 PrintLn
  0000:6038  mov    di, 0x58f9    ; "^0 нового уровня понтовости # из 12 шансов что увеличиться сила. То же и с "
  0000:603b  push   cs
  0000:603c  push   di
  0000:603d  mov    di, word ptr [g389c]
  0000:6041  shl    di, 1
  0000:6043  shl    di, 1
  0000:6045  mov    al, byte ptr [di + 2]
  0000:6049  xor    ah, ah
  0000:604b  push   ax
  0000:604c  xor    ax, ax
  0000:604e  push   ax
  0000:604f  xor    ax, ax
  0000:6051  push   ax
  0000:6052  xor    ax, ax
  0000:6054  push   ax
  0000:6055  xor    ax, ax
  0000:6057  push   ax
  0000:6058  lcall  U2:0eed:01c2 PrintLn
  0000:605d  mov    di, 0x5945    ; "^0 остальными навыками. Шансы не меняются."
  0000:6060  push   cs
  0000:6061  push   di
  0000:6062  xor    ax, ax
  0000:6064  push   ax
  0000:6065  xor    ax, ax
  0000:6067  push   ax
  0000:6068  xor    ax, ax
  0000:606a  push   ax
  0000:606b  xor    ax, ax
  0000:606d  push   ax
  0000:606e  xor    ax, ax
  0000:6070  push   ax
  0000:6071  lcall  U2:0eed:01c2 PrintLn
  0000:6076  mov    di, 0x5970    ; "^0"
  0000:6079  push   cs
  0000:607a  push   di
  0000:607b  xor    ax, ax
  0000:607d  push   ax
  0000:607e  xor    ax, ax
  0000:6080  push   ax
  0000:6081  xor    ax, ax
  0000:6083  push   ax
  0000:6084  xor    ax, ax
  0000:6086  push   ax
  0000:6087  xor    ax, ax
  0000:6089  push   ax
  0000:608a  lcall  U2:0eed:01c2 PrintLn
  0000:608f  mov    di, 0x5973    ; "^0 Сила - увеличивает урон, и довавляет 1 здоровья"
  0000:6092  push   cs
  0000:6093  push   di
  0000:6094  xor    ax, ax
  0000:6096  push   ax
  0000:6097  xor    ax, ax
  0000:6099  push   ax
  0000:609a  xor    ax, ax
  0000:609c  push   ax
  0000:609d  xor    ax, ax
  0000:609f  push   ax
  0000:60a0  xor    ax, ax
  0000:60a2  push   ax
  0000:60a3  lcall  U2:0eed:01c2 PrintLn
  0000:60a8  mov    di, 0x59a6    ; "^0 Ловкость -  +5% попадания если больше 90% то можно бить дважды."
  0000:60ab  push   cs
  0000:60ac  push   di
  0000:60ad  xor    ax, ax
  0000:60af  push   ax
  0000:60b0  xor    ax, ax
  0000:60b2  push   ax
  0000:60b3  xor    ax, ax
  0000:60b5  push   ax
  0000:60b6  xor    ax, ax
  0000:60b8  push   ax
  0000:60b9  xor    ax, ax
  0000:60bb  push   ax
  0000:60bc  lcall  U2:0eed:01c2 PrintLn
  0000:60c1  mov    di, 0x59e9    ; "^0 Живучесть - 5 здоровья"
  0000:60c4  push   cs
  0000:60c5  push   di
  0000:60c6  xor    ax, ax
  0000:60c8  push   ax
  0000:60c9  xor    ax, ax
  0000:60cb  push   ax
  0000:60cc  xor    ax, ax
  0000:60ce  push   ax
  0000:60cf  xor    ax, ax
  0000:60d1  push   ax
  0000:60d2  xor    ax, ax
  0000:60d4  push   ax
  0000:60d5  lcall  U2:0eed:01c2 PrintLn
  0000:60da  mov    di, 0x5a03    ; "^0 Удача - будет чаще везти по жизни"
  0000:60dd  push   cs
  0000:60de  push   di
  0000:60df  xor    ax, ax
  0000:60e1  push   ax
  0000:60e2  xor    ax, ax
  0000:60e4  push   ax
  0000:60e5  xor    ax, ax
  0000:60e7  push   ax
  0000:60e8  xor    ax, ax
  0000:60ea  push   ax
  0000:60eb  xor    ax, ax
  0000:60ed  push   ax
  0000:60ee  lcall  U2:0eed:01c2 PrintLn
  0000:60f3  mov    di, 0x5a28    ; "^0 "
  0000:60f6  push   cs
  0000:60f7  push   di
  0000:60f8  xor    ax, ax
  0000:60fa  push   ax
  0000:60fb  xor    ax, ax
  0000:60fd  push   ax
  0000:60fe  xor    ax, ax
  0000:6100  push   ax
  0000:6101  xor    ax, ax
  0000:6103  push   ax
  0000:6104  xor    ax, ax
  0000:6106  push   ax
  0000:6107  lcall  U2:0eed:01c2 PrintLn
  0000:610c  mov    di, 0x5a2c    ; "^0 Здоровье = 10+Живучесть*5+Сила"
  0000:610f  push   cs
  0000:6110  push   di
  0000:6111  xor    ax, ax
  0000:6113  push   ax
  0000:6114  xor    ax, ax
  0000:6116  push   ax
  0000:6117  xor    ax, ax
  0000:6119  push   ax
  0000:611a  xor    ax, ax
  0000:611c  push   ax
  0000:611d  xor    ax, ax
  0000:611f  push   ax
  0000:6120  lcall  U2:0eed:01c2 PrintLn
  0000:6125  mov    di, 0x5a4e    ; "^0 Урон = (Сила/2)мин - (Сила)макс урону который нанесёшь "
  0000:6128  push   cs
  0000:6129  push   di
  0000:612a  xor    ax, ax
  0000:612c  push   ax
  0000:612d  xor    ax, ax
  0000:612f  push   ax
  0000:6130  xor    ax, ax
  0000:6132  push   ax
  0000:6133  xor    ax, ax
  0000:6135  push   ax
  0000:6136  xor    ax, ax
  0000:6138  push   ax
  0000:6139  lcall  U2:0eed:01c2 PrintLn
  0000:613e  mov    di, 0x5a89    ; "^0 Точность = (20+Ловкость*5)%"
  0000:6141  push   cs
  0000:6142  push   di
  0000:6143  xor    ax, ax
  0000:6145  push   ax
  0000:6146  xor    ax, ax
  0000:6148  push   ax
  0000:6149  xor    ax, ax
  0000:614b  push   ax
  0000:614c  xor    ax, ax
  0000:614e  push   ax
  0000:614f  xor    ax, ax
  0000:6151  push   ax
  0000:6152  lcall  U2:0eed:01c2 PrintLn
  0000:6157  mov    di, 0x5aa8    ; "^0 Броня - насколько уменьшается сила вражеского удара."
  0000:615a  push   cs
  0000:615b  push   di
  0000:615c  xor    ax, ax
  0000:615e  push   ax
  0000:615f  xor    ax, ax
  0000:6161  push   ax
  0000:6162  xor    ax, ax
  0000:6164  push   ax
  0000:6165  xor    ax, ax
  0000:6167  push   ax
  0000:6168  xor    ax, ax
  0000:616a  push   ax
  0000:616b  lcall  U2:0eed:01c2 PrintLn
  0000:6170  mov    di, 0x5970    ; "^0"
  0000:6173  push   cs
  0000:6174  push   di
  0000:6175  xor    ax, ax
  0000:6177  push   ax
  0000:6178  xor    ax, ax
  0000:617a  push   ax
  0000:617b  xor    ax, ax
  0000:617d  push   ax
  0000:617e  xor    ax, ax
  0000:6180  push   ax
  0000:6181  xor    ax, ax
  0000:6183  push   ax
  0000:6184  lcall  U2:0eed:01c2 PrintLn
  0000:6189  mov    di, 0x5ae0    ; "^0 Спомощью разных вещей можно улутшать навыки, урон, броню и т.д."
  0000:618c  push   cs
  0000:618d  push   di
  0000:618e  xor    ax, ax
  0000:6190  push   ax
  0000:6191  xor    ax, ax
  0000:6193  push   ax
  0000:6194  xor    ax, ax
  0000:6196  push   ax
  0000:6197  xor    ax, ax
  0000:6199  push   ax
  0000:619a  xor    ax, ax
  0000:619c  push   ax
  0000:619d  lcall  U2:0eed:01c2 PrintLn
  0000:61a2  mov    di, 0x5b23    ; "^0 Заходя вразные места, ты узнаешь чего полезного можно из них получить."
  0000:61a5  push   cs
  0000:61a6  push   di
  0000:61a7  xor    ax, ax
  0000:61a9  push   ax
  0000:61aa  xor    ax, ax
  0000:61ac  push   ax
  0000:61ad  xor    ax, ax
  0000:61af  push   ax
  0000:61b0  xor    ax, ax
  0000:61b2  push   ax
  0000:61b3  xor    ax, ax
  0000:61b5  push   ax
  0000:61b6  lcall  U2:0eed:01c2 PrintLn
  0000:61bb  cmp    byte ptr [g3692], 1
  0000:61c0  jbe    0x61db
  0000:61c2  mov    di, 0x5b6d    ; "^0 Придя в новый район, ты должен находить все эти места снова."
  0000:61c5  push   cs
  0000:61c6  push   di
  0000:61c7  xor    ax, ax
  0000:61c9  push   ax
  0000:61ca  xor    ax, ax
  0000:61cc  push   ax
  0000:61cd  xor    ax, ax
  0000:61cf  push   ax
  0000:61d0  xor    ax, ax
  0000:61d2  push   ax
  0000:61d3  xor    ax, ax
  0000:61d5  push   ax
  0000:61d6  lcall  U2:0eed:01c2 PrintLn
L061db:
  0000:61db  mov    di, 0x5bad    ; "^0 Хочешь спросить а че от них толку та?"
  0000:61de  push   cs
  0000:61df  push   di
  0000:61e0  xor    ax, ax
  0000:61e2  push   ax
  0000:61e3  xor    ax, ax
  0000:61e5  push   ax
  0000:61e6  xor    ax, ax
  0000:61e8  push   ax
  0000:61e9  xor    ax, ax
  0000:61eb  push   ax
  0000:61ec  xor    ax, ax
  0000:61ee  push   ax
  0000:61ef  lcall  U2:0eed:01c2 PrintLn
  0000:61f4  mov    di, 0x5bd6    ; "^0 Базар    - Покупаешь шмотки и еду. Можно воровать кошельки - Поднимай Удачу"
  0000:61f7  push   cs
  0000:61f8  push   di
  0000:61f9  xor    ax, ax
  0000:61fb  push   ax
  0000:61fc  xor    ax, ax
  0000:61fe  push   ax
  0000:61ff  xor    ax, ax
  0000:6201  push   ax
  0000:6202  xor    ax, ax
  0000:6204  push   ax
  0000:6205  xor    ax, ax
  0000:6207  push   ax
  0000:6208  lcall  U2:0eed:01c2 PrintLn
  0000:620d  mov    di, 0x5c25    ; "^0 Больница - Лечить переломы и царапины"
  0000:6210  push   cs
  0000:6211  push   di
  0000:6212  xor    ax, ax
  0000:6214  push   ax
  0000:6215  xor    ax, ax
  0000:6217  push   ax
  0000:6218  xor    ax, ax
  0000:621a  push   ax
  0000:621b  xor    ax, ax
  0000:621d  push   ax
  0000:621e  xor    ax, ax
  0000:6220  push   ax
  0000:6221  lcall  U2:0eed:01c2 PrintLn
  0000:6226  mov    di, 0x5c4e    ; "^0 Подруга  - Ты бомжуешь по кабакам и забыл че такое здоровый образ жизни. У неё"
  0000:6229  push   cs
  0000:622a  push   di
  0000:622b  xor    ax, ax
  0000:622d  push   ax
  0000:622e  xor    ax, ax
  0000:6230  push   ax
  0000:6231  xor    ax, ax
  0000:6233  push   ax
  0000:6234  xor    ax, ax
  0000:6236  push   ax
  0000:6237  xor    ax, ax
  0000:6239  push   ax
  0000:623a  lcall  U2:0eed:01c2 PrintLn
  0000:623f  mov    di, 0x5ca0    ; "^0            дома ты можешь пожить пару дней как человек - Поправить здоровье"
  0000:6242  push   cs
  0000:6243  push   di
  0000:6244  xor    ax, ax
  0000:6246  push   ax
  0000:6247  xor    ax, ax
  0000:6249  push   ax
  0000:624a  xor    ax, ax
  0000:624c  push   ax
  0000:624d  xor    ax, ax
  0000:624f  push   ax
  0000:6250  xor    ax, ax
  0000:6252  push   ax
  0000:6253  lcall  U2:0eed:01c2 PrintLn
  0000:6258  mov    di, 0x5cef    ; "^0 Притон   - Там тусуются реальные пацаны, много че можно сделать, заходи туда"
  0000:625b  push   cs
  0000:625c  push   di
  0000:625d  xor    ax, ax
  0000:625f  push   ax
  0000:6260  xor    ax, ax
  0000:6262  push   ax
  0000:6263  xor    ax, ax
  0000:6265  push   ax
  0000:6266  xor    ax, ax
  0000:6268  push   ax
  0000:6269  xor    ax, ax
  0000:626b  push   ax
  0000:626c  lcall  U2:0eed:01c2 PrintLn
  0000:6271  mov    di, 0x5d3f    ; "^0            почаще. А главное ты можешь позвать братву, если дела идут хреново,"
  0000:6274  push   cs
  0000:6275  push   di
  0000:6276  xor    ax, ax
  0000:6278  push   ax
  0000:6279  xor    ax, ax
  0000:627b  push   ax
  0000:627c  xor    ax, ax
  0000:627e  push   ax
  0000:627f  xor    ax, ax
  0000:6281  push   ax
  0000:6282  xor    ax, ax
  0000:6284  push   ax
  0000:6285  lcall  U2:0eed:01c2 PrintLn
  0000:628a  mov    di, 0x5d91    ; "^0            следи за притонной понтовостью."
  0000:628d  push   cs
  0000:628e  push   di
  0000:628f  xor    ax, ax
  0000:6291  push   ax
  0000:6292  xor    ax, ax
  0000:6294  push   ax
  0000:6295  xor    ax, ax
  0000:6297  push   ax
  0000:6298  xor    ax, ax
  0000:629a  push   ax
  0000:629b  xor    ax, ax
  0000:629d  push   ax
  0000:629e  lcall  U2:0eed:01c2 PrintLn
  0000:62a3  mov    di, 0x5dbf    ; "^0 Клуб     - Можно играть на бабло(Качай Удачу), но тамошние гопники не любят"
  0000:62a6  push   cs
  0000:62a7  push   di
  0000:62a8  xor    ax, ax
  0000:62aa  push   ax
  0000:62ab  xor    ax, ax
  0000:62ad  push   ax
  0000:62ae  xor    ax, ax
  0000:62b0  push   ax
  0000:62b1  xor    ax, ax
  0000:62b3  push   ax
  0000:62b4  xor    ax, ax
  0000:62b6  push   ax
  0000:62b7  lcall  U2:0eed:01c2 PrintLn
  0000:62bc  mov    di, 0x5e0e    ; "^0            проигрывать"
  0000:62bf  push   cs
  0000:62c0  push   di
  0000:62c1  xor    ax, ax
  0000:62c3  push   ax
  0000:62c4  xor    ax, ax
  0000:62c6  push   ax
  0000:62c7  xor    ax, ax
  0000:62c9  push   ax
  0000:62ca  xor    ax, ax
  0000:62cc  push   ax
  0000:62cd  xor    ax, ax
  0000:62cf  push   ax
  0000:62d0  lcall  U2:0eed:01c2 PrintLn
  0000:62d5  mov    di, 0x5e28    ; "^0 Качалка  - Там можно повысить свои бойцовские навыки"
  0000:62d8  push   cs
  0000:62d9  push   di
  0000:62da  xor    ax, ax
  0000:62dc  push   ax
  0000:62dd  xor    ax, ax
  0000:62df  push   ax
  0000:62e0  xor    ax, ax
  0000:62e2  push   ax
  0000:62e3  xor    ax, ax
  0000:62e5  push   ax
  0000:62e6  xor    ax, ax
  0000:62e8  push   ax
  0000:62e9  lcall  U2:0eed:01c2 PrintLn
  0000:62ee  mov    di, 0x5e60    ; "^0 Барыги   - Продают вещи и арсенала гопника, им ты можешь спихнуть награбленый"
  0000:62f1  push   cs
  0000:62f2  push   di
  0000:62f3  xor    ax, ax
  0000:62f5  push   ax
  0000:62f6  xor    ax, ax
  0000:62f8  push   ax
  0000:62f9  xor    ax, ax
  0000:62fb  push   ax
  0000:62fc  xor    ax, ax
  0000:62fe  push   ax
  0000:62ff  xor    ax, ax
  0000:6301  push   ax
  0000:6302  lcall  U2:0eed:01c2 PrintLn
  0000:6307  mov    di, 0x5eb1    ; "^0            хлам и продать ненужные вещи(Выделеные красным в твоей статистике)"
  0000:630a  push   cs
  0000:630b  push   di
  0000:630c  xor    ax, ax
  0000:630e  push   ax
  0000:630f  xor    ax, ax
  0000:6311  push   ax
  0000:6312  xor    ax, ax
  0000:6314  push   ax
  0000:6315  xor    ax, ax
  0000:6317  push   ax
  0000:6318  xor    ax, ax
  0000:631a  push   ax
  0000:631b  lcall  U2:0eed:01c2 PrintLn
  0000:6320  mov    di, 0x5f02    ; "^0Если не видать чё вверху - выйди и открой у G.exe:Свойства/Экран/Исходный размер"
  0000:6323  push   cs
  0000:6324  push   di
  0000:6325  xor    ax, ax
  0000:6327  push   ax
  0000:6328  xor    ax, ax
  0000:632a  push   ax
  0000:632b  xor    ax, ax
  0000:632d  push   ax
  0000:632e  xor    ax, ax
  0000:6330  push   ax
  0000:6331  xor    ax, ax
  0000:6333  push   ax
  0000:6334  lcall  U2:0eed:01c2 PrintLn
  0000:6339  mov    sp, bp
  0000:633b  pop    bp
  0000:633c  ret    
; ---- data 0000:633d (1744 bytes)
;   0000:633d str "\\"
;   0000:633f str "save_r?.sav"
;   0000:634b str "^1или"
;   0000:6351 str "^1Можно начать с "
;   0000:6363 str " района"
;   0000:636b str "^1Можно начать с того места где ты сохранился"
;   0000:6399 str "^0Нажми цифру с какого района начать. 1-начать сначала"
;   0000:63d0 str "save_r"
;   0000:63d7 str ".sav"
;   0000:63dc str "^0Загружено из save_r"
;   0000:63f2 str "places.sav"
;   0000:63fd str "^0Загружено из places"
;   0000:6413 str "^6Чё-то глюкануло - немогу прoгрузить Places:Ресет ту Default"
;   0000:6451 str "^6Чё-то глюкануло - нaверно нет такого сейва, Default:1"
;   0000:6489 str "^4Gopnik: ^7version 1.02 june,sept 2003"
;   0000:64b1 str "Год 2xxx от Р.Х."
;   0000:64c2 str "Последний день ты пришел в универ"
;   0000:64e4 str "Ты по-страшному косил и забивал"
;   0000:6504 str "Ты ещё мог сдать все задания, которые ты взял у друзей"
;   0000:653b str "Но тут..."
;   0000:6545 str "^6Ректор: Ах ты урод, чёртов забивала. Вали из универа!"
;   0000:657d str "^2Ты: А типа чё?"
;   0000:658e str "^6Ректор: Ты отчислен мудак!!! Как ты был лохом так и останешься."
;   0000:65d0 str "^4Это слышали все и ты из пацана превратился в опушенного."
;   0000:660b str "Ты неможешь стерпеть такой наезд, однако ректор офигительно крутой."
;   0000:664f str "Ты решил доказать свою крутизну всему миру(в твоем понимании - Городу)."
;   0000:6697 str "Выбери кем ты будешь: "
;   0000:66ae str "0-Пацан"
;   0000:66b6 str "1-Отморозок"
;   0000:66c2 str "2-Гопник"
;   0000:66cb str "3-Вор"
;   0000:66d1 str "4-Чё за батва?"
;   0000:66e0 str "^1Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб)."
;   0000:6718 str "^1Отморозок - тупой корявый мудак. (Бонус - Самолечение царапин)."
;   0000:675a str "^1Гопник - гоп он и есть гоп. (Бонус - Притон)"
;   0000:6789 str "^1Вор - везучий ублюдок. (Бонус - Воровство, Барыги)"
;   0000:67be str "А теперь выбирай: "
;   0000:67d1 str "^2А зовут тебя:^7 "
;   0000:67e4 str "Раз^6дол^4бай"
;   0000:67f2 str "^7 "
;   0000:67f6 str "^1Ты стоишь у дверей университета."
;   0000:6819 str "^1Отсюда ты начнешь свой нелёгкий путь гопника."
;   0000:6849 str "^1Ты сел на автобус и попёрся на шлюз..."
;   0000:6872 str "^1Там бродит шлюзовская шпана."
;   0000:6891 str "^1На маршрутке ты доехал до ОбьГЭСа..."
;   0000:68b8 str "^1Здесь бродит уже более крутая гопота."
;   0000:68e0 str "^1Ты приехал в Ельцовку..."
;   0000:68fb str "^1Ото всюду доносятся крики запинываемых."
;   0000:6925 str "^1Пора наконец отомстить ректору..."
;   0000:6949 str "Доказать свою крутизну ты можешь, отпинывая разных мудаков."
;   0000:6985 str "Тебе придётся поработать над сабой, чтобы стать крутым."
;   0000:69bd str "Введи ^6i^7 чтобы посмотреть команды, введи ^6help^7 что бы узнать чё за батва."

;================ proc 0000:6a0d  callers: 0ab72
  0000:6a0d  push   bp
  0000:6a0e  mov    bp, sp
  0000:6a10  mov    ax, 0x200
  0000:6a13  lcall  SYS:0f78:02cd StackCheck
  0000:6a18  sub    sp, 0x200
  0000:6a1c  lcall  CRT:0f16:01cc ClrScr
  0000:6a21  mov    al, 0
  0000:6a23  push   ax
  0000:6a24  mov    di, 0x3d32
  0000:6a27  push   ds
  0000:6a28  push   di
  0000:6a29  mov    ax, 0xff
  0000:6a2c  push   ax
  0000:6a2d  lcall  SYS:0f78:08ec GetDir
  0000:6a32  lea    di, [bp - 0x100]
  0000:6a36  push   ss
  0000:6a37  push   di
  0000:6a38  mov    di, 0x3d32
  0000:6a3b  push   ds
  0000:6a3c  push   di
  0000:6a3d  lcall  SYS:0f78:0ae7 StrLoad
  0000:6a42  mov    di, 0x633d    ; "\"
  0000:6a45  push   cs
  0000:6a46  push   di
  0000:6a47  lcall  SYS:0f78:0b66 StrConcat
  0000:6a4c  mov    di, 0x3d32
  0000:6a4f  push   ds
  0000:6a50  push   di
  0000:6a51  mov    ax, 0xff
  0000:6a54  push   ax
  0000:6a55  lcall  SYS:0f78:0b01 StrStore
  0000:6a5a  call   0x2c2
  0000:6a5d  lcall  SYS:0f78:11e0 Randomize
  0000:6a62  mov    byte ptr [g3d04], 0
  0000:6a67  lea    di, [bp - 0x100]
  0000:6a6b  push   ss
  0000:6a6c  push   di
  0000:6a6d  mov    di, 0x3d32
  0000:6a70  push   ds
  0000:6a71  push   di
  0000:6a72  lcall  SYS:0f78:0ae7 StrLoad
  0000:6a77  mov    di, 0x633f    ; "save_r?.sav"
  0000:6a7a  push   cs
  0000:6a7b  push   di
  0000:6a7c  lcall  SYS:0f78:0b66 StrConcat
  0000:6a81  mov    ax, 0x3f
  0000:6a84  push   ax
  0000:6a85  mov    di, 0x3d06
  0000:6a88  push   ds
  0000:6a89  push   di
  0000:6a8a  lcall  U1:0ee5:0000 FindFirst
L06a8f:
  0000:6a8f  cmp    word ptr [g3eb6], 0
  0000:6a94  je     0x6a99
  0000:6a96  jmp    0x6b33
L06a99:
  0000:6a99  cmp    byte ptr [g3d04], 0
  0000:6a9e  jbe    0x6ab9
  0000:6aa0  mov    di, 0x634b    ; "^1или"
  0000:6aa3  push   cs
  0000:6aa4  push   di
  0000:6aa5  xor    ax, ax
  0000:6aa7  push   ax
  0000:6aa8  xor    ax, ax
  0000:6aaa  push   ax
  0000:6aab  xor    ax, ax
  0000:6aad  push   ax
  0000:6aae  xor    ax, ax
  0000:6ab0  push   ax
  0000:6ab1  xor    ax, ax
  0000:6ab3  push   ax
  0000:6ab4  lcall  U2:0eed:01c2 PrintLn
L06ab9:
  0000:6ab9  inc    byte ptr [g3d04]
  0000:6abd  cmp    byte ptr [g3d2b], 0x30
  0000:6ac2  je     0x6b06
  0000:6ac4  lea    di, [bp - 0x200]
  0000:6ac8  push   ss
  0000:6ac9  push   di
  0000:6aca  mov    di, 0x6351    ; "^1Можно начать с "
  0000:6acd  push   cs
  0000:6ace  push   di
  0000:6acf  lcall  SYS:0f78:0ae7 StrLoad
  0000:6ad4  lea    di, [bp - 0x100]
  0000:6ad8  push   ss
  0000:6ad9  push   di
  0000:6ada  mov    al, byte ptr [g3d2b]
  0000:6add  push   ax
  0000:6ade  lcall  SYS:0f78:0c03 CharToStr
  0000:6ae3  lcall  SYS:0f78:0b66 StrConcat
  0000:6ae8  mov    di, 0x6363    ; " района"
  0000:6aeb  push   cs
  0000:6aec  push   di
  0000:6aed  lcall  SYS:0f78:0b66 StrConcat
  0000:6af2  xor    ax, ax
  0000:6af4  push   ax
  0000:6af5  xor    ax, ax
  0000:6af7  push   ax
  0000:6af8  xor    ax, ax
  0000:6afa  push   ax
  0000:6afb  xor    ax, ax
  0000:6afd  push   ax
  0000:6afe  xor    ax, ax
  0000:6b00  push   ax
  0000:6b01  lcall  U2:0eed:01c2 PrintLn
L06b06:
  0000:6b06  cmp    byte ptr [g3d2b], 0x30
  0000:6b0b  jne    0x6b26
  0000:6b0d  mov    di, 0x636b    ; "^1Можно начать с того места где ты сохранился"
  0000:6b10  push   cs
  0000:6b11  push   di
  0000:6b12  xor    ax, ax
  0000:6b14  push   ax
  0000:6b15  xor    ax, ax
  0000:6b17  push   ax
  0000:6b18  xor    ax, ax
  0000:6b1a  push   ax
  0000:6b1b  xor    ax, ax
  0000:6b1d  push   ax
  0000:6b1e  xor    ax, ax
  0000:6b20  push   ax
  0000:6b21  lcall  U2:0eed:01c2 PrintLn
L06b26:
  0000:6b26  mov    di, 0x3d06
  0000:6b29  push   ds
  0000:6b2a  push   di
  0000:6b2b  lcall  U1:0ee5:003e FindNext
  0000:6b30  jmp    0x6a8f
L06b33:
  0000:6b33  cmp    byte ptr [g3d04], 0
  0000:6b38  ja     0x6b3d
  0000:6b3a  jmp    0x6dbe
L06b3d:
  0000:6b3d  mov    di, 0x6399    ; "^0Нажми цифру с какого района начать. 1-начать сначала"
  0000:6b40  push   cs
  0000:6b41  push   di
  0000:6b42  xor    ax, ax
  0000:6b44  push   ax
  0000:6b45  xor    ax, ax
  0000:6b47  push   ax
  0000:6b48  xor    ax, ax
  0000:6b4a  push   ax
  0000:6b4b  xor    ax, ax
  0000:6b4d  push   ax
  0000:6b4e  xor    ax, ax
  0000:6b50  push   ax
  0000:6b51  lcall  U2:0eed:01c2 PrintLn
  0000:6b56  lcall  CRT:0f16:031a ReadKey
  0000:6b5b  mov    byte ptr [g3d31], al
  0000:6b5e  cmp    byte ptr [g3d31], 0x32
  0000:6b63  je     0x6b84
  0000:6b65  cmp    byte ptr [g3d31], 0x33
  0000:6b6a  je     0x6b84
  0000:6b6c  cmp    byte ptr [g3d31], 0x34
  0000:6b71  je     0x6b84
  0000:6b73  cmp    byte ptr [g3d31], 0x35
  0000:6b78  je     0x6b84
  0000:6b7a  cmp    byte ptr [g3d31], 0x30
  0000:6b7f  je     0x6b84
  0000:6b81  jmp    0x6dbe
L06b84:
  0000:6b84  mov    di, 0x3c84
  0000:6b87  push   ds
  0000:6b88  push   di
  0000:6b89  lea    di, [bp - 0x100]
  0000:6b8d  push   ss
  0000:6b8e  push   di
  0000:6b8f  mov    di, 0x3d32
  0000:6b92  push   ds
  0000:6b93  push   di
  0000:6b94  lcall  SYS:0f78:0ae7 StrLoad
  0000:6b99  mov    di, 0x63d0    ; "save_r"
  0000:6b9c  push   cs
  0000:6b9d  push   di
  0000:6b9e  lcall  SYS:0f78:0b66 StrConcat
  0000:6ba3  lea    di, [bp - 0x200]
  0000:6ba7  push   ss
  0000:6ba8  push   di
  0000:6ba9  mov    al, byte ptr [g3d31]
  0000:6bac  push   ax
  0000:6bad  lcall  SYS:0f78:0c03 CharToStr
  0000:6bb2  lcall  SYS:0f78:0b66 StrConcat
  0000:6bb7  mov    di, 0x63d7    ; ".sav"
  0000:6bba  push   cs
  0000:6bbb  push   di
  0000:6bbc  lcall  SYS:0f78:0b66 StrConcat
  0000:6bc1  lcall  SYS:0f78:072e Assign
  0000:6bc6  mov    di, 0x3c84
  0000:6bc9  push   ds
  0000:6bca  push   di
  0000:6bcb  mov    ax, 0x2b6
  0000:6bce  push   ax
  0000:6bcf  lcall  SYS:0f78:0769 Reset
  0000:6bd4  lcall  SYS:0f78:028a IOResult
  0000:6bd9  or     ax, ax
  0000:6bdb  je     0x6be0
  0000:6bdd  jmp    0x6da5
L06be0:
  0000:6be0  lea    di, [bp - 0x100]
  0000:6be4  push   ss
  0000:6be5  push   di
  0000:6be6  mov    al, byte ptr [g3d31]
  0000:6be9  push   ax
  0000:6bea  lcall  SYS:0f78:0c03 CharToStr
  0000:6bef  mov    di, 0x3c7c
  0000:6bf2  push   ds
  0000:6bf3  push   di
  0000:6bf4  lcall  SYS:0f78:131b ValLong
  0000:6bf9  mov    byte ptr [g3692], al
  0000:6bfc  mov    di, 0x3c84
  0000:6bff  push   ds
  0000:6c00  push   di
  0000:6c01  mov    di, 0x369c
  0000:6c04  push   ds
  0000:6c05  push   di
  0000:6c06  lcall  SYS:0f78:081e ReadRec
  0000:6c0b  add    sp, 4
  0000:6c0e  mov    di, 0x3c84
  0000:6c11  push   ds
  0000:6c12  push   di
  0000:6c13  lcall  SYS:0f78:07ea Close
  0000:6c18  lea    di, [bp - 0x200]
  0000:6c1c  push   ss
  0000:6c1d  push   di
  0000:6c1e  mov    di, 0x63dc    ; "^0Загружено из save_r"
  0000:6c21  push   cs
  0000:6c22  push   di
  0000:6c23  lcall  SYS:0f78:0ae7 StrLoad
  0000:6c28  lea    di, [bp - 0x100]
  0000:6c2c  push   ss
  0000:6c2d  push   di
  0000:6c2e  mov    al, byte ptr [g3d31]
  0000:6c31  push   ax
  0000:6c32  lcall  SYS:0f78:0c03 CharToStr
  0000:6c37  lcall  SYS:0f78:0b66 StrConcat
  0000:6c3c  xor    ax, ax
  0000:6c3e  push   ax
  0000:6c3f  xor    ax, ax
  0000:6c41  push   ax
  0000:6c42  xor    ax, ax
  0000:6c44  push   ax
  0000:6c45  xor    ax, ax
  0000:6c47  push   ax
  0000:6c48  xor    ax, ax
  0000:6c4a  push   ax
  0000:6c4b  lcall  U2:0eed:01c2 PrintLn
  0000:6c50  cmp    byte ptr [g3692], 0
  0000:6c55  je     0x6c5a
  0000:6c57  jmp    0x6d8c
L06c5a:
  0000:6c5a  mov    di, 0x3e36
  0000:6c5d  push   ds
  0000:6c5e  push   di
  0000:6c5f  lea    di, [bp - 0x100]
  0000:6c63  push   ss
  0000:6c64  push   di
  0000:6c65  mov    di, 0x3d32
  0000:6c68  push   ds
  0000:6c69  push   di
  0000:6c6a  lcall  SYS:0f78:0ae7 StrLoad
  0000:6c6f  mov    di, 0x63f2    ; "places.sav"
  0000:6c72  push   cs
  0000:6c73  push   di
  0000:6c74  lcall  SYS:0f78:0b66 StrConcat
  0000:6c79  lcall  SYS:0f78:072e Assign
  0000:6c7e  mov    di, 0x3e36
  0000:6c81  push   ds
  0000:6c82  push   di
  0000:6c83  mov    ax, 1
  0000:6c86  push   ax
  0000:6c87  lcall  SYS:0f78:0769 Reset
  0000:6c8c  lcall  SYS:0f78:028a IOResult
  0000:6c91  or     ax, ax
  0000:6c93  je     0x6c98
  0000:6c95  jmp    0x6d3b
L06c98:
  0000:6c98  mov    di, 0x3e36
  0000:6c9b  push   ds
  0000:6c9c  push   di
  0000:6c9d  mov    di, 0x3694
  0000:6ca0  push   ds
  0000:6ca1  push   di
  0000:6ca2  lcall  SYS:0f78:081e ReadRec
  0000:6ca7  add    sp, 4
  0000:6caa  mov    di, 0x3e36
  0000:6cad  push   ds
  0000:6cae  push   di
  0000:6caf  mov    di, 0x3695
  0000:6cb2  push   ds
  0000:6cb3  push   di
  0000:6cb4  lcall  SYS:0f78:081e ReadRec
  0000:6cb9  add    sp, 4
  0000:6cbc  mov    di, 0x3e36
  0000:6cbf  push   ds
  0000:6cc0  push   di
  0000:6cc1  mov    di, 0x3696
  0000:6cc4  push   ds
  0000:6cc5  push   di
  0000:6cc6  lcall  SYS:0f78:081e ReadRec
  0000:6ccb  add    sp, 4
  0000:6cce  mov    di, 0x3e36
  0000:6cd1  push   ds
  0000:6cd2  push   di
  0000:6cd3  mov    di, 0x3697
  0000:6cd6  push   ds
  0000:6cd7  push   di
  0000:6cd8  lcall  SYS:0f78:081e ReadRec
  0000:6cdd  add    sp, 4
  0000:6ce0  mov    di, 0x3e36
  0000:6ce3  push   ds
  0000:6ce4  push   di
  0000:6ce5  mov    di, 0x3698
  0000:6ce8  push   ds
  0000:6ce9  push   di
  0000:6cea  lcall  SYS:0f78:081e ReadRec
  0000:6cef  add    sp, 4
  0000:6cf2  mov    di, 0x3e36
  0000:6cf5  push   ds
  0000:6cf6  push   di
  0000:6cf7  mov    di, 0x3699
  0000:6cfa  push   ds
  0000:6cfb  push   di
  0000:6cfc  lcall  SYS:0f78:081e ReadRec
  0000:6d01  add    sp, 4
  0000:6d04  mov    di, 0x3e36
  0000:6d07  push   ds
  0000:6d08  push   di
  0000:6d09  mov    di, 0x369a
  0000:6d0c  push   ds
  0000:6d0d  push   di
  0000:6d0e  lcall  SYS:0f78:081e ReadRec
  0000:6d13  add    sp, 4
  0000:6d16  mov    di, 0x3e36
  0000:6d19  push   ds
  0000:6d1a  push   di
  0000:6d1b  lcall  SYS:0f78:07ea Close
  0000:6d20  mov    di, 0x63fd    ; "^0Загружено из places"
  0000:6d23  push   cs
  0000:6d24  push   di
  0000:6d25  xor    ax, ax
  0000:6d27  push   ax
  0000:6d28  xor    ax, ax
  0000:6d2a  push   ax
  0000:6d2b  xor    ax, ax
  0000:6d2d  push   ax
  0000:6d2e  xor    ax, ax
  0000:6d30  push   ax
  0000:6d31  xor    ax, ax
  0000:6d33  push   ax
  0000:6d34  lcall  U2:0eed:01c2 PrintLn
  0000:6d39  jmp    0x6d8c
L06d3b:
  0000:6d3b  mov    byte ptr [g3698], 0
  0000:6d40  mov    byte ptr [g3694], 0
  0000:6d45  cmp    word ptr [g389c], 3
  0000:6d4a  je     0x6d51
  0000:6d4c  mov    byte ptr [g3699], 0
L06d51:
  0000:6d51  mov    byte ptr [g369a], 0
  0000:6d56  cmp    word ptr [g389c], 3
  0000:6d5b  je     0x6d62
  0000:6d5d  mov    byte ptr [g3697], 0
L06d62:
  0000:6d62  mov    byte ptr [g3695], 0
  0000:6d67  cmp    word ptr [g389c], 5
  0000:6d6c  je     0x6d73
  0000:6d6e  mov    byte ptr [g3696], 0
L06d73:
  0000:6d73  mov    di, 0x6413    ; "^6Чё-то глюкануло - немогу прoгрузить Places:Ресет ту Default"
  0000:6d76  push   cs
  0000:6d77  push   di
  0000:6d78  xor    ax, ax
  0000:6d7a  push   ax
  0000:6d7b  xor    ax, ax
  0000:6d7d  push   ax
  0000:6d7e  xor    ax, ax
  0000:6d80  push   ax
  0000:6d81  xor    ax, ax
  0000:6d83  push   ax
  0000:6d84  xor    ax, ax
  0000:6d86  push   ax
  0000:6d87  lcall  U2:0eed:01c2 PrintLn
L06d8c:
  0000:6d8c  cmp    byte ptr [g3692], 0
  0000:6d91  jne    0x6da0
  0000:6d93  mov    ax, word ptr [g38a6]
  0000:6d96  cdq    
  0000:6d97  mov    cx, 0xa
  0000:6d9a  idiv   cx
  0000:6d9c  inc    ax
  0000:6d9d  mov    byte ptr [g3692], al
L06da0:
  0000:6da0  jmp    0x7262
; ---- data 0000:6da3 (2 bytes)
;   0000:6da3 db eb
;   0000:6da4 db 19
L06da5:
  0000:6da5  mov    di, 0x6451    ; "^6Чё-то глюкануло - нaверно нет такого сейва, Default:1"
  0000:6da8  push   cs
  0000:6da9  push   di
  0000:6daa  xor    ax, ax
  0000:6dac  push   ax
  0000:6dad  xor    ax, ax
  0000:6daf  push   ax
  0000:6db0  xor    ax, ax
  0000:6db2  push   ax
  0000:6db3  xor    ax, ax
  0000:6db5  push   ax
  0000:6db6  xor    ax, ax
  0000:6db8  push   ax
  0000:6db9  lcall  U2:0eed:01c2 PrintLn
L06dbe:
  0000:6dbe  mov    byte ptr [g3692], 1
  0000:6dc3  mov    byte ptr [g3698], 1
  0000:6dc8  mov    byte ptr [g3694], 1
  0000:6dcd  mov    di, 0x6489    ; "^4Gopnik: ^7version 1.02 june,sept 2003"
  0000:6dd0  push   cs
  0000:6dd1  push   di
  0000:6dd2  mov    di, 0x369c
  0000:6dd5  push   ds
  0000:6dd6  push   di
  0000:6dd7  mov    ax, 0xff
  0000:6dda  push   ax
  0000:6ddb  lcall  SYS:0f78:0b01 StrStore
  0000:6de0  mov    word ptr [g38d0], 0xa
  0000:6de6  mov    di, 0x64b1    ; "Год 2xxx от Р.Х."
  0000:6de9  push   cs
  0000:6dea  push   di
  0000:6deb  xor    ax, ax
  0000:6ded  push   ax
  0000:6dee  xor    ax, ax
  0000:6df0  push   ax
  0000:6df1  xor    ax, ax
  0000:6df3  push   ax
  0000:6df4  xor    ax, ax
  0000:6df6  push   ax
  0000:6df7  xor    ax, ax
  0000:6df9  push   ax
  0000:6dfa  lcall  U2:0eed:01c2 PrintLn
  0000:6dff  lcall  CRT:0f16:031a ReadKey
  0000:6e04  mov    di, 0x64c2    ; "Последний день ты пришел в универ"
  0000:6e07  push   cs
  0000:6e08  push   di
  0000:6e09  xor    ax, ax
  0000:6e0b  push   ax
  0000:6e0c  xor    ax, ax
  0000:6e0e  push   ax
  0000:6e0f  xor    ax, ax
  0000:6e11  push   ax
  0000:6e12  xor    ax, ax
  0000:6e14  push   ax
  0000:6e15  xor    ax, ax
  0000:6e17  push   ax
  0000:6e18  lcall  U2:0eed:01c2 PrintLn
  0000:6e1d  mov    di, 0x64e4    ; "Ты по-страшному косил и забивал"
  0000:6e20  push   cs
  0000:6e21  push   di
  0000:6e22  xor    ax, ax
  0000:6e24  push   ax
  0000:6e25  xor    ax, ax
  0000:6e27  push   ax
  0000:6e28  xor    ax, ax
  0000:6e2a  push   ax
  0000:6e2b  xor    ax, ax
  0000:6e2d  push   ax
  0000:6e2e  xor    ax, ax
  0000:6e30  push   ax
  0000:6e31  lcall  U2:0eed:01c2 PrintLn
  0000:6e36  mov    di, 0x6504    ; "Ты ещё мог сдать все задания, которые ты взял у друзей"
  0000:6e39  push   cs
  0000:6e3a  push   di
  0000:6e3b  xor    ax, ax
  0000:6e3d  push   ax
  0000:6e3e  xor    ax, ax
  0000:6e40  push   ax
  0000:6e41  xor    ax, ax
  0000:6e43  push   ax
  0000:6e44  xor    ax, ax
  0000:6e46  push   ax
  0000:6e47  xor    ax, ax
  0000:6e49  push   ax
  0000:6e4a  lcall  U2:0eed:01c2 PrintLn
  0000:6e4f  mov    di, 0x653b    ; "Но тут..."
  0000:6e52  push   cs
  0000:6e53  push   di
  0000:6e54  xor    ax, ax
  0000:6e56  push   ax
  0000:6e57  xor    ax, ax
  0000:6e59  push   ax
  0000:6e5a  xor    ax, ax
  0000:6e5c  push   ax
  0000:6e5d  xor    ax, ax
  0000:6e5f  push   ax
  0000:6e60  xor    ax, ax
  0000:6e62  push   ax
  0000:6e63  lcall  U2:0eed:01c2 PrintLn
  0000:6e68  lcall  CRT:0f16:031a ReadKey
  0000:6e6d  mov    di, 0x6545    ; "^6Ректор: Ах ты урод, чёртов забивала. Вали из универа!"
  0000:6e70  push   cs
  0000:6e71  push   di
  0000:6e72  xor    ax, ax
  0000:6e74  push   ax
  0000:6e75  xor    ax, ax
  0000:6e77  push   ax
  0000:6e78  xor    ax, ax
  0000:6e7a  push   ax
  0000:6e7b  xor    ax, ax
  0000:6e7d  push   ax
  0000:6e7e  xor    ax, ax
  0000:6e80  push   ax
  0000:6e81  lcall  U2:0eed:01c2 PrintLn
  0000:6e86  lcall  CRT:0f16:031a ReadKey
  0000:6e8b  mov    di, 0x657d    ; "^2Ты: А типа чё?"
  0000:6e8e  push   cs
  0000:6e8f  push   di
  0000:6e90  xor    ax, ax
  0000:6e92  push   ax
  0000:6e93  xor    ax, ax
  0000:6e95  push   ax
  0000:6e96  xor    ax, ax
  0000:6e98  push   ax
  0000:6e99  xor    ax, ax
  0000:6e9b  push   ax
  0000:6e9c  xor    ax, ax
  0000:6e9e  push   ax
  0000:6e9f  lcall  U2:0eed:01c2 PrintLn
  0000:6ea4  lcall  CRT:0f16:031a ReadKey
  0000:6ea9  mov    di, 0x658e    ; "^6Ректор: Ты отчислен мудак!!! Как ты был лохом так и останешься."
  0000:6eac  push   cs
  0000:6ead  push   di
  0000:6eae  xor    ax, ax
  0000:6eb0  push   ax
  0000:6eb1  xor    ax, ax
  0000:6eb3  push   ax
  0000:6eb4  xor    ax, ax
  0000:6eb6  push   ax
  0000:6eb7  xor    ax, ax
  0000:6eb9  push   ax
  0000:6eba  xor    ax, ax
  0000:6ebc  push   ax
  0000:6ebd  lcall  U2:0eed:01c2 PrintLn
  0000:6ec2  lcall  CRT:0f16:031a ReadKey
  0000:6ec7  mov    di, 0x65d0    ; "^4Это слышали все и ты из пацана превратился в опушенного."
  0000:6eca  push   cs
  0000:6ecb  push   di
  0000:6ecc  xor    ax, ax
  0000:6ece  push   ax
  0000:6ecf  xor    ax, ax
  0000:6ed1  push   ax
  0000:6ed2  xor    ax, ax
  0000:6ed4  push   ax
  0000:6ed5  xor    ax, ax
  0000:6ed7  push   ax
  0000:6ed8  xor    ax, ax
  0000:6eda  push   ax
  0000:6edb  lcall  U2:0eed:01c2 PrintLn
  0000:6ee0  lcall  CRT:0f16:031a ReadKey
  0000:6ee5  mov    di, 0x3fcc
  0000:6ee8  push   ds
  0000:6ee9  push   di
  0000:6eea  lcall  SYS:0f78:05dd WriteLnEnd
  0000:6eef  lcall  SYS:0f78:0291 IOCheck
  0000:6ef4  mov    di, 0x660b    ; "Ты неможешь стерпеть такой наезд, однако ректор офигительно крутой."
  0000:6ef7  push   cs
  0000:6ef8  push   di
  0000:6ef9  xor    ax, ax
  0000:6efb  push   ax
  0000:6efc  xor    ax, ax
  0000:6efe  push   ax
  0000:6eff  xor    ax, ax
  0000:6f01  push   ax
  0000:6f02  xor    ax, ax
  0000:6f04  push   ax
  0000:6f05  xor    ax, ax
  0000:6f07  push   ax
  0000:6f08  lcall  U2:0eed:01c2 PrintLn
  0000:6f0d  mov    di, 0x664f    ; "Ты решил доказать свою крутизну всему миру(в твоем понимании - Городу)."
  0000:6f10  push   cs
  0000:6f11  push   di
  0000:6f12  xor    ax, ax
  0000:6f14  push   ax
  0000:6f15  xor    ax, ax
  0000:6f17  push   ax
  0000:6f18  xor    ax, ax
  0000:6f1a  push   ax
  0000:6f1b  xor    ax, ax
  0000:6f1d  push   ax
  0000:6f1e  xor    ax, ax
  0000:6f20  push   ax
  0000:6f21  lcall  U2:0eed:01c2 PrintLn
  0000:6f26  lcall  CRT:0f16:031a ReadKey
  0000:6f2b  mov    di, 0x6697    ; "Выбери кем ты будешь: "
  0000:6f2e  push   cs
  0000:6f2f  push   di
  0000:6f30  xor    ax, ax
  0000:6f32  push   ax
  0000:6f33  xor    ax, ax
  0000:6f35  push   ax
  0000:6f36  xor    ax, ax
  0000:6f38  push   ax
  0000:6f39  xor    ax, ax
  0000:6f3b  push   ax
  0000:6f3c  xor    ax, ax
  0000:6f3e  push   ax
  0000:6f3f  lcall  U2:0eed:01c2 PrintLn
  0000:6f44  mov    di, 0x66ae    ; "0-Пацан"
  0000:6f47  push   cs
  0000:6f48  push   di
  0000:6f49  xor    ax, ax
  0000:6f4b  push   ax
  0000:6f4c  xor    ax, ax
  0000:6f4e  push   ax
  0000:6f4f  xor    ax, ax
  0000:6f51  push   ax
  0000:6f52  xor    ax, ax
  0000:6f54  push   ax
  0000:6f55  xor    ax, ax
  0000:6f57  push   ax
  0000:6f58  lcall  U2:0eed:01c2 PrintLn
  0000:6f5d  mov    di, 0x66b6    ; "1-Отморозок"
  0000:6f60  push   cs
  0000:6f61  push   di
  0000:6f62  xor    ax, ax
  0000:6f64  push   ax
  0000:6f65  xor    ax, ax
  0000:6f67  push   ax
  0000:6f68  xor    ax, ax
  0000:6f6a  push   ax
  0000:6f6b  xor    ax, ax
  0000:6f6d  push   ax
  0000:6f6e  xor    ax, ax
  0000:6f70  push   ax
  0000:6f71  lcall  U2:0eed:01c2 PrintLn
  0000:6f76  mov    di, 0x66c2    ; "2-Гопник"
  0000:6f79  push   cs
  0000:6f7a  push   di
  0000:6f7b  xor    ax, ax
  0000:6f7d  push   ax
  0000:6f7e  xor    ax, ax
  0000:6f80  push   ax
  0000:6f81  xor    ax, ax
  0000:6f83  push   ax
  0000:6f84  xor    ax, ax
  0000:6f86  push   ax
  0000:6f87  xor    ax, ax
  0000:6f89  push   ax
  0000:6f8a  lcall  U2:0eed:01c2 PrintLn
  0000:6f8f  mov    di, 0x66cb    ; "3-Вор"
  0000:6f92  push   cs
  0000:6f93  push   di
  0000:6f94  xor    ax, ax
  0000:6f96  push   ax
  0000:6f97  xor    ax, ax
  0000:6f99  push   ax
  0000:6f9a  xor    ax, ax
  0000:6f9c  push   ax
  0000:6f9d  xor    ax, ax
  0000:6f9f  push   ax
  0000:6fa0  xor    ax, ax
  0000:6fa2  push   ax
  0000:6fa3  lcall  U2:0eed:01c2 PrintLn
  0000:6fa8  mov    di, 0x66d1    ; "4-Чё за батва?"
  0000:6fab  push   cs
  0000:6fac  push   di
  0000:6fad  xor    ax, ax
  0000:6faf  push   ax
  0000:6fb0  xor    ax, ax
  0000:6fb2  push   ax
  0000:6fb3  xor    ax, ax
  0000:6fb5  push   ax
  0000:6fb6  xor    ax, ax
  0000:6fb8  push   ax
  0000:6fb9  xor    ax, ax
  0000:6fbb  push   ax
  0000:6fbc  lcall  U2:0eed:01c2 PrintLn
  0000:6fc1  mov    di, 0x3ecc
  0000:6fc4  push   ds
  0000:6fc5  push   di
  0000:6fc6  mov    di, 0x3b7c
  0000:6fc9  push   ds
  0000:6fca  push   di
  0000:6fcb  mov    ax, 0xff
  0000:6fce  push   ax
  0000:6fcf  lcall  SYS:0f78:06c6 ReadStr
  0000:6fd4  lcall  SYS:0f78:059d ReadLnEnd
  0000:6fd9  lcall  SYS:0f78:0291 IOCheck
  0000:6fde  mov    di, 0x3b7c
  0000:6fe1  push   ds
  0000:6fe2  push   di
  0000:6fe3  mov    di, 0x3c7c
  0000:6fe6  push   ds
  0000:6fe7  push   di
  0000:6fe8  lcall  SYS:0f78:131b ValLong
  0000:6fed  mov    word ptr [g389c], ax
  0000:6ff0  cmp    word ptr [g389c], 4
  0000:6ff5  je     0x6ffa
  0000:6ff7  jmp    0x712d
L06ffa:
  0000:6ffa  xor    ax, ax
  0000:6ffc  mov    word ptr [g389c], ax
  0000:6fff  mov    di, 0x3fcc
  0000:7002  push   ds
  0000:7003  push   di
  0000:7004  lcall  SYS:0f78:05dd WriteLnEnd
  0000:7009  lcall  SYS:0f78:0291 IOCheck
  0000:700e  mov    di, 0x66e0    ; "^1Пацан - это нормальный тип. (Бонус - Гёлфренд, Клуб)."
  0000:7011  push   cs
  0000:7012  push   di
  0000:7013  xor    ax, ax
  0000:7015  push   ax
  0000:7016  xor    ax, ax
  0000:7018  push   ax
  0000:7019  xor    ax, ax
  0000:701b  push   ax
  0000:701c  xor    ax, ax
  0000:701e  push   ax
  0000:701f  xor    ax, ax
  0000:7021  push   ax
  0000:7022  lcall  U2:0eed:01c2 PrintLn
  0000:7027  mov    di, 0x6718    ; "^1Отморозок - тупой корявый мудак. (Бонус - Самолечение царапин)."
  0000:702a  push   cs
  0000:702b  push   di
  0000:702c  xor    ax, ax
  0000:702e  push   ax
  0000:702f  xor    ax, ax
  0000:7031  push   ax
  0000:7032  xor    ax, ax
  0000:7034  push   ax
  0000:7035  xor    ax, ax
  0000:7037  push   ax
  0000:7038  xor    ax, ax
  0000:703a  push   ax
  0000:703b  lcall  U2:0eed:01c2 PrintLn
  0000:7040  mov    di, 0x675a    ; "^1Гопник - гоп он и есть гоп. (Бонус - Притон)"
  0000:7043  push   cs
  0000:7044  push   di
  0000:7045  xor    ax, ax
  0000:7047  push   ax
  0000:7048  xor    ax, ax
  0000:704a  push   ax
  0000:704b  xor    ax, ax
  0000:704d  push   ax
  0000:704e  xor    ax, ax
  0000:7050  push   ax
  0000:7051  xor    ax, ax
  0000:7053  push   ax
  0000:7054  lcall  U2:0eed:01c2 PrintLn
  0000:7059  mov    di, 0x6789    ; "^1Вор - везучий ублюдок. (Бонус - Воровство, Барыги)"
  0000:705c  push   cs
  0000:705d  push   di
  0000:705e  xor    ax, ax
  0000:7060  push   ax
  0000:7061  xor    ax, ax
  0000:7063  push   ax
  0000:7064  xor    ax, ax
  0000:7066  push   ax
  0000:7067  xor    ax, ax
  0000:7069  push   ax
  0000:706a  xor    ax, ax
  0000:706c  push   ax
  0000:706d  lcall  U2:0eed:01c2 PrintLn
  0000:7072  mov    di, 0x3fcc
  0000:7075  push   ds
  0000:7076  push   di
  0000:7077  lcall  SYS:0f78:05dd WriteLnEnd
  0000:707c  lcall  SYS:0f78:0291 IOCheck
  0000:7081  mov    di, 0x67be    ; "А теперь выбирай: "
  0000:7084  push   cs
  0000:7085  push   di
  0000:7086  xor    ax, ax
  0000:7088  push   ax
  0000:7089  xor    ax, ax
  0000:708b  push   ax
  0000:708c  xor    ax, ax
  0000:708e  push   ax
  0000:708f  xor    ax, ax
  0000:7091  push   ax
  0000:7092  xor    ax, ax
  0000:7094  push   ax
  0000:7095  lcall  U2:0eed:01c2 PrintLn
  0000:709a  mov    di, 0x66ae    ; "0-Пацан"
  0000:709d  push   cs
  0000:709e  push   di
  0000:709f  xor    ax, ax
  0000:70a1  push   ax
  0000:70a2  xor    ax, ax
  0000:70a4  push   ax
  0000:70a5  xor    ax, ax
  0000:70a7  push   ax
  0000:70a8  xor    ax, ax
  0000:70aa  push   ax
  0000:70ab  xor    ax, ax
  0000:70ad  push   ax
  0000:70ae  lcall  U2:0eed:01c2 PrintLn
  0000:70b3  mov    di, 0x66b6    ; "1-Отморозок"
  0000:70b6  push   cs
  0000:70b7  push   di
  0000:70b8  xor    ax, ax
  0000:70ba  push   ax
  0000:70bb  xor    ax, ax
  0000:70bd  push   ax
  0000:70be  xor    ax, ax
  0000:70c0  push   ax
  0000:70c1  xor    ax, ax
  0000:70c3  push   ax
  0000:70c4  xor    ax, ax
  0000:70c6  push   ax
  0000:70c7  lcall  U2:0eed:01c2 PrintLn
  0000:70cc  mov    di, 0x66c2    ; "2-Гопник"
  0000:70cf  push   cs
  0000:70d0  push   di
  0000:70d1  xor    ax, ax
  0000:70d3  push   ax
  0000:70d4  xor    ax, ax
  0000:70d6  push   ax
  0000:70d7  xor    ax, ax
  0000:70d9  push   ax
  0000:70da  xor    ax, ax
  0000:70dc  push   ax
  0000:70dd  xor    ax, ax
  0000:70df  push   ax
  0000:70e0  lcall  U2:0eed:01c2 PrintLn
  0000:70e5  mov    di, 0x66cb    ; "3-Вор"
  0000:70e8  push   cs
  0000:70e9  push   di
  0000:70ea  xor    ax, ax
  0000:70ec  push   ax
  0000:70ed  xor    ax, ax
  0000:70ef  push   ax
  0000:70f0  xor    ax, ax
  0000:70f2  push   ax
  0000:70f3  xor    ax, ax
  0000:70f5  push   ax
  0000:70f6  xor    ax, ax
  0000:70f8  push   ax
  0000:70f9  lcall  U2:0eed:01c2 PrintLn
  0000:70fe  mov    di, 0x3ecc
  0000:7101  push   ds
  0000:7102  push   di
  0000:7103  mov    di, 0x3b7c
  0000:7106  push   ds
  0000:7107  push   di
  0000:7108  mov    ax, 0xff
  0000:710b  push   ax
  0000:710c  lcall  SYS:0f78:06c6 ReadStr
  0000:7111  lcall  SYS:0f78:059d ReadLnEnd
  0000:7116  lcall  SYS:0f78:0291 IOCheck
  0000:711b  mov    di, 0x3b7c
  0000:711e  push   ds
  0000:711f  push   di
  0000:7120  mov    di, 0x3c7c
  0000:7123  push   ds
  0000:7124  push   di
  0000:7125  lcall  SYS:0f78:131b ValLong
  0000:712a  mov    word ptr [g389c], ax
L0712d:
  0000:712d  cmp    word ptr [g389c], 0
  0000:7132  jl     0x713b
  0000:7134  cmp    word ptr [g389c], 3
  0000:7139  jle    0x7140
L0713b:
  0000:713b  xor    ax, ax
  0000:713d  mov    word ptr [g389c], ax
L07140:
  0000:7140  mov    ax, word ptr [g389c]
  0000:7143  cmp    ax, 1
  0000:7146  jne    0x7162
  0000:7148  mov    word ptr [g389e], 5
  0000:714e  mov    word ptr [g38a0], 2
  0000:7154  mov    word ptr [g38a2], 4
  0000:715a  mov    word ptr [g38a4], 1
  0000:7160  jmp    0x71b8
L07162:
  0000:7162  cmp    ax, 2
  0000:7165  jne    0x7181
  0000:7167  mov    word ptr [g389e], 4
  0000:716d  mov    word ptr [g38a0], 3
  0000:7173  mov    word ptr [g38a2], 3
  0000:7179  mov    word ptr [g38a4], 2
  0000:717f  jmp    0x71b8
L07181:
  0000:7181  cmp    ax, 3
  0000:7184  jne    0x71a0
  0000:7186  mov    word ptr [g389e], 3
  0000:718c  mov    word ptr [g38a0], 3
  0000:7192  mov    word ptr [g38a2], 2
  0000:7198  mov    word ptr [g38a4], 4
  0000:719e  jmp    0x71b8
L071a0:
  0000:71a0  mov    word ptr [g389e], 3
  0000:71a6  mov    word ptr [g38a0], 3
  0000:71ac  mov    word ptr [g38a2], 3
  0000:71b2  mov    word ptr [g38a4], 3
L071b8:
  0000:71b8  add    word ptr [g389c], 3
  0000:71bd  mov    ax, word ptr [g38a2]
  0000:71c0  mov    si, ax
  0000:71c2  shl    ax, 1
  0000:71c4  shl    ax, 1
  0000:71c6  add    ax, si
  0000:71c8  add    ax, 0xa
  0000:71cb  add    ax, word ptr [g389e]
  0000:71cf  mov    word ptr [g38ae], ax
  0000:71d2  mov    ax, word ptr [g38ae]
  0000:71d5  mov    word ptr [g38ac], ax
  0000:71d8  mov    ax, word ptr [g389e]
  0000:71db  cdq    
  0000:71dc  mov    cx, 2
  0000:71df  idiv   cx
  0000:71e1  mov    word ptr [g38a8], ax
  0000:71e4  mov    ax, word ptr [g389e]
  0000:71e7  mov    word ptr [g38aa], ax
  0000:71ea  mov    di, 0x67d1    ; "^2А зовут тебя:^7 "
  0000:71ed  push   cs
  0000:71ee  push   di
  0000:71ef  xor    ax, ax
  0000:71f1  push   ax
  0000:71f2  xor    ax, ax
  0000:71f4  push   ax
  0000:71f5  xor    ax, ax
  0000:71f7  push   ax
  0000:71f8  xor    ax, ax
  0000:71fa  push   ax
  0000:71fb  xor    ax, ax
  0000:71fd  push   ax
  0000:71fe  lcall  U2:0eed:0000 Print
  0000:7203  mov    di, 0x3ecc
  0000:7206  push   ds
  0000:7207  push   di
  0000:7208  mov    di, 0x379c
  0000:720b  push   ds
  0000:720c  push   di
  0000:720d  mov    ax, 0xff
  0000:7210  push   ax
  0000:7211  lcall  SYS:0f78:06c6 ReadStr
  0000:7216  lcall  SYS:0f78:059d ReadLnEnd
  0000:721b  lcall  SYS:0f78:0291 IOCheck
  0000:7220  cmp    byte ptr [g379c], 0
  0000:7225  jne    0x723a
  0000:7227  mov    di, 0x67e4    ; "Раз^6дол^4бай"
  0000:722a  push   cs
  0000:722b  push   di
  0000:722c  mov    di, 0x379c
  0000:722f  push   ds
  0000:7230  push   di
  0000:7231  mov    ax, 0xff
  0000:7234  push   ax
  0000:7235  lcall  SYS:0f78:0b01 StrStore
L0723a:
  0000:723a  lea    di, [bp - 0x100]
  0000:723e  push   ss
  0000:723f  push   di
  0000:7240  mov    di, 0x67f2    ; "^7 "
  0000:7243  push   cs
  0000:7244  push   di
  0000:7245  lcall  SYS:0f78:0ae7 StrLoad
  0000:724a  mov    di, 0x379c
  0000:724d  push   ds
  0000:724e  push   di
  0000:724f  lcall  SYS:0f78:0b66 StrConcat
  0000:7254  mov    di, 0x379c
  0000:7257  push   ds
  0000:7258  push   di
  0000:7259  mov    ax, 0xff
  0000:725c  push   ax
  0000:725d  lcall  SYS:0f78:0b01 StrStore
L07262:
  0000:7262  mov    al, byte ptr [g3692]
  0000:7265  cmp    al, 1
  0000:7267  jne    0x729e
  0000:7269  mov    di, 0x67f6    ; "^1Ты стоишь у дверей университета."
  0000:726c  push   cs
  0000:726d  push   di
  0000:726e  xor    ax, ax
  0000:7270  push   ax
  0000:7271  xor    ax, ax
  0000:7273  push   ax
  0000:7274  xor    ax, ax
  0000:7276  push   ax
  0000:7277  xor    ax, ax
  0000:7279  push   ax
  0000:727a  xor    ax, ax
  0000:727c  push   ax
  0000:727d  lcall  U2:0eed:01c2 PrintLn
  0000:7282  mov    di, 0x6819    ; "^1Отсюда ты начнешь свой нелёгкий путь гопника."
  0000:7285  push   cs
  0000:7286  push   di
  0000:7287  xor    ax, ax
  0000:7289  push   ax
  0000:728a  xor    ax, ax
  0000:728c  push   ax
  0000:728d  xor    ax, ax
  0000:728f  push   ax
  0000:7290  xor    ax, ax
  0000:7292  push   ax
  0000:7293  xor    ax, ax
  0000:7295  push   ax
  0000:7296  lcall  U2:0eed:01c2 PrintLn
  0000:729b  jmp    0x7369
L0729e:
  0000:729e  cmp    al, 2
  0000:72a0  jne    0x72d7
  0000:72a2  mov    di, 0x6849    ; "^1Ты сел на автобус и попёрся на шлюз..."
  0000:72a5  push   cs
  0000:72a6  push   di
  0000:72a7  xor    ax, ax
  0000:72a9  push   ax
  0000:72aa  xor    ax, ax
  0000:72ac  push   ax
  0000:72ad  xor    ax, ax
  0000:72af  push   ax
  0000:72b0  xor    ax, ax
  0000:72b2  push   ax
  0000:72b3  xor    ax, ax
  0000:72b5  push   ax
  0000:72b6  lcall  U2:0eed:01c2 PrintLn
  0000:72bb  mov    di, 0x6872    ; "^1Там бродит шлюзовская шпана."
  0000:72be  push   cs
  0000:72bf  push   di
  0000:72c0  xor    ax, ax
  0000:72c2  push   ax
  0000:72c3  xor    ax, ax
  0000:72c5  push   ax
  0000:72c6  xor    ax, ax
  0000:72c8  push   ax
  0000:72c9  xor    ax, ax
  0000:72cb  push   ax
  0000:72cc  xor    ax, ax
  0000:72ce  push   ax
  0000:72cf  lcall  U2:0eed:01c2 PrintLn
  0000:72d4  jmp    0x7369
L072d7:
  0000:72d7  cmp    al, 3
  0000:72d9  jne    0x730f
  0000:72db  mov    di, 0x6891    ; "^1На маршрутке ты доехал до ОбьГЭСа..."
  0000:72de  push   cs
  0000:72df  push   di
  0000:72e0  xor    ax, ax
  0000:72e2  push   ax
  0000:72e3  xor    ax, ax
  0000:72e5  push   ax
  0000:72e6  xor    ax, ax
  0000:72e8  push   ax
  0000:72e9  xor    ax, ax
  0000:72eb  push   ax
  0000:72ec  xor    ax, ax
  0000:72ee  push   ax
  0000:72ef  lcall  U2:0eed:01c2 PrintLn
  0000:72f4  mov    di, 0x68b8    ; "^1Здесь бродит уже более крутая гопота."
  0000:72f7  push   cs
  0000:72f8  push   di
  0000:72f9  xor    ax, ax
  0000:72fb  push   ax
  0000:72fc  xor    ax, ax
  0000:72fe  push   ax
  0000:72ff  xor    ax, ax
  0000:7301  push   ax
  0000:7302  xor    ax, ax
  0000:7304  push   ax
  0000:7305  xor    ax, ax
  0000:7307  push   ax
  0000:7308  lcall  U2:0eed:01c2 PrintLn
  0000:730d  jmp    0x7369
L0730f:
  0000:730f  cmp    al, 4
  0000:7311  jne    0x7347
  0000:7313  mov    di, 0x68e0    ; "^1Ты приехал в Ельцовку..."
  0000:7316  push   cs
  0000:7317  push   di
  0000:7318  xor    ax, ax
  0000:731a  push   ax
  0000:731b  xor    ax, ax
  0000:731d  push   ax
  0000:731e  xor    ax, ax
  0000:7320  push   ax
  0000:7321  xor    ax, ax
  0000:7323  push   ax
  0000:7324  xor    ax, ax
  0000:7326  push   ax
  0000:7327  lcall  U2:0eed:01c2 PrintLn
  0000:732c  mov    di, 0x68fb    ; "^1Ото всюду доносятся крики запинываемых."
  0000:732f  push   cs
  0000:7330  push   di
  0000:7331  xor    ax, ax
  0000:7333  push   ax
  0000:7334  xor    ax, ax
  0000:7336  push   ax
  0000:7337  xor    ax, ax
  0000:7339  push   ax
  0000:733a  xor    ax, ax
  0000:733c  push   ax
  0000:733d  xor    ax, ax
  0000:733f  push   ax
  0000:7340  lcall  U2:0eed:01c2 PrintLn
  0000:7345  jmp    0x7369
L07347:
  0000:7347  cmp    al, 5
  0000:7349  jne    0x7369
  0000:734b  mov    di, 0x6925    ; "^1Пора наконец отомстить ректору..."
  0000:734e  push   cs
  0000:734f  push   di
  0000:7350  xor    ax, ax
  0000:7352  push   ax
  0000:7353  xor    ax, ax
  0000:7355  push   ax
  0000:7356  xor    ax, ax
  0000:7358  push   ax
  0000:7359  xor    ax, ax
  0000:735b  push   ax
  0000:735c  xor    ax, ax
  0000:735e  push   ax
  0000:735f  lcall  U2:0eed:01c2 PrintLn
  0000:7364  mov    byte ptr [g3c83], 1
L07369:
  0000:7369  cmp    byte ptr [g3692], 1
  0000:736e  jne    0x73bb
  0000:7370  mov    di, 0x6949    ; "Доказать свою крутизну ты можешь, отпинывая разных мудаков."
  0000:7373  push   cs
  0000:7374  push   di
  0000:7375  xor    ax, ax
  0000:7377  push   ax
  0000:7378  xor    ax, ax
  0000:737a  push   ax
  0000:737b  xor    ax, ax
  0000:737d  push   ax
  0000:737e  xor    ax, ax
  0000:7380  push   ax
  0000:7381  xor    ax, ax
  0000:7383  push   ax
  0000:7384  lcall  U2:0eed:01c2 PrintLn
  0000:7389  mov    di, 0x6985    ; "Тебе придётся поработать над сабой, чтобы стать крутым."
  0000:738c  push   cs
  0000:738d  push   di
  0000:738e  xor    ax, ax
  0000:7390  push   ax
  0000:7391  xor    ax, ax
  0000:7393  push   ax
  0000:7394  xor    ax, ax
  0000:7396  push   ax
  0000:7397  xor    ax, ax
  0000:7399  push   ax
  0000:739a  xor    ax, ax
  0000:739c  push   ax
  0000:739d  lcall  U2:0eed:01c2 PrintLn
  0000:73a2  mov    di, 0x69bd    ; "Введи ^6i^7 чтобы посмотреть команды, введи ^6help^7 что бы узнать чё за батва."
  0000:73a5  push   cs
  0000:73a6  push   di
  0000:73a7  xor    ax, ax
  0000:73a9  push   ax
  0000:73aa  xor    ax, ax
  0000:73ac  push   ax
  0000:73ad  xor    ax, ax
  0000:73af  push   ax
  0000:73b0  xor    ax, ax
  0000:73b2  push   ax
  0000:73b3  xor    ax, ax
  0000:73b5  push   ax
  0000:73b6  lcall  U2:0eed:01c2 PrintLn
L073bb:
  0000:73bb  mov    ax, word ptr [g389c]
  0000:73be  cmp    ax, 5
  0000:73c1  jne    0x73ca
  0000:73c3  mov    byte ptr [g3696], 1
  0000:73c8  jmp    0x73e5
L073ca:
  0000:73ca  cmp    ax, 3
  0000:73cd  jne    0x73db
  0000:73cf  mov    byte ptr [g3697], 1
  0000:73d4  mov    byte ptr [g3699], 1
  0000:73d9  jmp    0x73e5
L073db:
  0000:73db  cmp    ax, 6
  0000:73de  jne    0x73e5
  0000:73e0  mov    byte ptr [g3695], 1
L073e5:
  0000:73e5  mov    byte ptr [g3e35], 5
  0000:73ea  mov    sp, bp
  0000:73ec  pop    bp
  0000:73ed  ret    
; ---- data 0000:73ee (330 bytes)
;   0000:73ee str "Бродя по окрестностям с самыми грязными намериниями..."
;   0000:7425 str "Ты встретил великого мага и экстрасенса - Рушеля Блаво."
;   0000:745d str "За # рублей он может сделать сохранение прямо здесь."
;   0000:7492 str "Ты хочешь сохраниться?"
;   0000:74a9 str "y"
;   0000:74ab str "save_r0.sav"
;   0000:74b7 str "places.sav"
;   0000:74c2 str "^0Сохранено! ^1Можешь беспредельничать дальше."
;   0000:74f1 str "^6Парень, все стоит бабок!"
;   0000:750c str "^6Нехотите как хотите - мое дело предложить"

;================ proc 0000:7538  callers: 0b3b7
  0000:7538  push   bp
  0000:7539  mov    bp, sp
  0000:753b  mov    ax, 0x200
  0000:753e  lcall  SYS:0f78:02cd StackCheck
  0000:7543  sub    sp, 0x200
  0000:7547  mov    di, 0x73ee    ; "Бродя по окрестностям с самыми грязными намериниями..."
  0000:754a  push   cs
  0000:754b  push   di
  0000:754c  xor    ax, ax
  0000:754e  push   ax
  0000:754f  xor    ax, ax
  0000:7551  push   ax
  0000:7552  xor    ax, ax
  0000:7554  push   ax
  0000:7555  xor    ax, ax
  0000:7557  push   ax
  0000:7558  xor    ax, ax
  0000:755a  push   ax
  0000:755b  lcall  U2:0eed:01c2 PrintLn
  0000:7560  lcall  CRT:0f16:031a ReadKey
  0000:7565  mov    di, 0x7425    ; "Ты встретил великого мага и экстрасенса - Рушеля Блаво."
  0000:7568  push   cs
  0000:7569  push   di
  0000:756a  xor    ax, ax
  0000:756c  push   ax
  0000:756d  xor    ax, ax
  0000:756f  push   ax
  0000:7570  xor    ax, ax
  0000:7572  push   ax
  0000:7573  xor    ax, ax
  0000:7575  push   ax
  0000:7576  xor    ax, ax
  0000:7578  push   ax
  0000:7579  lcall  U2:0eed:01c2 PrintLn
  0000:757e  lcall  CRT:0f16:031a ReadKey
  0000:7583  mov    di, 0x745d    ; "За # рублей он может сделать сохранение прямо здесь."
  0000:7586  push   cs
  0000:7587  push   di
  0000:7588  mov    al, byte ptr [g3692]
  0000:758b  xor    ah, ah
  0000:758d  mov    dx, 0x19
  0000:7590  mul    dx
  0000:7592  push   ax
  0000:7593  xor    ax, ax
  0000:7595  push   ax
  0000:7596  xor    ax, ax
  0000:7598  push   ax
  0000:7599  xor    ax, ax
  0000:759b  push   ax
  0000:759c  xor    ax, ax
  0000:759e  push   ax
  0000:759f  lcall  U2:0eed:01c2 PrintLn
  0000:75a4  lcall  CRT:0f16:031a ReadKey
  0000:75a9  mov    di, 0x7492    ; "Ты хочешь сохраниться?"
  0000:75ac  push   cs
  0000:75ad  push   di
  0000:75ae  xor    ax, ax
  0000:75b0  push   ax
  0000:75b1  xor    ax, ax
  0000:75b3  push   ax
  0000:75b4  xor    ax, ax
  0000:75b6  push   ax
  0000:75b7  xor    ax, ax
  0000:75b9  push   ax
  0000:75ba  xor    ax, ax
  0000:75bc  push   ax
  0000:75bd  lcall  U2:0eed:01c2 PrintLn
  0000:75c2  mov    di, 0x3ecc
  0000:75c5  push   ds
  0000:75c6  push   di
  0000:75c7  lea    di, [bp - 0x100]
  0000:75cb  push   ss
  0000:75cc  push   di
  0000:75cd  mov    ax, 0xff
  0000:75d0  push   ax
  0000:75d1  lcall  SYS:0f78:06c6 ReadStr
  0000:75d6  lcall  SYS:0f78:059d ReadLnEnd
  0000:75db  lcall  SYS:0f78:0291 IOCheck
  0000:75e0  lea    di, [bp - 0x100]
  0000:75e4  push   ss
  0000:75e5  push   di
  0000:75e6  lcall  U2:0eed:0216 LowerCase
  0000:75eb  lea    di, [bp - 0x100]
  0000:75ef  push   ss
  0000:75f0  push   di
  0000:75f1  mov    di, 0x74a9    ; "y"
  0000:75f4  push   cs
  0000:75f5  push   di
  0000:75f6  lcall  SYS:0f78:0bd8 StrCmp
  0000:75fb  je     0x7600
  0000:75fd  jmp    0x775f
L07600:
  0000:7600  mov    al, byte ptr [g3692]
  0000:7603  xor    ah, ah
  0000:7605  mov    dx, 0x32
  0000:7608  mul    dx
  0000:760a  cmp    ax, word ptr [g38c7]
  0000:760e  jle    0x7613
  0000:7610  jmp    0x7744
L07613:
  0000:7613  mov    al, byte ptr [g3692]
  0000:7616  xor    ah, ah
  0000:7618  mov    dx, 0x32
  0000:761b  mul    dx
  0000:761d  sub    word ptr [g38c7], ax
  0000:7621  mov    di, 0x3c84
  0000:7624  push   ds
  0000:7625  push   di
  0000:7626  lea    di, [bp - 0x200]
  0000:762a  push   ss
  0000:762b  push   di
  0000:762c  mov    di, 0x3d32
  0000:762f  push   ds
  0000:7630  push   di
  0000:7631  lcall  SYS:0f78:0ae7 StrLoad
  0000:7636  mov    di, 0x74ab    ; "save_r0.sav"
  0000:7639  push   cs
  0000:763a  push   di
  0000:763b  lcall  SYS:0f78:0b66 StrConcat
  0000:7640  lcall  SYS:0f78:072e Assign
  0000:7645  mov    di, 0x3c84
  0000:7648  push   ds
  0000:7649  push   di
  0000:764a  mov    ax, 0x2b6
  0000:764d  push   ax
  0000:764e  lcall  SYS:0f78:0772 Rewrite
  0000:7653  mov    di, 0x3c84
  0000:7656  push   ds
  0000:7657  push   di
  0000:7658  mov    di, 0x369c
  0000:765b  push   ds
  0000:765c  push   di
  0000:765d  lcall  SYS:0f78:0825 WriteRec
  0000:7662  add    sp, 4
  0000:7665  mov    di, 0x3c84
  0000:7668  push   ds
  0000:7669  push   di
  0000:766a  lcall  SYS:0f78:07ea Close
  0000:766f  mov    di, 0x3e36
  0000:7672  push   ds
  0000:7673  push   di
  0000:7674  lea    di, [bp - 0x200]
  0000:7678  push   ss
  0000:7679  push   di
  0000:767a  mov    di, 0x3d32
  0000:767d  push   ds
  0000:767e  push   di
  0000:767f  lcall  SYS:0f78:0ae7 StrLoad
  0000:7684  mov    di, 0x74b7    ; "places.sav"
  0000:7687  push   cs
  0000:7688  push   di
  0000:7689  lcall  SYS:0f78:0b66 StrConcat
  0000:768e  lcall  SYS:0f78:072e Assign
  0000:7693  mov    di, 0x3e36
  0000:7696  push   ds
  0000:7697  push   di
  0000:7698  mov    ax, 1
  0000:769b  push   ax
  0000:769c  lcall  SYS:0f78:0772 Rewrite
  0000:76a1  mov    di, 0x3e36
  0000:76a4  push   ds
  0000:76a5  push   di
  0000:76a6  mov    di, 0x3694
  0000:76a9  push   ds
  0000:76aa  push   di
  0000:76ab  lcall  SYS:0f78:0825 WriteRec
  0000:76b0  add    sp, 4
  0000:76b3  mov    di, 0x3e36
  0000:76b6  push   ds
  0000:76b7  push   di
  0000:76b8  mov    di, 0x3695
  0000:76bb  push   ds
  0000:76bc  push   di
  0000:76bd  lcall  SYS:0f78:0825 WriteRec
  0000:76c2  add    sp, 4
  0000:76c5  mov    di, 0x3e36
  0000:76c8  push   ds
  0000:76c9  push   di
  0000:76ca  mov    di, 0x3696
  0000:76cd  push   ds
  0000:76ce  push   di
  0000:76cf  lcall  SYS:0f78:0825 WriteRec
  0000:76d4  add    sp, 4
  0000:76d7  mov    di, 0x3e36
  0000:76da  push   ds
  0000:76db  push   di
  0000:76dc  mov    di, 0x3697
  0000:76df  push   ds
  0000:76e0  push   di
  0000:76e1  lcall  SYS:0f78:0825 WriteRec
  0000:76e6  add    sp, 4
  0000:76e9  mov    di, 0x3e36
  0000:76ec  push   ds
  0000:76ed  push   di
  0000:76ee  mov    di, 0x3698
  0000:76f1  push   ds
  0000:76f2  push   di
  0000:76f3  lcall  SYS:0f78:0825 WriteRec
  0000:76f8  add    sp, 4
  0000:76fb  mov    di, 0x3e36
  0000:76fe  push   ds
  0000:76ff  push   di
  0000:7700  mov    di, 0x3699
  0000:7703  push   ds
  0000:7704  push   di
  0000:7705  lcall  SYS:0f78:0825 WriteRec
  0000:770a  add    sp, 4
  0000:770d  mov    di, 0x3e36
  0000:7710  push   ds
  0000:7711  push   di
  0000:7712  mov    di, 0x369a
  0000:7715  push   ds
  0000:7716  push   di
  0000:7717  lcall  SYS:0f78:0825 WriteRec
  0000:771c  add    sp, 4
  0000:771f  mov    di, 0x3e36
  0000:7722  push   ds
  0000:7723  push   di
  0000:7724  lcall  SYS:0f78:07ea Close
  0000:7729  mov    di, 0x74c2    ; "^0Сохранено! ^1Можешь беспредельничать дальше."
  0000:772c  push   cs
  0000:772d  push   di
  0000:772e  xor    ax, ax
  0000:7730  push   ax
  0000:7731  xor    ax, ax
  0000:7733  push   ax
  0000:7734  xor    ax, ax
  0000:7736  push   ax
  0000:7737  xor    ax, ax
  0000:7739  push   ax
  0000:773a  xor    ax, ax
  0000:773c  push   ax
  0000:773d  lcall  U2:0eed:01c2 PrintLn
  0000:7742  jmp    0x775d
L07744:
  0000:7744  mov    di, 0x74f1    ; "^6Парень, все стоит бабок!"
  0000:7747  push   cs
  0000:7748  push   di
  0000:7749  xor    ax, ax
  0000:774b  push   ax
  0000:774c  xor    ax, ax
  0000:774e  push   ax
  0000:774f  xor    ax, ax
  0000:7751  push   ax
  0000:7752  xor    ax, ax
  0000:7754  push   ax
  0000:7755  xor    ax, ax
  0000:7757  push   ax
  0000:7758  lcall  U2:0eed:01c2 PrintLn
L0775d:
  0000:775d  jmp    0x7778
L0775f:
  0000:775f  mov    di, 0x750c    ; "^6Нехотите как хотите - мое дело предложить"
  0000:7762  push   cs
  0000:7763  push   di
  0000:7764  xor    ax, ax
  0000:7766  push   ax
  0000:7767  xor    ax, ax
  0000:7769  push   ax
  0000:776a  xor    ax, ax
  0000:776c  push   ax
  0000:776d  xor    ax, ax
  0000:776f  push   ax
  0000:7770  xor    ax, ax
  0000:7772  push   ax
  0000:7773  lcall  U2:0eed:01c2 PrintLn
L07778:
  0000:7778  mov    sp, bp
  0000:777a  pop    bp
  0000:777b  ret    
; ---- data 0000:777c (1259 bytes)
;   0000:777c str "Бродя по окрестностям с самыми грязными намериниями..."
;   0000:77b3 str "Ты наткнулся на храм Божий."
;   0000:77cf str "^1Бог: \"А ты опять.\""
;   0000:77e4 str "^1Ну ладно насылаю на тебя \"благославление\""
;   0000:7810 str "В прошлый раз Бог сказал чтобы ты не осквернял своей рожей святой храм"
;   0000:7857 str "Но надо бы типа помолиться о прощении"
;   0000:787d str "^2\"Господи, Братан, прости грешника опять\"."
;   0000:78a9 str "^1Бог: \"Да блин, упорный чудак!\""
;   0000:78ca str "^1Ладно насылаю на тебя, типа, \"моё благославление\" снова"
;   0000:7904 str "Раз такая батва..."
;   0000:7917 str "Надо типа помолиться Господу Богу...              "
;   0000:794a str "Как делают новыё русские."
;   0000:7964 str "^2\"Господи, Братан, прости грешника\". - Начал было ты..."
;   0000:799d str "^1Громовой голос: \"Да пошел ты на хрен!\""
;   0000:79c6 str "^2 - Эээ.. типа.. а чё?.."
;   0000:79e0 str "^1 - \"а чё?\" блин! "
;   0000:79f4 str "^1-"
;   0000:79f8 str " чёртов!"
;   0000:7a01 str "^2Ну.."
;   0000:7a08 str "^1Ладна насылаю на тебя, типа, \"моё благославление\""
;   0000:7a3c str "^1Да увеличится твоя понтовость!"
;   0000:7a5d str "^1Был ты "
;   0000:7a67 str " а стал "
;   0000:7a70 str "^1Да увеличиться твоя сила!"
;   0000:7a8c str "^1Да уменьшиться твоя корявость!"
;   0000:7aad str "^1Да возрастут твой силы жизненные!"
;   0000:7ad1 str "^1Да снизойдет на тебя удача!"
;   0000:7aef str "^1Дарю тебе феньку!"
;   0000:7b03 str "^1Кольцо \"Помоги Господи\""
;   0000:7b1d str "^1\"Мега Кольцо\"! со своего, можно сказать, пальца"
;   0000:7b4f str "^1Ваще полезное кольцо \"Господи помилуй\""
;   0000:7b78 str "^1Восст. жизни - 3, 5% - самозарост переломов"
;   0000:7ba6 str "^1Накладываю на тебя защиту!"
;   0000:7bc3 str "^1Да увеличится, офигенно, твоя понтовость среди гопоты!"
;   0000:7bfc str "^1Получи #!"
;   0000:7c08 str "^1А теперь вали отсюда и никогда здесь не появляйся!"
;   0000:7c3d str "^1А теперь проваливай!"
;   0000:7c54 str "Ты идещь дальше..."

;================ proc 0000:7c67  callers: 0b3a7
  0000:7c67  push   bp
  0000:7c68  mov    bp, sp
  0000:7c6a  mov    ax, 0x100
  0000:7c6d  lcall  SYS:0f78:02cd StackCheck
  0000:7c72  sub    sp, 0x100
  0000:7c76  cmp    byte ptr [g3951], 2
  0000:7c7b  jne    0x7ceb
  0000:7c7d  mov    di, 0x777c    ; "Бродя по окрестностям с самыми грязными намериниями..."
  0000:7c80  push   cs
  0000:7c81  push   di
  0000:7c82  xor    ax, ax
  0000:7c84  push   ax
  0000:7c85  xor    ax, ax
  0000:7c87  push   ax
  0000:7c88  xor    ax, ax
  0000:7c8a  push   ax
  0000:7c8b  xor    ax, ax
  0000:7c8d  push   ax
  0000:7c8e  xor    ax, ax
  0000:7c90  push   ax
  0000:7c91  lcall  U2:0eed:01c2 PrintLn
  0000:7c96  mov    di, 0x77b3    ; "Ты наткнулся на храм Божий."
  0000:7c99  push   cs
  0000:7c9a  push   di
  0000:7c9b  xor    ax, ax
  0000:7c9d  push   ax
  0000:7c9e  xor    ax, ax
  0000:7ca0  push   ax
  0000:7ca1  xor    ax, ax
  0000:7ca3  push   ax
  0000:7ca4  xor    ax, ax
  0000:7ca6  push   ax
  0000:7ca7  xor    ax, ax
  0000:7ca9  push   ax
  0000:7caa  lcall  U2:0eed:01c2 PrintLn
  0000:7caf  lcall  CRT:0f16:031a ReadKey
  0000:7cb4  mov    di, 0x77cf    ; "^1Бог: "А ты опять.""
  0000:7cb7  push   cs
  0000:7cb8  push   di
  0000:7cb9  xor    ax, ax
  0000:7cbb  push   ax
  0000:7cbc  xor    ax, ax
  0000:7cbe  push   ax
  0000:7cbf  xor    ax, ax
  0000:7cc1  push   ax
  0000:7cc2  xor    ax, ax
  0000:7cc4  push   ax
  0000:7cc5  xor    ax, ax
  0000:7cc7  push   ax
  0000:7cc8  lcall  U2:0eed:01c2 PrintLn
  0000:7ccd  mov    di, 0x77e4    ; "^1Ну ладно насылаю на тебя "благославление""
  0000:7cd0  push   cs
  0000:7cd1  push   di
  0000:7cd2  xor    ax, ax
  0000:7cd4  push   ax
  0000:7cd5  xor    ax, ax
  0000:7cd7  push   ax
  0000:7cd8  xor    ax, ax
  0000:7cda  push   ax
  0000:7cdb  xor    ax, ax
  0000:7cdd  push   ax
  0000:7cde  xor    ax, ax
  0000:7ce0  push   ax
  0000:7ce1  lcall  U2:0eed:01c2 PrintLn
  0000:7ce6  lcall  CRT:0f16:031a ReadKey
L07ceb:
  0000:7ceb  cmp    byte ptr [g3951], 1
  0000:7cf0  je     0x7cf5
  0000:7cf2  jmp    0x7dcb
L07cf5:
  0000:7cf5  mov    di, 0x777c    ; "Бродя по окрестностям с самыми грязными намериниями..."
  0000:7cf8  push   cs
  0000:7cf9  push   di
  0000:7cfa  xor    ax, ax
  0000:7cfc  push   ax
  0000:7cfd  xor    ax, ax
  0000:7cff  push   ax
  0000:7d00  xor    ax, ax
  0000:7d02  push   ax
  0000:7d03  xor    ax, ax
  0000:7d05  push   ax
  0000:7d06  xor    ax, ax
  0000:7d08  push   ax
  0000:7d09  lcall  U2:0eed:01c2 PrintLn
  0000:7d0e  lcall  CRT:0f16:031a ReadKey
  0000:7d13  mov    di, 0x77b3    ; "Ты наткнулся на храм Божий."
  0000:7d16  push   cs
  0000:7d17  push   di
  0000:7d18  xor    ax, ax
  0000:7d1a  push   ax
  0000:7d1b  xor    ax, ax
  0000:7d1d  push   ax
  0000:7d1e  xor    ax, ax
  0000:7d20  push   ax
  0000:7d21  xor    ax, ax
  0000:7d23  push   ax
  0000:7d24  xor    ax, ax
  0000:7d26  push   ax
  0000:7d27  lcall  U2:0eed:01c2 PrintLn
  0000:7d2c  lcall  CRT:0f16:031a ReadKey
  0000:7d31  mov    di, 0x7810    ; "В прошлый раз Бог сказал чтобы ты не осквернял своей рожей святой храм"
  0000:7d34  push   cs
  0000:7d35  push   di
  0000:7d36  xor    ax, ax
  0000:7d38  push   ax
  0000:7d39  xor    ax, ax
  0000:7d3b  push   ax
  0000:7d3c  xor    ax, ax
  0000:7d3e  push   ax
  0000:7d3f  xor    ax, ax
  0000:7d41  push   ax
  0000:7d42  xor    ax, ax
  0000:7d44  push   ax
  0000:7d45  lcall  U2:0eed:01c2 PrintLn
  0000:7d4a  lcall  CRT:0f16:031a ReadKey
  0000:7d4f  mov    di, 0x7857    ; "Но надо бы типа помолиться о прощении"
  0000:7d52  push   cs
  0000:7d53  push   di
  0000:7d54  xor    ax, ax
  0000:7d56  push   ax
  0000:7d57  xor    ax, ax
  0000:7d59  push   ax
  0000:7d5a  xor    ax, ax
  0000:7d5c  push   ax
  0000:7d5d  xor    ax, ax
  0000:7d5f  push   ax
  0000:7d60  xor    ax, ax
  0000:7d62  push   ax
  0000:7d63  lcall  U2:0eed:01c2 PrintLn
  0000:7d68  lcall  CRT:0f16:031a ReadKey
  0000:7d6d  mov    di, 0x787d    ; "^2"Господи, Братан, прости грешника опять"."
  0000:7d70  push   cs
  0000:7d71  push   di
  0000:7d72  xor    ax, ax
  0000:7d74  push   ax
  0000:7d75  xor    ax, ax
  0000:7d77  push   ax
  0000:7d78  xor    ax, ax
  0000:7d7a  push   ax
  0000:7d7b  xor    ax, ax
  0000:7d7d  push   ax
  0000:7d7e  xor    ax, ax
  0000:7d80  push   ax
  0000:7d81  lcall  U2:0eed:01c2 PrintLn
  0000:7d86  lcall  CRT:0f16:031a ReadKey
  0000:7d8b  mov    di, 0x78a9    ; "^1Бог: "Да блин, упорный чудак!""
  0000:7d8e  push   cs
  0000:7d8f  push   di
  0000:7d90  xor    ax, ax
  0000:7d92  push   ax
  0000:7d93  xor    ax, ax
  0000:7d95  push   ax
  0000:7d96  xor    ax, ax
  0000:7d98  push   ax
  0000:7d99  xor    ax, ax
  0000:7d9b  push   ax
  0000:7d9c  xor    ax, ax
  0000:7d9e  push   ax
  0000:7d9f  lcall  U2:0eed:01c2 PrintLn
  0000:7da4  lcall  CRT:0f16:031a ReadKey
  0000:7da9  mov    di, 0x78ca    ; "^1Ладно насылаю на тебя, типа, "моё благославление" снова"
  0000:7dac  push   cs
  0000:7dad  push   di
  0000:7dae  xor    ax, ax
  0000:7db0  push   ax
  0000:7db1  xor    ax, ax
  0000:7db3  push   ax
  0000:7db4  xor    ax, ax
  0000:7db6  push   ax
  0000:7db7  xor    ax, ax
  0000:7db9  push   ax
  0000:7dba  xor    ax, ax
  0000:7dbc  push   ax
  0000:7dbd  lcall  U2:0eed:01c2 PrintLn
  0000:7dc2  lcall  CRT:0f16:031a ReadKey
  0000:7dc7  inc    byte ptr [g3951]
L07dcb:
  0000:7dcb  cmp    byte ptr [g3951], 0
  0000:7dd0  je     0x7dd5
  0000:7dd2  jmp    0x7f5f
L07dd5:
  0000:7dd5  mov    di, 0x777c    ; "Бродя по окрестностям с самыми грязными намериниями..."
  0000:7dd8  push   cs
  0000:7dd9  push   di
  0000:7dda  xor    ax, ax
  0000:7ddc  push   ax
  0000:7ddd  xor    ax, ax
  0000:7ddf  push   ax
  0000:7de0  xor    ax, ax
  0000:7de2  push   ax
  0000:7de3  xor    ax, ax
  0000:7de5  push   ax
  0000:7de6  xor    ax, ax
  0000:7de8  push   ax
  0000:7de9  lcall  U2:0eed:01c2 PrintLn
  0000:7dee  lcall  CRT:0f16:031a ReadKey
  0000:7df3  mov    di, 0x77b3    ; "Ты наткнулся на храм Божий."
  0000:7df6  push   cs
  0000:7df7  push   di
  0000:7df8  xor    ax, ax
  0000:7dfa  push   ax
  0000:7dfb  xor    ax, ax
  0000:7dfd  push   ax
  0000:7dfe  xor    ax, ax
  0000:7e00  push   ax
  0000:7e01  xor    ax, ax
  0000:7e03  push   ax
  0000:7e04  xor    ax, ax
  0000:7e06  push   ax
  0000:7e07  lcall  U2:0eed:01c2 PrintLn
  0000:7e0c  lcall  CRT:0f16:031a ReadKey
  0000:7e11  mov    di, 0x7904    ; "Раз такая батва..."
  0000:7e14  push   cs
  0000:7e15  push   di
  0000:7e16  xor    ax, ax
  0000:7e18  push   ax
  0000:7e19  xor    ax, ax
  0000:7e1b  push   ax
  0000:7e1c  xor    ax, ax
  0000:7e1e  push   ax
  0000:7e1f  xor    ax, ax
  0000:7e21  push   ax
  0000:7e22  xor    ax, ax
  0000:7e24  push   ax
  0000:7e25  lcall  U2:0eed:01c2 PrintLn
  0000:7e2a  lcall  CRT:0f16:031a ReadKey
  0000:7e2f  mov    di, 0x7917    ; "Надо типа помолиться Господу Богу...              "
  0000:7e32  push   cs
  0000:7e33  push   di
  0000:7e34  xor    ax, ax
  0000:7e36  push   ax
  0000:7e37  xor    ax, ax
  0000:7e39  push   ax
  0000:7e3a  xor    ax, ax
  0000:7e3c  push   ax
  0000:7e3d  xor    ax, ax
  0000:7e3f  push   ax
  0000:7e40  xor    ax, ax
  0000:7e42  push   ax
  0000:7e43  lcall  U2:0eed:01c2 PrintLn
  0000:7e48  lcall  CRT:0f16:031a ReadKey
  0000:7e4d  mov    di, 0x794a    ; "Как делают новыё русские."
  0000:7e50  push   cs
  0000:7e51  push   di
  0000:7e52  xor    ax, ax
  0000:7e54  push   ax
  0000:7e55  xor    ax, ax
  0000:7e57  push   ax
  0000:7e58  xor    ax, ax
  0000:7e5a  push   ax
  0000:7e5b  xor    ax, ax
  0000:7e5d  push   ax
  0000:7e5e  xor    ax, ax
  0000:7e60  push   ax
  0000:7e61  lcall  U2:0eed:01c2 PrintLn
  0000:7e66  lcall  CRT:0f16:031a ReadKey
  0000:7e6b  mov    di, 0x7964    ; "^2"Господи, Братан, прости грешника". - Начал было ты..."
  0000:7e6e  push   cs
  0000:7e6f  push   di
  0000:7e70  xor    ax, ax
  0000:7e72  push   ax
  0000:7e73  xor    ax, ax
  0000:7e75  push   ax
  0000:7e76  xor    ax, ax
  0000:7e78  push   ax
  0000:7e79  xor    ax, ax
  0000:7e7b  push   ax
  0000:7e7c  xor    ax, ax
  0000:7e7e  push   ax
  0000:7e7f  lcall  U2:0eed:01c2 PrintLn
  0000:7e84  lcall  CRT:0f16:031a ReadKey
  0000:7e89  mov    di, 0x799d    ; "^1Громовой голос: "Да пошел ты на хрен!""
  0000:7e8c  push   cs
  0000:7e8d  push   di
  0000:7e8e  xor    ax, ax
  0000:7e90  push   ax
  0000:7e91  xor    ax, ax
  0000:7e93  push   ax
  0000:7e94  xor    ax, ax
  0000:7e96  push   ax
  0000:7e97  xor    ax, ax
  0000:7e99  push   ax
  0000:7e9a  xor    ax, ax
  0000:7e9c  push   ax
  0000:7e9d  lcall  U2:0eed:01c2 PrintLn
  0000:7ea2  lcall  CRT:0f16:031a ReadKey
  0000:7ea7  mov    di, 0x79c6    ; "^2 - Эээ.. типа.. а чё?.."
  0000:7eaa  push   cs
  0000:7eab  push   di
  0000:7eac  xor    ax, ax
  0000:7eae  push   ax
  0000:7eaf  xor    ax, ax
  0000:7eb1  push   ax
  0000:7eb2  xor    ax, ax
  0000:7eb4  push   ax
  0000:7eb5  xor    ax, ax
  0000:7eb7  push   ax
  0000:7eb8  xor    ax, ax
  0000:7eba  push   ax
  0000:7ebb  lcall  U2:0eed:01c2 PrintLn
  0000:7ec0  lcall  CRT:0f16:031a ReadKey
  0000:7ec5  lea    di, [bp - 0x100]
  0000:7ec9  push   ss
  0000:7eca  push   di
  0000:7ecb  mov    di, 0x79e0    ; "^1 - "а чё?" блин! "
  0000:7ece  push   cs
  0000:7ecf  push   di
  0000:7ed0  lcall  SYS:0f78:0ae7 StrLoad
  0000:7ed5  mov    di, 0x379c
  0000:7ed8  push   ds
  0000:7ed9  push   di
  0000:7eda  lcall  SYS:0f78:0b66 StrConcat
  0000:7edf  mov    di, 0x79f4    ; "^1-"
  0000:7ee2  push   cs
  0000:7ee3  push   di
  0000:7ee4  lcall  SYS:0f78:0b66 StrConcat
  0000:7ee9  mov    di, word ptr [g389c]
  0000:7eed  mov    cl, 8
  0000:7eef  shl    di, cl
  0000:7ef1  add    di, 0x2e
  0000:7ef5  push   ds
  0000:7ef6  push   di
  0000:7ef7  lcall  SYS:0f78:0b66 StrConcat
  0000:7efc  mov    di, 0x79f8    ; " чёртов!"
  0000:7eff  push   cs
  0000:7f00  push   di
  0000:7f01  lcall  SYS:0f78:0b66 StrConcat
  0000:7f06  xor    ax, ax
  0000:7f08  push   ax
  0000:7f09  xor    ax, ax
  0000:7f0b  push   ax
  0000:7f0c  xor    ax, ax
  0000:7f0e  push   ax
  0000:7f0f  xor    ax, ax
  0000:7f11  push   ax
  0000:7f12  xor    ax, ax
  0000:7f14  push   ax
  0000:7f15  lcall  U2:0eed:01c2 PrintLn
  0000:7f1a  lcall  CRT:0f16:031a ReadKey
  0000:7f1f  mov    di, 0x7a01    ; "^2Ну.."
  0000:7f22  push   cs
  0000:7f23  push   di
  0000:7f24  xor    ax, ax
  0000:7f26  push   ax
  0000:7f27  xor    ax, ax
  0000:7f29  push   ax
  0000:7f2a  xor    ax, ax
  0000:7f2c  push   ax
  0000:7f2d  xor    ax, ax
  0000:7f2f  push   ax
  0000:7f30  xor    ax, ax
  0000:7f32  push   ax
  0000:7f33  lcall  U2:0eed:01c2 PrintLn
  0000:7f38  lcall  CRT:0f16:031a ReadKey
  0000:7f3d  mov    di, 0x7a08    ; "^1Ладна насылаю на тебя, типа, "моё благославление""
  0000:7f40  push   cs
  0000:7f41  push   di
  0000:7f42  xor    ax, ax
  0000:7f44  push   ax
  0000:7f45  xor    ax, ax
  0000:7f47  push   ax
  0000:7f48  xor    ax, ax
  0000:7f4a  push   ax
  0000:7f4b  xor    ax, ax
  0000:7f4d  push   ax
  0000:7f4e  xor    ax, ax
  0000:7f50  push   ax
  0000:7f51  lcall  U2:0eed:01c2 PrintLn
  0000:7f56  lcall  CRT:0f16:031a ReadKey
  0000:7f5b  inc    byte ptr [g3951]
L07f5f:
  0000:7f5f  mov    ax, 5
  0000:7f62  push   ax
  0000:7f63  lcall  SYS:0f78:114b Random
  0000:7f68  cmp    ax, 0
  0000:7f6b  je     0x7f70
  0000:7f6d  jmp    0x7ff3
L07f70:
  0000:7f70  mov    di, 0x7a3c    ; "^1Да увеличится твоя понтовость!"
  0000:7f73  push   cs
  0000:7f74  push   di
  0000:7f75  xor    ax, ax
  0000:7f77  push   ax
  0000:7f78  xor    ax, ax
  0000:7f7a  push   ax
  0000:7f7b  xor    ax, ax
  0000:7f7d  push   ax
  0000:7f7e  xor    ax, ax
  0000:7f80  push   ax
  0000:7f81  xor    ax, ax
  0000:7f83  push   ax
  0000:7f84  lcall  U2:0eed:01c2 PrintLn
  0000:7f89  lcall  CRT:0f16:031a ReadKey
  0000:7f8e  lea    di, [bp - 0x100]
  0000:7f92  push   ss
  0000:7f93  push   di
  0000:7f94  mov    di, 0x7a5d    ; "^1Был ты "
  0000:7f97  push   cs
  0000:7f98  push   di
  0000:7f99  lcall  SYS:0f78:0ae7 StrLoad
  0000:7f9e  mov    di, word ptr [g38a6]
  0000:7fa2  mov    cl, 8
  0000:7fa4  shl    di, cl
  0000:7fa6  add    di, 0xb42
  0000:7faa  push   ds
  0000:7fab  push   di
  0000:7fac  lcall  SYS:0f78:0b66 StrConcat
  0000:7fb1  mov    di, 0x7a67    ; " а стал "
  0000:7fb4  push   cs
  0000:7fb5  push   di
  0000:7fb6  lcall  SYS:0f78:0b66 StrConcat
  0000:7fbb  mov    ax, word ptr [g38a6]
  0000:7fbe  inc    ax
  0000:7fbf  mov    di, ax
  0000:7fc1  mov    cl, 8
  0000:7fc3  shl    di, cl
  0000:7fc5  add    di, 0xb42
  0000:7fc9  push   ds
  0000:7fca  push   di
  0000:7fcb  lcall  SYS:0f78:0b66 StrConcat
  0000:7fd0  xor    ax, ax
  0000:7fd2  push   ax
  0000:7fd3  xor    ax, ax
  0000:7fd5  push   ax
  0000:7fd6  xor    ax, ax
  0000:7fd8  push   ax
  0000:7fd9  xor    ax, ax
  0000:7fdb  push   ax
  0000:7fdc  xor    ax, ax
  0000:7fde  push   ax
  0000:7fdf  lcall  U2:0eed:01c2 PrintLn
  0000:7fe4  mov    ax, word ptr [g38d0]
  0000:7fe7  mov    word ptr [g38ce], ax
  0000:7fea  mov    al, 0
  0000:7fec  push   ax
  0000:7fed  call   0x2526
  0000:7ff0  jmp    0x8242
L07ff3:
  0000:7ff3  cmp    ax, 1
  0000:7ff6  je     0x7ffb
  0000:7ff8  jmp    0x80c0
L07ffb:
  0000:7ffb  mov    ax, 4
  0000:7ffe  push   ax
  0000:7fff  lcall  SYS:0f78:114b Random
  0000:8004  cmp    ax, 0
  0000:8007  jne    0x8049
  0000:8009  mov    di, 0x7a70    ; "^1Да увеличиться твоя сила!"
  0000:800c  push   cs
  0000:800d  push   di
  0000:800e  xor    ax, ax
  0000:8010  push   ax
  0000:8011  xor    ax, ax
  0000:8013  push   ax
  0000:8014  xor    ax, ax
  0000:8016  push   ax
  0000:8017  xor    ax, ax
  0000:8019  push   ax
  0000:801a  xor    ax, ax
  0000:801c  push   ax
  0000:801d  lcall  U2:0eed:01c2 PrintLn
  0000:8022  inc    word ptr [g389e]
  0000:8026  inc    word ptr [g38ae]
  0000:802a  inc    word ptr [g38ac]
  0000:802e  inc    word ptr [g38aa]
  0000:8032  mov    ax, word ptr [g389e]
  0000:8035  cdq    
  0000:8036  mov    cx, 2
  0000:8039  idiv   cx
  0000:803b  xchg   dx, ax
  0000:803c  mov    dx, ax
  0000:803e  mov    ax, 1
  0000:8041  sub    ax, dx
  0000:8043  add    word ptr [g38a8], ax
  0000:8047  jmp    0x80bd
L08049:
  0000:8049  cmp    ax, 1
  0000:804c  jne    0x806d
  0000:804e  mov    di, 0x7a8c    ; "^1Да уменьшиться твоя корявость!"
  0000:8051  push   cs
  0000:8052  push   di
  0000:8053  xor    ax, ax
  0000:8055  push   ax
  0000:8056  xor    ax, ax
  0000:8058  push   ax
  0000:8059  xor    ax, ax
  0000:805b  push   ax
  0000:805c  xor    ax, ax
  0000:805e  push   ax
  0000:805f  xor    ax, ax
  0000:8061  push   ax
  0000:8062  lcall  U2:0eed:01c2 PrintLn
  0000:8067  inc    word ptr [g38a0]
  0000:806b  jmp    0x80bd
L0806d:
  0000:806d  cmp    ax, 2
  0000:8070  jne    0x809b
  0000:8072  mov    di, 0x7aad    ; "^1Да возрастут твой силы жизненные!"
  0000:8075  push   cs
  0000:8076  push   di
  0000:8077  xor    ax, ax
  0000:8079  push   ax
  0000:807a  xor    ax, ax
  0000:807c  push   ax
  0000:807d  xor    ax, ax
  0000:807f  push   ax
  0000:8080  xor    ax, ax
  0000:8082  push   ax
  0000:8083  xor    ax, ax
  0000:8085  push   ax
  0000:8086  lcall  U2:0eed:01c2 PrintLn
  0000:808b  inc    word ptr [g38a2]
  0000:808f  add    word ptr [g38ae], 5
  0000:8094  add    word ptr [g38ac], 5
  0000:8099  jmp    0x80bd
L0809b:
  0000:809b  cmp    ax, 3
  0000:809e  jne    0x80bd
  0000:80a0  mov    di, 0x7ad1    ; "^1Да снизойдет на тебя удача!"
  0000:80a3  push   cs
  0000:80a4  push   di
  0000:80a5  xor    ax, ax
  0000:80a7  push   ax
  0000:80a8  xor    ax, ax
  0000:80aa  push   ax
  0000:80ab  xor    ax, ax
  0000:80ad  push   ax
  0000:80ae  xor    ax, ax
  0000:80b0  push   ax
  0000:80b1  xor    ax, ax
  0000:80b3  push   ax
  0000:80b4  lcall  U2:0eed:01c2 PrintLn
  0000:80b9  inc    word ptr [g38a4]
L080bd:
  0000:80bd  jmp    0x8242
L080c0:
  0000:80c0  cmp    ax, 2
  0000:80c3  je     0x80c8
  0000:80c5  jmp    0x81cb
L080c8:
  0000:80c8  mov    di, 0x7aef    ; "^1Дарю тебе феньку!"
  0000:80cb  push   cs
  0000:80cc  push   di
  0000:80cd  xor    ax, ax
  0000:80cf  push   ax
  0000:80d0  xor    ax, ax
  0000:80d2  push   ax
  0000:80d3  xor    ax, ax
  0000:80d5  push   ax
  0000:80d6  xor    ax, ax
  0000:80d8  push   ax
  0000:80d9  xor    ax, ax
  0000:80db  push   ax
  0000:80dc  lcall  U2:0eed:01c2 PrintLn
  0000:80e1  cmp    byte ptr [g38bf], 0
  0000:80e6  jne    0x813c
  0000:80e8  mov    di, 0x7b03    ; "^1Кольцо "Помоги Господи""
  0000:80eb  push   cs
  0000:80ec  push   di
  0000:80ed  xor    ax, ax
  0000:80ef  push   ax
  0000:80f0  xor    ax, ax
  0000:80f2  push   ax
  0000:80f3  xor    ax, ax
  0000:80f5  push   ax
  0000:80f6  xor    ax, ax
  0000:80f8  push   ax
  0000:80f9  xor    ax, ax
  0000:80fb  push   ax
  0000:80fc  lcall  U2:0eed:01c2 PrintLn
  0000:8101  inc    word ptr [g389e]
  0000:8105  inc    word ptr [g38a0]
  0000:8109  inc    word ptr [g38a2]
  0000:810d  inc    word ptr [g38a4]
  0000:8111  add    word ptr [g38ae], 6
  0000:8116  add    word ptr [g38ac], 6
  0000:811b  inc    word ptr [g38aa]
  0000:811f  mov    ax, word ptr [g389e]
  0000:8122  cdq    
  0000:8123  mov    cx, 2
  0000:8126  idiv   cx
  0000:8128  xchg   dx, ax
  0000:8129  mov    dx, ax
  0000:812b  mov    ax, 1
  0000:812e  sub    ax, dx
  0000:8130  add    word ptr [g38a8], ax
  0000:8134  mov    byte ptr [g38bf], 1
  0000:8139  jmp    0x81c9
L0813c:
  0000:813c  cmp    byte ptr [g38c0], 0
  0000:8141  jne    0x818b
  0000:8143  mov    di, 0x7b1d    ; "^1"Мега Кольцо"! со своего, можно сказать, пальца"
  0000:8146  push   cs
  0000:8147  push   di
  0000:8148  xor    ax, ax
  0000:814a  push   ax
  0000:814b  xor    ax, ax
  0000:814d  push   ax
  0000:814e  xor    ax, ax
  0000:8150  push   ax
  0000:8151  xor    ax, ax
  0000:8153  push   ax
  0000:8154  xor    ax, ax
  0000:8156  push   ax
  0000:8157  lcall  U2:0eed:01c2 PrintLn
  0000:815c  add    word ptr [g389e], 4
  0000:8161  add    word ptr [g38a0], 4
  0000:8166  add    word ptr [g38a2], 4
  0000:816b  add    word ptr [g38a4], 4
  0000:8170  add    word ptr [g38ae], 0x18
  0000:8175  add    word ptr [g38ac], 0x18
  0000:817a  add    word ptr [g38aa], 4
  0000:817f  add    word ptr [g38a8], 2
  0000:8184  mov    byte ptr [g38c0], 1
  0000:8189  jmp    0x81c9
L0818b:
  0000:818b  cmp    byte ptr [g38c1], 0
  0000:8190  jne    0x81c9
  0000:8192  mov    di, 0x7b4f    ; "^1Ваще полезное кольцо "Господи помилуй""
  0000:8195  push   cs
  0000:8196  push   di
  0000:8197  xor    ax, ax
  0000:8199  push   ax
  0000:819a  xor    ax, ax
  0000:819c  push   ax
  0000:819d  xor    ax, ax
  0000:819f  push   ax
  0000:81a0  xor    ax, ax
  0000:81a2  push   ax
  0000:81a3  xor    ax, ax
  0000:81a5  push   ax
  0000:81a6  lcall  U2:0eed:01c2 PrintLn
  0000:81ab  mov    di, 0x7b78    ; "^1Восст. жизни - 3, 5% - самозарост переломов"
  0000:81ae  push   cs
  0000:81af  push   di
  0000:81b0  xor    ax, ax
  0000:81b2  push   ax
  0000:81b3  xor    ax, ax
  0000:81b5  push   ax
  0000:81b6  xor    ax, ax
  0000:81b8  push   ax
  0000:81b9  xor    ax, ax
  0000:81bb  push   ax
  0000:81bc  xor    ax, ax
  0000:81be  push   ax
  0000:81bf  lcall  U2:0eed:01c2 PrintLn
  0000:81c4  mov    byte ptr [g38c1], 1
L081c9:
  0000:81c9  jmp    0x8242
L081cb:
  0000:81cb  cmp    ax, 3
  0000:81ce  jne    0x81ef
  0000:81d0  mov    di, 0x7ba6    ; "^1Накладываю на тебя защиту!"
  0000:81d3  push   cs
  0000:81d4  push   di
  0000:81d5  xor    ax, ax
  0000:81d7  push   ax
  0000:81d8  xor    ax, ax
  0000:81da  push   ax
  0000:81db  xor    ax, ax
  0000:81dd  push   ax
  0000:81de  xor    ax, ax
  0000:81e0  push   ax
  0000:81e1  xor    ax, ax
  0000:81e3  push   ax
  0000:81e4  lcall  U2:0eed:01c2 PrintLn
  0000:81e9  inc    byte ptr [g38b2]
  0000:81ed  jmp    0x8242
L081ef:
  0000:81ef  cmp    ax, 4
  0000:81f2  jne    0x8242
  0000:81f4  mov    di, 0x7bc3    ; "^1Да увеличится, офигенно, твоя понтовость среди гопоты!"
  0000:81f7  push   cs
  0000:81f8  push   di
  0000:81f9  xor    ax, ax
  0000:81fb  push   ax
  0000:81fc  xor    ax, ax
  0000:81fe  push   ax
  0000:81ff  xor    ax, ax
  0000:8201  push   ax
  0000:8202  xor    ax, ax
  0000:8204  push   ax
  0000:8205  xor    ax, ax
  0000:8207  push   ax
  0000:8208  lcall  U2:0eed:01c2 PrintLn
  0000:820d  mov    al, byte ptr [g3692]
  0000:8210  xor    ah, ah
  0000:8212  mov    dx, 0x32
  0000:8215  mul    dx
  0000:8217  add    ax, 0x32
  0000:821a  add    word ptr [g38cb], ax
  0000:821e  mov    di, 0x7bfc    ; "^1Получи #!"
  0000:8221  push   cs
  0000:8222  push   di
  0000:8223  mov    al, byte ptr [g3692]
  0000:8226  xor    ah, ah
  0000:8228  mov    dx, 0x32
  0000:822b  mul    dx
  0000:822d  add    ax, 0x32
  0000:8230  push   ax
  0000:8231  xor    ax, ax
  0000:8233  push   ax
  0000:8234  xor    ax, ax
  0000:8236  push   ax
  0000:8237  xor    ax, ax
  0000:8239  push   ax
  0000:823a  xor    ax, ax
  0000:823c  push   ax
  0000:823d  lcall  U2:0eed:01c2 PrintLn
L08242:
  0000:8242  lcall  CRT:0f16:031a ReadKey
  0000:8247  cmp    byte ptr [g3951], 2
  0000:824c  jae    0x8269
  0000:824e  mov    di, 0x7c08    ; "^1А теперь вали отсюда и никогда здесь не появляйся!"
  0000:8251  push   cs
  0000:8252  push   di
  0000:8253  xor    ax, ax
  0000:8255  push   ax
  0000:8256  xor    ax, ax
  0000:8258  push   ax
  0000:8259  xor    ax, ax
  0000:825b  push   ax
  0000:825c  xor    ax, ax
  0000:825e  push   ax
  0000:825f  xor    ax, ax
  0000:8261  push   ax
  0000:8262  lcall  U2:0eed:01c2 PrintLn
  0000:8267  jmp    0x8282
L08269:
  0000:8269  mov    di, 0x7c3d    ; "^1А теперь проваливай!"
  0000:826c  push   cs
  0000:826d  push   di
  0000:826e  xor    ax, ax
  0000:8270  push   ax
  0000:8271  xor    ax, ax
  0000:8273  push   ax
  0000:8274  xor    ax, ax
  0000:8276  push   ax
  0000:8277  xor    ax, ax
  0000:8279  push   ax
  0000:827a  xor    ax, ax
  0000:827c  push   ax
  0000:827d  lcall  U2:0eed:01c2 PrintLn
L08282:
  0000:8282  mov    byte ptr [g3970], 0
  0000:8287  mov    di, 0x3fcc
  0000:828a  push   ds
  0000:828b  push   di
  0000:828c  lcall  SYS:0f78:05dd WriteLnEnd
  0000:8291  lcall  SYS:0f78:0291 IOCheck
  0000:8296  mov    di, 0x7c54    ; "Ты идещь дальше..."
  0000:8299  push   cs
  0000:829a  push   di
  0000:829b  xor    ax, ax
  0000:829d  push   ax
  0000:829e  xor    ax, ax
  0000:82a0  push   ax
  0000:82a1  xor    ax, ax
  0000:82a3  push   ax
  0000:82a4  xor    ax, ax
  0000:82a6  push   ax
  0000:82a7  xor    ax, ax
  0000:82a9  push   ax
  0000:82aa  lcall  U2:0eed:01c2 PrintLn
  0000:82af  mov    sp, bp
  0000:82b1  pop    bp
  0000:82b2  ret    
; ---- data 0000:82b3 (10406 bytes)
;   0000:82b3 str "^1Ты доказал, что ты самый крутой в этом районе - отправляйся в следующий"
;   0000:82fd str "^0Хочешь сохранить свои достижения?"
;   0000:8321 str "\\"
;   0000:8323 str "y"
;   0000:8325 str "save_r"
;   0000:832c str ".sav"
;   0000:8331 str "^1Сохранено в save_r"
;   0000:8346 str "^1Ты сел на автобус и попёрся на шлюз..."
;   0000:836f str "^1Там бродит шлюзовская шпана."
;   0000:838e str "^1На маршрутке ты доехал до ОбьГЭСа..."
;   0000:83b5 str "^1Здесь бродит уже более крутая гопота."
;   0000:83dd str "^1Ты приехал в Ельцовку..."
;   0000:83f8 str "^1Ото всюду доносятся крики запинываемых."
;   0000:8422 str "^1Пора наконец отомстить ректору..."
;   0000:8446 str "^1Ты пробрался в универ, в тёмный ректорский кабинет..."
;   0000:847e str "^1А вот и он..."
;   0000:848e str "w"
;   0000:8490 str "run"
;   0000:8494 str "^6Глюки прошли. Сила -2."
;   0000:84ad str "^6Забегал мудак."
;   0000:84be str "Телефон:^6Алё, ты где? Приходи, мы вещицу для тебя раздобыли.(Иди к барыгам)"
;   0000:850b str "Телефон:^6Алё,"
;   0000:851a str "^6? ты где щас? Тут помощь нужна.(Иди в притон)"
;   0000:854a str "^6? ты щас где? Базар есть.(Иди в притон)"
;   0000:8574 str "Телефон:^6Алё Вася?"
;   0000:8588 str "^2Нет это "
;   0000:8593 str "."
;   0000:8595 str "Телефон:^6А Васю можно?"
;   0000:85ad str "^2Нет, он будет в больнице в ближайшие 2 месяца."
;   0000:85de str "Телефон(Твоя пассия):^5Привет, это я. Зайдешь ко мне сегодня?"
;   0000:861c str "^2А ты: Безбазаров, жди."
;   0000:8635 str "Телефон:^2Это ты там на базаре шухер наводил? Ну короче там менты свалили."
;   0000:8680 str "Телефон:^2Ты че там, в клуб-та пойдёшь. Уже утряслось всё."
;   0000:86bb str "^1Ты спросил у прохожего где больница."
;   0000:86e2 str "^1Ты нашел базар."
;   0000:86f4 str "^1Ты увидел объявление \"Типа заходи в наш понтовый клуб\"."
;   0000:872e str "^1На стене реклама \"Жизнь тяжела. Если не хочешь сдохнуть качайся!\"."
;   0000:8773 str "^2Твоя нога залечилась с Божей помощью."
;   0000:879b str "^2Твоя челюсть залечилась с Божей помощью."
;   0000:87c6 str "^2Опа бабки! # рублей на пиво!"
;   0000:87e5 str "^6Ты зашел на тропинку где бродит искитимская гопота."
;   0000:881b str "^6Ты зашел в какие-то дебри подваротен."
;   0000:8843 str "^6Ты зашел на планы."
;   0000:8858 str "^6Ты зашел чёрте куда."
;   0000:886f str "^6Ты вышел с тропинки."
;   0000:8886 str "^6Ты вышел из подваротен."
;   0000:88a0 str "^6Ты вышел с планов."
;   0000:88b5 str "^6Ты вышел чёрте откуда."
;   0000:88ce str "^5Идет типа клёвая цыпа. Хочешь её зацепить?"
;   0000:88fb str "^5Ты такой подкатываешь, а она:\"Глянулся ты мне парниша\""
;   0000:8934 str "^4Ты ещё подкатить неуспел - а она:\"Отдыхай урод\". - Тебя обломали кент"
;   0000:897c str "Совсем ничё не происходит."
;   0000:8997 str "^6Идет "
;   0000:899f str " # уровня. Хочешь наехать?"
;   0000:89ba str " # уровня, ищущий кого отпинать. Хочешь наехать?"
;   0000:89eb str "^4Он тебя заметил."
;   0000:89fe str "^2Ты смылся."
;   0000:8a0b str "^6Идет ментяра # уровня гроза гопов."
;   0000:8a30 str "^2Ты затаился, прикинулся не гопом... Мент вроде не заметил"
;   0000:8a6c str "^2Ты напялил тёмные очки и мент не узнал твою рожу, которая весит на почётном"
;   0000:8aba str "^2стенде \"Разыскиваются за гопничество\""
;   0000:8ae2 str "^4Запалил!"
;   0000:8aed str "Все куда-то плывёт - совсем башню заклинило"
;   0000:8b19 str "^6Чё за ботва? ни кого нет.. глюки какие-то..."
;   0000:8b48 str "Ничё не происходит."
;   0000:8b5c str "mar"
;   0000:8b60 str "Ты пришел на базар напиши  ^6w^7  чтобы уйти."
;   0000:8b8e str "Можно потискать здесь у лохов кошельки(^6t^7)."
;   0000:8bbd str "А можно чё-то купить"
;   0000:8bd2 str "^61^7 - ^"
;   0000:8bdc str "#^7 руб.  Хотдог(3-4 з)"
;   0000:8bf4 str "^62^7 - ^"
;   0000:8bfe str "#^7 руб.  Пиво(#з)"
;   0000:8c11 str "^63^7 - ^"
;   0000:8c1b str "#^7 руб. Затемнённые очки(Чтоб менты не узнали)"
;   0000:8c4b str "^64^7 - ^"
;   0000:8c55 str "#^7 руб. Реальный спортивный костюм abibas(Смягчает пинок на 1)"
;   0000:8c95 str "^65^7 - ^"
;   0000:8c9f str "#^7 руб. Понтовые бутсы(Увеличивают урон)"
;   0000:8cc9 str "^66^7 - ^"
;   0000:8cd3 str "#^7 руб. Реальную кожанку(Дополнительная защита от случайностей на 2)"
;   0000:8d19 str "^67^7 - ^"
;   0000:8d23 str "#^7 руб. Реальный спортивный костюм adidas(Смягчает пинок на 2)"
;   0000:8d63 str "^68^7 - ^"
;   0000:8d6d str "#^7 руб. Понтовёйшие бутсы(Урон+2)"
;   0000:8d90 str "^69^7 - ^"
;   0000:8d9a str "#^7 руб. Ваще крутую кожанку(Броня +4)"
;   0000:8dc1 str "^0Базар\\"
;   0000:8dca str "1"
;   0000:8dcc str "^4Ты не можешь хавать из-за сломаной челюсти."
;   0000:8dfa str "^4Чёрт, бабок даже на жратву не хватает."
;   0000:8e23 str "^2Ты сожрал хот-дог"
;   0000:8e37 str "^6Да неохота хавать"
;   0000:8e4b str "2"
;   0000:8e4d str "^4Не хватает"
;   0000:8e5a str "^2Глинское? Чё за нафиг? А ладно."
;   0000:8e7c str "^2Пивко. Холодненькое."
;   0000:8e93 str "^2Ну чё по пиву?."
;   0000:8ea5 str "3"
;   0000:8ea7 str "^4Не хватает бабок"
;   0000:8eba str "^2Модные такие очки от солнца."
;   0000:8ed9 str "^6У тебя есть очки от солнца."
;   0000:8ef7 str "4"
;   0000:8ef9 str "^4Не хватает денег"
;   0000:8f0c str "^2Теперь ты больше похож на гопа."
;   0000:8f2e str "^6У тебя уже есть костюм."
;   0000:8f48 str "^6У тебя есть более крутой костюм."
;   0000:8f6b str "5"
;   0000:8f6d str "^4Нету на них денег"
;   0000:8f81 str "^2Зацени красовки."
;   0000:8f94 str "^6У тебя такие уже есть."
;   0000:8fad str "^6У тебя бутсы по круче."
;   0000:8fc6 str "6"
;   0000:8fc8 str "^4Не достаточно бабла"
;   0000:8fde str "^2Ну весь на понтах."
;   0000:8ff3 str "^6Ты уже купил это."
;   0000:9007 str "^6Утебя есть кожанка круче."
;   0000:9023 str "7"
;   0000:9025 str "^2Чистый гопник."
;   0000:9036 str "^6У тебя уже есть этот костюм."
;   0000:9055 str "8"
;   0000:9057 str "^2Офигенные бутцы."
;   0000:906a str "9"
;   0000:906c str "^2Ну крутой, сдохнуть можно!"
;   0000:9089 str "t"
;   0000:908b str "^6Ты получаешь # качков опыта"
;   0000:90a9 str "^4Корявый! ты попался!"
;   0000:90c0 str "^6Это "
;   0000:90c7 str " # уровня."
;   0000:90d2 str "^6Блин менты запалят сматывайся!."
;   0000:90f4 str "^6На базар пока нельзя там менты бродят, тебя ищут."
;   0000:9128 str "^6Ты незнаешь, пока ешё, где находтся базар"
;   0000:9154 str "bmar"
;   0000:9159 str "Ты пришел к барыгам напиши  ^6w^7  чтобы уйти."
;   0000:9188 str "Здесь можно толкнуть хлам(^6x^7) и купить кое-что"
;   0000:91ba str "Ещё ты можешь продать ненужные вещи - ^6wes^7"
;   0000:91e8 str "#^7 руб. Косяк"
;   0000:91f7 str "#^7 руб. Краденый мобильник(Подмога быстрее приходит)"
;   0000:922d str "#^7 руб. Офигенный косяк(Очко прокачки)"
;   0000:9255 str "#^7 руб. Сделать типа зоновскую наколку(Шансы, что наедут -50%(кроме бандитов, ментов и маньяков))"
;   0000:92b8 str "#^7 руб. Кастет(урон+2)"
;   0000:92d0 str "#^7 руб. Дубинка(урон+4), заменяет кастет"
;   0000:92fa str "#^7 руб. Самопальный пистолет (Можно стрелять в бандитских районах - ^6f^7 урон(#-#))."
;   0000:9351 str "#^7 руб. Патроны - 6."
;   0000:9367 str "#^7 руб. Глушитель."
;   0000:937b str "^0Барыги\\"
;   0000:9385 str "^4Чёрт, бабок не хватает."
;   0000:939f str "^2Ты купил косяк"
;   0000:93b0 str "^4Нету денег"
;   0000:93bd str "^2Чё ты модный типа да?."
;   0000:93d6 str "^6У тебя уже есть мобила."
;   0000:93f0 str "^2Пошли стероиды!"
;   0000:9402 str "^1Сила +1 "
;   0000:940d str "^1Ловкость +1 "
;   0000:941c str "^1Живучесть +1 "
;   0000:942c str "^1Удача +1 "
;   0000:9438 str "^2Чистый зек."
;   0000:9446 str "^6Сделать, конечно, можно но толку не будет."
;   0000:9473 str "^4Не хватает деньжат"
;   0000:9488 str "^2Ты купил кастет смотри чтоб менты с ним не запалили."
;   0000:94bf str "^6У тебя есть эта железка."
;   0000:94da str "^6Нафиг тебе он нужен, когда есть более мощное оружие."
;   0000:9511 str "^4Не хватает на дубинку деньжат"
;   0000:9531 str "^2Ты купил дубинку - похоже задумал чё-то нехорошее."
;   0000:9566 str "^6У тебя есть дубина."
;   0000:957c str "^6Да нафиг она нужна, когда есть более мощное оружие."
;   0000:95b2 str "^4Дорогая штука!"
;   0000:95c3 str "^2Спасайся кто может!!!"
;   0000:95db str "^0Только помни стреляй в бандитских районах - там менты не накроют"
;   0000:961e str "^6Ну.. ты.. ВАЩЕ ОФИГЕЛ!"
;   0000:9637 str "^4Нехватка денег."
;   0000:9649 str "^2Получи пять пуль.. на руки"
;   0000:9666 str "^6Нету пушки. Сначала купи пистолет"
;   0000:968a str "^4Подкопи бабла."
;   0000:969b str "^2Теперь стреляй где хочешь!"
;   0000:96b8 str "^6Да купил уже, купил"
;   0000:96ce str "x"
;   0000:96d0 str "^6Барыги дали тебе денег за хлам."
;   0000:96f2 str "^4Тебе нечего спихнуть."
;   0000:970a str "wes"
;   0000:970e str "^2У тебя есть ненужный костюм хочешь продать?"
;   0000:973c str "^0Продать вещи\\"
;   0000:974c str "^2Ты продал костюм за #."
;   0000:9765 str "^2У тебя есть ненужные кроссовки хочешь продать?"
;   0000:9796 str "^2Ты продал кроссовки за #."
;   0000:97b2 str "^2У тебя есть ненужная кожанка хочешь продать?"
;   0000:97e1 str "^2Ты продал кожанку за #."
;   0000:97fb str "^2У тебя есть кастет, а это отстой хочешь продать?"
;   0000:982e str "^2Ты продал кастет за #."
;   0000:9847 str "^2У тебя есть дубинка - барахло - хочешь продать?"
;   0000:9879 str "^2Ты продал дубинку за #."
;   0000:9893 str "^2У тебя есть ножик и тeсак, хочешь продать ножик?"
;   0000:98c6 str "^2Ты продал ножик за #."
;   0000:98de str "^6У тебя нет неужных вещей."
;   0000:98fa str " "
;   0000:98fc str "^6Туда любого дебила с улицы непропустят - сначала докажи, что ты не засранец - отпинай побольше ублюдков"
;   0000:9966 str "rep"
;   0000:996a str "Ты пришел на ремот, к ветеринару напиши  ^6w^7  чтобы уйти"
;   0000:99a5 str "^0Док: не волнуйся всё зарастёт как на собаке"
;   0000:99d3 str "  ^2h^7 - за ^"
;   0000:99e2 str "3^7 рубля тебя залатают"
;   0000:99fa str "  ^2r^7 - за ^"
;   0000:9a09 str "7^7 рублей починят переломы"
;   0000:9a25 str "^0Док: вали отсюда ты здоров."
;   0000:9a43 str "^0Ветеренар\\"
;   0000:9a50 str "r"
;   0000:9a52 str "^0Ого! да тебя не иначе как грузовик откатал!"
;   0000:9a80 str "^2Твои переломы залечены."
;   0000:9a9a str "^4Блин халявщик, медицина не бесплатная"
;   0000:9ac2 str "h"
;   0000:9ac4 str "^0Щас гайки подтянем и будешь как новый!"
;   0000:9aed str "^0Так чё тут у нас? Ага, пара швов и всё будет в порядке."
;   0000:9b27 str "^6Эй, Док а зачем тебе паяльник?"
;   0000:9b48 str "^0Док: Молчи животное!"
;   0000:9b5f str "^2Здоровья #/#"
;   0000:9b6e str "e"
;   0000:9b70 str "^6Сначала найди где находтся эта больница"
;   0000:9b9a str "girl"
;   0000:9b9f str "^2Ты пришел к своей подруге."
;   0000:9bbc str "^2Она вытащила тебя в клуб и теперь ты знаешь где он находиться."
;   0000:9bfd str "^6Ты купил ей чё-то, потратив 12 рублей."
;   0000:9c26 str "^2Ты расслабился, отдохнул и снова можешь творить свои гоповские дела."
;   0000:9c6d str "^6Ну непойдёшь же как придурок без ничего."
;   0000:9c98 str "^4У тебя пока нет девчонки."
;   0000:9cb4 str "fight"
;   0000:9cba str "^6Пережитки прошлого жми ^6w^7 чтобы искать врагов"
;   0000:9ced str "pr"
;   0000:9cf0 str "Ты пришел в притон - "
;   0000:9d06 str "^0общагу №#"
;   0000:9d12 str "^0общагу ВКИ"
;   0000:9d1f str "^0гоповский притон"
;   0000:9d32 str "^0притон отморозков"
;   0000:9d46 str "^6На одного пацана наехал какой-то урод"
;   0000:9d6e str "^6Ты пацан нормальный. Есть дело."
;   0000:9d90 str "^6Пацаны хотят тебе кое-чё сказать"
;   0000:9db3 str "Напиши ^6w^7 чтобы уйти"
;   0000:9dcb str "Напиши ^"
;   0000:9dd4 str "p^7  чтобы угостить пацанов пивом"
;   0000:9df6 str "r^7  чтобы занять 2 рубля"
;   0000:9e10 str "Напиши ^6hp^7 чтобы отпинать мудака который наезжал на пацана"
;   0000:9e4e str "Напиши ^6s^7  чтобы узнать отношение"
;   0000:9e73 str "Напиши ^6a^7  чтобы спросить чё-то"
;   0000:9e96 str "Напиши ^6d^7 чтобы пойти на дело"
;   0000:9eb7 str "^0Притон\\"
;   0000:9ec1 str "p"
;   0000:9ec3 str "^2Ты угостил пацанов пивом. Понтовость улутшилась на 5."
;   0000:9efb str "^6А нет у тебя пива."
;   0000:9f10 str "^2Ты занял 2 рубля на пиво. Понтовость уменьшилась на 2."
;   0000:9f49 str "^6Ты не можешь занять денег."
;   0000:9f66 str "^6Ты уже всю мелочь выгреб!"
;   0000:9f82 str "hp"
;   0000:9f85 str "s"
;   0000:9f87 str "^4Твоя понтовость сейчас = #."
;   0000:9fa5 str "^0Да если чё мы за тебя впрягаемся."
;   0000:9fc9 str "a"
;   0000:9fcb str "^0Тут у нас есть пара мест куда тебе стоит сходить"
;   0000:9ffe str "^2Ты узнал где находится качалка и где находятся барыги"
;   0000:a036 str "d"
;   0000:a038 str "^0Давай быстрее.."
;   0000:a04a str "^2Ты пришел воровать деньги"
;   0000:a066 str "^4Шухер менты!"
;   0000:a075 str "^6Пора валить!"
;   0000:a084 str "^2Ты смылся от ментов."
;   0000:a09b str "^2Ты наваровал денег"
;   0000:a0b0 str "^4Тебя мудака такого туда не пустят - поднимай понтовость"
;   0000:a0ea str "kl"
;   0000:a0ed str "^6Тебе не стоит пока туда соваться"
;   0000:a110 str "Ты пришел в клуб напиши  ^6w^7  чтобы уйти"
;   0000:a13b str " Здесь можно сыграть в карты (^6p^7 Минимальная ставка- 5р.)"
;   0000:a178 str " 1 -  ^"
;   0000:a180 str "15^7  потусоваться на дискотеке(Ловкость +1)"
;   0000:a1ad str " 2 -  ^"
;   0000:a1b5 str "22^7  разузнать приемы мухлёжников(Удача +1)"
;   0000:a1e2 str "^0Клуб\\"
;   0000:a1ea str "Ты поставил # рублей"
;   0000:a1ff str "^2Ты выиграл # рублей "
;   0000:a216 str "^4Ты проиграл # рублей"
;   0000:a22d str "^6Ставки изменились. Теперь ставка - #"
;   0000:a254 str "^4Козёл! Да ты мухлевал!"
;   0000:a26d str "^6Ты получаешь # качков опыта за победу в игре"
;   0000:a29c str "^6Уноси ноги, пока не отобрали деньги другие канадидаты"
;   0000:a2d4 str "^6Не хватает денег - надо #."
;   0000:a2f1 str "^2Ты прокачиваешь ловкость."
;   0000:a30d str "^2Ты прокачиваешь удачу."
;   0000:a326 str "^6Ты пока что неузнал где в этом районе клуб"
;   0000:a353 str "trn"
;   0000:a357 str "Ты пришел в качалку напиши  ^6w^7  чтобы уйти"
;   0000:a385 str "20^7  качаться гателями и шгангой(Сила +1)"
;   0000:a3b0 str "20^7  качаться на тренажерах(Выносливость +1)"
;   0000:a3de str " 3 -  ^"
;   0000:a3e6 str "10^7  прокачать # качков опыта"
;   0000:a405 str " 4 -  ^"
;   0000:a40d str "30^7  купить зубную защиту боксёров(-75% что сломают челюсть)"
;   0000:a44b str " 5 -  ^"
;   0000:a453 str "20^7  прокачать пресс(Броня +1)"
;   0000:a473 str "^0Качалка\\"
;   0000:a47e str "^2Ты прокачиваешь силу."
;   0000:a496 str "^2Ты прокачиваешь выносливость."
;   0000:a4b6 str "^1Выносливость +1 "
;   0000:a4c9 str "^6Ты слишком крутой чтобы тренироваться здесь."
;   0000:a4f8 str "^2Ты тренируешься."
;   0000:a50b str "^1 +# качков опыта "
;   0000:a51f str "^4А не хватает рубликов"
;   0000:a537 str "^2Ты купил защиту."
;   0000:a54a str "^6У тебя есть эта штучка."
;   0000:a564 str "^4Не хватает рубликов"
;   0000:a57a str "^2Ты прокачиваешь пресс."
;   0000:a593 str "^1Броня +1"
;   0000:a59e str "^6Ты максимально прокачал пресс для своего уровня"
;   0000:a5d0 str "^6Качай дальше в следующем районе"
;   0000:a5f2 str "^6Ты пока незнаешь где в этом районе качалка"
;   0000:a61f str "kos"
;   0000:a623 str "^4Ты не схавать колёса из-за сломаной челюсти."
;   0000:a652 str "^2Колёса прибавляют #з. "
;   0000:a66b str "^2Здоровья:#/#. Осталось # косяков"
;   0000:a68e str "^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косякова"
;   0000:a6c8 str "^2Сила +2."
;   0000:a6d3 str "^4У тебя нет косяков"
;   0000:a6e8 str "^6Ты неможешь схавать ещё один косяк."
;   0000:a70e str "i"
;   0000:a710 str "Напиши: ^6w^7    чтобы шататься по окрестностям - искать на свою жопу приключения"
;   0000:a762 str "Напиши: ^6mar^7  чтобы идти на рынок"
;   0000:a787 str "Напиши: ^6bmar^7 чтобы идти к барыгам"
;   0000:a7ad str "Напиши: ^6rep^7  чтобы идти к ветеринару"
;   0000:a7d6 str "Напиши: ^6girl^7 чтобы завалиться к своей девчонке"
;   0000:a809 str "Напиши: ^6pr^7   чтобы идти в местный притон гопоты"
;   0000:a83d str "Напиши: ^6kl^7   чтобы идти в клуб"
;   0000:a860 str "Напиши: ^6trn^7  чтобы идти в качалку"
;   0000:a886 str "Напиши: ^6s^7    чтобы посмотреть в лужу на свою уродскую рожу"
;   0000:a8c5 str "Напиши: ^6sv^7   чтобы приглядеться к пинаемому мудаку"
;   0000:a8fc str "Напиши: ^6k^7    чтобы гасить мудака который тебе попался на дороге"
;   0000:a940 str "Напиши: ^6v^7    чтобы позвать подкрепление"
;   0000:a96c str "Напиши: ^6kos^7  чтобы схавать косяк"
;   0000:a991 str "Напиши: ^6h^7    чтобы выпить пиво (если не охото к ветеринару)"
;   0000:a9d1 str "Напиши: ^6mh^7   чтобы набухаться до чёртиков"
;   0000:a9ff str "Напиши: ^6name^7 чтобы сменить погоняло"
;   0000:aa27 str "Напиши: ^6e^7    если захочешь выйти"
;   0000:aa4c str "f"
;   0000:aa4e str "^6Ты чё псих? мигом менты накроют!"
;   0000:aa71 str "k"
;   0000:aa73 str "^6Чё машешь копытами? Ищи мудака которого будешь пинать!"
;   0000:aaac str "name"
;   0000:aab1 str "^2Звали тебя:^7 "
;   0000:aac2 str "^2А теперь будут:^7 "
;   0000:aad7 str "Раз^6дол^4бай"
;   0000:aae5 str "^7 "
;   0000:aae9 str "version"
;   0000:aaf1 str "^4Gopnik: ^7version 1.02 june,sept 2003"
;   0000:ab19 str "help"
;   0000:ab1e str "exit"
;   0000:ab23 str "^6Блин не быть тебе нормальным пацаном"
;   0000:ab4a str "^1А результат:"

;================ proc 0000:ab59  callers: ENTRY
  0000:ab59  lcall  SYS:0f78:0000 SysInit
  0000:ab5e  lcall  CRT:0f16:000d CrtInit
  0000:ab63  push   bp
  0000:ab64  mov    bp, sp
  0000:ab66  mov    ax, 0x200
  0000:ab69  lcall  SYS:0f78:02cd StackCheck
  0000:ab6e  sub    sp, 0x200
  0000:ab72  call   0x6a0d
L0ab75:
  0000:ab75  mov    al, byte ptr [g3692]
  0000:ab78  xor    ah, ah
  0000:ab7a  mov    dx, 0xa
  0000:ab7d  mul    dx
  0000:ab7f  cmp    ax, word ptr [g38a6]
  0000:ab83  jle    0xab88
  0000:ab85  jmp    0xae18
L0ab88:
  0000:ab88  cmp    byte ptr [g3692], 5
  0000:ab8d  jb     0xab92
  0000:ab8f  jmp    0xae18
L0ab92:
  0000:ab92  inc    byte ptr [g3692]
  0000:ab96  mov    byte ptr [g3698], 0
  0000:ab9b  mov    byte ptr [g3694], 0
  0000:aba0  cmp    word ptr [g389c], 3
  0000:aba5  je     0xabac
  0000:aba7  mov    byte ptr [g3699], 0
L0abac:
  0000:abac  mov    byte ptr [g369a], 0
  0000:abb1  cmp    word ptr [g389c], 3
  0000:abb6  je     0xabbd
  0000:abb8  mov    byte ptr [g3697], 0
L0abbd:
  0000:abbd  mov    byte ptr [g3695], 0
  0000:abc2  cmp    word ptr [g389c], 5
  0000:abc7  je     0xabce
  0000:abc9  mov    byte ptr [g3696], 0
L0abce:
  0000:abce  mov    byte ptr [g3b76], 0
  0000:abd3  mov    byte ptr [g3b77], 0
  0000:abd8  mov    di, 0x82b3    ; "^1Ты доказал, что ты самый крутой в этом районе - отправляйся в следующий"
  0000:abdb  push   cs
  0000:abdc  push   di
  0000:abdd  xor    ax, ax
  0000:abdf  push   ax
  0000:abe0  xor    ax, ax
  0000:abe2  push   ax
  0000:abe3  xor    ax, ax
  0000:abe5  push   ax
  0000:abe6  xor    ax, ax
  0000:abe8  push   ax
  0000:abe9  xor    ax, ax
  0000:abeb  push   ax
  0000:abec  lcall  U2:0eed:01c2 PrintLn
  0000:abf1  mov    di, 0x82fd    ; "^0Хочешь сохранить свои достижения?"
  0000:abf4  push   cs
  0000:abf5  push   di
  0000:abf6  xor    ax, ax
  0000:abf8  push   ax
  0000:abf9  xor    ax, ax
  0000:abfb  push   ax
  0000:abfc  xor    ax, ax
  0000:abfe  push   ax
  0000:abff  xor    ax, ax
  0000:ac01  push   ax
  0000:ac02  xor    ax, ax
  0000:ac04  push   ax
  0000:ac05  lcall  U2:0eed:01c2 PrintLn
  0000:ac0a  mov    di, 0x8321    ; "\"
  0000:ac0d  push   cs
  0000:ac0e  push   di
  0000:ac0f  xor    ax, ax
  0000:ac11  push   ax
  0000:ac12  xor    ax, ax
  0000:ac14  push   ax
  0000:ac15  xor    ax, ax
  0000:ac17  push   ax
  0000:ac18  xor    ax, ax
  0000:ac1a  push   ax
  0000:ac1b  xor    ax, ax
  0000:ac1d  push   ax
  0000:ac1e  lcall  U2:0eed:0000 Print
  0000:ac23  mov    di, 0x3ecc
  0000:ac26  push   ds
  0000:ac27  push   di
  0000:ac28  mov    di, 0x3a72
  0000:ac2b  push   ds
  0000:ac2c  push   di
  0000:ac2d  mov    ax, 0xff
  0000:ac30  push   ax
  0000:ac31  lcall  SYS:0f78:06c6 ReadStr
  0000:ac36  lcall  SYS:0f78:059d ReadLnEnd
  0000:ac3b  lcall  SYS:0f78:0291 IOCheck
  0000:ac40  mov    di, 0x3a72
  0000:ac43  push   ds
  0000:ac44  push   di
  0000:ac45  lcall  U2:0eed:0216 LowerCase
  0000:ac4a  mov    di, 0x3a72
  0000:ac4d  push   ds
  0000:ac4e  push   di
  0000:ac4f  mov    di, 0x8323    ; "y"
  0000:ac52  push   cs
  0000:ac53  push   di
  0000:ac54  lcall  SYS:0f78:0bd8 StrCmp
  0000:ac59  je     0xac5e
  0000:ac5b  jmp    0xad12
L0ac5e:
  0000:ac5e  mov    al, byte ptr [g3692]
  0000:ac61  xor    ah, ah
  0000:ac63  xor    dx, dx
  0000:ac65  push   dx
  0000:ac66  push   ax
  0000:ac67  xor    ax, ax
  0000:ac69  push   ax
  0000:ac6a  mov    di, 0x3b7c
  0000:ac6d  push   ds
  0000:ac6e  push   di
  0000:ac6f  mov    ax, 0xff
  0000:ac72  push   ax
  0000:ac73  lcall  SYS:0f78:12d0 StrLong
  0000:ac78  mov    di, 0x3c84
  0000:ac7b  push   ds
  0000:ac7c  push   di
  0000:ac7d  lea    di, [bp - 0x100]
  0000:ac81  push   ss
  0000:ac82  push   di
  0000:ac83  mov    di, 0x3d32
  0000:ac86  push   ds
  0000:ac87  push   di
  0000:ac88  lcall  SYS:0f78:0ae7 StrLoad
  0000:ac8d  mov    di, 0x8325    ; "save_r"
  0000:ac90  push   cs
  0000:ac91  push   di
  0000:ac92  lcall  SYS:0f78:0b66 StrConcat
  0000:ac97  mov    di, 0x3b7c
  0000:ac9a  push   ds
  0000:ac9b  push   di
  0000:ac9c  lcall  SYS:0f78:0b66 StrConcat
  0000:aca1  mov    di, 0x832c    ; ".sav"
  0000:aca4  push   cs
  0000:aca5  push   di
  0000:aca6  lcall  SYS:0f78:0b66 StrConcat
  0000:acab  lcall  SYS:0f78:072e Assign
  0000:acb0  mov    di, 0x3c84
  0000:acb3  push   ds
  0000:acb4  push   di
  0000:acb5  mov    ax, 0x2b6
  0000:acb8  push   ax
  0000:acb9  lcall  SYS:0f78:0772 Rewrite
  0000:acbe  mov    di, 0x3c84
  0000:acc1  push   ds
  0000:acc2  push   di
  0000:acc3  mov    di, 0x369c
  0000:acc6  push   ds
  0000:acc7  push   di
  0000:acc8  lcall  SYS:0f78:0825 WriteRec
  0000:accd  add    sp, 4
  0000:acd0  mov    di, 0x3c84
  0000:acd3  push   ds
  0000:acd4  push   di
  0000:acd5  lcall  SYS:0f78:07ea Close
  0000:acda  lea    di, [bp - 0x100]
  0000:acde  push   ss
  0000:acdf  push   di
  0000:ace0  mov    di, 0x8331    ; "^1Сохранено в save_r"
  0000:ace3  push   cs
  0000:ace4  push   di
  0000:ace5  lcall  SYS:0f78:0ae7 StrLoad
  0000:acea  mov    di, 0x3b7c
  0000:aced  push   ds
  0000:acee  push   di
  0000:acef  lcall  SYS:0f78:0b66 StrConcat
  0000:acf4  mov    di, 0x832c    ; ".sav"
  0000:acf7  push   cs
  0000:acf8  push   di
  0000:acf9  lcall  SYS:0f78:0b66 StrConcat
  0000:acfe  xor    ax, ax
  0000:ad00  push   ax
  0000:ad01  xor    ax, ax
  0000:ad03  push   ax
  0000:ad04  xor    ax, ax
  0000:ad06  push   ax
  0000:ad07  xor    ax, ax
  0000:ad09  push   ax
  0000:ad0a  xor    ax, ax
  0000:ad0c  push   ax
  0000:ad0d  lcall  U2:0eed:01c2 PrintLn
L0ad12:
  0000:ad12  mov    al, byte ptr [g3692]
  0000:ad15  cmp    al, 2
  0000:ad17  jne    0xad4e
  0000:ad19  mov    di, 0x8346    ; "^1Ты сел на автобус и попёрся на шлюз..."
  0000:ad1c  push   cs
  0000:ad1d  push   di
  0000:ad1e  xor    ax, ax
  0000:ad20  push   ax
  0000:ad21  xor    ax, ax
  0000:ad23  push   ax
  0000:ad24  xor    ax, ax
  0000:ad26  push   ax
  0000:ad27  xor    ax, ax
  0000:ad29  push   ax
  0000:ad2a  xor    ax, ax
  0000:ad2c  push   ax
  0000:ad2d  lcall  U2:0eed:01c2 PrintLn
  0000:ad32  mov    di, 0x836f    ; "^1Там бродит шлюзовская шпана."
  0000:ad35  push   cs
  0000:ad36  push   di
  0000:ad37  xor    ax, ax
  0000:ad39  push   ax
  0000:ad3a  xor    ax, ax
  0000:ad3c  push   ax
  0000:ad3d  xor    ax, ax
  0000:ad3f  push   ax
  0000:ad40  xor    ax, ax
  0000:ad42  push   ax
  0000:ad43  xor    ax, ax
  0000:ad45  push   ax
  0000:ad46  lcall  U2:0eed:01c2 PrintLn
  0000:ad4b  jmp    0xae18
L0ad4e:
  0000:ad4e  cmp    al, 3
  0000:ad50  jne    0xad87
  0000:ad52  mov    di, 0x838e    ; "^1На маршрутке ты доехал до ОбьГЭСа..."
  0000:ad55  push   cs
  0000:ad56  push   di
  0000:ad57  xor    ax, ax
  0000:ad59  push   ax
  0000:ad5a  xor    ax, ax
  0000:ad5c  push   ax
  0000:ad5d  xor    ax, ax
  0000:ad5f  push   ax
  0000:ad60  xor    ax, ax
  0000:ad62  push   ax
  0000:ad63  xor    ax, ax
  0000:ad65  push   ax
  0000:ad66  lcall  U2:0eed:01c2 PrintLn
  0000:ad6b  mov    di, 0x83b5    ; "^1Здесь бродит уже более крутая гопота."
  0000:ad6e  push   cs
  0000:ad6f  push   di
  0000:ad70  xor    ax, ax
  0000:ad72  push   ax
  0000:ad73  xor    ax, ax
  0000:ad75  push   ax
  0000:ad76  xor    ax, ax
  0000:ad78  push   ax
  0000:ad79  xor    ax, ax
  0000:ad7b  push   ax
  0000:ad7c  xor    ax, ax
  0000:ad7e  push   ax
  0000:ad7f  lcall  U2:0eed:01c2 PrintLn
  0000:ad84  jmp    0xae18
L0ad87:
  0000:ad87  cmp    al, 4
  0000:ad89  jne    0xadbf
  0000:ad8b  mov    di, 0x83dd    ; "^1Ты приехал в Ельцовку..."
  0000:ad8e  push   cs
  0000:ad8f  push   di
  0000:ad90  xor    ax, ax
  0000:ad92  push   ax
  0000:ad93  xor    ax, ax
  0000:ad95  push   ax
  0000:ad96  xor    ax, ax
  0000:ad98  push   ax
  0000:ad99  xor    ax, ax
  0000:ad9b  push   ax
  0000:ad9c  xor    ax, ax
  0000:ad9e  push   ax
  0000:ad9f  lcall  U2:0eed:01c2 PrintLn
  0000:ada4  mov    di, 0x83f8    ; "^1Ото всюду доносятся крики запинываемых."
  0000:ada7  push   cs
  0000:ada8  push   di
  0000:ada9  xor    ax, ax
  0000:adab  push   ax
  0000:adac  xor    ax, ax
  0000:adae  push   ax
  0000:adaf  xor    ax, ax
  0000:adb1  push   ax
  0000:adb2  xor    ax, ax
  0000:adb4  push   ax
  0000:adb5  xor    ax, ax
  0000:adb7  push   ax
  0000:adb8  lcall  U2:0eed:01c2 PrintLn
  0000:adbd  jmp    0xae18
L0adbf:
  0000:adbf  cmp    al, 5
  0000:adc1  jne    0xae18
  0000:adc3  mov    di, 0x8422    ; "^1Пора наконец отомстить ректору..."
  0000:adc6  push   cs
  0000:adc7  push   di
  0000:adc8  xor    ax, ax
  0000:adca  push   ax
  0000:adcb  xor    ax, ax
  0000:adcd  push   ax
  0000:adce  xor    ax, ax
  0000:add0  push   ax
  0000:add1  xor    ax, ax
  0000:add3  push   ax
  0000:add4  xor    ax, ax
  0000:add6  push   ax
  0000:add7  lcall  U2:0eed:01c2 PrintLn
  0000:addc  lcall  CRT:0f16:031a ReadKey
  0000:ade1  mov    di, 0x8446    ; "^1Ты пробрался в универ, в тёмный ректорский кабинет..."
  0000:ade4  push   cs
  0000:ade5  push   di
  0000:ade6  xor    ax, ax
  0000:ade8  push   ax
  0000:ade9  xor    ax, ax
  0000:adeb  push   ax
  0000:adec  xor    ax, ax
  0000:adee  push   ax
  0000:adef  xor    ax, ax
  0000:adf1  push   ax
  0000:adf2  xor    ax, ax
  0000:adf4  push   ax
  0000:adf5  lcall  U2:0eed:01c2 PrintLn
  0000:adfa  mov    di, 0x847e    ; "^1А вот и он..."
  0000:adfd  push   cs
  0000:adfe  push   di
  0000:adff  xor    ax, ax
  0000:ae01  push   ax
  0000:ae02  xor    ax, ax
  0000:ae04  push   ax
  0000:ae05  xor    ax, ax
  0000:ae07  push   ax
  0000:ae08  xor    ax, ax
  0000:ae0a  push   ax
  0000:ae0b  xor    ax, ax
  0000:ae0d  push   ax
  0000:ae0e  lcall  U2:0eed:01c2 PrintLn
  0000:ae13  mov    byte ptr [g3c83], 1
L0ae18:
  0000:ae18  cmp    byte ptr [g3c83], 1
  0000:ae1d  jne    0xae3c
  0000:ae1f  mov    byte ptr [g3696], 1
  0000:ae24  mov    al, 0
  0000:ae26  push   ax
  0000:ae27  call   0x111c2
  0000:ae2a  mov    al, 3
  0000:ae2c  push   ax
  0000:ae2d  call   0x3d11
  0000:ae30  mov    al, 1
  0000:ae32  push   ax
  0000:ae33  call   0x111c2
  0000:ae36  mov    al, 4
  0000:ae38  push   ax
  0000:ae39  call   0x3d11
L0ae3c:
  0000:ae3c  mov    di, 0x8321    ; "\"
  0000:ae3f  push   cs
  0000:ae40  push   di
  0000:ae41  xor    ax, ax
  0000:ae43  push   ax
  0000:ae44  xor    ax, ax
  0000:ae46  push   ax
  0000:ae47  xor    ax, ax
  0000:ae49  push   ax
  0000:ae4a  xor    ax, ax
  0000:ae4c  push   ax
  0000:ae4d  xor    ax, ax
  0000:ae4f  push   ax
  0000:ae50  lcall  U2:0eed:0000 Print
  0000:ae55  mov    di, 0x3ecc
  0000:ae58  push   ds
  0000:ae59  push   di
  0000:ae5a  mov    di, 0x3972
  0000:ae5d  push   ds
  0000:ae5e  push   di
  0000:ae5f  mov    ax, 0xff
  0000:ae62  push   ax
  0000:ae63  lcall  SYS:0f78:06c6 ReadStr
  0000:ae68  lcall  SYS:0f78:059d ReadLnEnd
  0000:ae6d  lcall  SYS:0f78:0291 IOCheck
  0000:ae72  mov    di, 0x3972
  0000:ae75  push   ds
  0000:ae76  push   di
  0000:ae77  lcall  U2:0eed:0216 LowerCase
  0000:ae7c  mov    di, 0x3972
  0000:ae7f  push   ds
  0000:ae80  push   di
  0000:ae81  mov    di, 0x848e    ; "w"
  0000:ae84  push   cs
  0000:ae85  push   di
  0000:ae86  lcall  SYS:0f78:0bd8 StrCmp
  0000:ae8b  je     0xaea1
  0000:ae8d  mov    di, 0x3972
  0000:ae90  push   ds
  0000:ae91  push   di
  0000:ae92  mov    di, 0x8490    ; "run"
  0000:ae95  push   cs
  0000:ae96  push   di
  0000:ae97  lcall  SYS:0f78:0bd8 StrCmp
  0000:ae9c  je     0xaea1
  0000:ae9e  jmp    0xb940
L0aea1:
  0000:aea1  cmp    byte ptr [g38cd], 0
  0000:aea6  jbe    0xaeda
  0000:aea8  dec    byte ptr [g38cd]
  0000:aeac  cmp    byte ptr [g38cd], 0
  0000:aeb1  jne    0xaeda
  0000:aeb3  sub    word ptr [g389e], 2
  0000:aeb8  dec    word ptr [g38a8]
  0000:aebc  sub    word ptr [g38aa], 2
  0000:aec1  mov    di, 0x8494    ; "^6Глюки прошли. Сила -2."
  0000:aec4  push   cs
  0000:aec5  push   di
  0000:aec6  xor    ax, ax
  0000:aec8  push   ax
  0000:aec9  xor    ax, ax
  0000:aecb  push   ax
  0000:aecc  xor    ax, ax
  0000:aece  push   ax
  0000:aecf  xor    ax, ax
  0000:aed1  push   ax
  0000:aed2  xor    ax, ax
  0000:aed4  push   ax
  0000:aed5  lcall  U2:0eed:01c2 PrintLn
L0aeda:
  0000:aeda  mov    di, 0x3972
  0000:aedd  push   ds
  0000:aede  push   di
  0000:aedf  mov    di, 0x8490    ; "run"
  0000:aee2  push   cs
  0000:aee3  push   di
  0000:aee4  lcall  SYS:0f78:0bd8 StrCmp
  0000:aee9  jne    0xaf04
  0000:aeeb  mov    di, 0x84ad    ; "^6Забегал мудак."
  0000:aeee  push   cs
  0000:aeef  push   di
  0000:aef0  xor    ax, ax
  0000:aef2  push   ax
  0000:aef3  xor    ax, ax
  0000:aef5  push   ax
  0000:aef6  xor    ax, ax
  0000:aef8  push   ax
  0000:aef9  xor    ax, ax
  0000:aefb  push   ax
  0000:aefc  xor    ax, ax
  0000:aefe  push   ax
  0000:aeff  lcall  U2:0eed:01c2 PrintLn
L0af04:
  0000:af04  mov    al, byte ptr [g3692]
  0000:af07  xor    ah, ah
  0000:af09  mov    dx, 0xa
  0000:af0c  mul    dx
  0000:af0e  mov    dx, ax
  0000:af10  mov    al, byte ptr [g3e35]
  0000:af13  xor    ah, ah
  0000:af15  cmp    ax, dx
  0000:af17  jge    0xaf1d
  0000:af19  inc    byte ptr [g3e35]
L0af1d:
  0000:af1d  cmp    byte ptr [g3695], 0
  0000:af22  je     0xaf5d
  0000:af24  cmp    byte ptr [g394d], 0
  0000:af29  je     0xaf5d
  0000:af2b  cmp    byte ptr [g3e32], 0x19
  0000:af30  jae    0xaf5d
  0000:af32  inc    byte ptr [g3e32]
  0000:af36  cmp    byte ptr [g3e32], 0x19
  0000:af3b  jne    0xaf5d
  0000:af3d  cmp    byte ptr [g38bb], 1
  0000:af42  jne    0xaf5d
  0000:af44  mov    di, 0x84be    ; "Телефон:^6Алё, ты где? Приходи, мы вещицу для тебя раздобыли.(Иди к барыгам)"
  0000:af47  push   cs
  0000:af48  push   di
  0000:af49  xor    ax, ax
  0000:af4b  push   ax
  0000:af4c  xor    ax, ax
  0000:af4e  push   ax
  0000:af4f  xor    ax, ax
  0000:af51  push   ax
  0000:af52  xor    ax, ax
  0000:af54  push   ax
  0000:af55  xor    ax, ax
  0000:af57  push   ax
  0000:af58  lcall  U2:0eed:01c2 PrintLn
L0af5d:
  0000:af5d  cmp    byte ptr [g3b78], 0
  0000:af62  jne    0xafbc
  0000:af64  mov    ax, 0x14
  0000:af67  push   ax
  0000:af68  lcall  SYS:0f78:114b Random
  0000:af6d  or     ax, ax
  0000:af6f  jne    0xafbc
  0000:af71  mov    byte ptr [g3b78], 1
  0000:af76  cmp    byte ptr [g3696], 0
  0000:af7b  je     0xafbc
  0000:af7d  cmp    byte ptr [g38bb], 1
  0000:af82  jne    0xafbc
  0000:af84  lea    di, [bp - 0x100]
  0000:af88  push   ss
  0000:af89  push   di
  0000:af8a  mov    di, 0x850b    ; "Телефон:^6Алё,"
  0000:af8d  push   cs
  0000:af8e  push   di
  0000:af8f  lcall  SYS:0f78:0ae7 StrLoad
  0000:af94  mov    di, 0x379c
  0000:af97  push   ds
  0000:af98  push   di
  0000:af99  lcall  SYS:0f78:0b66 StrConcat
  0000:af9e  mov    di, 0x851a    ; "^6? ты где щас? Тут помощь нужна.(Иди в притон)"
  0000:afa1  push   cs
  0000:afa2  push   di
  0000:afa3  lcall  SYS:0f78:0b66 StrConcat
  0000:afa8  xor    ax, ax
  0000:afaa  push   ax
  0000:afab  xor    ax, ax
  0000:afad  push   ax
  0000:afae  xor    ax, ax
  0000:afb0  push   ax
  0000:afb1  xor    ax, ax
  0000:afb3  push   ax
  0000:afb4  xor    ax, ax
  0000:afb6  push   ax
  0000:afb7  lcall  U2:0eed:01c2 PrintLn
L0afbc:
  0000:afbc  cmp    byte ptr [g3b79], 0
  0000:afc1  jne    0xb022
  0000:afc3  mov    ax, 0x14
  0000:afc6  push   ax
  0000:afc7  lcall  SYS:0f78:114b Random
  0000:afcc  or     ax, ax
  0000:afce  jne    0xb022
  0000:afd0  mov    byte ptr [g3b79], 1
  0000:afd5  cmp    byte ptr [g3696], 0
  0000:afda  je     0xb022
  0000:afdc  cmp    word ptr [g38cb], 0x64
  0000:afe1  jl     0xb022
  0000:afe3  cmp    byte ptr [g38bb], 1
  0000:afe8  jne    0xb022
  0000:afea  lea    di, [bp - 0x100]
  0000:afee  push   ss
  0000:afef  push   di
  0000:aff0  mov    di, 0x850b    ; "Телефон:^6Алё,"
  0000:aff3  push   cs
  0000:aff4  push   di
  0000:aff5  lcall  SYS:0f78:0ae7 StrLoad
  0000:affa  mov    di, 0x379c
  0000:affd  push   ds
  0000:affe  push   di
  0000:afff  lcall  SYS:0f78:0b66 StrConcat
  0000:b004  mov    di, 0x854a    ; "^6? ты щас где? Базар есть.(Иди в притон)"
  0000:b007  push   cs
  0000:b008  push   di
  0000:b009  lcall  SYS:0f78:0b66 StrConcat
  0000:b00e  xor    ax, ax
  0000:b010  push   ax
  0000:b011  xor    ax, ax
  0000:b013  push   ax
  0000:b014  xor    ax, ax
  0000:b016  push   ax
  0000:b017  xor    ax, ax
  0000:b019  push   ax
  0000:b01a  xor    ax, ax
  0000:b01c  push   ax
  0000:b01d  lcall  U2:0eed:01c2 PrintLn
L0b022:
  0000:b022  cmp    byte ptr [g38bb], 1
  0000:b027  je     0xb02c
  0000:b029  jmp    0xb0ce
L0b02c:
  0000:b02c  mov    ax, 0xc8
  0000:b02f  push   ax
  0000:b030  lcall  SYS:0f78:114b Random
  0000:b035  or     ax, ax
  0000:b037  je     0xb03c
  0000:b039  jmp    0xb0ce
L0b03c:
  0000:b03c  mov    di, 0x8574    ; "Телефон:^6Алё Вася?"
  0000:b03f  push   cs
  0000:b040  push   di
  0000:b041  xor    ax, ax
  0000:b043  push   ax
  0000:b044  xor    ax, ax
  0000:b046  push   ax
  0000:b047  xor    ax, ax
  0000:b049  push   ax
  0000:b04a  xor    ax, ax
  0000:b04c  push   ax
  0000:b04d  xor    ax, ax
  0000:b04f  push   ax
  0000:b050  lcall  U2:0eed:01c2 PrintLn
  0000:b055  lcall  CRT:0f16:031a ReadKey
  0000:b05a  lea    di, [bp - 0x100]
  0000:b05e  push   ss
  0000:b05f  push   di
  0000:b060  mov    di, 0x8588    ; "^2Нет это "
  0000:b063  push   cs
  0000:b064  push   di
  0000:b065  lcall  SYS:0f78:0ae7 StrLoad
  0000:b06a  mov    di, 0x379c
  0000:b06d  push   ds
  0000:b06e  push   di
  0000:b06f  lcall  SYS:0f78:0b66 StrConcat
  0000:b074  mov    di, 0x8593    ; "."
  0000:b077  push   cs
  0000:b078  push   di
  0000:b079  lcall  SYS:0f78:0b66 StrConcat
  0000:b07e  xor    ax, ax
  0000:b080  push   ax
  0000:b081  xor    ax, ax
  0000:b083  push   ax
  0000:b084  xor    ax, ax
  0000:b086  push   ax
  0000:b087  xor    ax, ax
  0000:b089  push   ax
  0000:b08a  xor    ax, ax
  0000:b08c  push   ax
  0000:b08d  lcall  U2:0eed:01c2 PrintLn
  0000:b092  lcall  CRT:0f16:031a ReadKey
  0000:b097  mov    di, 0x8595    ; "Телефон:^6А Васю можно?"
  0000:b09a  push   cs
  0000:b09b  push   di
  0000:b09c  xor    ax, ax
  0000:b09e  push   ax
  0000:b09f  xor    ax, ax
  0000:b0a1  push   ax
  0000:b0a2  xor    ax, ax
  0000:b0a4  push   ax
  0000:b0a5  xor    ax, ax
  0000:b0a7  push   ax
  0000:b0a8  xor    ax, ax
  0000:b0aa  push   ax
  0000:b0ab  lcall  U2:0eed:01c2 PrintLn
  0000:b0b0  lcall  CRT:0f16:031a ReadKey
  0000:b0b5  mov    di, 0x85ad    ; "^2Нет, он будет в больнице в ближайшие 2 месяца."
  0000:b0b8  push   cs
  0000:b0b9  push   di
  0000:b0ba  xor    ax, ax
  0000:b0bc  push   ax
  0000:b0bd  xor    ax, ax
  0000:b0bf  push   ax
  0000:b0c0  xor    ax, ax
  0000:b0c2  push   ax
  0000:b0c3  xor    ax, ax
  0000:b0c5  push   ax
  0000:b0c6  xor    ax, ax
  0000:b0c8  push   ax
  0000:b0c9  lcall  U2:0eed:01c2 PrintLn
L0b0ce:
  0000:b0ce  cmp    byte ptr [g38bb], 1
  0000:b0d3  je     0xb0d8
  0000:b0d5  jmp    0xb16c
L0b0d8:
  0000:b0d8  mov    ax, 0x64
  0000:b0db  push   ax
  0000:b0dc  lcall  SYS:0f78:114b Random
  0000:b0e1  or     ax, ax
  0000:b0e3  jne    0xb11e
  0000:b0e5  cmp    byte ptr [g3697], 0
  0000:b0ea  je     0xb11e
  0000:b0ec  mov    di, 0x85de    ; "Телефон(Твоя пассия):^5Привет, это я. Зайдешь ко мне сегодня?"
  0000:b0ef  push   cs
  0000:b0f0  push   di
  0000:b0f1  xor    ax, ax
  0000:b0f3  push   ax
  0000:b0f4  xor    ax, ax
  0000:b0f6  push   ax
  0000:b0f7  xor    ax, ax
  0000:b0f9  push   ax
  0000:b0fa  xor    ax, ax
  0000:b0fc  push   ax
  0000:b0fd  xor    ax, ax
  0000:b0ff  push   ax
  0000:b100  lcall  U2:0eed:01c2 PrintLn
  0000:b105  mov    di, 0x861c    ; "^2А ты: Безбазаров, жди."
  0000:b108  push   cs
  0000:b109  push   di
  0000:b10a  xor    ax, ax
  0000:b10c  push   ax
  0000:b10d  xor    ax, ax
  0000:b10f  push   ax
  0000:b110  xor    ax, ax
  0000:b112  push   ax
  0000:b113  xor    ax, ax
  0000:b115  push   ax
  0000:b116  xor    ax, ax
  0000:b118  push   ax
  0000:b119  lcall  U2:0eed:01c2 PrintLn
L0b11e:
  0000:b11e  cmp    byte ptr [g3b76], 1
  0000:b123  jne    0xb145
  0000:b125  cmp    byte ptr [g3696], 0
  0000:b12a  je     0xb145
  0000:b12c  mov    di, 0x8635    ; "Телефон:^2Это ты там на базаре шухер наводил? Ну короче там менты свалили."
  0000:b12f  push   cs
  0000:b130  push   di
  0000:b131  xor    ax, ax
  0000:b133  push   ax
  0000:b134  xor    ax, ax
  0000:b136  push   ax
  0000:b137  xor    ax, ax
  0000:b139  push   ax
  0000:b13a  xor    ax, ax
  0000:b13c  push   ax
  0000:b13d  xor    ax, ax
  0000:b13f  push   ax
  0000:b140  lcall  U2:0eed:01c2 PrintLn
L0b145:
  0000:b145  cmp    byte ptr [g3b77], 1
  0000:b14a  jne    0xb16c
  0000:b14c  cmp    byte ptr [g3696], 0
  0000:b151  je     0xb16c
  0000:b153  mov    di, 0x8680    ; "Телефон:^2Ты че там, в клуб-та пойдёшь. Уже утряслось всё."
  0000:b156  push   cs
  0000:b157  push   di
  0000:b158  xor    ax, ax
  0000:b15a  push   ax
  0000:b15b  xor    ax, ax
  0000:b15d  push   ax
  0000:b15e  xor    ax, ax
  0000:b160  push   ax
  0000:b161  xor    ax, ax
  0000:b163  push   ax
  0000:b164  xor    ax, ax
  0000:b166  push   ax
  0000:b167  lcall  U2:0eed:01c2 PrintLn
L0b16c:
  0000:b16c  cmp    byte ptr [g3b76], 0
  0000:b171  jbe    0xb177
  0000:b173  dec    byte ptr [g3b76]
L0b177:
  0000:b177  cmp    byte ptr [g3b77], 0
  0000:b17c  jbe    0xb182
  0000:b17e  dec    byte ptr [g3b77]
L0b182:
  0000:b182  mov    ax, 0xa
  0000:b185  push   ax
  0000:b186  lcall  SYS:0f78:114b Random
  0000:b18b  or     ax, ax
  0000:b18d  jne    0xb1b4
  0000:b18f  cmp    byte ptr [g3698], 0
  0000:b194  jne    0xb1b4
  0000:b196  mov    byte ptr [g3698], 1
  0000:b19b  mov    di, 0x86bb    ; "^1Ты спросил у прохожего где больница."
  0000:b19e  push   cs
  0000:b19f  push   di
  0000:b1a0  xor    ax, ax
  0000:b1a2  push   ax
  0000:b1a3  xor    ax, ax
  0000:b1a5  push   ax
  0000:b1a6  xor    ax, ax
  0000:b1a8  push   ax
  0000:b1a9  xor    ax, ax
  0000:b1ab  push   ax
  0000:b1ac  xor    ax, ax
  0000:b1ae  push   ax
  0000:b1af  lcall  U2:0eed:01c2 PrintLn
L0b1b4:
  0000:b1b4  mov    ax, 0xa
  0000:b1b7  push   ax
  0000:b1b8  lcall  SYS:0f78:114b Random
  0000:b1bd  or     ax, ax
  0000:b1bf  jne    0xb1e6
  0000:b1c1  cmp    byte ptr [g3694], 0
  0000:b1c6  jne    0xb1e6
  0000:b1c8  mov    byte ptr [g3694], 1
  0000:b1cd  mov    di, 0x86e2    ; "^1Ты нашел базар."
  0000:b1d0  push   cs
  0000:b1d1  push   di
  0000:b1d2  xor    ax, ax
  0000:b1d4  push   ax
  0000:b1d5  xor    ax, ax
  0000:b1d7  push   ax
  0000:b1d8  xor    ax, ax
  0000:b1da  push   ax
  0000:b1db  xor    ax, ax
  0000:b1dd  push   ax
  0000:b1de  xor    ax, ax
  0000:b1e0  push   ax
  0000:b1e1  lcall  U2:0eed:01c2 PrintLn
L0b1e6:
  0000:b1e6  mov    ax, 0x64
  0000:b1e9  push   ax
  0000:b1ea  lcall  SYS:0f78:114b Random
  0000:b1ef  or     ax, ax
  0000:b1f1  jne    0xb218
  0000:b1f3  cmp    byte ptr [g3699], 0
  0000:b1f8  jne    0xb218
  0000:b1fa  mov    byte ptr [g3699], 1
  0000:b1ff  mov    di, 0x86f4    ; "^1Ты увидел объявление "Типа заходи в наш понтовый клуб"."
  0000:b202  push   cs
  0000:b203  push   di
  0000:b204  xor    ax, ax
  0000:b206  push   ax
  0000:b207  xor    ax, ax
  0000:b209  push   ax
  0000:b20a  xor    ax, ax
  0000:b20c  push   ax
  0000:b20d  xor    ax, ax
  0000:b20f  push   ax
  0000:b210  xor    ax, ax
  0000:b212  push   ax
  0000:b213  lcall  U2:0eed:01c2 PrintLn
L0b218:
  0000:b218  mov    ax, 0x64
  0000:b21b  push   ax
  0000:b21c  lcall  SYS:0f78:114b Random
  0000:b221  or     ax, ax
  0000:b223  jne    0xb24a
  0000:b225  cmp    byte ptr [g369a], 0
  0000:b22a  jne    0xb24a
  0000:b22c  mov    byte ptr [g369a], 1
  0000:b231  mov    di, 0x872e    ; "^1На стене реклама "Жизнь тяжела. Если не хочешь сдохнуть качайся!"."
  0000:b234  push   cs
  0000:b235  push   di
  0000:b236  xor    ax, ax
  0000:b238  push   ax
  0000:b239  xor    ax, ax
  0000:b23b  push   ax
  0000:b23c  xor    ax, ax
  0000:b23e  push   ax
  0000:b23f  xor    ax, ax
  0000:b241  push   ax
  0000:b242  xor    ax, ax
  0000:b244  push   ax
  0000:b245  lcall  U2:0eed:01c2 PrintLn
L0b24a:
  0000:b24a  cmp    byte ptr [g38c1], 0
  0000:b24f  je     0xb2cc
  0000:b251  mov    ax, word ptr [g38ac]
  0000:b254  cmp    ax, word ptr [g38ae]
  0000:b258  jge    0xb26e
  0000:b25a  add    word ptr [g38ac], 3
  0000:b25f  mov    ax, word ptr [g38ac]
  0000:b262  cmp    ax, word ptr [g38ae]
  0000:b266  jle    0xb26e
  0000:b268  mov    ax, word ptr [g38ae]
  0000:b26b  mov    word ptr [g38ac], ax
L0b26e:
  0000:b26e  mov    ax, 0x14
  0000:b271  push   ax
  0000:b272  lcall  SYS:0f78:114b Random
  0000:b277  or     ax, ax
  0000:b279  ja     0xb2cc
  0000:b27b  cmp    byte ptr [g38b0], 0
  0000:b280  jne    0xb2a7
  0000:b282  cmp    byte ptr [g38b1], 0
  0000:b287  je     0xb2a7
  0000:b289  mov    byte ptr [g38b1], 0
  0000:b28e  mov    di, 0x8773    ; "^2Твоя нога залечилась с Божей помощью."
  0000:b291  push   cs
  0000:b292  push   di
  0000:b293  xor    ax, ax
  0000:b295  push   ax
  0000:b296  xor    ax, ax
  0000:b298  push   ax
  0000:b299  xor    ax, ax
  0000:b29b  push   ax
  0000:b29c  xor    ax, ax
  0000:b29e  push   ax
  0000:b29f  xor    ax, ax
  0000:b2a1  push   ax
  0000:b2a2  lcall  U2:0eed:01c2 PrintLn
L0b2a7:
  0000:b2a7  cmp    byte ptr [g38b0], 0
  0000:b2ac  je     0xb2cc
  0000:b2ae  mov    byte ptr [g38b0], 0
  0000:b2b3  mov    di, 0x879b    ; "^2Твоя челюсть залечилась с Божей помощью."
  0000:b2b6  push   cs
  0000:b2b7  push   di
  0000:b2b8  xor    ax, ax
  0000:b2ba  push   ax
  0000:b2bb  xor    ax, ax
  0000:b2bd  push   ax
  0000:b2be  xor    ax, ax
  0000:b2c0  push   ax
  0000:b2c1  xor    ax, ax
  0000:b2c3  push   ax
  0000:b2c4  xor    ax, ax
  0000:b2c6  push   ax
  0000:b2c7  lcall  U2:0eed:01c2 PrintLn
L0b2cc:
  0000:b2cc  mov    ax, word ptr [g389c]
  0000:b2cf  cmp    ax, 4
  0000:b2d2  jne    0xb2e3
  0000:b2d4  mov    ax, word ptr [g38ac]
  0000:b2d7  cmp    ax, word ptr [g38ae]
  0000:b2db  jge    0xb2e1
  0000:b2dd  inc    word ptr [g38ac]
L0b2e1:
  0000:b2e1  jmp    0xb34d
L0b2e3:
  0000:b2e3  cmp    ax, 5
  0000:b2e6  jne    0xb2ea
  0000:b2e8  jmp    0xb34d
L0b2ea:
  0000:b2ea  cmp    ax, 6
  0000:b2ed  jne    0xb34d
  0000:b2ef  mov    al, byte ptr [g3692]
  0000:b2f2  xor    ah, ah
  0000:b2f4  mov    dx, 0x14
  0000:b2f7  mul    dx
  0000:b2f9  push   ax
  0000:b2fa  lcall  SYS:0f78:114b Random
  0000:b2ff  xor    dx, dx
  0000:b301  mov    cx, ax
  0000:b303  mov    bx, dx
  0000:b305  mov    ax, word ptr [g38a4]
  0000:b308  cdq    
  0000:b309  cmp    dx, bx
  0000:b30b  jg     0xb313
  0000:b30d  jl     0xb34b
  0000:b30f  cmp    ax, cx
  0000:b311  jb     0xb34b
L0b313:
  0000:b313  mov    al, byte ptr [g3692]
  0000:b316  xor    ah, ah
  0000:b318  mov    si, ax
  0000:b31a  shl    ax, 1
  0000:b31c  shl    ax, 1
  0000:b31e  add    ax, si
  0000:b320  push   ax
  0000:b321  lcall  SYS:0f78:114b Random
  0000:b326  inc    ax
  0000:b327  mov    word ptr [g3b74], ax
  0000:b32a  mov    ax, word ptr [g3b74]
  0000:b32d  add    word ptr [g38c7], ax
  0000:b331  mov    di, 0x87c6    ; "^2Опа бабки! # рублей на пиво!"
  0000:b334  push   cs
  0000:b335  push   di
  0000:b336  push   word ptr [g3b74]
  0000:b33a  xor    ax, ax
  0000:b33c  push   ax
  0000:b33d  xor    ax, ax
  0000:b33f  push   ax
  0000:b340  xor    ax, ax
  0000:b342  push   ax
  0000:b343  xor    ax, ax
  0000:b345  push   ax
  0000:b346  lcall  U2:0eed:01c2 PrintLn
L0b34b:
  0000:b34b  jmp    0xb34d
L0b34d:
  0000:b34d  mov    ax, 5
  0000:b350  imul   ax
  0000:b352  push   ax
  0000:b353  lcall  SYS:0f78:114b Random
  0000:b358  inc    ax
  0000:b359  mov    byte ptr [g3971], al
  0000:b35c  cmp    byte ptr [g3971], 0xa
  0000:b361  jb     0xb368
  0000:b363  mov    byte ptr [g3970], 4
L0b368:
  0000:b368  cmp    byte ptr [g3971], 9
  0000:b36d  ja     0xb37b
  0000:b36f  cmp    byte ptr [g3971], 5
  0000:b374  jb     0xb37b
  0000:b376  mov    byte ptr [g3970], 3
L0b37b:
  0000:b37b  cmp    byte ptr [g3971], 4
  0000:b380  ja     0xb38e
  0000:b382  cmp    byte ptr [g3971], 2
  0000:b387  jb     0xb38e
  0000:b389  mov    byte ptr [g3970], 2
L0b38e:
  0000:b38e  cmp    byte ptr [g3971], 1
  0000:b393  jne    0xb39a
  0000:b395  mov    byte ptr [g3970], 1
L0b39a:
  0000:b39a  mov    ax, 0xc8
  0000:b39d  push   ax
  0000:b39e  lcall  SYS:0f78:114b Random
  0000:b3a3  or     ax, ax
  0000:b3a5  jne    0xb3aa
  0000:b3a7  call   0x7c67
L0b3aa:
  0000:b3aa  mov    ax, 0x64
  0000:b3ad  push   ax
  0000:b3ae  lcall  SYS:0f78:114b Random
  0000:b3b3  or     ax, ax
  0000:b3b5  jne    0xb3ba
  0000:b3b7  call   0x7538
L0b3ba:
  0000:b3ba  mov    al, byte ptr [g3970]
  0000:b3bd  cmp    al, 1
  0000:b3bf  je     0xb3c4
  0000:b3c1  jmp    0xb4e8
L0b3c4:
  0000:b3c4  cmp    byte ptr [g3693], 0
  0000:b3c9  mov    al, 0
  0000:b3cb  jne    0xb3ce
  0000:b3cd  inc    ax
L0b3ce:
  0000:b3ce  mov    byte ptr [g3693], al
  0000:b3d1  cmp    byte ptr [g3693], 0
  0000:b3d6  jne    0xb3db
  0000:b3d8  jmp    0xb45b
L0b3db:
  0000:b3db  cmp    byte ptr [g3692], 1
  0000:b3e0  jne    0xb3fb
  0000:b3e2  mov    di, 0x87e5    ; "^6Ты зашел на тропинку где бродит искитимская гопота."
  0000:b3e5  push   cs
  0000:b3e6  push   di
  0000:b3e7  xor    ax, ax
  0000:b3e9  push   ax
  0000:b3ea  xor    ax, ax
  0000:b3ec  push   ax
  0000:b3ed  xor    ax, ax
  0000:b3ef  push   ax
  0000:b3f0  xor    ax, ax
  0000:b3f2  push   ax
  0000:b3f3  xor    ax, ax
  0000:b3f5  push   ax
  0000:b3f6  lcall  U2:0eed:01c2 PrintLn
L0b3fb:
  0000:b3fb  cmp    byte ptr [g3692], 2
  0000:b400  jne    0xb41b
  0000:b402  mov    di, 0x881b    ; "^6Ты зашел в какие-то дебри подваротен."
  0000:b405  push   cs
  0000:b406  push   di
  0000:b407  xor    ax, ax
  0000:b409  push   ax
  0000:b40a  xor    ax, ax
  0000:b40c  push   ax
  0000:b40d  xor    ax, ax
  0000:b40f  push   ax
  0000:b410  xor    ax, ax
  0000:b412  push   ax
  0000:b413  xor    ax, ax
  0000:b415  push   ax
  0000:b416  lcall  U2:0eed:01c2 PrintLn
L0b41b:
  0000:b41b  cmp    byte ptr [g3692], 3
  0000:b420  jne    0xb43b
  0000:b422  mov    di, 0x8843    ; "^6Ты зашел на планы."
  0000:b425  push   cs
  0000:b426  push   di
  0000:b427  xor    ax, ax
  0000:b429  push   ax
  0000:b42a  xor    ax, ax
  0000:b42c  push   ax
  0000:b42d  xor    ax, ax
  0000:b42f  push   ax
  0000:b430  xor    ax, ax
  0000:b432  push   ax
  0000:b433  xor    ax, ax
  0000:b435  push   ax
  0000:b436  lcall  U2:0eed:01c2 PrintLn
L0b43b:
  0000:b43b  cmp    byte ptr [g3692], 4
  0000:b440  jne    0xb45b
  0000:b442  mov    di, 0x8858    ; "^6Ты зашел чёрте куда."
  0000:b445  push   cs
  0000:b446  push   di
  0000:b447  xor    ax, ax
  0000:b449  push   ax
  0000:b44a  xor    ax, ax
  0000:b44c  push   ax
  0000:b44d  xor    ax, ax
  0000:b44f  push   ax
  0000:b450  xor    ax, ax
  0000:b452  push   ax
  0000:b453  xor    ax, ax
  0000:b455  push   ax
  0000:b456  lcall  U2:0eed:01c2 PrintLn
L0b45b:
  0000:b45b  cmp    byte ptr [g3693], 0
  0000:b460  je     0xb465
  0000:b462  jmp    0xb4e5
L0b465:
  0000:b465  cmp    byte ptr [g3692], 1
  0000:b46a  jne    0xb485
  0000:b46c  mov    di, 0x886f    ; "^6Ты вышел с тропинки."
  0000:b46f  push   cs
  0000:b470  push   di
  0000:b471  xor    ax, ax
  0000:b473  push   ax
  0000:b474  xor    ax, ax
  0000:b476  push   ax
  0000:b477  xor    ax, ax
  0000:b479  push   ax
  0000:b47a  xor    ax, ax
  0000:b47c  push   ax
  0000:b47d  xor    ax, ax
  0000:b47f  push   ax
  0000:b480  lcall  U2:0eed:01c2 PrintLn
L0b485:
  0000:b485  cmp    byte ptr [g3692], 2
  0000:b48a  jne    0xb4a5
  0000:b48c  mov    di, 0x8886    ; "^6Ты вышел из подваротен."
  0000:b48f  push   cs
  0000:b490  push   di
  0000:b491  xor    ax, ax
  0000:b493  push   ax
  0000:b494  xor    ax, ax
  0000:b496  push   ax
  0000:b497  xor    ax, ax
  0000:b499  push   ax
  0000:b49a  xor    ax, ax
  0000:b49c  push   ax
  0000:b49d  xor    ax, ax
  0000:b49f  push   ax
  0000:b4a0  lcall  U2:0eed:01c2 PrintLn
L0b4a5:
  0000:b4a5  cmp    byte ptr [g3692], 3
  0000:b4aa  jne    0xb4c5
  0000:b4ac  mov    di, 0x88a0    ; "^6Ты вышел с планов."
  0000:b4af  push   cs
  0000:b4b0  push   di
  0000:b4b1  xor    ax, ax
  0000:b4b3  push   ax
  0000:b4b4  xor    ax, ax
  0000:b4b6  push   ax
  0000:b4b7  xor    ax, ax
  0000:b4b9  push   ax
  0000:b4ba  xor    ax, ax
  0000:b4bc  push   ax
  0000:b4bd  xor    ax, ax
  0000:b4bf  push   ax
  0000:b4c0  lcall  U2:0eed:01c2 PrintLn
L0b4c5:
  0000:b4c5  cmp    byte ptr [g3692], 4
  0000:b4ca  jne    0xb4e5
  0000:b4cc  mov    di, 0x88b5    ; "^6Ты вышел чёрте откуда."
  0000:b4cf  push   cs
  0000:b4d0  push   di
  0000:b4d1  xor    ax, ax
  0000:b4d3  push   ax
  0000:b4d4  xor    ax, ax
  0000:b4d6  push   ax
  0000:b4d7  xor    ax, ax
  0000:b4d9  push   ax
  0000:b4da  xor    ax, ax
  0000:b4dc  push   ax
  0000:b4dd  xor    ax, ax
  0000:b4df  push   ax
  0000:b4e0  lcall  U2:0eed:01c2 PrintLn
L0b4e5:
  0000:b4e5  jmp    0xb940
L0b4e8:
  0000:b4e8  cmp    al, 2
  0000:b4ea  je     0xb4ef
  0000:b4ec  jmp    0xb5ae
L0b4ef:
  0000:b4ef  cmp    byte ptr [g3697], 0
  0000:b4f4  je     0xb4f9
  0000:b4f6  jmp    0xb592
L0b4f9:
  0000:b4f9  mov    di, 0x88ce    ; "^5Идет типа клёвая цыпа. Хочешь её зацепить?"
  0000:b4fc  push   cs
  0000:b4fd  push   di
  0000:b4fe  xor    ax, ax
  0000:b500  push   ax
  0000:b501  xor    ax, ax
  0000:b503  push   ax
  0000:b504  xor    ax, ax
  0000:b506  push   ax
  0000:b507  xor    ax, ax
  0000:b509  push   ax
  0000:b50a  xor    ax, ax
  0000:b50c  push   ax
  0000:b50d  lcall  U2:0eed:01c2 PrintLn
  0000:b512  mov    di, 0x3ecc
  0000:b515  push   ds
  0000:b516  push   di
  0000:b517  mov    di, 0x3a72
  0000:b51a  push   ds
  0000:b51b  push   di
  0000:b51c  mov    ax, 0xff
  0000:b51f  push   ax
  0000:b520  lcall  SYS:0f78:06c6 ReadStr
  0000:b525  lcall  SYS:0f78:059d ReadLnEnd
  0000:b52a  lcall  SYS:0f78:0291 IOCheck
  0000:b52f  mov    di, 0x3a72
  0000:b532  push   ds
  0000:b533  push   di
  0000:b534  lcall  U2:0eed:0216 LowerCase
  0000:b539  mov    di, 0x3a72
  0000:b53c  push   ds
  0000:b53d  push   di
  0000:b53e  mov    di, 0x8323    ; "y"
  0000:b541  push   cs
  0000:b542  push   di
  0000:b543  lcall  SYS:0f78:0bd8 StrCmp
  0000:b548  jne    0xb590
  0000:b54a  mov    ax, 2
  0000:b54d  push   ax
  0000:b54e  lcall  SYS:0f78:114b Random
  0000:b553  or     ax, ax
  0000:b555  jne    0xb577
  0000:b557  mov    di, 0x88fb    ; "^5Ты такой подкатываешь, а она:"Глянулся ты мне парниша""
  0000:b55a  push   cs
  0000:b55b  push   di
  0000:b55c  xor    ax, ax
  0000:b55e  push   ax
  0000:b55f  xor    ax, ax
  0000:b561  push   ax
  0000:b562  xor    ax, ax
  0000:b564  push   ax
  0000:b565  xor    ax, ax
  0000:b567  push   ax
  0000:b568  xor    ax, ax
  0000:b56a  push   ax
  0000:b56b  lcall  U2:0eed:01c2 PrintLn
  0000:b570  mov    byte ptr [g3697], 1
  0000:b575  jmp    0xb590
L0b577:
  0000:b577  mov    di, 0x8934    ; "^4Ты ещё подкатить неуспел - а она:"Отдыхай урод". - Тебя обломали кент"
  0000:b57a  push   cs
  0000:b57b  push   di
  0000:b57c  xor    ax, ax
  0000:b57e  push   ax
  0000:b57f  xor    ax, ax
  0000:b581  push   ax
  0000:b582  xor    ax, ax
  0000:b584  push   ax
  0000:b585  xor    ax, ax
  0000:b587  push   ax
  0000:b588  xor    ax, ax
  0000:b58a  push   ax
  0000:b58b  lcall  U2:0eed:01c2 PrintLn
L0b590:
  0000:b590  jmp    0xb5ab
L0b592:
  0000:b592  mov    di, 0x897c    ; "Совсем ничё не происходит."
  0000:b595  push   cs
  0000:b596  push   di
  0000:b597  xor    ax, ax
  0000:b599  push   ax
  0000:b59a  xor    ax, ax
  0000:b59c  push   ax
  0000:b59d  xor    ax, ax
  0000:b59f  push   ax
  0000:b5a0  xor    ax, ax
  0000:b5a2  push   ax
  0000:b5a3  xor    ax, ax
  0000:b5a5  push   ax
  0000:b5a6  lcall  U2:0eed:01c2 PrintLn
L0b5ab:
  0000:b5ab  jmp    0xb940
L0b5ae:
  0000:b5ae  cmp    al, 3
  0000:b5b0  je     0xb5b5
  0000:b5b2  jmp    0xb82f
L0b5b5:
  0000:b5b5  mov    al, 0
  0000:b5b7  push   ax
  0000:b5b8  call   0x10d14
  0000:b5bb  mov    byte ptr [g3b72], 0
  0000:b5c0  cmp    word ptr [g3952], 8
  0000:b5c5  jne    0xb5ca
  0000:b5c7  jmp    0xb76a
L0b5ca:
  0000:b5ca  mov    al, byte ptr [g3692]
  0000:b5cd  xor    ah, ah
  0000:b5cf  mov    dx, 7
  0000:b5d2  mul    dx
  0000:b5d4  add    ax, 0xf
  0000:b5d7  mov    word ptr [g3c7e], ax
  0000:b5da  cmp    byte ptr [g38bc], 1
  0000:b5df  jne    0xb5ed
  0000:b5e1  mov    ax, word ptr [g3c7e]
  0000:b5e4  cdq    
  0000:b5e5  mov    cx, 2
  0000:b5e8  idiv   cx
  0000:b5ea  mov    word ptr [g3c7e], ax
L0b5ed:
  0000:b5ed  push   word ptr [g3c7e]
  0000:b5f1  lcall  SYS:0f78:114b Random
  0000:b5f6  xor    dx, dx
  0000:b5f8  mov    cx, ax
  0000:b5fa  mov    bx, dx
  0000:b5fc  mov    ax, word ptr [g38a4]
  0000:b5ff  cdq    
  0000:b600  cmp    dx, bx
  0000:b602  jg     0xb614
  0000:b604  jl     0xb60a
  0000:b606  cmp    ax, cx
  0000:b608  jae    0xb614
L0b60a:
  0000:b60a  cmp    word ptr [g3952], 3
  0000:b60f  jl     0xb614
  0000:b611  jmp    0xb6a0
L0b614:
  0000:b614  cmp    word ptr [g3952], 7
  0000:b619  jl     0xb61e
  0000:b61b  jmp    0xb6a0
L0b61e:
  0000:b61e  lea    di, [bp - 0x100]
  0000:b622  push   ss
  0000:b623  push   di
  0000:b624  mov    di, 0x8997    ; "^6Идет "
  0000:b627  push   cs
  0000:b628  push   di
  0000:b629  lcall  SYS:0f78:0ae7 StrLoad
  0000:b62e  mov    di, word ptr [g3952]
  0000:b632  mov    cl, 8
  0000:b634  shl    di, cl
  0000:b636  add    di, 0x2e
  0000:b63a  push   ds
  0000:b63b  push   di
  0000:b63c  lcall  SYS:0f78:0b66 StrConcat
  0000:b641  mov    di, 0x899f    ; " # уровня. Хочешь наехать?"
  0000:b644  push   cs
  0000:b645  push   di
  0000:b646  lcall  SYS:0f78:0b66 StrConcat
  0000:b64b  push   word ptr [g395c]
  0000:b64f  xor    ax, ax
  0000:b651  push   ax
  0000:b652  xor    ax, ax
  0000:b654  push   ax
  0000:b655  xor    ax, ax
  0000:b657  push   ax
  0000:b658  xor    ax, ax
  0000:b65a  push   ax
  0000:b65b  lcall  U2:0eed:01c2 PrintLn
  0000:b660  mov    di, 0x3ecc
  0000:b663  push   ds
  0000:b664  push   di
  0000:b665  mov    di, 0x3a72
  0000:b668  push   ds
  0000:b669  push   di
  0000:b66a  mov    ax, 0xff
  0000:b66d  push   ax
  0000:b66e  lcall  SYS:0f78:06c6 ReadStr
  0000:b673  lcall  SYS:0f78:059d ReadLnEnd
  0000:b678  lcall  SYS:0f78:0291 IOCheck
  0000:b67d  mov    di, 0x3a72
  0000:b680  push   ds
  0000:b681  push   di
  0000:b682  lcall  U2:0eed:0216 LowerCase
  0000:b687  mov    di, 0x3a72
  0000:b68a  push   ds
  0000:b68b  push   di
  0000:b68c  mov    di, 0x8323    ; "y"
  0000:b68f  push   cs
  0000:b690  push   di
  0000:b691  lcall  SYS:0f78:0bd8 StrCmp
  0000:b696  jne    0xb69d
  0000:b698  mov    byte ptr [g3b72], 1
L0b69d:
  0000:b69d  jmp    0xb767
L0b6a0:
  0000:b6a0  lea    di, [bp - 0x100]
  0000:b6a4  push   ss
  0000:b6a5  push   di
  0000:b6a6  mov    di, 0x8997    ; "^6Идет "
  0000:b6a9  push   cs
  0000:b6aa  push   di
  0000:b6ab  lcall  SYS:0f78:0ae7 StrLoad
  0000:b6b0  mov    di, word ptr [g3952]
  0000:b6b4  mov    cl, 8
  0000:b6b6  shl    di, cl
  0000:b6b8  add    di, 0x2e
  0000:b6bc  push   ds
  0000:b6bd  push   di
  0000:b6be  lcall  SYS:0f78:0b66 StrConcat
  0000:b6c3  mov    di, 0x89ba    ; " # уровня, ищущий кого отпинать. Хочешь наехать?"
  0000:b6c6  push   cs
  0000:b6c7  push   di
  0000:b6c8  lcall  SYS:0f78:0b66 StrConcat
  0000:b6cd  push   word ptr [g395c]
  0000:b6d1  xor    ax, ax
  0000:b6d3  push   ax
  0000:b6d4  xor    ax, ax
  0000:b6d6  push   ax
  0000:b6d7  xor    ax, ax
  0000:b6d9  push   ax
  0000:b6da  xor    ax, ax
  0000:b6dc  push   ax
  0000:b6dd  lcall  U2:0eed:01c2 PrintLn
  0000:b6e2  mov    di, 0x3ecc
  0000:b6e5  push   ds
  0000:b6e6  push   di
  0000:b6e7  mov    di, 0x3a72
  0000:b6ea  push   ds
  0000:b6eb  push   di
  0000:b6ec  mov    ax, 0xff
  0000:b6ef  push   ax
  0000:b6f0  lcall  SYS:0f78:06c6 ReadStr
  0000:b6f5  lcall  SYS:0f78:059d ReadLnEnd
  0000:b6fa  lcall  SYS:0f78:0291 IOCheck
  0000:b6ff  mov    di, 0x3a72
  0000:b702  push   ds
  0000:b703  push   di
  0000:b704  lcall  U2:0eed:0216 LowerCase
  0000:b709  mov    di, 0x3a72
  0000:b70c  push   ds
  0000:b70d  push   di
  0000:b70e  mov    di, 0x8323    ; "y"
  0000:b711  push   cs
  0000:b712  push   di
  0000:b713  lcall  SYS:0f78:0bd8 StrCmp
  0000:b718  jne    0xb721
  0000:b71a  mov    byte ptr [g3b72], 1
  0000:b71f  jmp    0xb767
L0b721:
  0000:b721  mov    ax, 2
  0000:b724  push   ax
  0000:b725  lcall  SYS:0f78:114b Random
  0000:b72a  or     ax, ax
  0000:b72c  jne    0xb74e
  0000:b72e  mov    di, 0x89eb    ; "^4Он тебя заметил."
  0000:b731  push   cs
  0000:b732  push   di
  0000:b733  xor    ax, ax
  0000:b735  push   ax
  0000:b736  xor    ax, ax
  0000:b738  push   ax
  0000:b739  xor    ax, ax
  0000:b73b  push   ax
  0000:b73c  xor    ax, ax
  0000:b73e  push   ax
  0000:b73f  xor    ax, ax
  0000:b741  push   ax
  0000:b742  lcall  U2:0eed:01c2 PrintLn
  0000:b747  mov    byte ptr [g3b72], 1
  0000:b74c  jmp    0xb767
L0b74e:
  0000:b74e  mov    di, 0x89fe    ; "^2Ты смылся."
  0000:b751  push   cs
  0000:b752  push   di
  0000:b753  xor    ax, ax
  0000:b755  push   ax
  0000:b756  xor    ax, ax
  0000:b758  push   ax
  0000:b759  xor    ax, ax
  0000:b75b  push   ax
  0000:b75c  xor    ax, ax
  0000:b75e  push   ax
  0000:b75f  xor    ax, ax
  0000:b761  push   ax
  0000:b762  lcall  U2:0eed:01c2 PrintLn
L0b767:
  0000:b767  jmp    0xb81f
L0b76a:
  0000:b76a  mov    di, 0x8a0b    ; "^6Идет ментяра # уровня гроза гопов."
  0000:b76d  push   cs
  0000:b76e  push   di
  0000:b76f  push   word ptr [g395c]
  0000:b773  xor    ax, ax
  0000:b775  push   ax
  0000:b776  xor    ax, ax
  0000:b778  push   ax
  0000:b779  xor    ax, ax
  0000:b77b  push   ax
  0000:b77c  xor    ax, ax
  0000:b77e  push   ax
  0000:b77f  lcall  U2:0eed:01c2 PrintLn
  0000:b784  mov    al, byte ptr [g3692]
  0000:b787  xor    ah, ah
  0000:b789  mov    dx, 7
  0000:b78c  mul    dx
  0000:b78e  add    ax, 0xf
  0000:b791  push   ax
  0000:b792  lcall  SYS:0f78:114b Random
  0000:b797  xor    dx, dx
  0000:b799  mov    cx, ax
  0000:b79b  mov    bx, dx
  0000:b79d  mov    ax, word ptr [g38a4]
  0000:b7a0  cdq    
  0000:b7a1  cmp    dx, bx
  0000:b7a3  jg     0xb7ab
  0000:b7a5  jl     0xb7c6
  0000:b7a7  cmp    ax, cx
  0000:b7a9  jb     0xb7c6
L0b7ab:
  0000:b7ab  mov    di, 0x8a30    ; "^2Ты затаился, прикинулся не гопом... Мент вроде не заметил"
  0000:b7ae  push   cs
  0000:b7af  push   di
  0000:b7b0  xor    ax, ax
  0000:b7b2  push   ax
  0000:b7b3  xor    ax, ax
  0000:b7b5  push   ax
  0000:b7b6  xor    ax, ax
  0000:b7b8  push   ax
  0000:b7b9  xor    ax, ax
  0000:b7bb  push   ax
  0000:b7bc  xor    ax, ax
  0000:b7be  push   ax
  0000:b7bf  lcall  U2:0eed:01c2 PrintLn
  0000:b7c4  jmp    0xb81f
L0b7c6:
  0000:b7c6  cmp    byte ptr [g38b3], 1
  0000:b7cb  jne    0xb801
  0000:b7cd  mov    di, 0x8a6c    ; "^2Ты напялил тёмные очки и мент не узнал твою рожу, которая весит на почётном"
  0000:b7d0  push   cs
  0000:b7d1  push   di
  0000:b7d2  xor    ax, ax
  0000:b7d4  push   ax
  0000:b7d5  xor    ax, ax
  0000:b7d7  push   ax
  0000:b7d8  xor    ax, ax
  0000:b7da  push   ax
  0000:b7db  xor    ax, ax
  0000:b7dd  push   ax
  0000:b7de  xor    ax, ax
  0000:b7e0  push   ax
  0000:b7e1  lcall  U2:0eed:01c2 PrintLn
  0000:b7e6  mov    di, 0x8aba    ; "^2стенде "Разыскиваются за гопничество""
  0000:b7e9  push   cs
  0000:b7ea  push   di
  0000:b7eb  xor    ax, ax
  0000:b7ed  push   ax
  0000:b7ee  xor    ax, ax
  0000:b7f0  push   ax
  0000:b7f1  xor    ax, ax
  0000:b7f3  push   ax
  0000:b7f4  xor    ax, ax
  0000:b7f6  push   ax
  0000:b7f7  xor    ax, ax
  0000:b7f9  push   ax
  0000:b7fa  lcall  U2:0eed:01c2 PrintLn
  0000:b7ff  jmp    0xb81f
L0b801:
  0000:b801  mov    di, 0x8ae2    ; "^4Запалил!"
  0000:b804  push   cs
  0000:b805  push   di
  0000:b806  xor    ax, ax
  0000:b808  push   ax
  0000:b809  xor    ax, ax
  0000:b80b  push   ax
  0000:b80c  xor    ax, ax
  0000:b80e  push   ax
  0000:b80f  xor    ax, ax
  0000:b811  push   ax
  0000:b812  xor    ax, ax
  0000:b814  push   ax
  0000:b815  lcall  U2:0eed:01c2 PrintLn
  0000:b81a  mov    byte ptr [g3b72], 1
L0b81f:
  0000:b81f  cmp    byte ptr [g3b72], 0
  0000:b824  je     0xb82c
  0000:b826  mov    al, 0
  0000:b828  push   ax
  0000:b829  call   0x3d11
L0b82c:
  0000:b82c  jmp    0xb940
L0b82f:
  0000:b82f  cmp    al, 4
  0000:b831  je     0xb836
  0000:b833  jmp    0xb927
L0b836:
  0000:b836  cmp    byte ptr [g38cd], 0
  0000:b83b  jbe    0xb863
  0000:b83d  mov    ax, 7
  0000:b840  push   ax
  0000:b841  lcall  SYS:0f78:114b Random
  0000:b846  or     ax, ax
  0000:b848  jne    0xb863
  0000:b84a  mov    di, 0x8aed    ; "Все куда-то плывёт - совсем башню заклинило"
  0000:b84d  push   cs
  0000:b84e  push   di
  0000:b84f  xor    ax, ax
  0000:b851  push   ax
  0000:b852  xor    ax, ax
  0000:b854  push   ax
  0000:b855  xor    ax, ax
  0000:b857  push   ax
  0000:b858  xor    ax, ax
  0000:b85a  push   ax
  0000:b85b  xor    ax, ax
  0000:b85d  push   ax
  0000:b85e  lcall  U2:0eed:01c2 PrintLn
L0b863:
  0000:b863  cmp    byte ptr [g38cd], 0
  0000:b868  ja     0xb86d
  0000:b86a  jmp    0xb90c
L0b86d:
  0000:b86d  mov    ax, 7
  0000:b870  push   ax
  0000:b871  lcall  SYS:0f78:114b Random
  0000:b876  or     ax, ax
  0000:b878  je     0xb87d
  0000:b87a  jmp    0xb90c
L0b87d:
  0000:b87d  lea    di, [bp - 0x100]
  0000:b881  push   ss
  0000:b882  push   di
  0000:b883  mov    di, 0x8997    ; "^6Идет "
  0000:b886  push   cs
  0000:b887  push   di
  0000:b888  lcall  SYS:0f78:0ae7 StrLoad
  0000:b88d  mov    ax, 7
  0000:b890  push   ax
  0000:b891  lcall  SYS:0f78:114b Random
  0000:b896  mov    di, ax
  0000:b898  mov    cl, 8
  0000:b89a  shl    di, cl
  0000:b89c  add    di, 0x2e
  0000:b8a0  push   ds
  0000:b8a1  push   di
  0000:b8a2  lcall  SYS:0f78:0b66 StrConcat
  0000:b8a7  mov    di, 0x899f    ; " # уровня. Хочешь наехать?"
  0000:b8aa  push   cs
  0000:b8ab  push   di
  0000:b8ac  lcall  SYS:0f78:0b66 StrConcat
  0000:b8b1  mov    al, byte ptr [g3692]
  0000:b8b4  xor    ah, ah
  0000:b8b6  mov    dx, 0xa
  0000:b8b9  mul    dx
  0000:b8bb  inc    ax
  0000:b8bc  push   ax
  0000:b8bd  lcall  SYS:0f78:114b Random
  0000:b8c2  push   ax
  0000:b8c3  xor    ax, ax
  0000:b8c5  push   ax
  0000:b8c6  xor    ax, ax
  0000:b8c8  push   ax
  0000:b8c9  xor    ax, ax
  0000:b8cb  push   ax
  0000:b8cc  xor    ax, ax
  0000:b8ce  push   ax
  0000:b8cf  lcall  U2:0eed:01c2 PrintLn
  0000:b8d4  mov    di, 0x3ecc
  0000:b8d7  push   ds
  0000:b8d8  push   di
  0000:b8d9  mov    di, 0x3a72
  0000:b8dc  push   ds
  0000:b8dd  push   di
  0000:b8de  mov    ax, 0xff
  0000:b8e1  push   ax
  0000:b8e2  lcall  SYS:0f78:06c6 ReadStr
  0000:b8e7  lcall  SYS:0f78:059d ReadLnEnd
  0000:b8ec  lcall  SYS:0f78:0291 IOCheck
  0000:b8f1  mov    di, 0x8b19    ; "^6Чё за ботва? ни кого нет.. глюки какие-то..."
  0000:b8f4  push   cs
  0000:b8f5  push   di
  0000:b8f6  xor    ax, ax
  0000:b8f8  push   ax
  0000:b8f9  xor    ax, ax
  0000:b8fb  push   ax
  0000:b8fc  xor    ax, ax
  0000:b8fe  push   ax
  0000:b8ff  xor    ax, ax
  0000:b901  push   ax
  0000:b902  xor    ax, ax
  0000:b904  push   ax
  0000:b905  lcall  U2:0eed:01c2 PrintLn
  0000:b90a  jmp    0xb925
L0b90c:
  0000:b90c  mov    di, 0x8b48    ; "Ничё не происходит."
  0000:b90f  push   cs
  0000:b910  push   di
  0000:b911  xor    ax, ax
  0000:b913  push   ax
  0000:b914  xor    ax, ax
  0000:b916  push   ax
  0000:b917  xor    ax, ax
  0000:b919  push   ax
  0000:b91a  xor    ax, ax
  0000:b91c  push   ax
  0000:b91d  xor    ax, ax
  0000:b91f  push   ax
  0000:b920  lcall  U2:0eed:01c2 PrintLn
L0b925:
  0000:b925  jmp    0xb940
L0b927:
  0000:b927  mov    di, 0x8b48    ; "Ничё не происходит."
  0000:b92a  push   cs
  0000:b92b  push   di
  0000:b92c  xor    ax, ax
  0000:b92e  push   ax
  0000:b92f  xor    ax, ax
  0000:b931  push   ax
  0000:b932  xor    ax, ax
  0000:b934  push   ax
  0000:b935  xor    ax, ax
  0000:b937  push   ax
  0000:b938  xor    ax, ax
  0000:b93a  push   ax
  0000:b93b  lcall  U2:0eed:01c2 PrintLn
L0b940:
  0000:b940  mov    di, 0x3972
  0000:b943  push   ds
  0000:b944  push   di
  0000:b945  mov    di, 0x8b5c    ; "mar"
  0000:b948  push   cs
  0000:b949  push   di
  0000:b94a  lcall  SYS:0f78:0bd8 StrCmp
  0000:b94f  je     0xb954
  0000:b951  jmp    0xc4b4
L0b954:
  0000:b954  cmp    byte ptr [g3694], 1
  0000:b959  je     0xb95e
  0000:b95b  jmp    0xc49b
L0b95e:
  0000:b95e  cmp    byte ptr [g3b76], 0
  0000:b963  je     0xb968
  0000:b965  jmp    0xc480
L0b968:
  0000:b968  mov    di, 0x8b60    ; "Ты пришел на базар напиши  ^6w^7  чтобы уйти."
  0000:b96b  push   cs
  0000:b96c  push   di
  0000:b96d  xor    ax, ax
  0000:b96f  push   ax
  0000:b970  xor    ax, ax
  0000:b972  push   ax
  0000:b973  xor    ax, ax
  0000:b975  push   ax
  0000:b976  xor    ax, ax
  0000:b978  push   ax
  0000:b979  xor    ax, ax
  0000:b97b  push   ax
  0000:b97c  lcall  U2:0eed:01c2 PrintLn
  0000:b981  mov    di, 0x8b8e    ; "Можно потискать здесь у лохов кошельки(^6t^7)."
  0000:b984  push   cs
  0000:b985  push   di
  0000:b986  xor    ax, ax
  0000:b988  push   ax
  0000:b989  xor    ax, ax
  0000:b98b  push   ax
  0000:b98c  xor    ax, ax
  0000:b98e  push   ax
  0000:b98f  xor    ax, ax
  0000:b991  push   ax
  0000:b992  xor    ax, ax
  0000:b994  push   ax
  0000:b995  lcall  U2:0eed:01c2 PrintLn
  0000:b99a  mov    di, 0x8bbd    ; "А можно чё-то купить"
  0000:b99d  push   cs
  0000:b99e  push   di
  0000:b99f  xor    ax, ax
  0000:b9a1  push   ax
  0000:b9a2  xor    ax, ax
  0000:b9a4  push   ax
  0000:b9a5  xor    ax, ax
  0000:b9a7  push   ax
  0000:b9a8  xor    ax, ax
  0000:b9aa  push   ax
  0000:b9ab  xor    ax, ax
  0000:b9ad  push   ax
  0000:b9ae  lcall  U2:0eed:01c2 PrintLn
  0000:b9b3  mov    al, byte ptr [g0b2e]
  0000:b9b6  xor    ah, ah
  0000:b9b8  cmp    ax, word ptr [g38c7]
  0000:b9bc  jle    0xb9c5
  0000:b9be  mov    byte ptr [g3b7a], 0x34
  0000:b9c3  jmp    0xb9ca
L0b9c5:
  0000:b9c5  mov    byte ptr [g3b7a], 0x30
L0b9ca:
  0000:b9ca  lea    di, [bp - 0x200]
  0000:b9ce  push   ss
  0000:b9cf  push   di
  0000:b9d0  mov    di, 0x8bd2    ; "^61^7 - ^"
  0000:b9d3  push   cs
  0000:b9d4  push   di
  0000:b9d5  lcall  SYS:0f78:0ae7 StrLoad
  0000:b9da  lea    di, [bp - 0x100]
  0000:b9de  push   ss
  0000:b9df  push   di
  0000:b9e0  mov    al, byte ptr [g3b7a]
  0000:b9e3  push   ax
  0000:b9e4  lcall  SYS:0f78:0c03 CharToStr
  0000:b9e9  lcall  SYS:0f78:0b66 StrConcat
  0000:b9ee  mov    di, 0x8bdc    ; "#^7 руб.  Хотдог(3-4 з)"
  0000:b9f1  push   cs
  0000:b9f2  push   di
  0000:b9f3  lcall  SYS:0f78:0b66 StrConcat
  0000:b9f8  mov    al, byte ptr [g0b2e]
  0000:b9fb  xor    ah, ah
  0000:b9fd  push   ax
  0000:b9fe  xor    ax, ax
  0000:ba00  push   ax
  0000:ba01  xor    ax, ax
  0000:ba03  push   ax
  0000:ba04  xor    ax, ax
  0000:ba06  push   ax
  0000:ba07  xor    ax, ax
  0000:ba09  push   ax
  0000:ba0a  lcall  U2:0eed:01c2 PrintLn
  0000:ba0f  mov    al, byte ptr [g0b2f]
  0000:ba12  xor    ah, ah
  0000:ba14  cmp    ax, word ptr [g38c7]
  0000:ba18  jle    0xba21
  0000:ba1a  mov    byte ptr [g3b7a], 0x34
  0000:ba1f  jmp    0xba26
L0ba21:
  0000:ba21  mov    byte ptr [g3b7a], 0x30
L0ba26:
  0000:ba26  lea    di, [bp - 0x200]
  0000:ba2a  push   ss
  0000:ba2b  push   di
  0000:ba2c  mov    di, 0x8bf4    ; "^62^7 - ^"
  0000:ba2f  push   cs
  0000:ba30  push   di
  0000:ba31  lcall  SYS:0f78:0ae7 StrLoad
  0000:ba36  lea    di, [bp - 0x100]
  0000:ba3a  push   ss
  0000:ba3b  push   di
  0000:ba3c  mov    al, byte ptr [g3b7a]
  0000:ba3f  push   ax
  0000:ba40  lcall  SYS:0f78:0c03 CharToStr
  0000:ba45  lcall  SYS:0f78:0b66 StrConcat
  0000:ba4a  mov    di, 0x8bfe    ; "#^7 руб.  Пиво(#з)"
  0000:ba4d  push   cs
  0000:ba4e  push   di
  0000:ba4f  lcall  SYS:0f78:0b66 StrConcat
  0000:ba54  mov    al, byte ptr [g0b2f]
  0000:ba57  xor    ah, ah
  0000:ba59  push   ax
  0000:ba5a  mov    ax, 5
  0000:ba5d  push   ax
  0000:ba5e  xor    ax, ax
  0000:ba60  push   ax
  0000:ba61  xor    ax, ax
  0000:ba63  push   ax
  0000:ba64  xor    ax, ax
  0000:ba66  push   ax
  0000:ba67  lcall  U2:0eed:01c2 PrintLn
  0000:ba6c  mov    al, byte ptr [g0b30]
  0000:ba6f  xor    ah, ah
  0000:ba71  cmp    ax, word ptr [g38c7]
  0000:ba75  jle    0xba7e
  0000:ba77  mov    byte ptr [g3b7a], 0x34
  0000:ba7c  jmp    0xba83
L0ba7e:
  0000:ba7e  mov    byte ptr [g3b7a], 0x30
L0ba83:
  0000:ba83  lea    di, [bp - 0x200]
  0000:ba87  push   ss
  0000:ba88  push   di
  0000:ba89  mov    di, 0x8c11    ; "^63^7 - ^"
  0000:ba8c  push   cs
  0000:ba8d  push   di
  0000:ba8e  lcall  SYS:0f78:0ae7 StrLoad
  0000:ba93  lea    di, [bp - 0x100]
  0000:ba97  push   ss
  0000:ba98  push   di
  0000:ba99  mov    al, byte ptr [g3b7a]
  0000:ba9c  push   ax
  0000:ba9d  lcall  SYS:0f78:0c03 CharToStr
  0000:baa2  lcall  SYS:0f78:0b66 StrConcat
  0000:baa7  mov    di, 0x8c1b    ; "#^7 руб. Затемнённые очки(Чтоб менты не узнали)"
  0000:baaa  push   cs
  0000:baab  push   di
  0000:baac  lcall  SYS:0f78:0b66 StrConcat
  0000:bab1  mov    al, byte ptr [g0b30]
  0000:bab4  xor    ah, ah
  0000:bab6  push   ax
  0000:bab7  xor    ax, ax
  0000:bab9  push   ax
  0000:baba  xor    ax, ax
  0000:babc  push   ax
  0000:babd  xor    ax, ax
  0000:babf  push   ax
  0000:bac0  xor    ax, ax
  0000:bac2  push   ax
  0000:bac3  lcall  U2:0eed:01c2 PrintLn
  0000:bac8  mov    al, byte ptr [g0b31]
  0000:bacb  xor    ah, ah
  0000:bacd  cmp    ax, word ptr [g38c7]
  0000:bad1  jle    0xbada
  0000:bad3  mov    byte ptr [g3b7a], 0x34
  0000:bad8  jmp    0xbadf
L0bada:
  0000:bada  mov    byte ptr [g3b7a], 0x30
L0badf:
  0000:badf  lea    di, [bp - 0x200]
  0000:bae3  push   ss
  0000:bae4  push   di
  0000:bae5  mov    di, 0x8c4b    ; "^64^7 - ^"
  0000:bae8  push   cs
  0000:bae9  push   di
  0000:baea  lcall  SYS:0f78:0ae7 StrLoad
  0000:baef  lea    di, [bp - 0x100]
  0000:baf3  push   ss
  0000:baf4  push   di
  0000:baf5  mov    al, byte ptr [g3b7a]
  0000:baf8  push   ax
  0000:baf9  lcall  SYS:0f78:0c03 CharToStr
  0000:bafe  lcall  SYS:0f78:0b66 StrConcat
  0000:bb03  mov    di, 0x8c55    ; "#^7 руб. Реальный спортивный костюм abibas(Смягчает пинок на 1)"
  0000:bb06  push   cs
  0000:bb07  push   di
  0000:bb08  lcall  SYS:0f78:0b66 StrConcat
  0000:bb0d  mov    al, byte ptr [g0b31]
  0000:bb10  xor    ah, ah
  0000:bb12  push   ax
  0000:bb13  xor    ax, ax
  0000:bb15  push   ax
  0000:bb16  xor    ax, ax
  0000:bb18  push   ax
  0000:bb19  xor    ax, ax
  0000:bb1b  push   ax
  0000:bb1c  xor    ax, ax
  0000:bb1e  push   ax
  0000:bb1f  lcall  U2:0eed:01c2 PrintLn
  0000:bb24  mov    al, byte ptr [g0b32]
  0000:bb27  xor    ah, ah
  0000:bb29  cmp    ax, word ptr [g38c7]
  0000:bb2d  jle    0xbb36
  0000:bb2f  mov    byte ptr [g3b7a], 0x34
  0000:bb34  jmp    0xbb3b
L0bb36:
  0000:bb36  mov    byte ptr [g3b7a], 0x30
L0bb3b:
  0000:bb3b  lea    di, [bp - 0x200]
  0000:bb3f  push   ss
  0000:bb40  push   di
  0000:bb41  mov    di, 0x8c95    ; "^65^7 - ^"
  0000:bb44  push   cs
  0000:bb45  push   di
  0000:bb46  lcall  SYS:0f78:0ae7 StrLoad
  0000:bb4b  lea    di, [bp - 0x100]
  0000:bb4f  push   ss
  0000:bb50  push   di
  0000:bb51  mov    al, byte ptr [g3b7a]
  0000:bb54  push   ax
  0000:bb55  lcall  SYS:0f78:0c03 CharToStr
  0000:bb5a  lcall  SYS:0f78:0b66 StrConcat
  0000:bb5f  mov    di, 0x8c9f    ; "#^7 руб. Понтовые бутсы(Увеличивают урон)"
  0000:bb62  push   cs
  0000:bb63  push   di
  0000:bb64  lcall  SYS:0f78:0b66 StrConcat
  0000:bb69  mov    al, byte ptr [g0b32]
  0000:bb6c  xor    ah, ah
  0000:bb6e  push   ax
  0000:bb6f  xor    ax, ax
  0000:bb71  push   ax
  0000:bb72  xor    ax, ax
  0000:bb74  push   ax
  0000:bb75  xor    ax, ax
  0000:bb77  push   ax
  0000:bb78  xor    ax, ax
  0000:bb7a  push   ax
  0000:bb7b  lcall  U2:0eed:01c2 PrintLn
  0000:bb80  cmp    byte ptr [g3692], 1
  0000:bb85  ja     0xbb8a
  0000:bb87  jmp    0xbc42
L0bb8a:
  0000:bb8a  mov    al, byte ptr [g0b33]
  0000:bb8d  xor    ah, ah
  0000:bb8f  cmp    ax, word ptr [g38c7]
  0000:bb93  jle    0xbb9c
  0000:bb95  mov    byte ptr [g3b7a], 0x34
  0000:bb9a  jmp    0xbba1
L0bb9c:
  0000:bb9c  mov    byte ptr [g3b7a], 0x30
L0bba1:
  0000:bba1  lea    di, [bp - 0x200]
  0000:bba5  push   ss
  0000:bba6  push   di
  0000:bba7  mov    di, 0x8cc9    ; "^66^7 - ^"
  0000:bbaa  push   cs
  0000:bbab  push   di
  0000:bbac  lcall  SYS:0f78:0ae7 StrLoad
  0000:bbb1  lea    di, [bp - 0x100]
  0000:bbb5  push   ss
  0000:bbb6  push   di
  0000:bbb7  mov    al, byte ptr [g3b7a]
  0000:bbba  push   ax
  0000:bbbb  lcall  SYS:0f78:0c03 CharToStr
  0000:bbc0  lcall  SYS:0f78:0b66 StrConcat
  0000:bbc5  mov    di, 0x8cd3    ; "#^7 руб. Реальную кожанку(Дополнительная защита от случайностей на 2)"
  0000:bbc8  push   cs
  0000:bbc9  push   di
  0000:bbca  lcall  SYS:0f78:0b66 StrConcat
  0000:bbcf  mov    al, byte ptr [g0b33]
  0000:bbd2  xor    ah, ah
  0000:bbd4  push   ax
  0000:bbd5  xor    ax, ax
  0000:bbd7  push   ax
  0000:bbd8  xor    ax, ax
  0000:bbda  push   ax
  0000:bbdb  xor    ax, ax
  0000:bbdd  push   ax
  0000:bbde  xor    ax, ax
  0000:bbe0  push   ax
  0000:bbe1  lcall  U2:0eed:01c2 PrintLn
  0000:bbe6  mov    al, byte ptr [g0b34]
  0000:bbe9  xor    ah, ah
  0000:bbeb  cmp    ax, word ptr [g38c7]
  0000:bbef  jle    0xbbf8
  0000:bbf1  mov    byte ptr [g3b7a], 0x34
  0000:bbf6  jmp    0xbbfd
L0bbf8:
  0000:bbf8  mov    byte ptr [g3b7a], 0x30
L0bbfd:
  0000:bbfd  lea    di, [bp - 0x200]
  0000:bc01  push   ss
  0000:bc02  push   di
  0000:bc03  mov    di, 0x8d19    ; "^67^7 - ^"
  0000:bc06  push   cs
  0000:bc07  push   di
  0000:bc08  lcall  SYS:0f78:0ae7 StrLoad
  0000:bc0d  lea    di, [bp - 0x100]
  0000:bc11  push   ss
  0000:bc12  push   di
  0000:bc13  mov    al, byte ptr [g3b7a]
  0000:bc16  push   ax
  0000:bc17  lcall  SYS:0f78:0c03 CharToStr
  0000:bc1c  lcall  SYS:0f78:0b66 StrConcat
  0000:bc21  mov    di, 0x8d23    ; "#^7 руб. Реальный спортивный костюм adidas(Смягчает пинок на 2)"
  0000:bc24  push   cs
  0000:bc25  push   di
  0000:bc26  lcall  SYS:0f78:0b66 StrConcat
  0000:bc2b  mov    al, byte ptr [g0b34]
  0000:bc2e  xor    ah, ah
  0000:bc30  push   ax
  0000:bc31  xor    ax, ax
  0000:bc33  push   ax
  0000:bc34  xor    ax, ax
  0000:bc36  push   ax
  0000:bc37  xor    ax, ax
  0000:bc39  push   ax
  0000:bc3a  xor    ax, ax
  0000:bc3c  push   ax
  0000:bc3d  lcall  U2:0eed:01c2 PrintLn
L0bc42:
  0000:bc42  cmp    byte ptr [g3692], 2
  0000:bc47  jbe    0xbca5
  0000:bc49  mov    al, byte ptr [g0b35]
  0000:bc4c  xor    ah, ah
  0000:bc4e  cmp    ax, word ptr [g38c7]
  0000:bc52  jle    0xbc5b
  0000:bc54  mov    byte ptr [g3b7a], 0x34
  0000:bc59  jmp    0xbc60
L0bc5b:
  0000:bc5b  mov    byte ptr [g3b7a], 0x30
L0bc60:
  0000:bc60  lea    di, [bp - 0x200]
  0000:bc64  push   ss
  0000:bc65  push   di
  0000:bc66  mov    di, 0x8d63    ; "^68^7 - ^"
  0000:bc69  push   cs
  0000:bc6a  push   di
  0000:bc6b  lcall  SYS:0f78:0ae7 StrLoad
  0000:bc70  lea    di, [bp - 0x100]
  0000:bc74  push   ss
  0000:bc75  push   di
  0000:bc76  mov    al, byte ptr [g3b7a]
  0000:bc79  push   ax
  0000:bc7a  lcall  SYS:0f78:0c03 CharToStr
  0000:bc7f  lcall  SYS:0f78:0b66 StrConcat
  0000:bc84  mov    di, 0x8d6d    ; "#^7 руб. Понтовёйшие бутсы(Урон+2)"
  0000:bc87  push   cs
  0000:bc88  push   di
  0000:bc89  lcall  SYS:0f78:0b66 StrConcat
  0000:bc8e  mov    al, byte ptr [g0b35]
  0000:bc91  xor    ah, ah
  0000:bc93  push   ax
  0000:bc94  xor    ax, ax
  0000:bc96  push   ax
  0000:bc97  xor    ax, ax
  0000:bc99  push   ax
  0000:bc9a  xor    ax, ax
  0000:bc9c  push   ax
  0000:bc9d  xor    ax, ax
  0000:bc9f  push   ax
  0000:bca0  lcall  U2:0eed:01c2 PrintLn
L0bca5:
  0000:bca5  cmp    byte ptr [g3692], 3
  0000:bcaa  jbe    0xbd08
  0000:bcac  mov    al, byte ptr [g0b36]
  0000:bcaf  xor    ah, ah
  0000:bcb1  cmp    ax, word ptr [g38c7]
  0000:bcb5  jle    0xbcbe
  0000:bcb7  mov    byte ptr [g3b7a], 0x34
  0000:bcbc  jmp    0xbcc3
L0bcbe:
  0000:bcbe  mov    byte ptr [g3b7a], 0x30
L0bcc3:
  0000:bcc3  lea    di, [bp - 0x200]
  0000:bcc7  push   ss
  0000:bcc8  push   di
  0000:bcc9  mov    di, 0x8d90    ; "^69^7 - ^"
  0000:bccc  push   cs
  0000:bccd  push   di
  0000:bcce  lcall  SYS:0f78:0ae7 StrLoad
  0000:bcd3  lea    di, [bp - 0x100]
  0000:bcd7  push   ss
  0000:bcd8  push   di
  0000:bcd9  mov    al, byte ptr [g3b7a]
  0000:bcdc  push   ax
  0000:bcdd  lcall  SYS:0f78:0c03 CharToStr
  0000:bce2  lcall  SYS:0f78:0b66 StrConcat
  0000:bce7  mov    di, 0x8d9a    ; "#^7 руб. Ваще крутую кожанку(Броня +4)"
  0000:bcea  push   cs
  0000:bceb  push   di
  0000:bcec  lcall  SYS:0f78:0b66 StrConcat
  0000:bcf1  mov    al, byte ptr [g0b36]
  0000:bcf4  xor    ah, ah
  0000:bcf6  push   ax
  0000:bcf7  xor    ax, ax
  0000:bcf9  push   ax
  0000:bcfa  xor    ax, ax
  0000:bcfc  push   ax
  0000:bcfd  xor    ax, ax
  0000:bcff  push   ax
  0000:bd00  xor    ax, ax
  0000:bd02  push   ax
  0000:bd03  lcall  U2:0eed:01c2 PrintLn
L0bd08:
  0000:bd08  mov    di, 0x8dc1    ; "^0Базар\"
  0000:bd0b  push   cs
  0000:bd0c  push   di
  0000:bd0d  xor    ax, ax
  0000:bd0f  push   ax
  0000:bd10  xor    ax, ax
  0000:bd12  push   ax
  0000:bd13  xor    ax, ax
  0000:bd15  push   ax
  0000:bd16  xor    ax, ax
  0000:bd18  push   ax
  0000:bd19  xor    ax, ax
  0000:bd1b  push   ax
  0000:bd1c  lcall  U2:0eed:0000 Print
  0000:bd21  mov    di, 0x3ecc
  0000:bd24  push   ds
  0000:bd25  push   di
  0000:bd26  mov    di, 0x3a72
  0000:bd29  push   ds
  0000:bd2a  push   di
  0000:bd2b  mov    ax, 0xff
  0000:bd2e  push   ax
  0000:bd2f  lcall  SYS:0f78:06c6 ReadStr
  0000:bd34  lcall  SYS:0f78:059d ReadLnEnd
  0000:bd39  lcall  SYS:0f78:0291 IOCheck
  0000:bd3e  mov    di, 0x3a72
  0000:bd41  push   ds
  0000:bd42  push   di
  0000:bd43  lcall  U2:0eed:0216 LowerCase
  0000:bd48  mov    di, 0x3a72
  0000:bd4b  push   ds
  0000:bd4c  push   di
  0000:bd4d  mov    di, 0x8dca    ; "1"
  0000:bd50  push   cs
  0000:bd51  push   di
  0000:bd52  lcall  SYS:0f78:0bd8 StrCmp
  0000:bd57  je     0xbd5c
  0000:bd59  jmp    0xbe0a
L0bd5c:
  0000:bd5c  cmp    byte ptr [g38b0], 1
  0000:bd61  jne    0xbd7f
  0000:bd63  mov    di, 0x8dcc    ; "^4Ты не можешь хавать из-за сломаной челюсти."
  0000:bd66  push   cs
  0000:bd67  push   di
  0000:bd68  xor    ax, ax
  0000:bd6a  push   ax
  0000:bd6b  xor    ax, ax
  0000:bd6d  push   ax
  0000:bd6e  xor    ax, ax
  0000:bd70  push   ax
  0000:bd71  xor    ax, ax
  0000:bd73  push   ax
  0000:bd74  xor    ax, ax
  0000:bd76  push   ax
  0000:bd77  lcall  U2:0eed:01c2 PrintLn
  0000:bd7c  jmp    0xbe0a
L0bd7f:
  0000:bd7f  mov    ax, word ptr [g38ac]
  0000:bd82  cmp    ax, word ptr [g38ae]
  0000:bd86  jge    0xbdf1
  0000:bd88  mov    al, byte ptr [g0b2e]
  0000:bd8b  xor    ah, ah
  0000:bd8d  cmp    ax, word ptr [g38c7]
  0000:bd91  jle    0xbdae
  0000:bd93  mov    di, 0x8dfa    ; "^4Чёрт, бабок даже на жратву не хватает."
  0000:bd96  push   cs
  0000:bd97  push   di
  0000:bd98  xor    ax, ax
  0000:bd9a  push   ax
  0000:bd9b  xor    ax, ax
  0000:bd9d  push   ax
  0000:bd9e  xor    ax, ax
  0000:bda0  push   ax
  0000:bda1  xor    ax, ax
  0000:bda3  push   ax
  0000:bda4  xor    ax, ax
  0000:bda6  push   ax
  0000:bda7  lcall  U2:0eed:01c2 PrintLn
  0000:bdac  jmp    0xbdef
L0bdae:
  0000:bdae  mov    al, byte ptr [g0b2e]
  0000:bdb1  xor    ah, ah
  0000:bdb3  sub    word ptr [g38c7], ax
  0000:bdb7  mov    ax, 2
  0000:bdba  push   ax
  0000:bdbb  lcall  SYS:0f78:114b Random
  0000:bdc0  add    ax, 3
  0000:bdc3  add    word ptr [g38ac], ax
  0000:bdc7  mov    ax, word ptr [g38ac]
  0000:bdca  cmp    ax, word ptr [g38ae]
  0000:bdce  jle    0xbdd6
  0000:bdd0  mov    ax, word ptr [g38ae]
  0000:bdd3  mov    word ptr [g38ac], ax
L0bdd6:
  0000:bdd6  mov    di, 0x8e23    ; "^2Ты сожрал хот-дог"
  0000:bdd9  push   cs
  0000:bdda  push   di
  0000:bddb  xor    ax, ax
  0000:bddd  push   ax
  0000:bdde  xor    ax, ax
  0000:bde0  push   ax
  0000:bde1  xor    ax, ax
  0000:bde3  push   ax
  0000:bde4  xor    ax, ax
  0000:bde6  push   ax
  0000:bde7  xor    ax, ax
  0000:bde9  push   ax
  0000:bdea  lcall  U2:0eed:01c2 PrintLn
L0bdef:
  0000:bdef  jmp    0xbe0a
L0bdf1:
  0000:bdf1  mov    di, 0x8e37    ; "^6Да неохота хавать"
  0000:bdf4  push   cs
  0000:bdf5  push   di
  0000:bdf6  xor    ax, ax
  0000:bdf8  push   ax
  0000:bdf9  xor    ax, ax
  0000:bdfb  push   ax
  0000:bdfc  xor    ax, ax
  0000:bdfe  push   ax
  0000:bdff  xor    ax, ax
  0000:be01  push   ax
  0000:be02  xor    ax, ax
  0000:be04  push   ax
  0000:be05  lcall  U2:0eed:01c2 PrintLn
L0be0a:
  0000:be0a  mov    di, 0x3a72
  0000:be0d  push   ds
  0000:be0e  push   di
  0000:be0f  mov    di, 0x8e4b    ; "2"
  0000:be12  push   cs
  0000:be13  push   di
  0000:be14  lcall  SYS:0f78:0bd8 StrCmp
  0000:be19  je     0xbe1e
  0000:be1b  jmp    0xbeb8
L0be1e:
  0000:be1e  mov    al, byte ptr [g0b2f]
  0000:be21  xor    ah, ah
  0000:be23  cmp    ax, word ptr [g38c7]
  0000:be27  jle    0xbe44
  0000:be29  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:be2c  push   cs
  0000:be2d  push   di
  0000:be2e  xor    ax, ax
  0000:be30  push   ax
  0000:be31  xor    ax, ax
  0000:be33  push   ax
  0000:be34  xor    ax, ax
  0000:be36  push   ax
  0000:be37  xor    ax, ax
  0000:be39  push   ax
  0000:be3a  xor    ax, ax
  0000:be3c  push   ax
  0000:be3d  lcall  U2:0eed:01c2 PrintLn
  0000:be42  jmp    0xbeb8
L0be44:
  0000:be44  mov    al, byte ptr [g0b2f]
  0000:be47  xor    ah, ah
  0000:be49  sub    word ptr [g38c7], ax
  0000:be4d  mov    ax, 3
  0000:be50  push   ax
  0000:be51  lcall  SYS:0f78:114b Random
  0000:be56  cmp    ax, 0
  0000:be59  jne    0xbe76
  0000:be5b  mov    di, 0x8e5a    ; "^2Глинское? Чё за нафиг? А ладно."
  0000:be5e  push   cs
  0000:be5f  push   di
  0000:be60  xor    ax, ax
  0000:be62  push   ax
  0000:be63  xor    ax, ax
  0000:be65  push   ax
  0000:be66  xor    ax, ax
  0000:be68  push   ax
  0000:be69  xor    ax, ax
  0000:be6b  push   ax
  0000:be6c  xor    ax, ax
  0000:be6e  push   ax
  0000:be6f  lcall  U2:0eed:01c2 PrintLn
  0000:be74  jmp    0xbeb4
L0be76:
  0000:be76  cmp    ax, 1
  0000:be79  jne    0xbe96
  0000:be7b  mov    di, 0x8e7c    ; "^2Пивко. Холодненькое."
  0000:be7e  push   cs
  0000:be7f  push   di
  0000:be80  xor    ax, ax
  0000:be82  push   ax
  0000:be83  xor    ax, ax
  0000:be85  push   ax
  0000:be86  xor    ax, ax
  0000:be88  push   ax
  0000:be89  xor    ax, ax
  0000:be8b  push   ax
  0000:be8c  xor    ax, ax
  0000:be8e  push   ax
  0000:be8f  lcall  U2:0eed:01c2 PrintLn
  0000:be94  jmp    0xbeb4
L0be96:
  0000:be96  cmp    ax, 2
  0000:be99  jne    0xbeb4
  0000:be9b  mov    di, 0x8e93    ; "^2Ну чё по пиву?."
  0000:be9e  push   cs
  0000:be9f  push   di
  0000:bea0  xor    ax, ax
  0000:bea2  push   ax
  0000:bea3  xor    ax, ax
  0000:bea5  push   ax
  0000:bea6  xor    ax, ax
  0000:bea8  push   ax
  0000:bea9  xor    ax, ax
  0000:beab  push   ax
  0000:beac  xor    ax, ax
  0000:beae  push   ax
  0000:beaf  lcall  U2:0eed:01c2 PrintLn
L0beb4:
  0000:beb4  inc    word ptr [g38c3]
L0beb8:
  0000:beb8  mov    di, 0x3a72
  0000:bebb  push   ds
  0000:bebc  push   di
  0000:bebd  mov    di, 0x8ea5    ; "3"
  0000:bec0  push   cs
  0000:bec1  push   di
  0000:bec2  lcall  SYS:0f78:0bd8 StrCmp
  0000:bec7  jne    0xbf38
  0000:bec9  cmp    byte ptr [g38b3], 0
  0000:bece  jne    0xbf1f
  0000:bed0  mov    al, byte ptr [g0b30]
  0000:bed3  xor    ah, ah
  0000:bed5  cmp    ax, word ptr [g38c7]
  0000:bed9  jle    0xbef6
  0000:bedb  mov    di, 0x8ea7    ; "^4Не хватает бабок"
  0000:bede  push   cs
  0000:bedf  push   di
  0000:bee0  xor    ax, ax
  0000:bee2  push   ax
  0000:bee3  xor    ax, ax
  0000:bee5  push   ax
  0000:bee6  xor    ax, ax
  0000:bee8  push   ax
  0000:bee9  xor    ax, ax
  0000:beeb  push   ax
  0000:beec  xor    ax, ax
  0000:beee  push   ax
  0000:beef  lcall  U2:0eed:01c2 PrintLn
  0000:bef4  jmp    0xbf1d
L0bef6:
  0000:bef6  mov    byte ptr [g38b3], 1
  0000:befb  mov    al, byte ptr [g0b30]
  0000:befe  xor    ah, ah
  0000:bf00  sub    word ptr [g38c7], ax
  0000:bf04  mov    di, 0x8eba    ; "^2Модные такие очки от солнца."
  0000:bf07  push   cs
  0000:bf08  push   di
  0000:bf09  xor    ax, ax
  0000:bf0b  push   ax
  0000:bf0c  xor    ax, ax
  0000:bf0e  push   ax
  0000:bf0f  xor    ax, ax
  0000:bf11  push   ax
  0000:bf12  xor    ax, ax
  0000:bf14  push   ax
  0000:bf15  xor    ax, ax
  0000:bf17  push   ax
  0000:bf18  lcall  U2:0eed:01c2 PrintLn
L0bf1d:
  0000:bf1d  jmp    0xbf38
L0bf1f:
  0000:bf1f  mov    di, 0x8ed9    ; "^6У тебя есть очки от солнца."
  0000:bf22  push   cs
  0000:bf23  push   di
  0000:bf24  xor    ax, ax
  0000:bf26  push   ax
  0000:bf27  xor    ax, ax
  0000:bf29  push   ax
  0000:bf2a  xor    ax, ax
  0000:bf2c  push   ax
  0000:bf2d  xor    ax, ax
  0000:bf2f  push   ax
  0000:bf30  xor    ax, ax
  0000:bf32  push   ax
  0000:bf33  lcall  U2:0eed:01c2 PrintLn
L0bf38:
  0000:bf38  mov    di, 0x3a72
  0000:bf3b  push   ds
  0000:bf3c  push   di
  0000:bf3d  mov    di, 0x8ef7    ; "4"
  0000:bf40  push   cs
  0000:bf41  push   di
  0000:bf42  lcall  SYS:0f78:0bd8 StrCmp
  0000:bf47  je     0xbf4c
  0000:bf49  jmp    0xbfe1
L0bf4c:
  0000:bf4c  cmp    byte ptr [g38b7], 0
  0000:bf51  jne    0xbfc8
  0000:bf53  cmp    byte ptr [g38b4], 0
  0000:bf58  jne    0xbfad
  0000:bf5a  mov    al, byte ptr [g0b31]
  0000:bf5d  xor    ah, ah
  0000:bf5f  cmp    ax, word ptr [g38c7]
  0000:bf63  jle    0xbf80
  0000:bf65  mov    di, 0x8ef9    ; "^4Не хватает денег"
  0000:bf68  push   cs
  0000:bf69  push   di
  0000:bf6a  xor    ax, ax
  0000:bf6c  push   ax
  0000:bf6d  xor    ax, ax
  0000:bf6f  push   ax
  0000:bf70  xor    ax, ax
  0000:bf72  push   ax
  0000:bf73  xor    ax, ax
  0000:bf75  push   ax
  0000:bf76  xor    ax, ax
  0000:bf78  push   ax
  0000:bf79  lcall  U2:0eed:01c2 PrintLn
  0000:bf7e  jmp    0xbfab
L0bf80:
  0000:bf80  mov    byte ptr [g38b4], 1
  0000:bf85  mov    al, byte ptr [g0b31]
  0000:bf88  xor    ah, ah
  0000:bf8a  sub    word ptr [g38c7], ax
  0000:bf8e  mov    di, 0x8f0c    ; "^2Теперь ты больше похож на гопа."
  0000:bf91  push   cs
  0000:bf92  push   di
  0000:bf93  xor    ax, ax
  0000:bf95  push   ax
  0000:bf96  xor    ax, ax
  0000:bf98  push   ax
  0000:bf99  xor    ax, ax
  0000:bf9b  push   ax
  0000:bf9c  xor    ax, ax
  0000:bf9e  push   ax
  0000:bf9f  xor    ax, ax
  0000:bfa1  push   ax
  0000:bfa2  lcall  U2:0eed:01c2 PrintLn
  0000:bfa7  inc    byte ptr [g38b2]
L0bfab:
  0000:bfab  jmp    0xbfc6
L0bfad:
  0000:bfad  mov    di, 0x8f2e    ; "^6У тебя уже есть костюм."
  0000:bfb0  push   cs
  0000:bfb1  push   di
  0000:bfb2  xor    ax, ax
  0000:bfb4  push   ax
  0000:bfb5  xor    ax, ax
  0000:bfb7  push   ax
  0000:bfb8  xor    ax, ax
  0000:bfba  push   ax
  0000:bfbb  xor    ax, ax
  0000:bfbd  push   ax
  0000:bfbe  xor    ax, ax
  0000:bfc0  push   ax
  0000:bfc1  lcall  U2:0eed:01c2 PrintLn
L0bfc6:
  0000:bfc6  jmp    0xbfe1
L0bfc8:
  0000:bfc8  mov    di, 0x8f48    ; "^6У тебя есть более крутой костюм."
  0000:bfcb  push   cs
  0000:bfcc  push   di
  0000:bfcd  xor    ax, ax
  0000:bfcf  push   ax
  0000:bfd0  xor    ax, ax
  0000:bfd2  push   ax
  0000:bfd3  xor    ax, ax
  0000:bfd5  push   ax
  0000:bfd6  xor    ax, ax
  0000:bfd8  push   ax
  0000:bfd9  xor    ax, ax
  0000:bfdb  push   ax
  0000:bfdc  lcall  U2:0eed:01c2 PrintLn
L0bfe1:
  0000:bfe1  mov    di, 0x3a72
  0000:bfe4  push   ds
  0000:bfe5  push   di
  0000:bfe6  mov    di, 0x8f6b    ; "5"
  0000:bfe9  push   cs
  0000:bfea  push   di
  0000:bfeb  lcall  SYS:0f78:0bd8 StrCmp
  0000:bff0  je     0xbff5
  0000:bff2  jmp    0xc08e
L0bff5:
  0000:bff5  cmp    byte ptr [g38b8], 0
  0000:bffa  jne    0xc075
  0000:bffc  cmp    byte ptr [g38b5], 0
  0000:c001  jne    0xc05a
  0000:c003  mov    al, byte ptr [g0b32]
  0000:c006  xor    ah, ah
  0000:c008  cmp    ax, word ptr [g38c7]
  0000:c00c  jle    0xc029
  0000:c00e  mov    di, 0x8f6d    ; "^4Нету на них денег"
  0000:c011  push   cs
  0000:c012  push   di
  0000:c013  xor    ax, ax
  0000:c015  push   ax
  0000:c016  xor    ax, ax
  0000:c018  push   ax
  0000:c019  xor    ax, ax
  0000:c01b  push   ax
  0000:c01c  xor    ax, ax
  0000:c01e  push   ax
  0000:c01f  xor    ax, ax
  0000:c021  push   ax
  0000:c022  lcall  U2:0eed:01c2 PrintLn
  0000:c027  jmp    0xc058
L0c029:
  0000:c029  mov    byte ptr [g38b5], 1
  0000:c02e  mov    al, byte ptr [g0b32]
  0000:c031  xor    ah, ah
  0000:c033  sub    word ptr [g38c7], ax
  0000:c037  mov    di, 0x8f81    ; "^2Зацени красовки."
  0000:c03a  push   cs
  0000:c03b  push   di
  0000:c03c  xor    ax, ax
  0000:c03e  push   ax
  0000:c03f  xor    ax, ax
  0000:c041  push   ax
  0000:c042  xor    ax, ax
  0000:c044  push   ax
  0000:c045  xor    ax, ax
  0000:c047  push   ax
  0000:c048  xor    ax, ax
  0000:c04a  push   ax
  0000:c04b  lcall  U2:0eed:01c2 PrintLn
  0000:c050  inc    word ptr [g38a8]
  0000:c054  inc    word ptr [g38aa]
L0c058:
  0000:c058  jmp    0xc073
L0c05a:
  0000:c05a  mov    di, 0x8f94    ; "^6У тебя такие уже есть."
  0000:c05d  push   cs
  0000:c05e  push   di
  0000:c05f  xor    ax, ax
  0000:c061  push   ax
  0000:c062  xor    ax, ax
  0000:c064  push   ax
  0000:c065  xor    ax, ax
  0000:c067  push   ax
  0000:c068  xor    ax, ax
  0000:c06a  push   ax
  0000:c06b  xor    ax, ax
  0000:c06d  push   ax
  0000:c06e  lcall  U2:0eed:01c2 PrintLn
L0c073:
  0000:c073  jmp    0xc08e
L0c075:
  0000:c075  mov    di, 0x8fad    ; "^6У тебя бутсы по круче."
  0000:c078  push   cs
  0000:c079  push   di
  0000:c07a  xor    ax, ax
  0000:c07c  push   ax
  0000:c07d  xor    ax, ax
  0000:c07f  push   ax
  0000:c080  xor    ax, ax
  0000:c082  push   ax
  0000:c083  xor    ax, ax
  0000:c085  push   ax
  0000:c086  xor    ax, ax
  0000:c088  push   ax
  0000:c089  lcall  U2:0eed:01c2 PrintLn
L0c08e:
  0000:c08e  cmp    byte ptr [g3692], 1
  0000:c093  ja     0xc098
  0000:c095  jmp    0xc142
L0c098:
  0000:c098  mov    di, 0x3a72
  0000:c09b  push   ds
  0000:c09c  push   di
  0000:c09d  mov    di, 0x8fc6    ; "6"
  0000:c0a0  push   cs
  0000:c0a1  push   di
  0000:c0a2  lcall  SYS:0f78:0bd8 StrCmp
  0000:c0a7  je     0xc0ac
  0000:c0a9  jmp    0xc142
L0c0ac:
  0000:c0ac  cmp    byte ptr [g38b9], 0
  0000:c0b1  jne    0xc129
  0000:c0b3  cmp    byte ptr [g38b6], 0
  0000:c0b8  jne    0xc10e
  0000:c0ba  mov    al, byte ptr [g0b33]
  0000:c0bd  xor    ah, ah
  0000:c0bf  cmp    ax, word ptr [g38c7]
  0000:c0c3  jle    0xc0e0
  0000:c0c5  mov    di, 0x8fc8    ; "^4Не достаточно бабла"
  0000:c0c8  push   cs
  0000:c0c9  push   di
  0000:c0ca  xor    ax, ax
  0000:c0cc  push   ax
  0000:c0cd  xor    ax, ax
  0000:c0cf  push   ax
  0000:c0d0  xor    ax, ax
  0000:c0d2  push   ax
  0000:c0d3  xor    ax, ax
  0000:c0d5  push   ax
  0000:c0d6  xor    ax, ax
  0000:c0d8  push   ax
  0000:c0d9  lcall  U2:0eed:01c2 PrintLn
  0000:c0de  jmp    0xc10c
L0c0e0:
  0000:c0e0  mov    byte ptr [g38b6], 1
  0000:c0e5  mov    al, byte ptr [g0b33]
  0000:c0e8  xor    ah, ah
  0000:c0ea  sub    word ptr [g38c7], ax
  0000:c0ee  mov    di, 0x8fde    ; "^2Ну весь на понтах."
  0000:c0f1  push   cs
  0000:c0f2  push   di
  0000:c0f3  xor    ax, ax
  0000:c0f5  push   ax
  0000:c0f6  xor    ax, ax
  0000:c0f8  push   ax
  0000:c0f9  xor    ax, ax
  0000:c0fb  push   ax
  0000:c0fc  xor    ax, ax
  0000:c0fe  push   ax
  0000:c0ff  xor    ax, ax
  0000:c101  push   ax
  0000:c102  lcall  U2:0eed:01c2 PrintLn
  0000:c107  add    byte ptr [g38b2], 2
L0c10c:
  0000:c10c  jmp    0xc127
L0c10e:
  0000:c10e  mov    di, 0x8ff3    ; "^6Ты уже купил это."
  0000:c111  push   cs
  0000:c112  push   di
  0000:c113  xor    ax, ax
  0000:c115  push   ax
  0000:c116  xor    ax, ax
  0000:c118  push   ax
  0000:c119  xor    ax, ax
  0000:c11b  push   ax
  0000:c11c  xor    ax, ax
  0000:c11e  push   ax
  0000:c11f  xor    ax, ax
  0000:c121  push   ax
  0000:c122  lcall  U2:0eed:01c2 PrintLn
L0c127:
  0000:c127  jmp    0xc142
L0c129:
  0000:c129  mov    di, 0x9007    ; "^6Утебя есть кожанка круче."
  0000:c12c  push   cs
  0000:c12d  push   di
  0000:c12e  xor    ax, ax
  0000:c130  push   ax
  0000:c131  xor    ax, ax
  0000:c133  push   ax
  0000:c134  xor    ax, ax
  0000:c136  push   ax
  0000:c137  xor    ax, ax
  0000:c139  push   ax
  0000:c13a  xor    ax, ax
  0000:c13c  push   ax
  0000:c13d  lcall  U2:0eed:01c2 PrintLn
L0c142:
  0000:c142  mov    di, 0x3a72
  0000:c145  push   ds
  0000:c146  push   di
  0000:c147  mov    di, 0x9023    ; "7"
  0000:c14a  push   cs
  0000:c14b  push   di
  0000:c14c  lcall  SYS:0f78:0bd8 StrCmp
  0000:c151  je     0xc156
  0000:c153  jmp    0xc1d7
L0c156:
  0000:c156  cmp    byte ptr [g38b7], 0
  0000:c15b  jne    0xc1be
  0000:c15d  mov    al, byte ptr [g0b34]
  0000:c160  xor    ah, ah
  0000:c162  cmp    ax, word ptr [g38c7]
  0000:c166  jle    0xc183
  0000:c168  mov    di, 0x8ef9    ; "^4Не хватает денег"
  0000:c16b  push   cs
  0000:c16c  push   di
  0000:c16d  xor    ax, ax
  0000:c16f  push   ax
  0000:c170  xor    ax, ax
  0000:c172  push   ax
  0000:c173  xor    ax, ax
  0000:c175  push   ax
  0000:c176  xor    ax, ax
  0000:c178  push   ax
  0000:c179  xor    ax, ax
  0000:c17b  push   ax
  0000:c17c  lcall  U2:0eed:01c2 PrintLn
  0000:c181  jmp    0xc1bc
L0c183:
  0000:c183  mov    byte ptr [g38b7], 1
  0000:c188  mov    al, byte ptr [g0b34]
  0000:c18b  xor    ah, ah
  0000:c18d  sub    word ptr [g38c7], ax
  0000:c191  mov    di, 0x9025    ; "^2Чистый гопник."
  0000:c194  push   cs
  0000:c195  push   di
  0000:c196  xor    ax, ax
  0000:c198  push   ax
  0000:c199  xor    ax, ax
  0000:c19b  push   ax
  0000:c19c  xor    ax, ax
  0000:c19e  push   ax
  0000:c19f  xor    ax, ax
  0000:c1a1  push   ax
  0000:c1a2  xor    ax, ax
  0000:c1a4  push   ax
  0000:c1a5  lcall  U2:0eed:01c2 PrintLn
  0000:c1aa  cmp    byte ptr [g38b4], 0
  0000:c1af  je     0xc1b7
  0000:c1b1  inc    byte ptr [g38b2]
  0000:c1b5  jmp    0xc1bc
L0c1b7:
  0000:c1b7  add    byte ptr [g38b2], 2
L0c1bc:
  0000:c1bc  jmp    0xc1d7
L0c1be:
  0000:c1be  mov    di, 0x9036    ; "^6У тебя уже есть этот костюм."
  0000:c1c1  push   cs
  0000:c1c2  push   di
  0000:c1c3  xor    ax, ax
  0000:c1c5  push   ax
  0000:c1c6  xor    ax, ax
  0000:c1c8  push   ax
  0000:c1c9  xor    ax, ax
  0000:c1cb  push   ax
  0000:c1cc  xor    ax, ax
  0000:c1ce  push   ax
  0000:c1cf  xor    ax, ax
  0000:c1d1  push   ax
  0000:c1d2  lcall  U2:0eed:01c2 PrintLn
L0c1d7:
  0000:c1d7  cmp    byte ptr [g3692], 2
  0000:c1dc  ja     0xc1e1
  0000:c1de  jmp    0xc27f
L0c1e1:
  0000:c1e1  mov    di, 0x3a72
  0000:c1e4  push   ds
  0000:c1e5  push   di
  0000:c1e6  mov    di, 0x9055    ; "8"
  0000:c1e9  push   cs
  0000:c1ea  push   di
  0000:c1eb  lcall  SYS:0f78:0bd8 StrCmp
  0000:c1f0  je     0xc1f5
  0000:c1f2  jmp    0xc27f
L0c1f5:
  0000:c1f5  cmp    byte ptr [g38b8], 0
  0000:c1fa  jne    0xc266
  0000:c1fc  mov    al, byte ptr [g0b35]
  0000:c1ff  xor    ah, ah
  0000:c201  cmp    ax, word ptr [g38c7]
  0000:c205  jle    0xc222
  0000:c207  mov    di, 0x8f6d    ; "^4Нету на них денег"
  0000:c20a  push   cs
  0000:c20b  push   di
  0000:c20c  xor    ax, ax
  0000:c20e  push   ax
  0000:c20f  xor    ax, ax
  0000:c211  push   ax
  0000:c212  xor    ax, ax
  0000:c214  push   ax
  0000:c215  xor    ax, ax
  0000:c217  push   ax
  0000:c218  xor    ax, ax
  0000:c21a  push   ax
  0000:c21b  lcall  U2:0eed:01c2 PrintLn
  0000:c220  jmp    0xc264
L0c222:
  0000:c222  mov    byte ptr [g38b8], 1
  0000:c227  mov    al, byte ptr [g0b35]
  0000:c22a  xor    ah, ah
  0000:c22c  sub    word ptr [g38c7], ax
  0000:c230  mov    di, 0x9057    ; "^2Офигенные бутцы."
  0000:c233  push   cs
  0000:c234  push   di
  0000:c235  xor    ax, ax
  0000:c237  push   ax
  0000:c238  xor    ax, ax
  0000:c23a  push   ax
  0000:c23b  xor    ax, ax
  0000:c23d  push   ax
  0000:c23e  xor    ax, ax
  0000:c240  push   ax
  0000:c241  xor    ax, ax
  0000:c243  push   ax
  0000:c244  lcall  U2:0eed:01c2 PrintLn
  0000:c249  cmp    byte ptr [g38b5], 0
  0000:c24e  je     0xc25a
  0000:c250  inc    word ptr [g38a8]
  0000:c254  inc    word ptr [g38aa]
  0000:c258  jmp    0xc264
L0c25a:
  0000:c25a  add    word ptr [g38a8], 2
  0000:c25f  add    word ptr [g38aa], 2
L0c264:
  0000:c264  jmp    0xc27f
L0c266:
  0000:c266  mov    di, 0x8f94    ; "^6У тебя такие уже есть."
  0000:c269  push   cs
  0000:c26a  push   di
  0000:c26b  xor    ax, ax
  0000:c26d  push   ax
  0000:c26e  xor    ax, ax
  0000:c270  push   ax
  0000:c271  xor    ax, ax
  0000:c273  push   ax
  0000:c274  xor    ax, ax
  0000:c276  push   ax
  0000:c277  xor    ax, ax
  0000:c279  push   ax
  0000:c27a  lcall  U2:0eed:01c2 PrintLn
L0c27f:
  0000:c27f  cmp    byte ptr [g3692], 3
  0000:c284  ja     0xc289
  0000:c286  jmp    0xc31f
L0c289:
  0000:c289  mov    di, 0x3a72
  0000:c28c  push   ds
  0000:c28d  push   di
  0000:c28e  mov    di, 0x906a    ; "9"
  0000:c291  push   cs
  0000:c292  push   di
  0000:c293  lcall  SYS:0f78:0bd8 StrCmp
  0000:c298  je     0xc29d
  0000:c29a  jmp    0xc31f
L0c29d:
  0000:c29d  cmp    byte ptr [g38b9], 0
  0000:c2a2  jne    0xc306
  0000:c2a4  mov    al, byte ptr [g0b36]
  0000:c2a7  xor    ah, ah
  0000:c2a9  cmp    ax, word ptr [g38c7]
  0000:c2ad  jle    0xc2ca
  0000:c2af  mov    di, 0x8fc8    ; "^4Не достаточно бабла"
  0000:c2b2  push   cs
  0000:c2b3  push   di
  0000:c2b4  xor    ax, ax
  0000:c2b6  push   ax
  0000:c2b7  xor    ax, ax
  0000:c2b9  push   ax
  0000:c2ba  xor    ax, ax
  0000:c2bc  push   ax
  0000:c2bd  xor    ax, ax
  0000:c2bf  push   ax
  0000:c2c0  xor    ax, ax
  0000:c2c2  push   ax
  0000:c2c3  lcall  U2:0eed:01c2 PrintLn
  0000:c2c8  jmp    0xc304
L0c2ca:
  0000:c2ca  mov    byte ptr [g38b9], 1
  0000:c2cf  mov    al, byte ptr [g0b36]
  0000:c2d2  xor    ah, ah
  0000:c2d4  sub    word ptr [g38c7], ax
  0000:c2d8  mov    di, 0x906c    ; "^2Ну крутой, сдохнуть можно!"
  0000:c2db  push   cs
  0000:c2dc  push   di
  0000:c2dd  xor    ax, ax
  0000:c2df  push   ax
  0000:c2e0  xor    ax, ax
  0000:c2e2  push   ax
  0000:c2e3  xor    ax, ax
  0000:c2e5  push   ax
  0000:c2e6  xor    ax, ax
  0000:c2e8  push   ax
  0000:c2e9  xor    ax, ax
  0000:c2eb  push   ax
  0000:c2ec  lcall  U2:0eed:01c2 PrintLn
  0000:c2f1  cmp    byte ptr [g38b6], 0
  0000:c2f6  je     0xc2ff
  0000:c2f8  add    byte ptr [g38b2], 2
  0000:c2fd  jmp    0xc304
L0c2ff:
  0000:c2ff  add    byte ptr [g38b2], 4
L0c304:
  0000:c304  jmp    0xc31f
L0c306:
  0000:c306  mov    di, 0x8ff3    ; "^6Ты уже купил это."
  0000:c309  push   cs
  0000:c30a  push   di
  0000:c30b  xor    ax, ax
  0000:c30d  push   ax
  0000:c30e  xor    ax, ax
  0000:c310  push   ax
  0000:c311  xor    ax, ax
  0000:c313  push   ax
  0000:c314  xor    ax, ax
  0000:c316  push   ax
  0000:c317  xor    ax, ax
  0000:c319  push   ax
  0000:c31a  lcall  U2:0eed:01c2 PrintLn
L0c31f:
  0000:c31f  mov    di, 0x3a72
  0000:c322  push   ds
  0000:c323  push   di
  0000:c324  mov    di, 0x9089    ; "t"
  0000:c327  push   cs
  0000:c328  push   di
  0000:c329  lcall  SYS:0f78:0bd8 StrCmp
  0000:c32e  je     0xc333
  0000:c330  jmp    0xc46a
L0c333:
  0000:c333  mov    al, byte ptr [g3692]
  0000:c336  xor    ah, ah
  0000:c338  mov    si, ax
  0000:c33a  shl    ax, 1
  0000:c33c  shl    ax, 1
  0000:c33e  add    ax, si
  0000:c340  add    ax, 5
  0000:c343  push   ax
  0000:c344  lcall  SYS:0f78:114b Random
  0000:c349  xor    dx, dx
  0000:c34b  mov    cx, ax
  0000:c34d  mov    bx, dx
  0000:c34f  mov    ax, word ptr [g38a4]
  0000:c352  cdq    
  0000:c353  cmp    dx, bx
  0000:c355  jg     0xc35d
  0000:c357  jl     0xc3cd
  0000:c359  cmp    ax, cx
  0000:c35b  jb     0xc3cd
L0c35d:
  0000:c35d  mov    ax, 0xa
  0000:c360  push   ax
  0000:c361  lcall  SYS:0f78:114b Random
  0000:c366  cmp    ax, 9
  0000:c369  jae    0xc3cd
  0000:c36b  mov    ax, word ptr [g38a4]
  0000:c36e  shl    ax, 1
  0000:c370  push   ax
  0000:c371  lcall  SYS:0f78:114b Random
  0000:c376  inc    ax
  0000:c377  mov    word ptr [g3b74], ax
  0000:c37a  mov    ax, word ptr [g3b74]
  0000:c37d  add    word ptr [g38c7], ax
  0000:c381  mov    di, 0x87c6    ; "^2Опа бабки! # рублей на пиво!"
  0000:c384  push   cs
  0000:c385  push   di
  0000:c386  push   word ptr [g3b74]
  0000:c38a  xor    ax, ax
  0000:c38c  push   ax
  0000:c38d  xor    ax, ax
  0000:c38f  push   ax
  0000:c390  xor    ax, ax
  0000:c392  push   ax
  0000:c393  xor    ax, ax
  0000:c395  push   ax
  0000:c396  lcall  U2:0eed:01c2 PrintLn
  0000:c39b  mov    di, 0x908b    ; "^6Ты получаешь # качков опыта"
  0000:c39e  push   cs
  0000:c39f  push   di
  0000:c3a0  mov    al, byte ptr [g3692]
  0000:c3a3  xor    ah, ah
  0000:c3a5  shl    ax, 1
  0000:c3a7  push   ax
  0000:c3a8  xor    ax, ax
  0000:c3aa  push   ax
  0000:c3ab  xor    ax, ax
  0000:c3ad  push   ax
  0000:c3ae  xor    ax, ax
  0000:c3b0  push   ax
  0000:c3b1  xor    ax, ax
  0000:c3b3  push   ax
  0000:c3b4  lcall  U2:0eed:01c2 PrintLn
  0000:c3b9  mov    al, byte ptr [g3692]
  0000:c3bc  xor    ah, ah
  0000:c3be  shl    ax, 1
  0000:c3c0  add    word ptr [g38ce], ax
  0000:c3c4  mov    al, 0
  0000:c3c6  push   ax
  0000:c3c7  call   0x12526
  0000:c3ca  jmp    0xc46a
L0c3cd:
  0000:c3cd  mov    al, 1
  0000:c3cf  push   ax
  0000:c3d0  call   0x10d14
  0000:c3d3  mov    byte ptr [g3b72], 1
  0000:c3d8  mov    di, 0x90a9    ; "^4Корявый! ты попался!"
  0000:c3db  push   cs
  0000:c3dc  push   di
  0000:c3dd  xor    ax, ax
  0000:c3df  push   ax
  0000:c3e0  xor    ax, ax
  0000:c3e2  push   ax
  0000:c3e3  xor    ax, ax
  0000:c3e5  push   ax
  0000:c3e6  xor    ax, ax
  0000:c3e8  push   ax
  0000:c3e9  xor    ax, ax
  0000:c3eb  push   ax
  0000:c3ec  lcall  U2:0eed:01c2 PrintLn
  0000:c3f1  lea    di, [bp - 0x100]
  0000:c3f5  push   ss
  0000:c3f6  push   di
  0000:c3f7  mov    di, 0x90c0    ; "^6Это "
  0000:c3fa  push   cs
  0000:c3fb  push   di
  0000:c3fc  lcall  SYS:0f78:0ae7 StrLoad
  0000:c401  mov    di, word ptr [g3952]
  0000:c405  mov    cl, 8
  0000:c407  shl    di, cl
  0000:c409  add    di, 0x2e
  0000:c40d  push   ds
  0000:c40e  push   di
  0000:c40f  lcall  SYS:0f78:0b66 StrConcat
  0000:c414  mov    di, 0x90c7    ; " # уровня."
  0000:c417  push   cs
  0000:c418  push   di
  0000:c419  lcall  SYS:0f78:0b66 StrConcat
  0000:c41e  push   word ptr [g395c]
  0000:c422  xor    ax, ax
  0000:c424  push   ax
  0000:c425  xor    ax, ax
  0000:c427  push   ax
  0000:c428  xor    ax, ax
  0000:c42a  push   ax
  0000:c42b  xor    ax, ax
  0000:c42d  push   ax
  0000:c42e  lcall  U2:0eed:01c2 PrintLn
  0000:c433  mov    al, 1
  0000:c435  push   ax
  0000:c436  call   0x13d11
  0000:c439  mov    di, 0x90d2    ; "^6Блин менты запалят сматывайся!."
  0000:c43c  push   cs
  0000:c43d  push   di
  0000:c43e  xor    ax, ax
  0000:c440  push   ax
  0000:c441  xor    ax, ax
  0000:c443  push   ax
  0000:c444  xor    ax, ax
  0000:c446  push   ax
  0000:c447  xor    ax, ax
  0000:c449  push   ax
  0000:c44a  xor    ax, ax
  0000:c44c  push   ax
  0000:c44d  lcall  U2:0eed:01c2 PrintLn
  0000:c452  mov    di, 0x848e    ; "w"
  0000:c455  push   cs
  0000:c456  push   di
  0000:c457  mov    di, 0x3a72
  0000:c45a  push   ds
  0000:c45b  push   di
  0000:c45c  mov    ax, 0xff
  0000:c45f  push   ax
  0000:c460  lcall  SYS:0f78:0b01 StrStore
  0000:c465  mov    byte ptr [g3b76], 5
L0c46a:
  0000:c46a  mov    di, 0x3a72
  0000:c46d  push   ds
  0000:c46e  push   di
  0000:c46f  mov    di, 0x848e    ; "w"
  0000:c472  push   cs
  0000:c473  push   di
  0000:c474  lcall  SYS:0f78:0bd8 StrCmp
  0000:c479  je     0xc47e
  0000:c47b  jmp    0xbd08
L0c47e:
  0000:c47e  jmp    0xc499
L0c480:
  0000:c480  mov    di, 0x90f4    ; "^6На базар пока нельзя там менты бродят, тебя ищут."
  0000:c483  push   cs
  0000:c484  push   di
  0000:c485  xor    ax, ax
  0000:c487  push   ax
  0000:c488  xor    ax, ax
  0000:c48a  push   ax
  0000:c48b  xor    ax, ax
  0000:c48d  push   ax
  0000:c48e  xor    ax, ax
  0000:c490  push   ax
  0000:c491  xor    ax, ax
  0000:c493  push   ax
  0000:c494  lcall  U2:0eed:01c2 PrintLn
L0c499:
  0000:c499  jmp    0xc4b4
L0c49b:
  0000:c49b  mov    di, 0x9128    ; "^6Ты незнаешь, пока ешё, где находтся базар"
  0000:c49e  push   cs
  0000:c49f  push   di
  0000:c4a0  xor    ax, ax
  0000:c4a2  push   ax
  0000:c4a3  xor    ax, ax
  0000:c4a5  push   ax
  0000:c4a6  xor    ax, ax
  0000:c4a8  push   ax
  0000:c4a9  xor    ax, ax
  0000:c4ab  push   ax
  0000:c4ac  xor    ax, ax
  0000:c4ae  push   ax
  0000:c4af  lcall  U2:0eed:01c2 PrintLn
L0c4b4:
  0000:c4b4  mov    di, 0x3972
  0000:c4b7  push   ds
  0000:c4b8  push   di
  0000:c4b9  mov    di, 0x9154    ; "bmar"
  0000:c4bc  push   cs
  0000:c4bd  push   di
  0000:c4be  lcall  SYS:0f78:0bd8 StrCmp
  0000:c4c3  je     0xc4c8
  0000:c4c5  jmp    0xd39c
L0c4c8:
  0000:c4c8  cmp    byte ptr [g3695], 1
  0000:c4cd  je     0xc4d2
  0000:c4cf  jmp    0xd383
L0c4d2:
  0000:c4d2  mov    di, 0x9159    ; "Ты пришел к барыгам напиши  ^6w^7  чтобы уйти."
  0000:c4d5  push   cs
  0000:c4d6  push   di
  0000:c4d7  xor    ax, ax
  0000:c4d9  push   ax
  0000:c4da  xor    ax, ax
  0000:c4dc  push   ax
  0000:c4dd  xor    ax, ax
  0000:c4df  push   ax
  0000:c4e0  xor    ax, ax
  0000:c4e2  push   ax
  0000:c4e3  xor    ax, ax
  0000:c4e5  push   ax
  0000:c4e6  lcall  U2:0eed:01c2 PrintLn
  0000:c4eb  mov    di, 0x9188    ; "Здесь можно толкнуть хлам(^6x^7) и купить кое-что"
  0000:c4ee  push   cs
  0000:c4ef  push   di
  0000:c4f0  xor    ax, ax
  0000:c4f2  push   ax
  0000:c4f3  xor    ax, ax
  0000:c4f5  push   ax
  0000:c4f6  xor    ax, ax
  0000:c4f8  push   ax
  0000:c4f9  xor    ax, ax
  0000:c4fb  push   ax
  0000:c4fc  xor    ax, ax
  0000:c4fe  push   ax
  0000:c4ff  lcall  U2:0eed:01c2 PrintLn
  0000:c504  mov    di, 0x91ba    ; "Ещё ты можешь продать ненужные вещи - ^6wes^7"
  0000:c507  push   cs
  0000:c508  push   di
  0000:c509  xor    ax, ax
  0000:c50b  push   ax
  0000:c50c  xor    ax, ax
  0000:c50e  push   ax
  0000:c50f  xor    ax, ax
  0000:c511  push   ax
  0000:c512  xor    ax, ax
  0000:c514  push   ax
  0000:c515  xor    ax, ax
  0000:c517  push   ax
  0000:c518  lcall  U2:0eed:01c2 PrintLn
  0000:c51d  mov    al, byte ptr [g0b38]
  0000:c520  xor    ah, ah
  0000:c522  cmp    ax, word ptr [g38c7]
  0000:c526  jle    0xc52f
  0000:c528  mov    byte ptr [g3b7a], 0x34
  0000:c52d  jmp    0xc534
L0c52f:
  0000:c52f  mov    byte ptr [g3b7a], 0x30
L0c534:
  0000:c534  lea    di, [bp - 0x200]
  0000:c538  push   ss
  0000:c539  push   di
  0000:c53a  mov    di, 0x8bd2    ; "^61^7 - ^"
  0000:c53d  push   cs
  0000:c53e  push   di
  0000:c53f  lcall  SYS:0f78:0ae7 StrLoad
  0000:c544  lea    di, [bp - 0x100]
  0000:c548  push   ss
  0000:c549  push   di
  0000:c54a  mov    al, byte ptr [g3b7a]
  0000:c54d  push   ax
  0000:c54e  lcall  SYS:0f78:0c03 CharToStr
  0000:c553  lcall  SYS:0f78:0b66 StrConcat
  0000:c558  mov    di, 0x91e8    ; "#^7 руб. Косяк"
  0000:c55b  push   cs
  0000:c55c  push   di
  0000:c55d  lcall  SYS:0f78:0b66 StrConcat
  0000:c562  mov    al, byte ptr [g0b38]
  0000:c565  xor    ah, ah
  0000:c567  push   ax
  0000:c568  xor    ax, ax
  0000:c56a  push   ax
  0000:c56b  xor    ax, ax
  0000:c56d  push   ax
  0000:c56e  xor    ax, ax
  0000:c570  push   ax
  0000:c571  xor    ax, ax
  0000:c573  push   ax
  0000:c574  lcall  U2:0eed:01c2 PrintLn
  0000:c579  mov    al, byte ptr [g0b39]
  0000:c57c  xor    ah, ah
  0000:c57e  cmp    ax, word ptr [g38c7]
  0000:c582  jle    0xc58b
  0000:c584  mov    byte ptr [g3b7a], 0x34
  0000:c589  jmp    0xc590
L0c58b:
  0000:c58b  mov    byte ptr [g3b7a], 0x30
L0c590:
  0000:c590  lea    di, [bp - 0x200]
  0000:c594  push   ss
  0000:c595  push   di
  0000:c596  mov    di, 0x8bf4    ; "^62^7 - ^"
  0000:c599  push   cs
  0000:c59a  push   di
  0000:c59b  lcall  SYS:0f78:0ae7 StrLoad
  0000:c5a0  lea    di, [bp - 0x100]
  0000:c5a4  push   ss
  0000:c5a5  push   di
  0000:c5a6  mov    al, byte ptr [g3b7a]
  0000:c5a9  push   ax
  0000:c5aa  lcall  SYS:0f78:0c03 CharToStr
  0000:c5af  lcall  SYS:0f78:0b66 StrConcat
  0000:c5b4  mov    di, 0x91f7    ; "#^7 руб. Краденый мобильник(Подмога быстрее приходит)"
  0000:c5b7  push   cs
  0000:c5b8  push   di
  0000:c5b9  lcall  SYS:0f78:0b66 StrConcat
  0000:c5be  mov    al, byte ptr [g0b39]
  0000:c5c1  xor    ah, ah
  0000:c5c3  push   ax
  0000:c5c4  xor    ax, ax
  0000:c5c6  push   ax
  0000:c5c7  xor    ax, ax
  0000:c5c9  push   ax
  0000:c5ca  xor    ax, ax
  0000:c5cc  push   ax
  0000:c5cd  xor    ax, ax
  0000:c5cf  push   ax
  0000:c5d0  lcall  U2:0eed:01c2 PrintLn
  0000:c5d5  mov    al, byte ptr [g0b3a]
  0000:c5d8  xor    ah, ah
  0000:c5da  cmp    ax, word ptr [g38c7]
  0000:c5de  jle    0xc5e7
  0000:c5e0  mov    byte ptr [g3b7a], 0x34
  0000:c5e5  jmp    0xc5ec
L0c5e7:
  0000:c5e7  mov    byte ptr [g3b7a], 0x30
L0c5ec:
  0000:c5ec  lea    di, [bp - 0x200]
  0000:c5f0  push   ss
  0000:c5f1  push   di
  0000:c5f2  mov    di, 0x8c11    ; "^63^7 - ^"
  0000:c5f5  push   cs
  0000:c5f6  push   di
  0000:c5f7  lcall  SYS:0f78:0ae7 StrLoad
  0000:c5fc  lea    di, [bp - 0x100]
  0000:c600  push   ss
  0000:c601  push   di
  0000:c602  mov    al, byte ptr [g3b7a]
  0000:c605  push   ax
  0000:c606  lcall  SYS:0f78:0c03 CharToStr
  0000:c60b  lcall  SYS:0f78:0b66 StrConcat
  0000:c610  mov    di, 0x922d    ; "#^7 руб. Офигенный косяк(Очко прокачки)"
  0000:c613  push   cs
  0000:c614  push   di
  0000:c615  lcall  SYS:0f78:0b66 StrConcat
  0000:c61a  mov    al, byte ptr [g0b3a]
  0000:c61d  xor    ah, ah
  0000:c61f  push   ax
  0000:c620  xor    ax, ax
  0000:c622  push   ax
  0000:c623  xor    ax, ax
  0000:c625  push   ax
  0000:c626  xor    ax, ax
  0000:c628  push   ax
  0000:c629  xor    ax, ax
  0000:c62b  push   ax
  0000:c62c  lcall  U2:0eed:01c2 PrintLn
  0000:c631  mov    al, byte ptr [g0b3b]
  0000:c634  xor    ah, ah
  0000:c636  cmp    ax, word ptr [g38c7]
  0000:c63a  jle    0xc643
  0000:c63c  mov    byte ptr [g3b7a], 0x34
  0000:c641  jmp    0xc648
L0c643:
  0000:c643  mov    byte ptr [g3b7a], 0x30
L0c648:
  0000:c648  lea    di, [bp - 0x200]
  0000:c64c  push   ss
  0000:c64d  push   di
  0000:c64e  mov    di, 0x8c4b    ; "^64^7 - ^"
  0000:c651  push   cs
  0000:c652  push   di
  0000:c653  lcall  SYS:0f78:0ae7 StrLoad
  0000:c658  lea    di, [bp - 0x100]
  0000:c65c  push   ss
  0000:c65d  push   di
  0000:c65e  mov    al, byte ptr [g3b7a]
  0000:c661  push   ax
  0000:c662  lcall  SYS:0f78:0c03 CharToStr
  0000:c667  lcall  SYS:0f78:0b66 StrConcat
  0000:c66c  mov    di, 0x9255    ; "#^7 руб. Сделать типа зоновскую наколку(Шансы, что наедут -50%(кроме бандитов, ментов и маньяков))"
  0000:c66f  push   cs
  0000:c670  push   di
  0000:c671  lcall  SYS:0f78:0b66 StrConcat
  0000:c676  mov    al, byte ptr [g0b3b]
  0000:c679  xor    ah, ah
  0000:c67b  push   ax
  0000:c67c  xor    ax, ax
  0000:c67e  push   ax
  0000:c67f  xor    ax, ax
  0000:c681  push   ax
  0000:c682  xor    ax, ax
  0000:c684  push   ax
  0000:c685  xor    ax, ax
  0000:c687  push   ax
  0000:c688  lcall  U2:0eed:01c2 PrintLn
  0000:c68d  cmp    byte ptr [g3692], 1
  0000:c692  jbe    0xc6f1
  0000:c694  mov    al, byte ptr [g0b3c]
  0000:c697  xor    ah, ah
  0000:c699  cmp    ax, word ptr [g38c7]
  0000:c69d  jle    0xc6a6
  0000:c69f  mov    byte ptr [g3b7a], 0x34
  0000:c6a4  jmp    0xc6ab
L0c6a6:
  0000:c6a6  mov    byte ptr [g3b7a], 0x30
L0c6ab:
  0000:c6ab  lea    di, [bp - 0x200]
  0000:c6af  push   ss
  0000:c6b0  push   di
  0000:c6b1  mov    di, 0x8c95    ; "^65^7 - ^"
  0000:c6b4  push   cs
  0000:c6b5  push   di
  0000:c6b6  lcall  SYS:0f78:0ae7 StrLoad
  0000:c6bb  lea    di, [bp - 0x100]
  0000:c6bf  push   ss
  0000:c6c0  push   di
  0000:c6c1  mov    al, byte ptr [g3b7a]
  0000:c6c4  push   ax
  0000:c6c5  lcall  SYS:0f78:0c03 CharToStr
  0000:c6ca  lcall  SYS:0f78:0b66 StrConcat
  0000:c6cf  mov    di, 0x92b8    ; "#^7 руб. Кастет(урон+2)"
  0000:c6d2  push   cs
  0000:c6d3  push   di
  0000:c6d4  lcall  SYS:0f78:0b66 StrConcat
  0000:c6d9  mov    al, byte ptr [g0b3c]
  0000:c6dc  xor    ah, ah
  0000:c6de  push   ax
  0000:c6df  mov    ax, 5
  0000:c6e2  push   ax
  0000:c6e3  xor    ax, ax
  0000:c6e5  push   ax
  0000:c6e6  xor    ax, ax
  0000:c6e8  push   ax
  0000:c6e9  xor    ax, ax
  0000:c6eb  push   ax
  0000:c6ec  lcall  U2:0eed:01c2 PrintLn
L0c6f1:
  0000:c6f1  cmp    byte ptr [g3692], 2
  0000:c6f6  jbe    0xc755
  0000:c6f8  mov    al, byte ptr [g0b3d]
  0000:c6fb  xor    ah, ah
  0000:c6fd  cmp    ax, word ptr [g38c7]
  0000:c701  jle    0xc70a
  0000:c703  mov    byte ptr [g3b7a], 0x34
  0000:c708  jmp    0xc70f
L0c70a:
  0000:c70a  mov    byte ptr [g3b7a], 0x30
L0c70f:
  0000:c70f  lea    di, [bp - 0x200]
  0000:c713  push   ss
  0000:c714  push   di
  0000:c715  mov    di, 0x8cc9    ; "^66^7 - ^"
  0000:c718  push   cs
  0000:c719  push   di
  0000:c71a  lcall  SYS:0f78:0ae7 StrLoad
  0000:c71f  lea    di, [bp - 0x100]
  0000:c723  push   ss
  0000:c724  push   di
  0000:c725  mov    al, byte ptr [g3b7a]
  0000:c728  push   ax
  0000:c729  lcall  SYS:0f78:0c03 CharToStr
  0000:c72e  lcall  SYS:0f78:0b66 StrConcat
  0000:c733  mov    di, 0x92d0    ; "#^7 руб. Дубинка(урон+4), заменяет кастет"
  0000:c736  push   cs
  0000:c737  push   di
  0000:c738  lcall  SYS:0f78:0b66 StrConcat
  0000:c73d  mov    al, byte ptr [g0b3d]
  0000:c740  xor    ah, ah
  0000:c742  push   ax
  0000:c743  mov    ax, 5
  0000:c746  push   ax
  0000:c747  xor    ax, ax
  0000:c749  push   ax
  0000:c74a  xor    ax, ax
  0000:c74c  push   ax
  0000:c74d  xor    ax, ax
  0000:c74f  push   ax
  0000:c750  lcall  U2:0eed:01c2 PrintLn
L0c755:
  0000:c755  cmp    byte ptr [g3692], 3
  0000:c75a  jbe    0xc7ba
  0000:c75c  mov    al, byte ptr [g0b3e]
  0000:c75f  xor    ah, ah
  0000:c761  cmp    ax, word ptr [g38c7]
  0000:c765  jle    0xc76e
  0000:c767  mov    byte ptr [g3b7a], 0x34
  0000:c76c  jmp    0xc773
L0c76e:
  0000:c76e  mov    byte ptr [g3b7a], 0x30
L0c773:
  0000:c773  lea    di, [bp - 0x200]
  0000:c777  push   ss
  0000:c778  push   di
  0000:c779  mov    di, 0x8d19    ; "^67^7 - ^"
  0000:c77c  push   cs
  0000:c77d  push   di
  0000:c77e  lcall  SYS:0f78:0ae7 StrLoad
  0000:c783  lea    di, [bp - 0x100]
  0000:c787  push   ss
  0000:c788  push   di
  0000:c789  mov    al, byte ptr [g3b7a]
  0000:c78c  push   ax
  0000:c78d  lcall  SYS:0f78:0c03 CharToStr
  0000:c792  lcall  SYS:0f78:0b66 StrConcat
  0000:c797  mov    di, 0x92fa    ; "#^7 руб. Самопальный пистолет (Можно стрелять в бандитских районах - ^6f^7 урон(#-#))."
  0000:c79a  push   cs
  0000:c79b  push   di
  0000:c79c  lcall  SYS:0f78:0b66 StrConcat
  0000:c7a1  mov    al, byte ptr [g0b3e]
  0000:c7a4  xor    ah, ah
  0000:c7a6  push   ax
  0000:c7a7  mov    ax, 0x14
  0000:c7aa  push   ax
  0000:c7ab  mov    ax, 0x1e
  0000:c7ae  push   ax
  0000:c7af  xor    ax, ax
  0000:c7b1  push   ax
  0000:c7b2  xor    ax, ax
  0000:c7b4  push   ax
  0000:c7b5  lcall  U2:0eed:01c2 PrintLn
L0c7ba:
  0000:c7ba  cmp    byte ptr [g3692], 3
  0000:c7bf  jbe    0xc81d
  0000:c7c1  mov    al, byte ptr [g0b3f]
  0000:c7c4  xor    ah, ah
  0000:c7c6  cmp    ax, word ptr [g38c7]
  0000:c7ca  jle    0xc7d3
  0000:c7cc  mov    byte ptr [g3b7a], 0x34
  0000:c7d1  jmp    0xc7d8
L0c7d3:
  0000:c7d3  mov    byte ptr [g3b7a], 0x30
L0c7d8:
  0000:c7d8  lea    di, [bp - 0x200]
  0000:c7dc  push   ss
  0000:c7dd  push   di
  0000:c7de  mov    di, 0x8d63    ; "^68^7 - ^"
  0000:c7e1  push   cs
  0000:c7e2  push   di
  0000:c7e3  lcall  SYS:0f78:0ae7 StrLoad
  0000:c7e8  lea    di, [bp - 0x100]
  0000:c7ec  push   ss
  0000:c7ed  push   di
  0000:c7ee  mov    al, byte ptr [g3b7a]
  0000:c7f1  push   ax
  0000:c7f2  lcall  SYS:0f78:0c03 CharToStr
  0000:c7f7  lcall  SYS:0f78:0b66 StrConcat
  0000:c7fc  mov    di, 0x9351    ; "#^7 руб. Патроны - 6."
  0000:c7ff  push   cs
  0000:c800  push   di
  0000:c801  lcall  SYS:0f78:0b66 StrConcat
  0000:c806  mov    al, byte ptr [g0b3f]
  0000:c809  xor    ah, ah
  0000:c80b  push   ax
  0000:c80c  xor    ax, ax
  0000:c80e  push   ax
  0000:c80f  xor    ax, ax
  0000:c811  push   ax
  0000:c812  xor    ax, ax
  0000:c814  push   ax
  0000:c815  xor    ax, ax
  0000:c817  push   ax
  0000:c818  lcall  U2:0eed:01c2 PrintLn
L0c81d:
  0000:c81d  cmp    byte ptr [g3692], 3
  0000:c822  jbe    0xc88e
  0000:c824  cmp    byte ptr [g394d], 0
  0000:c829  je     0xc88e
  0000:c82b  cmp    byte ptr [g3e32], 0x19
  0000:c830  jne    0xc88e
  0000:c832  mov    al, byte ptr [g0b40]
  0000:c835  xor    ah, ah
  0000:c837  cmp    ax, word ptr [g38c7]
  0000:c83b  jle    0xc844
  0000:c83d  mov    byte ptr [g3b7a], 0x34
  0000:c842  jmp    0xc849
L0c844:
  0000:c844  mov    byte ptr [g3b7a], 0x30
L0c849:
  0000:c849  lea    di, [bp - 0x200]
  0000:c84d  push   ss
  0000:c84e  push   di
  0000:c84f  mov    di, 0x8d90    ; "^69^7 - ^"
  0000:c852  push   cs
  0000:c853  push   di
  0000:c854  lcall  SYS:0f78:0ae7 StrLoad
  0000:c859  lea    di, [bp - 0x100]
  0000:c85d  push   ss
  0000:c85e  push   di
  0000:c85f  mov    al, byte ptr [g3b7a]
  0000:c862  push   ax
  0000:c863  lcall  SYS:0f78:0c03 CharToStr
  0000:c868  lcall  SYS:0f78:0b66 StrConcat
  0000:c86d  mov    di, 0x9367    ; "#^7 руб. Глушитель."
  0000:c870  push   cs
  0000:c871  push   di
  0000:c872  lcall  SYS:0f78:0b66 StrConcat
  0000:c877  mov    al, byte ptr [g0b3f]
  0000:c87a  xor    ah, ah
  0000:c87c  push   ax
  0000:c87d  xor    ax, ax
  0000:c87f  push   ax
  0000:c880  xor    ax, ax
  0000:c882  push   ax
  0000:c883  xor    ax, ax
  0000:c885  push   ax
  0000:c886  xor    ax, ax
  0000:c888  push   ax
  0000:c889  lcall  U2:0eed:01c2 PrintLn
L0c88e:
  0000:c88e  mov    di, 0x937b    ; "^0Барыги\"
  0000:c891  push   cs
  0000:c892  push   di
  0000:c893  xor    ax, ax
  0000:c895  push   ax
  0000:c896  xor    ax, ax
  0000:c898  push   ax
  0000:c899  xor    ax, ax
  0000:c89b  push   ax
  0000:c89c  xor    ax, ax
  0000:c89e  push   ax
  0000:c89f  xor    ax, ax
  0000:c8a1  push   ax
  0000:c8a2  lcall  U2:0eed:0000 Print
  0000:c8a7  mov    di, 0x3ecc
  0000:c8aa  push   ds
  0000:c8ab  push   di
  0000:c8ac  mov    di, 0x3a72
  0000:c8af  push   ds
  0000:c8b0  push   di
  0000:c8b1  mov    ax, 0xff
  0000:c8b4  push   ax
  0000:c8b5  lcall  SYS:0f78:06c6 ReadStr
  0000:c8ba  lcall  SYS:0f78:059d ReadLnEnd
  0000:c8bf  lcall  SYS:0f78:0291 IOCheck
  0000:c8c4  mov    di, 0x3a72
  0000:c8c7  push   ds
  0000:c8c8  push   di
  0000:c8c9  lcall  U2:0eed:0216 LowerCase
  0000:c8ce  mov    di, 0x3a72
  0000:c8d1  push   ds
  0000:c8d2  push   di
  0000:c8d3  mov    di, 0x8dca    ; "1"
  0000:c8d6  push   cs
  0000:c8d7  push   di
  0000:c8d8  lcall  SYS:0f78:0bd8 StrCmp
  0000:c8dd  jne    0xc92b
  0000:c8df  mov    al, byte ptr [g0b38]
  0000:c8e2  xor    ah, ah
  0000:c8e4  cmp    ax, word ptr [g38c7]
  0000:c8e8  jle    0xc905
  0000:c8ea  mov    di, 0x9385    ; "^4Чёрт, бабок не хватает."
  0000:c8ed  push   cs
  0000:c8ee  push   di
  0000:c8ef  xor    ax, ax
  0000:c8f1  push   ax
  0000:c8f2  xor    ax, ax
  0000:c8f4  push   ax
  0000:c8f5  xor    ax, ax
  0000:c8f7  push   ax
  0000:c8f8  xor    ax, ax
  0000:c8fa  push   ax
  0000:c8fb  xor    ax, ax
  0000:c8fd  push   ax
  0000:c8fe  lcall  U2:0eed:01c2 PrintLn
  0000:c903  jmp    0xc92b
L0c905:
  0000:c905  mov    al, byte ptr [g0b38]
  0000:c908  xor    ah, ah
  0000:c90a  sub    word ptr [g38c7], ax
  0000:c90e  inc    word ptr [g38c5]
  0000:c912  mov    di, 0x939f    ; "^2Ты купил косяк"
  0000:c915  push   cs
  0000:c916  push   di
  0000:c917  xor    ax, ax
  0000:c919  push   ax
  0000:c91a  xor    ax, ax
  0000:c91c  push   ax
  0000:c91d  xor    ax, ax
  0000:c91f  push   ax
  0000:c920  xor    ax, ax
  0000:c922  push   ax
  0000:c923  xor    ax, ax
  0000:c925  push   ax
  0000:c926  lcall  U2:0eed:01c2 PrintLn
L0c92b:
  0000:c92b  mov    di, 0x3a72
  0000:c92e  push   ds
  0000:c92f  push   di
  0000:c930  mov    di, 0x8e4b    ; "2"
  0000:c933  push   cs
  0000:c934  push   di
  0000:c935  lcall  SYS:0f78:0bd8 StrCmp
  0000:c93a  jne    0xc9ab
  0000:c93c  cmp    byte ptr [g38bb], 0
  0000:c941  jne    0xc992
  0000:c943  mov    al, byte ptr [g0b39]
  0000:c946  xor    ah, ah
  0000:c948  cmp    ax, word ptr [g38c7]
  0000:c94c  jle    0xc969
  0000:c94e  mov    di, 0x93b0    ; "^4Нету денег"
  0000:c951  push   cs
  0000:c952  push   di
  0000:c953  xor    ax, ax
  0000:c955  push   ax
  0000:c956  xor    ax, ax
  0000:c958  push   ax
  0000:c959  xor    ax, ax
  0000:c95b  push   ax
  0000:c95c  xor    ax, ax
  0000:c95e  push   ax
  0000:c95f  xor    ax, ax
  0000:c961  push   ax
  0000:c962  lcall  U2:0eed:01c2 PrintLn
  0000:c967  jmp    0xc990
L0c969:
  0000:c969  mov    byte ptr [g38bb], 1
  0000:c96e  mov    al, byte ptr [g0b39]
  0000:c971  xor    ah, ah
  0000:c973  sub    word ptr [g38c7], ax
  0000:c977  mov    di, 0x93bd    ; "^2Чё ты модный типа да?."
  0000:c97a  push   cs
  0000:c97b  push   di
  0000:c97c  xor    ax, ax
  0000:c97e  push   ax
  0000:c97f  xor    ax, ax
  0000:c981  push   ax
  0000:c982  xor    ax, ax
  0000:c984  push   ax
  0000:c985  xor    ax, ax
  0000:c987  push   ax
  0000:c988  xor    ax, ax
  0000:c98a  push   ax
  0000:c98b  lcall  U2:0eed:01c2 PrintLn
L0c990:
  0000:c990  jmp    0xc9ab
L0c992:
  0000:c992  mov    di, 0x93d6    ; "^6У тебя уже есть мобила."
  0000:c995  push   cs
  0000:c996  push   di
  0000:c997  xor    ax, ax
  0000:c999  push   ax
  0000:c99a  xor    ax, ax
  0000:c99c  push   ax
  0000:c99d  xor    ax, ax
  0000:c99f  push   ax
  0000:c9a0  xor    ax, ax
  0000:c9a2  push   ax
  0000:c9a3  xor    ax, ax
  0000:c9a5  push   ax
  0000:c9a6  lcall  U2:0eed:01c2 PrintLn
L0c9ab:
  0000:c9ab  mov    di, 0x3a72
  0000:c9ae  push   ds
  0000:c9af  push   di
  0000:c9b0  mov    di, 0x8ea5    ; "3"
  0000:c9b3  push   cs
  0000:c9b4  push   di
  0000:c9b5  lcall  SYS:0f78:0bd8 StrCmp
  0000:c9ba  je     0xc9bf
  0000:c9bc  jmp    0xcac7
L0c9bf:
  0000:c9bf  mov    al, byte ptr [g0b3a]
  0000:c9c2  xor    ah, ah
  0000:c9c4  cmp    ax, word ptr [g38c7]
  0000:c9c8  jle    0xc9e6
  0000:c9ca  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:c9cd  push   cs
  0000:c9ce  push   di
  0000:c9cf  xor    ax, ax
  0000:c9d1  push   ax
  0000:c9d2  xor    ax, ax
  0000:c9d4  push   ax
  0000:c9d5  xor    ax, ax
  0000:c9d7  push   ax
  0000:c9d8  xor    ax, ax
  0000:c9da  push   ax
  0000:c9db  xor    ax, ax
  0000:c9dd  push   ax
  0000:c9de  lcall  U2:0eed:01c2 PrintLn
  0000:c9e3  jmp    0xcac7
L0c9e6:
  0000:c9e6  mov    al, byte ptr [g0b3a]
  0000:c9e9  xor    ah, ah
  0000:c9eb  sub    word ptr [g38c7], ax
  0000:c9ef  mov    di, 0x93f0    ; "^2Пошли стероиды!"
  0000:c9f2  push   cs
  0000:c9f3  push   di
  0000:c9f4  xor    ax, ax
  0000:c9f6  push   ax
  0000:c9f7  xor    ax, ax
  0000:c9f9  push   ax
  0000:c9fa  xor    ax, ax
  0000:c9fc  push   ax
  0000:c9fd  xor    ax, ax
  0000:c9ff  push   ax
  0000:ca00  xor    ax, ax
  0000:ca02  push   ax
  0000:ca03  lcall  U2:0eed:01c2 PrintLn
  0000:ca08  mov    ax, 4
  0000:ca0b  push   ax
  0000:ca0c  lcall  SYS:0f78:114b Random
  0000:ca11  cmp    ax, 0
  0000:ca14  jne    0xca53
  0000:ca16  inc    word ptr [g389e]
  0000:ca1a  mov    di, 0x9402    ; "^1Сила +1 "
  0000:ca1d  push   cs
  0000:ca1e  push   di
  0000:ca1f  xor    ax, ax
  0000:ca21  push   ax
  0000:ca22  xor    ax, ax
  0000:ca24  push   ax
  0000:ca25  xor    ax, ax
  0000:ca27  push   ax
  0000:ca28  xor    ax, ax
  0000:ca2a  push   ax
  0000:ca2b  xor    ax, ax
  0000:ca2d  push   ax
  0000:ca2e  lcall  U2:0eed:01c2 PrintLn
  0000:ca33  inc    word ptr [g38aa]
  0000:ca37  mov    ax, word ptr [g389e]
  0000:ca3a  cdq    
  0000:ca3b  mov    cx, 2
  0000:ca3e  idiv   cx
  0000:ca40  xchg   dx, ax
  0000:ca41  or     ax, ax
  0000:ca43  jne    0xca49
  0000:ca45  inc    word ptr [g38a8]
L0ca49:
  0000:ca49  inc    word ptr [g38ae]
  0000:ca4d  inc    word ptr [g38ac]
  0000:ca51  jmp    0xcac7
L0ca53:
  0000:ca53  cmp    ax, 1
  0000:ca56  jne    0xca77
  0000:ca58  inc    word ptr [g38a0]
  0000:ca5c  mov    di, 0x940d    ; "^1Ловкость +1 "
  0000:ca5f  push   cs
  0000:ca60  push   di
  0000:ca61  xor    ax, ax
  0000:ca63  push   ax
  0000:ca64  xor    ax, ax
  0000:ca66  push   ax
  0000:ca67  xor    ax, ax
  0000:ca69  push   ax
  0000:ca6a  xor    ax, ax
  0000:ca6c  push   ax
  0000:ca6d  xor    ax, ax
  0000:ca6f  push   ax
  0000:ca70  lcall  U2:0eed:01c2 PrintLn
  0000:ca75  jmp    0xcac7
L0ca77:
  0000:ca77  cmp    ax, 2
  0000:ca7a  jne    0xcaa5
  0000:ca7c  inc    word ptr [g38a2]
  0000:ca80  mov    di, 0x941c    ; "^1Живучесть +1 "
  0000:ca83  push   cs
  0000:ca84  push   di
  0000:ca85  xor    ax, ax
  0000:ca87  push   ax
  0000:ca88  xor    ax, ax
  0000:ca8a  push   ax
  0000:ca8b  xor    ax, ax
  0000:ca8d  push   ax
  0000:ca8e  xor    ax, ax
  0000:ca90  push   ax
  0000:ca91  xor    ax, ax
  0000:ca93  push   ax
  0000:ca94  lcall  U2:0eed:01c2 PrintLn
  0000:ca99  add    word ptr [g38ae], 5
  0000:ca9e  add    word ptr [g38ac], 5
  0000:caa3  jmp    0xcac7
L0caa5:
  0000:caa5  cmp    ax, 3
  0000:caa8  jne    0xcac7
  0000:caaa  inc    word ptr [g38a4]
  0000:caae  mov    di, 0x942c    ; "^1Удача +1 "
  0000:cab1  push   cs
  0000:cab2  push   di
  0000:cab3  xor    ax, ax
  0000:cab5  push   ax
  0000:cab6  xor    ax, ax
  0000:cab8  push   ax
  0000:cab9  xor    ax, ax
  0000:cabb  push   ax
  0000:cabc  xor    ax, ax
  0000:cabe  push   ax
  0000:cabf  xor    ax, ax
  0000:cac1  push   ax
  0000:cac2  lcall  U2:0eed:01c2 PrintLn
L0cac7:
  0000:cac7  mov    di, 0x3a72
  0000:caca  push   ds
  0000:cacb  push   di
  0000:cacc  mov    di, 0x8ef7    ; "4"
  0000:cacf  push   cs
  0000:cad0  push   di
  0000:cad1  lcall  SYS:0f78:0bd8 StrCmp
  0000:cad6  jne    0xcb47
  0000:cad8  cmp    byte ptr [g38bc], 0
  0000:cadd  jne    0xcb2e
  0000:cadf  mov    al, byte ptr [g0b3b]
  0000:cae2  xor    ah, ah
  0000:cae4  cmp    ax, word ptr [g38c7]
  0000:cae8  jle    0xcb05
  0000:caea  mov    di, 0x93b0    ; "^4Нету денег"
  0000:caed  push   cs
  0000:caee  push   di
  0000:caef  xor    ax, ax
  0000:caf1  push   ax
  0000:caf2  xor    ax, ax
  0000:caf4  push   ax
  0000:caf5  xor    ax, ax
  0000:caf7  push   ax
  0000:caf8  xor    ax, ax
  0000:cafa  push   ax
  0000:cafb  xor    ax, ax
  0000:cafd  push   ax
  0000:cafe  lcall  U2:0eed:01c2 PrintLn
  0000:cb03  jmp    0xcb2c
L0cb05:
  0000:cb05  mov    byte ptr [g38bc], 1
  0000:cb0a  mov    al, byte ptr [g0b3b]
  0000:cb0d  xor    ah, ah
  0000:cb0f  sub    word ptr [g38c7], ax
  0000:cb13  mov    di, 0x9438    ; "^2Чистый зек."
  0000:cb16  push   cs
  0000:cb17  push   di
  0000:cb18  xor    ax, ax
  0000:cb1a  push   ax
  0000:cb1b  xor    ax, ax
  0000:cb1d  push   ax
  0000:cb1e  xor    ax, ax
  0000:cb20  push   ax
  0000:cb21  xor    ax, ax
  0000:cb23  push   ax
  0000:cb24  xor    ax, ax
  0000:cb26  push   ax
  0000:cb27  lcall  U2:0eed:01c2 PrintLn
L0cb2c:
  0000:cb2c  jmp    0xcb47
L0cb2e:
  0000:cb2e  mov    di, 0x9446    ; "^6Сделать, конечно, можно но толку не будет."
  0000:cb31  push   cs
  0000:cb32  push   di
  0000:cb33  xor    ax, ax
  0000:cb35  push   ax
  0000:cb36  xor    ax, ax
  0000:cb38  push   ax
  0000:cb39  xor    ax, ax
  0000:cb3b  push   ax
  0000:cb3c  xor    ax, ax
  0000:cb3e  push   ax
  0000:cb3f  xor    ax, ax
  0000:cb41  push   ax
  0000:cb42  lcall  U2:0eed:01c2 PrintLn
L0cb47:
  0000:cb47  mov    di, 0x3a72
  0000:cb4a  push   ds
  0000:cb4b  push   di
  0000:cb4c  mov    di, 0x8f6b    ; "5"
  0000:cb4f  push   cs
  0000:cb50  push   di
  0000:cb51  lcall  SYS:0f78:0bd8 StrCmp
  0000:cb56  je     0xcb5b
  0000:cb58  jmp    0xcc04
L0cb5b:
  0000:cb5b  cmp    byte ptr [g394b], 0
  0000:cb60  je     0xcb70
  0000:cb62  cmp    byte ptr [g38c2], 0
  0000:cb67  je     0xcb70
  0000:cb69  cmp    byte ptr [g394c], 0
  0000:cb6e  jne    0xcbeb
L0cb70:
  0000:cb70  cmp    byte ptr [g38ba], 0
  0000:cb75  jne    0xcbd0
  0000:cb77  mov    al, byte ptr [g0b3c]
  0000:cb7a  xor    ah, ah
  0000:cb7c  cmp    ax, word ptr [g38c7]
  0000:cb80  jle    0xcb9d
  0000:cb82  mov    di, 0x9473    ; "^4Не хватает деньжат"
  0000:cb85  push   cs
  0000:cb86  push   di
  0000:cb87  xor    ax, ax
  0000:cb89  push   ax
  0000:cb8a  xor    ax, ax
  0000:cb8c  push   ax
  0000:cb8d  xor    ax, ax
  0000:cb8f  push   ax
  0000:cb90  xor    ax, ax
  0000:cb92  push   ax
  0000:cb93  xor    ax, ax
  0000:cb95  push   ax
  0000:cb96  lcall  U2:0eed:01c2 PrintLn
  0000:cb9b  jmp    0xcbce
L0cb9d:
  0000:cb9d  mov    byte ptr [g38ba], 1
  0000:cba2  mov    al, byte ptr [g0b3c]
  0000:cba5  xor    ah, ah
  0000:cba7  sub    word ptr [g38c7], ax
  0000:cbab  add    word ptr [g38a8], 2
  0000:cbb0  add    word ptr [g38aa], 2
  0000:cbb5  mov    di, 0x9488    ; "^2Ты купил кастет смотри чтоб менты с ним не запалили."
  0000:cbb8  push   cs
  0000:cbb9  push   di
  0000:cbba  xor    ax, ax
  0000:cbbc  push   ax
  0000:cbbd  xor    ax, ax
  0000:cbbf  push   ax
  0000:cbc0  xor    ax, ax
  0000:cbc2  push   ax
  0000:cbc3  xor    ax, ax
  0000:cbc5  push   ax
  0000:cbc6  xor    ax, ax
  0000:cbc8  push   ax
  0000:cbc9  lcall  U2:0eed:01c2 PrintLn
L0cbce:
  0000:cbce  jmp    0xcbe9
L0cbd0:
  0000:cbd0  mov    di, 0x94bf    ; "^6У тебя есть эта железка."
  0000:cbd3  push   cs
  0000:cbd4  push   di
  0000:cbd5  xor    ax, ax
  0000:cbd7  push   ax
  0000:cbd8  xor    ax, ax
  0000:cbda  push   ax
  0000:cbdb  xor    ax, ax
  0000:cbdd  push   ax
  0000:cbde  xor    ax, ax
  0000:cbe0  push   ax
  0000:cbe1  xor    ax, ax
  0000:cbe3  push   ax
  0000:cbe4  lcall  U2:0eed:01c2 PrintLn
L0cbe9:
  0000:cbe9  jmp    0xcc04
L0cbeb:
  0000:cbeb  mov    di, 0x94da    ; "^6Нафиг тебе он нужен, когда есть более мощное оружие."
  0000:cbee  push   cs
  0000:cbef  push   di
  0000:cbf0  xor    ax, ax
  0000:cbf2  push   ax
  0000:cbf3  xor    ax, ax
  0000:cbf5  push   ax
  0000:cbf6  xor    ax, ax
  0000:cbf8  push   ax
  0000:cbf9  xor    ax, ax
  0000:cbfb  push   ax
  0000:cbfc  xor    ax, ax
  0000:cbfe  push   ax
  0000:cbff  lcall  U2:0eed:01c2 PrintLn
L0cc04:
  0000:cc04  mov    di, 0x3a72
  0000:cc07  push   ds
  0000:cc08  push   di
  0000:cc09  mov    di, 0x8fc6    ; "6"
  0000:cc0c  push   cs
  0000:cc0d  push   di
  0000:cc0e  lcall  SYS:0f78:0bd8 StrCmp
  0000:cc13  je     0xcc18
  0000:cc15  jmp    0xccc4
L0cc18:
  0000:cc18  cmp    byte ptr [g38c2], 0
  0000:cc1d  je     0xcc29
  0000:cc1f  cmp    byte ptr [g394c], 0
  0000:cc24  je     0xcc29
  0000:cc26  jmp    0xccab
L0cc29:
  0000:cc29  cmp    byte ptr [g394b], 0
  0000:cc2e  jne    0xcc90
  0000:cc30  mov    al, byte ptr [g0b3d]
  0000:cc33  xor    ah, ah
  0000:cc35  cmp    ax, word ptr [g38c7]
  0000:cc39  jle    0xcc56
  0000:cc3b  mov    di, 0x9511    ; "^4Не хватает на дубинку деньжат"
  0000:cc3e  push   cs
  0000:cc3f  push   di
  0000:cc40  xor    ax, ax
  0000:cc42  push   ax
  0000:cc43  xor    ax, ax
  0000:cc45  push   ax
  0000:cc46  xor    ax, ax
  0000:cc48  push   ax
  0000:cc49  xor    ax, ax
  0000:cc4b  push   ax
  0000:cc4c  xor    ax, ax
  0000:cc4e  push   ax
  0000:cc4f  lcall  U2:0eed:01c2 PrintLn
  0000:cc54  jmp    0xcc8e
L0cc56:
  0000:cc56  mov    byte ptr [g394b], 1
  0000:cc5b  mov    al, byte ptr [g0b3d]
  0000:cc5e  xor    ah, ah
  0000:cc60  sub    word ptr [g38c7], ax
  0000:cc64  cmp    byte ptr [g38ba], 0
  0000:cc69  je     0xcc75
  0000:cc6b  add    word ptr [g38a8], 2
  0000:cc70  add    word ptr [g38aa], 2
L0cc75:
  0000:cc75  mov    di, 0x9531    ; "^2Ты купил дубинку - похоже задумал чё-то нехорошее."
  0000:cc78  push   cs
  0000:cc79  push   di
  0000:cc7a  xor    ax, ax
  0000:cc7c  push   ax
  0000:cc7d  xor    ax, ax
  0000:cc7f  push   ax
  0000:cc80  xor    ax, ax
  0000:cc82  push   ax
  0000:cc83  xor    ax, ax
  0000:cc85  push   ax
  0000:cc86  xor    ax, ax
  0000:cc88  push   ax
  0000:cc89  lcall  U2:0eed:01c2 PrintLn
L0cc8e:
  0000:cc8e  jmp    0xcca9
L0cc90:
  0000:cc90  mov    di, 0x9566    ; "^6У тебя есть дубина."
  0000:cc93  push   cs
  0000:cc94  push   di
  0000:cc95  xor    ax, ax
  0000:cc97  push   ax
  0000:cc98  xor    ax, ax
  0000:cc9a  push   ax
  0000:cc9b  xor    ax, ax
  0000:cc9d  push   ax
  0000:cc9e  xor    ax, ax
  0000:cca0  push   ax
  0000:cca1  xor    ax, ax
  0000:cca3  push   ax
  0000:cca4  lcall  U2:0eed:01c2 PrintLn
L0cca9:
  0000:cca9  jmp    0xccc4
L0ccab:
  0000:ccab  mov    di, 0x957c    ; "^6Да нафиг она нужна, когда есть более мощное оружие."
  0000:ccae  push   cs
  0000:ccaf  push   di
  0000:ccb0  xor    ax, ax
  0000:ccb2  push   ax
  0000:ccb3  xor    ax, ax
  0000:ccb5  push   ax
  0000:ccb6  xor    ax, ax
  0000:ccb8  push   ax
  0000:ccb9  xor    ax, ax
  0000:ccbb  push   ax
  0000:ccbc  xor    ax, ax
  0000:ccbe  push   ax
  0000:ccbf  lcall  U2:0eed:01c2 PrintLn
L0ccc4:
  0000:ccc4  mov    di, 0x3a72
  0000:ccc7  push   ds
  0000:ccc8  push   di
  0000:ccc9  mov    di, 0x9023    ; "7"
  0000:cccc  push   cs
  0000:cccd  push   di
  0000:ccce  lcall  SYS:0f78:0bd8 StrCmp
  0000:ccd3  je     0xccd8
  0000:ccd5  jmp    0xcd65
L0ccd8:
  0000:ccd8  cmp    byte ptr [g394d], 0
  0000:ccdd  jne    0xcd4c
  0000:ccdf  mov    al, byte ptr [g0b3e]
  0000:cce2  xor    ah, ah
  0000:cce4  cmp    ax, word ptr [g38c7]
  0000:cce8  jle    0xcd05
  0000:ccea  mov    di, 0x95b2    ; "^4Дорогая штука!"
  0000:cced  push   cs
  0000:ccee  push   di
  0000:ccef  xor    ax, ax
  0000:ccf1  push   ax
  0000:ccf2  xor    ax, ax
  0000:ccf4  push   ax
  0000:ccf5  xor    ax, ax
  0000:ccf7  push   ax
  0000:ccf8  xor    ax, ax
  0000:ccfa  push   ax
  0000:ccfb  xor    ax, ax
  0000:ccfd  push   ax
  0000:ccfe  lcall  U2:0eed:01c2 PrintLn
  0000:cd03  jmp    0xcd4a
L0cd05:
  0000:cd05  mov    byte ptr [g394d], 1
  0000:cd0a  add    word ptr [g394f], 3
  0000:cd0f  mov    al, byte ptr [g0b3e]
  0000:cd12  xor    ah, ah
  0000:cd14  sub    word ptr [g38c7], ax
  0000:cd18  mov    di, 0x95c3    ; "^2Спасайся кто может!!!"
  0000:cd1b  push   cs
  0000:cd1c  push   di
  0000:cd1d  xor    ax, ax
  0000:cd1f  push   ax
  0000:cd20  xor    ax, ax
  0000:cd22  push   ax
  0000:cd23  xor    ax, ax
  0000:cd25  push   ax
  0000:cd26  xor    ax, ax
  0000:cd28  push   ax
  0000:cd29  xor    ax, ax
  0000:cd2b  push   ax
  0000:cd2c  lcall  U2:0eed:01c2 PrintLn
  0000:cd31  mov    di, 0x95db    ; "^0Только помни стреляй в бандитских районах - там менты не накроют"
  0000:cd34  push   cs
  0000:cd35  push   di
  0000:cd36  xor    ax, ax
  0000:cd38  push   ax
  0000:cd39  xor    ax, ax
  0000:cd3b  push   ax
  0000:cd3c  xor    ax, ax
  0000:cd3e  push   ax
  0000:cd3f  xor    ax, ax
  0000:cd41  push   ax
  0000:cd42  xor    ax, ax
  0000:cd44  push   ax
  0000:cd45  lcall  U2:0eed:01c2 PrintLn
L0cd4a:
  0000:cd4a  jmp    0xcd65
L0cd4c:
  0000:cd4c  mov    di, 0x961e    ; "^6Ну.. ты.. ВАЩЕ ОФИГЕЛ!"
  0000:cd4f  push   cs
  0000:cd50  push   di
  0000:cd51  xor    ax, ax
  0000:cd53  push   ax
  0000:cd54  xor    ax, ax
  0000:cd56  push   ax
  0000:cd57  xor    ax, ax
  0000:cd59  push   ax
  0000:cd5a  xor    ax, ax
  0000:cd5c  push   ax
  0000:cd5d  xor    ax, ax
  0000:cd5f  push   ax
  0000:cd60  lcall  U2:0eed:01c2 PrintLn
L0cd65:
  0000:cd65  mov    di, 0x3a72
  0000:cd68  push   ds
  0000:cd69  push   di
  0000:cd6a  mov    di, 0x9055    ; "8"
  0000:cd6d  push   cs
  0000:cd6e  push   di
  0000:cd6f  lcall  SYS:0f78:0bd8 StrCmp
  0000:cd74  jne    0xcde5
  0000:cd76  cmp    byte ptr [g394d], 0
  0000:cd7b  je     0xcdcc
  0000:cd7d  mov    al, byte ptr [g0b3f]
  0000:cd80  xor    ah, ah
  0000:cd82  cmp    ax, word ptr [g38c7]
  0000:cd86  jle    0xcda3
  0000:cd88  mov    di, 0x9637    ; "^4Нехватка денег."
  0000:cd8b  push   cs
  0000:cd8c  push   di
  0000:cd8d  xor    ax, ax
  0000:cd8f  push   ax
  0000:cd90  xor    ax, ax
  0000:cd92  push   ax
  0000:cd93  xor    ax, ax
  0000:cd95  push   ax
  0000:cd96  xor    ax, ax
  0000:cd98  push   ax
  0000:cd99  xor    ax, ax
  0000:cd9b  push   ax
  0000:cd9c  lcall  U2:0eed:01c2 PrintLn
  0000:cda1  jmp    0xcdca
L0cda3:
  0000:cda3  add    word ptr [g394f], 5
  0000:cda8  mov    al, byte ptr [g0b3f]
  0000:cdab  xor    ah, ah
  0000:cdad  sub    word ptr [g38c7], ax
  0000:cdb1  mov    di, 0x9649    ; "^2Получи пять пуль.. на руки"
  0000:cdb4  push   cs
  0000:cdb5  push   di
  0000:cdb6  xor    ax, ax
  0000:cdb8  push   ax
  0000:cdb9  xor    ax, ax
  0000:cdbb  push   ax
  0000:cdbc  xor    ax, ax
  0000:cdbe  push   ax
  0000:cdbf  xor    ax, ax
  0000:cdc1  push   ax
  0000:cdc2  xor    ax, ax
  0000:cdc4  push   ax
  0000:cdc5  lcall  U2:0eed:01c2 PrintLn
L0cdca:
  0000:cdca  jmp    0xcde5
L0cdcc:
  0000:cdcc  mov    di, 0x9666    ; "^6Нету пушки. Сначала купи пистолет"
  0000:cdcf  push   cs
  0000:cdd0  push   di
  0000:cdd1  xor    ax, ax
  0000:cdd3  push   ax
  0000:cdd4  xor    ax, ax
  0000:cdd6  push   ax
  0000:cdd7  xor    ax, ax
  0000:cdd9  push   ax
  0000:cdda  xor    ax, ax
  0000:cddc  push   ax
  0000:cddd  xor    ax, ax
  0000:cddf  push   ax
  0000:cde0  lcall  U2:0eed:01c2 PrintLn
L0cde5:
  0000:cde5  mov    di, 0x3a72
  0000:cde8  push   ds
  0000:cde9  push   di
  0000:cdea  mov    di, 0x906a    ; "9"
  0000:cded  push   cs
  0000:cdee  push   di
  0000:cdef  lcall  SYS:0f78:0bd8 StrCmp
  0000:cdf4  je     0xcdf9
  0000:cdf6  jmp    0xce76
L0cdf9:
  0000:cdf9  cmp    byte ptr [g394d], 0
  0000:cdfe  je     0xce76
  0000:ce00  cmp    byte ptr [g3e32], 0x19
  0000:ce05  jne    0xce76
  0000:ce07  cmp    byte ptr [g394e], 0
  0000:ce0c  jne    0xce5d
  0000:ce0e  mov    al, byte ptr [g0b40]
  0000:ce11  xor    ah, ah
  0000:ce13  cmp    ax, word ptr [g38c7]
  0000:ce17  jle    0xce34
  0000:ce19  mov    di, 0x968a    ; "^4Подкопи бабла."
  0000:ce1c  push   cs
  0000:ce1d  push   di
  0000:ce1e  xor    ax, ax
  0000:ce20  push   ax
  0000:ce21  xor    ax, ax
  0000:ce23  push   ax
  0000:ce24  xor    ax, ax
  0000:ce26  push   ax
  0000:ce27  xor    ax, ax
  0000:ce29  push   ax
  0000:ce2a  xor    ax, ax
  0000:ce2c  push   ax
  0000:ce2d  lcall  U2:0eed:01c2 PrintLn
  0000:ce32  jmp    0xce5b
L0ce34:
  0000:ce34  mov    byte ptr [g394e], 1
  0000:ce39  mov    al, byte ptr [g0b40]
  0000:ce3c  xor    ah, ah
  0000:ce3e  sub    word ptr [g38c7], ax
  0000:ce42  mov    di, 0x969b    ; "^2Теперь стреляй где хочешь!"
  0000:ce45  push   cs
  0000:ce46  push   di
  0000:ce47  xor    ax, ax
  0000:ce49  push   ax
  0000:ce4a  xor    ax, ax
  0000:ce4c  push   ax
  0000:ce4d  xor    ax, ax
  0000:ce4f  push   ax
  0000:ce50  xor    ax, ax
  0000:ce52  push   ax
  0000:ce53  xor    ax, ax
  0000:ce55  push   ax
  0000:ce56  lcall  U2:0eed:01c2 PrintLn
L0ce5b:
  0000:ce5b  jmp    0xce76
L0ce5d:
  0000:ce5d  mov    di, 0x96b8    ; "^6Да купил уже, купил"
  0000:ce60  push   cs
  0000:ce61  push   di
  0000:ce62  xor    ax, ax
  0000:ce64  push   ax
  0000:ce65  xor    ax, ax
  0000:ce67  push   ax
  0000:ce68  xor    ax, ax
  0000:ce6a  push   ax
  0000:ce6b  xor    ax, ax
  0000:ce6d  push   ax
  0000:ce6e  xor    ax, ax
  0000:ce70  push   ax
  0000:ce71  lcall  U2:0eed:01c2 PrintLn
L0ce76:
  0000:ce76  mov    di, 0x3a72
  0000:ce79  push   ds
  0000:ce7a  push   di
  0000:ce7b  mov    di, 0x96ce    ; "x"
  0000:ce7e  push   cs
  0000:ce7f  push   di
  0000:ce80  lcall  SYS:0f78:0bd8 StrCmp
  0000:ce85  jne    0xcece
  0000:ce87  cmp    word ptr [g38c9], 0
  0000:ce8c  jle    0xceb5
  0000:ce8e  mov    ax, word ptr [g38c9]
  0000:ce91  add    word ptr [g38c7], ax
  0000:ce95  xor    ax, ax
  0000:ce97  mov    word ptr [g38c9], ax
  0000:ce9a  mov    di, 0x96d0    ; "^6Барыги дали тебе денег за хлам."
  0000:ce9d  push   cs
  0000:ce9e  push   di
  0000:ce9f  xor    ax, ax
  0000:cea1  push   ax
  0000:cea2  xor    ax, ax
  0000:cea4  push   ax
  0000:cea5  xor    ax, ax
  0000:cea7  push   ax
  0000:cea8  xor    ax, ax
  0000:ceaa  push   ax
  0000:ceab  xor    ax, ax
  0000:cead  push   ax
  0000:ceae  lcall  U2:0eed:01c2 PrintLn
  0000:ceb3  jmp    0xcece
L0ceb5:
  0000:ceb5  mov    di, 0x96f2    ; "^4Тебе нечего спихнуть."
  0000:ceb8  push   cs
  0000:ceb9  push   di
  0000:ceba  xor    ax, ax
  0000:cebc  push   ax
  0000:cebd  xor    ax, ax
  0000:cebf  push   ax
  0000:cec0  xor    ax, ax
  0000:cec2  push   ax
  0000:cec3  xor    ax, ax
  0000:cec5  push   ax
  0000:cec6  xor    ax, ax
  0000:cec8  push   ax
  0000:cec9  lcall  U2:0eed:01c2 PrintLn
L0cece:
  0000:cece  mov    di, 0x3a72
  0000:ced1  push   ds
  0000:ced2  push   di
  0000:ced3  mov    di, 0x970a    ; "wes"
  0000:ced6  push   cs
  0000:ced7  push   di
  0000:ced8  lcall  SYS:0f78:0bd8 StrCmp
  0000:cedd  je     0xcee2
  0000:cedf  jmp    0xd36d
L0cee2:
  0000:cee2  mov    byte ptr [g3e33], 0xff
  0000:cee7  cmp    byte ptr [g38b4], 0
  0000:ceec  jne    0xcef1
  0000:ceee  jmp    0xcf9c
L0cef1:
  0000:cef1  cmp    byte ptr [g38b7], 0
  0000:cef6  jne    0xcefb
  0000:cef8  jmp    0xcf9c
L0cefb:
  0000:cefb  mov    di, 0x970e    ; "^2У тебя есть ненужный костюм хочешь продать?"
  0000:cefe  push   cs
  0000:ceff  push   di
  0000:cf00  xor    ax, ax
  0000:cf02  push   ax
  0000:cf03  xor    ax, ax
  0000:cf05  push   ax
  0000:cf06  xor    ax, ax
  0000:cf08  push   ax
  0000:cf09  xor    ax, ax
  0000:cf0b  push   ax
  0000:cf0c  xor    ax, ax
  0000:cf0e  push   ax
  0000:cf0f  lcall  U2:0eed:01c2 PrintLn
  0000:cf14  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:cf17  push   cs
  0000:cf18  push   di
  0000:cf19  xor    ax, ax
  0000:cf1b  push   ax
  0000:cf1c  xor    ax, ax
  0000:cf1e  push   ax
  0000:cf1f  xor    ax, ax
  0000:cf21  push   ax
  0000:cf22  xor    ax, ax
  0000:cf24  push   ax
  0000:cf25  xor    ax, ax
  0000:cf27  push   ax
  0000:cf28  lcall  U2:0eed:0000 Print
  0000:cf2d  mov    di, 0x3ecc
  0000:cf30  push   ds
  0000:cf31  push   di
  0000:cf32  mov    di, 0x3a72
  0000:cf35  push   ds
  0000:cf36  push   di
  0000:cf37  mov    ax, 0xff
  0000:cf3a  push   ax
  0000:cf3b  lcall  SYS:0f78:06c6 ReadStr
  0000:cf40  lcall  SYS:0f78:059d ReadLnEnd
  0000:cf45  lcall  SYS:0f78:0291 IOCheck
  0000:cf4a  mov    di, 0x3a72
  0000:cf4d  push   ds
  0000:cf4e  push   di
  0000:cf4f  lcall  U2:0eed:0216 LowerCase
  0000:cf54  mov    ax, 5
  0000:cf57  push   ax
  0000:cf58  lcall  SYS:0f78:114b Random
  0000:cf5d  add    ax, 8
  0000:cf60  mov    byte ptr [g3e33], al
  0000:cf63  mov    di, 0x3a72
  0000:cf66  push   ds
  0000:cf67  push   di
  0000:cf68  mov    di, 0x8323    ; "y"
  0000:cf6b  push   cs
  0000:cf6c  push   di
  0000:cf6d  lcall  SYS:0f78:0bd8 StrCmp
  0000:cf72  jne    0xcf9c
  0000:cf74  mov    byte ptr [g38b4], 0
  0000:cf79  mov    al, byte ptr [g3e33]
  0000:cf7c  cwde   
  0000:cf7d  add    word ptr [g38c7], ax
  0000:cf81  mov    di, 0x974c    ; "^2Ты продал костюм за #."
  0000:cf84  push   cs
  0000:cf85  push   di
  0000:cf86  mov    al, byte ptr [g3e33]
  0000:cf89  cwde   
  0000:cf8a  push   ax
  0000:cf8b  xor    ax, ax
  0000:cf8d  push   ax
  0000:cf8e  xor    ax, ax
  0000:cf90  push   ax
  0000:cf91  xor    ax, ax
  0000:cf93  push   ax
  0000:cf94  xor    ax, ax
  0000:cf96  push   ax
  0000:cf97  lcall  U2:0eed:01c2 PrintLn
L0cf9c:
  0000:cf9c  cmp    byte ptr [g38b5], 0
  0000:cfa1  jne    0xcfa6
  0000:cfa3  jmp    0xd051
L0cfa6:
  0000:cfa6  cmp    byte ptr [g38b8], 0
  0000:cfab  jne    0xcfb0
  0000:cfad  jmp    0xd051
L0cfb0:
  0000:cfb0  mov    di, 0x9765    ; "^2У тебя есть ненужные кроссовки хочешь продать?"
  0000:cfb3  push   cs
  0000:cfb4  push   di
  0000:cfb5  xor    ax, ax
  0000:cfb7  push   ax
  0000:cfb8  xor    ax, ax
  0000:cfba  push   ax
  0000:cfbb  xor    ax, ax
  0000:cfbd  push   ax
  0000:cfbe  xor    ax, ax
  0000:cfc0  push   ax
  0000:cfc1  xor    ax, ax
  0000:cfc3  push   ax
  0000:cfc4  lcall  U2:0eed:01c2 PrintLn
  0000:cfc9  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:cfcc  push   cs
  0000:cfcd  push   di
  0000:cfce  xor    ax, ax
  0000:cfd0  push   ax
  0000:cfd1  xor    ax, ax
  0000:cfd3  push   ax
  0000:cfd4  xor    ax, ax
  0000:cfd6  push   ax
  0000:cfd7  xor    ax, ax
  0000:cfd9  push   ax
  0000:cfda  xor    ax, ax
  0000:cfdc  push   ax
  0000:cfdd  lcall  U2:0eed:0000 Print
  0000:cfe2  mov    di, 0x3ecc
  0000:cfe5  push   ds
  0000:cfe6  push   di
  0000:cfe7  mov    di, 0x3a72
  0000:cfea  push   ds
  0000:cfeb  push   di
  0000:cfec  mov    ax, 0xff
  0000:cfef  push   ax
  0000:cff0  lcall  SYS:0f78:06c6 ReadStr
  0000:cff5  lcall  SYS:0f78:059d ReadLnEnd
  0000:cffa  lcall  SYS:0f78:0291 IOCheck
  0000:cfff  mov    di, 0x3a72
  0000:d002  push   ds
  0000:d003  push   di
  0000:d004  lcall  U2:0eed:0216 LowerCase
  0000:d009  mov    ax, 5
  0000:d00c  push   ax
  0000:d00d  lcall  SYS:0f78:114b Random
  0000:d012  add    ax, 8
  0000:d015  mov    byte ptr [g3e33], al
  0000:d018  mov    di, 0x3a72
  0000:d01b  push   ds
  0000:d01c  push   di
  0000:d01d  mov    di, 0x8323    ; "y"
  0000:d020  push   cs
  0000:d021  push   di
  0000:d022  lcall  SYS:0f78:0bd8 StrCmp
  0000:d027  jne    0xd051
  0000:d029  mov    byte ptr [g38b5], 0
  0000:d02e  mov    al, byte ptr [g3e33]
  0000:d031  cwde   
  0000:d032  add    word ptr [g38c7], ax
  0000:d036  mov    di, 0x9796    ; "^2Ты продал кроссовки за #."
  0000:d039  push   cs
  0000:d03a  push   di
  0000:d03b  mov    al, byte ptr [g3e33]
  0000:d03e  cwde   
  0000:d03f  push   ax
  0000:d040  xor    ax, ax
  0000:d042  push   ax
  0000:d043  xor    ax, ax
  0000:d045  push   ax
  0000:d046  xor    ax, ax
  0000:d048  push   ax
  0000:d049  xor    ax, ax
  0000:d04b  push   ax
  0000:d04c  lcall  U2:0eed:01c2 PrintLn
L0d051:
  0000:d051  cmp    byte ptr [g38b6], 0
  0000:d056  jne    0xd05b
  0000:d058  jmp    0xd106
L0d05b:
  0000:d05b  cmp    byte ptr [g38b9], 0
  0000:d060  jne    0xd065
  0000:d062  jmp    0xd106
L0d065:
  0000:d065  mov    di, 0x97b2    ; "^2У тебя есть ненужная кожанка хочешь продать?"
  0000:d068  push   cs
  0000:d069  push   di
  0000:d06a  xor    ax, ax
  0000:d06c  push   ax
  0000:d06d  xor    ax, ax
  0000:d06f  push   ax
  0000:d070  xor    ax, ax
  0000:d072  push   ax
  0000:d073  xor    ax, ax
  0000:d075  push   ax
  0000:d076  xor    ax, ax
  0000:d078  push   ax
  0000:d079  lcall  U2:0eed:01c2 PrintLn
  0000:d07e  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:d081  push   cs
  0000:d082  push   di
  0000:d083  xor    ax, ax
  0000:d085  push   ax
  0000:d086  xor    ax, ax
  0000:d088  push   ax
  0000:d089  xor    ax, ax
  0000:d08b  push   ax
  0000:d08c  xor    ax, ax
  0000:d08e  push   ax
  0000:d08f  xor    ax, ax
  0000:d091  push   ax
  0000:d092  lcall  U2:0eed:0000 Print
  0000:d097  mov    di, 0x3ecc
  0000:d09a  push   ds
  0000:d09b  push   di
  0000:d09c  mov    di, 0x3a72
  0000:d09f  push   ds
  0000:d0a0  push   di
  0000:d0a1  mov    ax, 0xff
  0000:d0a4  push   ax
  0000:d0a5  lcall  SYS:0f78:06c6 ReadStr
  0000:d0aa  lcall  SYS:0f78:059d ReadLnEnd
  0000:d0af  lcall  SYS:0f78:0291 IOCheck
  0000:d0b4  mov    di, 0x3a72
  0000:d0b7  push   ds
  0000:d0b8  push   di
  0000:d0b9  lcall  U2:0eed:0216 LowerCase
  0000:d0be  mov    ax, 8
  0000:d0c1  push   ax
  0000:d0c2  lcall  SYS:0f78:114b Random
  0000:d0c7  add    ax, 0xd
  0000:d0ca  mov    byte ptr [g3e33], al
  0000:d0cd  mov    di, 0x3a72
  0000:d0d0  push   ds
  0000:d0d1  push   di
  0000:d0d2  mov    di, 0x8323    ; "y"
  0000:d0d5  push   cs
  0000:d0d6  push   di
  0000:d0d7  lcall  SYS:0f78:0bd8 StrCmp
  0000:d0dc  jne    0xd106
  0000:d0de  mov    byte ptr [g38b6], 0
  0000:d0e3  mov    al, byte ptr [g3e33]
  0000:d0e6  cwde   
  0000:d0e7  add    word ptr [g38c7], ax
  0000:d0eb  mov    di, 0x97e1    ; "^2Ты продал кожанку за #."
  0000:d0ee  push   cs
  0000:d0ef  push   di
  0000:d0f0  mov    al, byte ptr [g3e33]
  0000:d0f3  cwde   
  0000:d0f4  push   ax
  0000:d0f5  xor    ax, ax
  0000:d0f7  push   ax
  0000:d0f8  xor    ax, ax
  0000:d0fa  push   ax
  0000:d0fb  xor    ax, ax
  0000:d0fd  push   ax
  0000:d0fe  xor    ax, ax
  0000:d100  push   ax
  0000:d101  lcall  U2:0eed:01c2 PrintLn
L0d106:
  0000:d106  cmp    byte ptr [g38ba], 0
  0000:d10b  jne    0xd110
  0000:d10d  jmp    0xd1c9
L0d110:
  0000:d110  cmp    byte ptr [g394b], 0
  0000:d115  jne    0xd128
  0000:d117  cmp    byte ptr [g38c2], 0
  0000:d11c  jne    0xd128
  0000:d11e  cmp    byte ptr [g394c], 0
  0000:d123  jne    0xd128
  0000:d125  jmp    0xd1c9
L0d128:
  0000:d128  mov    di, 0x97fb    ; "^2У тебя есть кастет, а это отстой хочешь продать?"
  0000:d12b  push   cs
  0000:d12c  push   di
  0000:d12d  xor    ax, ax
  0000:d12f  push   ax
  0000:d130  xor    ax, ax
  0000:d132  push   ax
  0000:d133  xor    ax, ax
  0000:d135  push   ax
  0000:d136  xor    ax, ax
  0000:d138  push   ax
  0000:d139  xor    ax, ax
  0000:d13b  push   ax
  0000:d13c  lcall  U2:0eed:01c2 PrintLn
  0000:d141  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:d144  push   cs
  0000:d145  push   di
  0000:d146  xor    ax, ax
  0000:d148  push   ax
  0000:d149  xor    ax, ax
  0000:d14b  push   ax
  0000:d14c  xor    ax, ax
  0000:d14e  push   ax
  0000:d14f  xor    ax, ax
  0000:d151  push   ax
  0000:d152  xor    ax, ax
  0000:d154  push   ax
  0000:d155  lcall  U2:0eed:0000 Print
  0000:d15a  mov    di, 0x3ecc
  0000:d15d  push   ds
  0000:d15e  push   di
  0000:d15f  mov    di, 0x3a72
  0000:d162  push   ds
  0000:d163  push   di
  0000:d164  mov    ax, 0xff
  0000:d167  push   ax
  0000:d168  lcall  SYS:0f78:06c6 ReadStr
  0000:d16d  lcall  SYS:0f78:059d ReadLnEnd
  0000:d172  lcall  SYS:0f78:0291 IOCheck
  0000:d177  mov    di, 0x3a72
  0000:d17a  push   ds
  0000:d17b  push   di
  0000:d17c  lcall  U2:0eed:0216 LowerCase
  0000:d181  mov    ax, 8
  0000:d184  push   ax
  0000:d185  lcall  SYS:0f78:114b Random
  0000:d18a  add    ax, 0xd
  0000:d18d  mov    byte ptr [g3e33], al
  0000:d190  mov    di, 0x3a72
  0000:d193  push   ds
  0000:d194  push   di
  0000:d195  mov    di, 0x8323    ; "y"
  0000:d198  push   cs
  0000:d199  push   di
  0000:d19a  lcall  SYS:0f78:0bd8 StrCmp
  0000:d19f  jne    0xd1c9
  0000:d1a1  mov    byte ptr [g38ba], 0
  0000:d1a6  mov    al, byte ptr [g3e33]
  0000:d1a9  cwde   
  0000:d1aa  add    word ptr [g38c7], ax
  0000:d1ae  mov    di, 0x982e    ; "^2Ты продал кастет за #."
  0000:d1b1  push   cs
  0000:d1b2  push   di
  0000:d1b3  mov    al, byte ptr [g3e33]
  0000:d1b6  cwde   
  0000:d1b7  push   ax
  0000:d1b8  xor    ax, ax
  0000:d1ba  push   ax
  0000:d1bb  xor    ax, ax
  0000:d1bd  push   ax
  0000:d1be  xor    ax, ax
  0000:d1c0  push   ax
  0000:d1c1  xor    ax, ax
  0000:d1c3  push   ax
  0000:d1c4  lcall  U2:0eed:01c2 PrintLn
L0d1c9:
  0000:d1c9  cmp    byte ptr [g394b], 0
  0000:d1ce  jne    0xd1d3
  0000:d1d0  jmp    0xd285
L0d1d3:
  0000:d1d3  cmp    byte ptr [g38c2], 0
  0000:d1d8  jne    0xd1e4
  0000:d1da  cmp    byte ptr [g394c], 0
  0000:d1df  jne    0xd1e4
  0000:d1e1  jmp    0xd285
L0d1e4:
  0000:d1e4  mov    di, 0x9847    ; "^2У тебя есть дубинка - барахло - хочешь продать?"
  0000:d1e7  push   cs
  0000:d1e8  push   di
  0000:d1e9  xor    ax, ax
  0000:d1eb  push   ax
  0000:d1ec  xor    ax, ax
  0000:d1ee  push   ax
  0000:d1ef  xor    ax, ax
  0000:d1f1  push   ax
  0000:d1f2  xor    ax, ax
  0000:d1f4  push   ax
  0000:d1f5  xor    ax, ax
  0000:d1f7  push   ax
  0000:d1f8  lcall  U2:0eed:01c2 PrintLn
  0000:d1fd  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:d200  push   cs
  0000:d201  push   di
  0000:d202  xor    ax, ax
  0000:d204  push   ax
  0000:d205  xor    ax, ax
  0000:d207  push   ax
  0000:d208  xor    ax, ax
  0000:d20a  push   ax
  0000:d20b  xor    ax, ax
  0000:d20d  push   ax
  0000:d20e  xor    ax, ax
  0000:d210  push   ax
  0000:d211  lcall  U2:0eed:0000 Print
  0000:d216  mov    di, 0x3ecc
  0000:d219  push   ds
  0000:d21a  push   di
  0000:d21b  mov    di, 0x3a72
  0000:d21e  push   ds
  0000:d21f  push   di
  0000:d220  mov    ax, 0xff
  0000:d223  push   ax
  0000:d224  lcall  SYS:0f78:06c6 ReadStr
  0000:d229  lcall  SYS:0f78:059d ReadLnEnd
  0000:d22e  lcall  SYS:0f78:0291 IOCheck
  0000:d233  mov    di, 0x3a72
  0000:d236  push   ds
  0000:d237  push   di
  0000:d238  lcall  U2:0eed:0216 LowerCase
  0000:d23d  mov    ax, 0xf
  0000:d240  push   ax
  0000:d241  lcall  SYS:0f78:114b Random
  0000:d246  add    ax, 0x19
  0000:d249  mov    byte ptr [g3e33], al
  0000:d24c  mov    di, 0x3a72
  0000:d24f  push   ds
  0000:d250  push   di
  0000:d251  mov    di, 0x8323    ; "y"
  0000:d254  push   cs
  0000:d255  push   di
  0000:d256  lcall  SYS:0f78:0bd8 StrCmp
  0000:d25b  jne    0xd285
  0000:d25d  mov    byte ptr [g394b], 0
  0000:d262  mov    al, byte ptr [g3e33]
  0000:d265  cwde   
  0000:d266  add    word ptr [g38c7], ax
  0000:d26a  mov    di, 0x9879    ; "^2Ты продал дубинку за #."
  0000:d26d  push   cs
  0000:d26e  push   di
  0000:d26f  mov    al, byte ptr [g3e33]
  0000:d272  cwde   
  0000:d273  push   ax
  0000:d274  xor    ax, ax
  0000:d276  push   ax
  0000:d277  xor    ax, ax
  0000:d279  push   ax
  0000:d27a  xor    ax, ax
  0000:d27c  push   ax
  0000:d27d  xor    ax, ax
  0000:d27f  push   ax
  0000:d280  lcall  U2:0eed:01c2 PrintLn
L0d285:
  0000:d285  cmp    byte ptr [g38c2], 0
  0000:d28a  jne    0xd28f
  0000:d28c  jmp    0xd33a
L0d28f:
  0000:d28f  cmp    byte ptr [g394c], 0
  0000:d294  jne    0xd299
  0000:d296  jmp    0xd33a
L0d299:
  0000:d299  mov    di, 0x9893    ; "^2У тебя есть ножик и тeсак, хочешь продать ножик?"
  0000:d29c  push   cs
  0000:d29d  push   di
  0000:d29e  xor    ax, ax
  0000:d2a0  push   ax
  0000:d2a1  xor    ax, ax
  0000:d2a3  push   ax
  0000:d2a4  xor    ax, ax
  0000:d2a6  push   ax
  0000:d2a7  xor    ax, ax
  0000:d2a9  push   ax
  0000:d2aa  xor    ax, ax
  0000:d2ac  push   ax
  0000:d2ad  lcall  U2:0eed:01c2 PrintLn
  0000:d2b2  mov    di, 0x973c    ; "^0Продать вещи\"
  0000:d2b5  push   cs
  0000:d2b6  push   di
  0000:d2b7  xor    ax, ax
  0000:d2b9  push   ax
  0000:d2ba  xor    ax, ax
  0000:d2bc  push   ax
  0000:d2bd  xor    ax, ax
  0000:d2bf  push   ax
  0000:d2c0  xor    ax, ax
  0000:d2c2  push   ax
  0000:d2c3  xor    ax, ax
  0000:d2c5  push   ax
  0000:d2c6  lcall  U2:0eed:0000 Print
  0000:d2cb  mov    di, 0x3ecc
  0000:d2ce  push   ds
  0000:d2cf  push   di
  0000:d2d0  mov    di, 0x3a72
  0000:d2d3  push   ds
  0000:d2d4  push   di
  0000:d2d5  mov    ax, 0xff
  0000:d2d8  push   ax
  0000:d2d9  lcall  SYS:0f78:06c6 ReadStr
  0000:d2de  lcall  SYS:0f78:059d ReadLnEnd
  0000:d2e3  lcall  SYS:0f78:0291 IOCheck
  0000:d2e8  mov    di, 0x3a72
  0000:d2eb  push   ds
  0000:d2ec  push   di
  0000:d2ed  lcall  U2:0eed:0216 LowerCase
  0000:d2f2  mov    ax, 0x17
  0000:d2f5  push   ax
  0000:d2f6  lcall  SYS:0f78:114b Random
  0000:d2fb  add    ax, 0x26
  0000:d2fe  mov    byte ptr [g3e33], al
  0000:d301  mov    di, 0x3a72
  0000:d304  push   ds
  0000:d305  push   di
  0000:d306  mov    di, 0x8323    ; "y"
  0000:d309  push   cs
  0000:d30a  push   di
  0000:d30b  lcall  SYS:0f78:0bd8 StrCmp
  0000:d310  jne    0xd33a
  0000:d312  mov    byte ptr [g38c2], 0
  0000:d317  mov    al, byte ptr [g3e33]
  0000:d31a  cwde   
  0000:d31b  add    word ptr [g38c7], ax
  0000:d31f  mov    di, 0x98c6    ; "^2Ты продал ножик за #."
  0000:d322  push   cs
  0000:d323  push   di
  0000:d324  mov    al, byte ptr [g3e33]
  0000:d327  cwde   
  0000:d328  push   ax
  0000:d329  xor    ax, ax
  0000:d32b  push   ax
  0000:d32c  xor    ax, ax
  0000:d32e  push   ax
  0000:d32f  xor    ax, ax
  0000:d331  push   ax
  0000:d332  xor    ax, ax
  0000:d334  push   ax
  0000:d335  lcall  U2:0eed:01c2 PrintLn
L0d33a:
  0000:d33a  cmp    byte ptr [g3e33], 0xff
  0000:d33f  jne    0xd35a
  0000:d341  mov    di, 0x98de    ; "^6У тебя нет неужных вещей."
  0000:d344  push   cs
  0000:d345  push   di
  0000:d346  xor    ax, ax
  0000:d348  push   ax
  0000:d349  xor    ax, ax
  0000:d34b  push   ax
  0000:d34c  xor    ax, ax
  0000:d34e  push   ax
  0000:d34f  xor    ax, ax
  0000:d351  push   ax
  0000:d352  xor    ax, ax
  0000:d354  push   ax
  0000:d355  lcall  U2:0eed:01c2 PrintLn
L0d35a:
  0000:d35a  mov    di, 0x98fa    ; " "
  0000:d35d  push   cs
  0000:d35e  push   di
  0000:d35f  mov    di, 0x3a72
  0000:d362  push   ds
  0000:d363  push   di
  0000:d364  mov    ax, 0xff
  0000:d367  push   ax
  0000:d368  lcall  SYS:0f78:0b01 StrStore
L0d36d:
  0000:d36d  mov    di, 0x3a72
  0000:d370  push   ds
  0000:d371  push   di
  0000:d372  mov    di, 0x848e    ; "w"
  0000:d375  push   cs
  0000:d376  push   di
  0000:d377  lcall  SYS:0f78:0bd8 StrCmp
  0000:d37c  je     0xd381
  0000:d37e  jmp    0xc88e
L0d381:
  0000:d381  jmp    0xd39c
L0d383:
  0000:d383  mov    di, 0x98fc    ; "^6Туда любого дебила с улицы непропустят - сначала докажи, что ты не засранец - отпинай побольше ублюдков"
  0000:d386  push   cs
  0000:d387  push   di
  0000:d388  xor    ax, ax
  0000:d38a  push   ax
  0000:d38b  xor    ax, ax
  0000:d38d  push   ax
  0000:d38e  xor    ax, ax
  0000:d390  push   ax
  0000:d391  xor    ax, ax
  0000:d393  push   ax
  0000:d394  xor    ax, ax
  0000:d396  push   ax
  0000:d397  lcall  U2:0eed:01c2 PrintLn
L0d39c:
  0000:d39c  mov    di, 0x3972
  0000:d39f  push   ds
  0000:d3a0  push   di
  0000:d3a1  mov    di, 0x9966    ; "rep"
  0000:d3a4  push   cs
  0000:d3a5  push   di
  0000:d3a6  lcall  SYS:0f78:0bd8 StrCmp
  0000:d3ab  je     0xd3b0
  0000:d3ad  jmp    0xd6e3
L0d3b0:
  0000:d3b0  cmp    byte ptr [g3698], 1
  0000:d3b5  je     0xd3ba
  0000:d3b7  jmp    0xd6ca
L0d3ba:
  0000:d3ba  mov    di, 0x996a    ; "Ты пришел на ремот, к ветеринару напиши  ^6w^7  чтобы уйти"
  0000:d3bd  push   cs
  0000:d3be  push   di
  0000:d3bf  xor    ax, ax
  0000:d3c1  push   ax
  0000:d3c2  xor    ax, ax
  0000:d3c4  push   ax
  0000:d3c5  xor    ax, ax
  0000:d3c7  push   ax
  0000:d3c8  xor    ax, ax
  0000:d3ca  push   ax
  0000:d3cb  xor    ax, ax
  0000:d3cd  push   ax
  0000:d3ce  lcall  U2:0eed:01c2 PrintLn
  0000:d3d3  mov    ax, word ptr [g38ac]
  0000:d3d6  cmp    ax, word ptr [g38ae]
  0000:d3da  jl     0xd3ea
  0000:d3dc  cmp    byte ptr [g38b0], 0
  0000:d3e1  jne    0xd3ea
  0000:d3e3  cmp    byte ptr [g38b1], 0
  0000:d3e8  je     0xd3ee
L0d3ea:
  0000:d3ea  mov    al, 0
  0000:d3ec  jmp    0xd3f0
L0d3ee:
  0000:d3ee  mov    al, 1
L0d3f0:
  0000:d3f0  or     al, al
  0000:d3f2  je     0xd3f7
  0000:d3f4  jmp    0xd4ba
L0d3f7:
  0000:d3f7  mov    di, 0x99a5    ; "^0Док: не волнуйся всё зарастёт как на собаке"
  0000:d3fa  push   cs
  0000:d3fb  push   di
  0000:d3fc  xor    ax, ax
  0000:d3fe  push   ax
  0000:d3ff  xor    ax, ax
  0000:d401  push   ax
  0000:d402  xor    ax, ax
  0000:d404  push   ax
  0000:d405  xor    ax, ax
  0000:d407  push   ax
  0000:d408  xor    ax, ax
  0000:d40a  push   ax
  0000:d40b  lcall  U2:0eed:01c2 PrintLn
  0000:d410  cmp    word ptr [g38c7], 3
  0000:d415  jge    0xd41e
  0000:d417  mov    byte ptr [g3b7a], 0x34
  0000:d41c  jmp    0xd423
L0d41e:
  0000:d41e  mov    byte ptr [g3b7a], 0x30
L0d423:
  0000:d423  lea    di, [bp - 0x200]
  0000:d427  push   ss
  0000:d428  push   di
  0000:d429  mov    di, 0x99d3    ; "  ^2h^7 - за ^"
  0000:d42c  push   cs
  0000:d42d  push   di
  0000:d42e  lcall  SYS:0f78:0ae7 StrLoad
  0000:d433  lea    di, [bp - 0x100]
  0000:d437  push   ss
  0000:d438  push   di
  0000:d439  mov    al, byte ptr [g3b7a]
  0000:d43c  push   ax
  0000:d43d  lcall  SYS:0f78:0c03 CharToStr
  0000:d442  lcall  SYS:0f78:0b66 StrConcat
  0000:d447  mov    di, 0x99e2    ; "3^7 рубля тебя залатают"
  0000:d44a  push   cs
  0000:d44b  push   di
  0000:d44c  lcall  SYS:0f78:0b66 StrConcat
  0000:d451  xor    ax, ax
  0000:d453  push   ax
  0000:d454  xor    ax, ax
  0000:d456  push   ax
  0000:d457  xor    ax, ax
  0000:d459  push   ax
  0000:d45a  xor    ax, ax
  0000:d45c  push   ax
  0000:d45d  xor    ax, ax
  0000:d45f  push   ax
  0000:d460  lcall  U2:0eed:01c2 PrintLn
  0000:d465  cmp    word ptr [g38c7], 7
  0000:d46a  jge    0xd473
  0000:d46c  mov    byte ptr [g3b7a], 0x34
  0000:d471  jmp    0xd478
L0d473:
  0000:d473  mov    byte ptr [g3b7a], 0x30
L0d478:
  0000:d478  lea    di, [bp - 0x200]
  0000:d47c  push   ss
  0000:d47d  push   di
  0000:d47e  mov    di, 0x99fa    ; "  ^2r^7 - за ^"
  0000:d481  push   cs
  0000:d482  push   di
  0000:d483  lcall  SYS:0f78:0ae7 StrLoad
  0000:d488  lea    di, [bp - 0x100]
  0000:d48c  push   ss
  0000:d48d  push   di
  0000:d48e  mov    al, byte ptr [g3b7a]
  0000:d491  push   ax
  0000:d492  lcall  SYS:0f78:0c03 CharToStr
  0000:d497  lcall  SYS:0f78:0b66 StrConcat
  0000:d49c  mov    di, 0x9a09    ; "7^7 рублей починят переломы"
  0000:d49f  push   cs
  0000:d4a0  push   di
  0000:d4a1  lcall  SYS:0f78:0b66 StrConcat
  0000:d4a6  xor    ax, ax
  0000:d4a8  push   ax
  0000:d4a9  xor    ax, ax
  0000:d4ab  push   ax
  0000:d4ac  xor    ax, ax
  0000:d4ae  push   ax
  0000:d4af  xor    ax, ax
  0000:d4b1  push   ax
  0000:d4b2  xor    ax, ax
  0000:d4b4  push   ax
  0000:d4b5  lcall  U2:0eed:01c2 PrintLn
L0d4ba:
  0000:d4ba  mov    ax, word ptr [g38ac]
  0000:d4bd  cmp    ax, word ptr [g38ae]
  0000:d4c1  jl     0xd4ed
  0000:d4c3  cmp    byte ptr [g38b0], 0
  0000:d4c8  jne    0xd4ed
  0000:d4ca  cmp    byte ptr [g38b1], 0
  0000:d4cf  jne    0xd4ed
  0000:d4d1  mov    di, 0x9a25    ; "^0Док: вали отсюда ты здоров."
  0000:d4d4  push   cs
  0000:d4d5  push   di
  0000:d4d6  xor    ax, ax
  0000:d4d8  push   ax
  0000:d4d9  xor    ax, ax
  0000:d4db  push   ax
  0000:d4dc  xor    ax, ax
  0000:d4de  push   ax
  0000:d4df  xor    ax, ax
  0000:d4e1  push   ax
  0000:d4e2  xor    ax, ax
  0000:d4e4  push   ax
  0000:d4e5  lcall  U2:0eed:01c2 PrintLn
  0000:d4ea  jmp    0xd6c8
L0d4ed:
  0000:d4ed  mov    di, 0x9a43    ; "^0Ветеренар\"
  0000:d4f0  push   cs
  0000:d4f1  push   di
  0000:d4f2  xor    ax, ax
  0000:d4f4  push   ax
  0000:d4f5  xor    ax, ax
  0000:d4f7  push   ax
  0000:d4f8  xor    ax, ax
  0000:d4fa  push   ax
  0000:d4fb  xor    ax, ax
  0000:d4fd  push   ax
  0000:d4fe  xor    ax, ax
  0000:d500  push   ax
  0000:d501  lcall  U2:0eed:0000 Print
  0000:d506  mov    di, 0x3ecc
  0000:d509  push   ds
  0000:d50a  push   di
  0000:d50b  mov    di, 0x3a72
  0000:d50e  push   ds
  0000:d50f  push   di
  0000:d510  mov    ax, 0xff
  0000:d513  push   ax
  0000:d514  lcall  SYS:0f78:06c6 ReadStr
  0000:d519  lcall  SYS:0f78:059d ReadLnEnd
  0000:d51e  lcall  SYS:0f78:0291 IOCheck
  0000:d523  mov    di, 0x3a72
  0000:d526  push   ds
  0000:d527  push   di
  0000:d528  lcall  U2:0eed:0216 LowerCase
  0000:d52d  mov    di, 0x3a72
  0000:d530  push   ds
  0000:d531  push   di
  0000:d532  mov    di, 0x9a50    ; "r"
  0000:d535  push   cs
  0000:d536  push   di
  0000:d537  lcall  SYS:0f78:0bd8 StrCmp
  0000:d53c  jne    0xd5af
  0000:d53e  cmp    byte ptr [g38b0], 1
  0000:d543  je     0xd54c
  0000:d545  cmp    byte ptr [g38b1], 1
  0000:d54a  jne    0xd5af
L0d54c:
  0000:d54c  cmp    word ptr [g38c7], 7
  0000:d551  jl     0xd596
  0000:d553  sub    word ptr [g38c7], 7
  0000:d558  mov    byte ptr [g38b0], 0
  0000:d55d  mov    byte ptr [g38b1], 0
  0000:d562  mov    di, 0x9a52    ; "^0Ого! да тебя не иначе как грузовик откатал!"
  0000:d565  push   cs
  0000:d566  push   di
  0000:d567  xor    ax, ax
  0000:d569  push   ax
  0000:d56a  xor    ax, ax
  0000:d56c  push   ax
  0000:d56d  xor    ax, ax
  0000:d56f  push   ax
  0000:d570  xor    ax, ax
  0000:d572  push   ax
  0000:d573  xor    ax, ax
  0000:d575  push   ax
  0000:d576  lcall  U2:0eed:01c2 PrintLn
  0000:d57b  mov    di, 0x9a80    ; "^2Твои переломы залечены."
  0000:d57e  push   cs
  0000:d57f  push   di
  0000:d580  xor    ax, ax
  0000:d582  push   ax
  0000:d583  xor    ax, ax
  0000:d585  push   ax
  0000:d586  xor    ax, ax
  0000:d588  push   ax
  0000:d589  xor    ax, ax
  0000:d58b  push   ax
  0000:d58c  xor    ax, ax
  0000:d58e  push   ax
  0000:d58f  lcall  U2:0eed:01c2 PrintLn
  0000:d594  jmp    0xd5af
L0d596:
  0000:d596  mov    di, 0x9a9a    ; "^4Блин халявщик, медицина не бесплатная"
  0000:d599  push   cs
  0000:d59a  push   di
  0000:d59b  xor    ax, ax
  0000:d59d  push   ax
  0000:d59e  xor    ax, ax
  0000:d5a0  push   ax
  0000:d5a1  xor    ax, ax
  0000:d5a3  push   ax
  0000:d5a4  xor    ax, ax
  0000:d5a6  push   ax
  0000:d5a7  xor    ax, ax
  0000:d5a9  push   ax
  0000:d5aa  lcall  U2:0eed:01c2 PrintLn
L0d5af:
  0000:d5af  mov    di, 0x3a72
  0000:d5b2  push   ds
  0000:d5b3  push   di
  0000:d5b4  mov    di, 0x9ac2    ; "h"
  0000:d5b7  push   cs
  0000:d5b8  push   di
  0000:d5b9  lcall  SYS:0f78:0bd8 StrCmp
  0000:d5be  je     0xd5c3
  0000:d5c0  jmp    0xd6a3
L0d5c3:
  0000:d5c3  mov    ax, word ptr [g38ac]
  0000:d5c6  cmp    ax, word ptr [g38ae]
  0000:d5ca  jl     0xd5cf
  0000:d5cc  jmp    0xd6a3
L0d5cf:
  0000:d5cf  cmp    word ptr [g38c7], 3
  0000:d5d4  jge    0xd5d9
  0000:d5d6  jmp    0xd68a
L0d5d9:
  0000:d5d9  sub    word ptr [g38c7], 3
  0000:d5de  add    word ptr [g38ac], 5
  0000:d5e3  mov    ax, word ptr [g38ac]
  0000:d5e6  cmp    ax, word ptr [g38ae]
  0000:d5ea  jle    0xd5f2
  0000:d5ec  mov    ax, word ptr [g38ae]
  0000:d5ef  mov    word ptr [g38ac], ax
L0d5f2:
  0000:d5f2  mov    ax, 3
  0000:d5f5  push   ax
  0000:d5f6  lcall  SYS:0f78:114b Random
  0000:d5fb  cmp    ax, 1
  0000:d5fe  jne    0xd61b
  0000:d600  mov    di, 0x9ac4    ; "^0Щас гайки подтянем и будешь как новый!"
  0000:d603  push   cs
  0000:d604  push   di
  0000:d605  xor    ax, ax
  0000:d607  push   ax
  0000:d608  xor    ax, ax
  0000:d60a  push   ax
  0000:d60b  xor    ax, ax
  0000:d60d  push   ax
  0000:d60e  xor    ax, ax
  0000:d610  push   ax
  0000:d611  xor    ax, ax
  0000:d613  push   ax
  0000:d614  lcall  U2:0eed:01c2 PrintLn
  0000:d619  jmp    0xd66d
L0d61b:
  0000:d61b  cmp    ax, 2
  0000:d61e  jne    0xd63b
  0000:d620  mov    di, 0x9aed    ; "^0Так чё тут у нас? Ага, пара швов и всё будет в порядке."
  0000:d623  push   cs
  0000:d624  push   di
  0000:d625  xor    ax, ax
  0000:d627  push   ax
  0000:d628  xor    ax, ax
  0000:d62a  push   ax
  0000:d62b  xor    ax, ax
  0000:d62d  push   ax
  0000:d62e  xor    ax, ax
  0000:d630  push   ax
  0000:d631  xor    ax, ax
  0000:d633  push   ax
  0000:d634  lcall  U2:0eed:01c2 PrintLn
  0000:d639  jmp    0xd66d
L0d63b:
  0000:d63b  mov    di, 0x9b27    ; "^6Эй, Док а зачем тебе паяльник?"
  0000:d63e  push   cs
  0000:d63f  push   di
  0000:d640  xor    ax, ax
  0000:d642  push   ax
  0000:d643  xor    ax, ax
  0000:d645  push   ax
  0000:d646  xor    ax, ax
  0000:d648  push   ax
  0000:d649  xor    ax, ax
  0000:d64b  push   ax
  0000:d64c  xor    ax, ax
  0000:d64e  push   ax
  0000:d64f  lcall  U2:0eed:01c2 PrintLn
  0000:d654  mov    di, 0x9b48    ; "^0Док: Молчи животное!"
  0000:d657  push   cs
  0000:d658  push   di
  0000:d659  xor    ax, ax
  0000:d65b  push   ax
  0000:d65c  xor    ax, ax
  0000:d65e  push   ax
  0000:d65f  xor    ax, ax
  0000:d661  push   ax
  0000:d662  xor    ax, ax
  0000:d664  push   ax
  0000:d665  xor    ax, ax
  0000:d667  push   ax
  0000:d668  lcall  U2:0eed:01c2 PrintLn
L0d66d:
  0000:d66d  mov    di, 0x9b5f    ; "^2Здоровья #/#"
  0000:d670  push   cs
  0000:d671  push   di
  0000:d672  push   word ptr [g38ac]
  0000:d676  push   word ptr [g38ae]
  0000:d67a  xor    ax, ax
  0000:d67c  push   ax
  0000:d67d  xor    ax, ax
  0000:d67f  push   ax
  0000:d680  xor    ax, ax
  0000:d682  push   ax
  0000:d683  lcall  U2:0eed:01c2 PrintLn
  0000:d688  jmp    0xd6a3
L0d68a:
  0000:d68a  mov    di, 0x9a9a    ; "^4Блин халявщик, медицина не бесплатная"
  0000:d68d  push   cs
  0000:d68e  push   di
  0000:d68f  xor    ax, ax
  0000:d691  push   ax
  0000:d692  xor    ax, ax
  0000:d694  push   ax
  0000:d695  xor    ax, ax
  0000:d697  push   ax
  0000:d698  xor    ax, ax
  0000:d69a  push   ax
  0000:d69b  xor    ax, ax
  0000:d69d  push   ax
  0000:d69e  lcall  U2:0eed:01c2 PrintLn
L0d6a3:
  0000:d6a3  mov    di, 0x3a72
  0000:d6a6  push   ds
  0000:d6a7  push   di
  0000:d6a8  mov    di, 0x848e    ; "w"
  0000:d6ab  push   cs
  0000:d6ac  push   di
  0000:d6ad  lcall  SYS:0f78:0bd8 StrCmp
  0000:d6b2  je     0xd6c8
  0000:d6b4  mov    di, 0x3a72
  0000:d6b7  push   ds
  0000:d6b8  push   di
  0000:d6b9  mov    di, 0x9b6e    ; "e"
  0000:d6bc  push   cs
  0000:d6bd  push   di
  0000:d6be  lcall  SYS:0f78:0bd8 StrCmp
  0000:d6c3  je     0xd6c8
  0000:d6c5  jmp    0xd4ba
L0d6c8:
  0000:d6c8  jmp    0xd6e3
L0d6ca:
  0000:d6ca  mov    di, 0x9b70    ; "^6Сначала найди где находтся эта больница"
  0000:d6cd  push   cs
  0000:d6ce  push   di
  0000:d6cf  xor    ax, ax
  0000:d6d1  push   ax
  0000:d6d2  xor    ax, ax
  0000:d6d4  push   ax
  0000:d6d5  xor    ax, ax
  0000:d6d7  push   ax
  0000:d6d8  xor    ax, ax
  0000:d6da  push   ax
  0000:d6db  xor    ax, ax
  0000:d6dd  push   ax
  0000:d6de  lcall  U2:0eed:01c2 PrintLn
L0d6e3:
  0000:d6e3  mov    di, 0x3972
  0000:d6e6  push   ds
  0000:d6e7  push   di
  0000:d6e8  mov    di, 0x9b9a    ; "girl"
  0000:d6eb  push   cs
  0000:d6ec  push   di
  0000:d6ed  lcall  SYS:0f78:0bd8 StrCmp
  0000:d6f2  je     0xd6f7
  0000:d6f4  jmp    0xd7ce
L0d6f7:
  0000:d6f7  cmp    byte ptr [g3697], 1
  0000:d6fc  je     0xd701
  0000:d6fe  jmp    0xd7b5
L0d701:
  0000:d701  cmp    word ptr [g38c7], 0xc
  0000:d706  jge    0xd70b
  0000:d708  jmp    0xd79a
L0d70b:
  0000:d70b  mov    di, 0x9b9f    ; "^2Ты пришел к своей подруге."
  0000:d70e  push   cs
  0000:d70f  push   di
  0000:d710  xor    ax, ax
  0000:d712  push   ax
  0000:d713  xor    ax, ax
  0000:d715  push   ax
  0000:d716  xor    ax, ax
  0000:d718  push   ax
  0000:d719  xor    ax, ax
  0000:d71b  push   ax
  0000:d71c  xor    ax, ax
  0000:d71e  push   ax
  0000:d71f  lcall  U2:0eed:01c2 PrintLn
  0000:d724  mov    ax, 2
  0000:d727  push   ax
  0000:d728  lcall  SYS:0f78:114b Random
  0000:d72d  or     ax, ax
  0000:d72f  jne    0xd756
  0000:d731  cmp    byte ptr [g3699], 0
  0000:d736  jne    0xd756
  0000:d738  mov    di, 0x9bbc    ; "^2Она вытащила тебя в клуб и теперь ты знаешь где он находиться."
  0000:d73b  push   cs
  0000:d73c  push   di
  0000:d73d  xor    ax, ax
  0000:d73f  push   ax
  0000:d740  xor    ax, ax
  0000:d742  push   ax
  0000:d743  xor    ax, ax
  0000:d745  push   ax
  0000:d746  xor    ax, ax
  0000:d748  push   ax
  0000:d749  xor    ax, ax
  0000:d74b  push   ax
  0000:d74c  lcall  U2:0eed:01c2 PrintLn
  0000:d751  mov    byte ptr [g3699], 1
L0d756:
  0000:d756  mov    di, 0x9bfd    ; "^6Ты купил ей чё-то, потратив 12 рублей."
  0000:d759  push   cs
  0000:d75a  push   di
  0000:d75b  xor    ax, ax
  0000:d75d  push   ax
  0000:d75e  xor    ax, ax
  0000:d760  push   ax
  0000:d761  xor    ax, ax
  0000:d763  push   ax
  0000:d764  xor    ax, ax
  0000:d766  push   ax
  0000:d767  xor    ax, ax
  0000:d769  push   ax
  0000:d76a  lcall  U2:0eed:01c2 PrintLn
  0000:d76f  mov    di, 0x9c26    ; "^2Ты расслабился, отдохнул и снова можешь творить свои гоповские дела."
  0000:d772  push   cs
  0000:d773  push   di
  0000:d774  xor    ax, ax
  0000:d776  push   ax
  0000:d777  xor    ax, ax
  0000:d779  push   ax
  0000:d77a  xor    ax, ax
  0000:d77c  push   ax
  0000:d77d  xor    ax, ax
  0000:d77f  push   ax
  0000:d780  xor    ax, ax
  0000:d782  push   ax
  0000:d783  lcall  U2:0eed:01c2 PrintLn
  0000:d788  mov    ax, word ptr [g38ae]
  0000:d78b  mov    word ptr [g38ac], ax
  0000:d78e  sub    word ptr [g38c7], 0xc
  0000:d793  mov    byte ptr [g3b76], 0
  0000:d798  jmp    0xd7b3
L0d79a:
  0000:d79a  mov    di, 0x9c6d    ; "^6Ну непойдёшь же как придурок без ничего."
  0000:d79d  push   cs
  0000:d79e  push   di
  0000:d79f  xor    ax, ax
  0000:d7a1  push   ax
  0000:d7a2  xor    ax, ax
  0000:d7a4  push   ax
  0000:d7a5  xor    ax, ax
  0000:d7a7  push   ax
  0000:d7a8  xor    ax, ax
  0000:d7aa  push   ax
  0000:d7ab  xor    ax, ax
  0000:d7ad  push   ax
  0000:d7ae  lcall  U2:0eed:01c2 PrintLn
L0d7b3:
  0000:d7b3  jmp    0xd7ce
L0d7b5:
  0000:d7b5  mov    di, 0x9c98    ; "^4У тебя пока нет девчонки."
  0000:d7b8  push   cs
  0000:d7b9  push   di
  0000:d7ba  xor    ax, ax
  0000:d7bc  push   ax
  0000:d7bd  xor    ax, ax
  0000:d7bf  push   ax
  0000:d7c0  xor    ax, ax
  0000:d7c2  push   ax
  0000:d7c3  xor    ax, ax
  0000:d7c5  push   ax
  0000:d7c6  xor    ax, ax
  0000:d7c8  push   ax
  0000:d7c9  lcall  U2:0eed:01c2 PrintLn
L0d7ce:
  0000:d7ce  mov    di, 0x3972
  0000:d7d1  push   ds
  0000:d7d2  push   di
  0000:d7d3  mov    di, 0x9cb4    ; "fight"
  0000:d7d6  push   cs
  0000:d7d7  push   di
  0000:d7d8  lcall  SYS:0f78:0bd8 StrCmp
  0000:d7dd  jne    0xd7f8
  0000:d7df  mov    di, 0x9cba    ; "^6Пережитки прошлого жми ^6w^7 чтобы искать врагов"
  0000:d7e2  push   cs
  0000:d7e3  push   di
  0000:d7e4  xor    ax, ax
  0000:d7e6  push   ax
  0000:d7e7  xor    ax, ax
  0000:d7e9  push   ax
  0000:d7ea  xor    ax, ax
  0000:d7ec  push   ax
  0000:d7ed  xor    ax, ax
  0000:d7ef  push   ax
  0000:d7f0  xor    ax, ax
  0000:d7f2  push   ax
  0000:d7f3  lcall  U2:0eed:01c2 PrintLn
L0d7f8:
  0000:d7f8  mov    di, 0x3972
  0000:d7fb  push   ds
  0000:d7fc  push   di
  0000:d7fd  mov    di, 0x9ced    ; "pr"
  0000:d800  push   cs
  0000:d801  push   di
  0000:d802  lcall  SYS:0f78:0bd8 StrCmp
  0000:d807  je     0xd80c
  0000:d809  jmp    0xdefc
L0d80c:
  0000:d80c  cmp    byte ptr [g3696], 1
  0000:d811  je     0xd816
  0000:d813  jmp    0xdee3
L0d816:
  0000:d816  mov    di, 0x9cf0    ; "Ты пришел в притон - "
  0000:d819  push   cs
  0000:d81a  push   di
  0000:d81b  xor    ax, ax
  0000:d81d  push   ax
  0000:d81e  xor    ax, ax
  0000:d820  push   ax
  0000:d821  xor    ax, ax
  0000:d823  push   ax
  0000:d824  xor    ax, ax
  0000:d826  push   ax
  0000:d827  xor    ax, ax
  0000:d829  push   ax
  0000:d82a  lcall  U2:0eed:0000 Print
  0000:d82f  cmp    byte ptr [g3692], 1
  0000:d834  jne    0xd859
  0000:d836  mov    di, 0x9d06    ; "^0общагу №#"
  0000:d839  push   cs
  0000:d83a  push   di
  0000:d83b  mov    ax, 6
  0000:d83e  push   ax
  0000:d83f  lcall  SYS:0f78:114b Random
  0000:d844  add    ax, 3
  0000:d847  push   ax
  0000:d848  xor    ax, ax
  0000:d84a  push   ax
  0000:d84b  xor    ax, ax
  0000:d84d  push   ax
  0000:d84e  xor    ax, ax
  0000:d850  push   ax
  0000:d851  xor    ax, ax
  0000:d853  push   ax
  0000:d854  lcall  U2:0eed:01c2 PrintLn
L0d859:
  0000:d859  cmp    byte ptr [g3692], 2
  0000:d85e  jne    0xd879
  0000:d860  mov    di, 0x9d12    ; "^0общагу ВКИ"
  0000:d863  push   cs
  0000:d864  push   di
  0000:d865  xor    ax, ax
  0000:d867  push   ax
  0000:d868  xor    ax, ax
  0000:d86a  push   ax
  0000:d86b  xor    ax, ax
  0000:d86d  push   ax
  0000:d86e  xor    ax, ax
  0000:d870  push   ax
  0000:d871  xor    ax, ax
  0000:d873  push   ax
  0000:d874  lcall  U2:0eed:01c2 PrintLn
L0d879:
  0000:d879  cmp    byte ptr [g3692], 3
  0000:d87e  jne    0xd899
  0000:d880  mov    di, 0x9d1f    ; "^0гоповский притон"
  0000:d883  push   cs
  0000:d884  push   di
  0000:d885  xor    ax, ax
  0000:d887  push   ax
  0000:d888  xor    ax, ax
  0000:d88a  push   ax
  0000:d88b  xor    ax, ax
  0000:d88d  push   ax
  0000:d88e  xor    ax, ax
  0000:d890  push   ax
  0000:d891  xor    ax, ax
  0000:d893  push   ax
  0000:d894  lcall  U2:0eed:01c2 PrintLn
L0d899:
  0000:d899  cmp    byte ptr [g3692], 4
  0000:d89e  jne    0xd8b9
  0000:d8a0  mov    di, 0x9d32    ; "^0притон отморозков"
  0000:d8a3  push   cs
  0000:d8a4  push   di
  0000:d8a5  xor    ax, ax
  0000:d8a7  push   ax
  0000:d8a8  xor    ax, ax
  0000:d8aa  push   ax
  0000:d8ab  xor    ax, ax
  0000:d8ad  push   ax
  0000:d8ae  xor    ax, ax
  0000:d8b0  push   ax
  0000:d8b1  xor    ax, ax
  0000:d8b3  push   ax
  0000:d8b4  lcall  U2:0eed:01c2 PrintLn
L0d8b9:
  0000:d8b9  mov    di, 0x3fcc
  0000:d8bc  push   ds
  0000:d8bd  push   di
  0000:d8be  lcall  SYS:0f78:05dd WriteLnEnd
  0000:d8c3  lcall  SYS:0f78:0291 IOCheck
  0000:d8c8  cmp    byte ptr [g3b78], 1
  0000:d8cd  jne    0xd8e8
  0000:d8cf  mov    di, 0x9d46    ; "^6На одного пацана наехал какой-то урод"
  0000:d8d2  push   cs
  0000:d8d3  push   di
  0000:d8d4  xor    ax, ax
  0000:d8d6  push   ax
  0000:d8d7  xor    ax, ax
  0000:d8d9  push   ax
  0000:d8da  xor    ax, ax
  0000:d8dc  push   ax
  0000:d8dd  xor    ax, ax
  0000:d8df  push   ax
  0000:d8e0  xor    ax, ax
  0000:d8e2  push   ax
  0000:d8e3  lcall  U2:0eed:01c2 PrintLn
L0d8e8:
  0000:d8e8  cmp    byte ptr [g3b79], 0
  0000:d8ed  je     0xd90f
  0000:d8ef  cmp    word ptr [g38cb], 0x64
  0000:d8f4  jl     0xd90f
  0000:d8f6  mov    di, 0x9d6e    ; "^6Ты пацан нормальный. Есть дело."
  0000:d8f9  push   cs
  0000:d8fa  push   di
  0000:d8fb  xor    ax, ax
  0000:d8fd  push   ax
  0000:d8fe  xor    ax, ax
  0000:d900  push   ax
  0000:d901  xor    ax, ax
  0000:d903  push   ax
  0000:d904  xor    ax, ax
  0000:d906  push   ax
  0000:d907  xor    ax, ax
  0000:d909  push   ax
  0000:d90a  lcall  U2:0eed:01c2 PrintLn
L0d90f:
  0000:d90f  cmp    byte ptr [g3695], 0
  0000:d914  je     0xd91d
  0000:d916  cmp    byte ptr [g369a], 0
  0000:d91b  jne    0xd95c
L0d91d:
  0000:d91d  mov    al, byte ptr [g3692]
  0000:d920  xor    ah, ah
  0000:d922  dec    ax
  0000:d923  mov    dx, 0xa
  0000:d926  mul    dx
  0000:d928  mov    dx, ax
  0000:d92a  mov    ax, word ptr [g38a6]
  0000:d92d  sub    ax, dx
  0000:d92f  sub    ax, 5
  0000:d932  mov    si, ax
  0000:d934  shl    ax, 1
  0000:d936  shl    ax, 1
  0000:d938  add    ax, si
  0000:d93a  add    ax, word ptr [g38cb]
  0000:d93e  cmp    ax, 0x28
  0000:d941  jl     0xd95c
  0000:d943  mov    di, 0x9d90    ; "^6Пацаны хотят тебе кое-чё сказать"
  0000:d946  push   cs
  0000:d947  push   di
  0000:d948  xor    ax, ax
  0000:d94a  push   ax
  0000:d94b  xor    ax, ax
  0000:d94d  push   ax
  0000:d94e  xor    ax, ax
  0000:d950  push   ax
  0000:d951  xor    ax, ax
  0000:d953  push   ax
  0000:d954  xor    ax, ax
  0000:d956  push   ax
  0000:d957  lcall  U2:0eed:01c2 PrintLn
L0d95c:
  0000:d95c  mov    di, 0x3fcc
  0000:d95f  push   ds
  0000:d960  push   di
  0000:d961  lcall  SYS:0f78:05dd WriteLnEnd
  0000:d966  lcall  SYS:0f78:0291 IOCheck
  0000:d96b  mov    di, 0x9db3    ; "Напиши ^6w^7 чтобы уйти"
  0000:d96e  push   cs
  0000:d96f  push   di
  0000:d970  xor    ax, ax
  0000:d972  push   ax
  0000:d973  xor    ax, ax
  0000:d975  push   ax
  0000:d976  xor    ax, ax
  0000:d978  push   ax
  0000:d979  xor    ax, ax
  0000:d97b  push   ax
  0000:d97c  xor    ax, ax
  0000:d97e  push   ax
  0000:d97f  lcall  U2:0eed:01c2 PrintLn
  0000:d984  cmp    word ptr [g38c3], 0
  0000:d989  jne    0xd992
  0000:d98b  mov    byte ptr [g3b7a], 0x34
  0000:d990  jmp    0xd997
L0d992:
  0000:d992  mov    byte ptr [g3b7a], 0x30
L0d997:
  0000:d997  lea    di, [bp - 0x200]
  0000:d99b  push   ss
  0000:d99c  push   di
  0000:d99d  mov    di, 0x9dcb    ; "Напиши ^"
  0000:d9a0  push   cs
  0000:d9a1  push   di
  0000:d9a2  lcall  SYS:0f78:0ae7 StrLoad
  0000:d9a7  lea    di, [bp - 0x100]
  0000:d9ab  push   ss
  0000:d9ac  push   di
  0000:d9ad  mov    al, byte ptr [g3b7a]
  0000:d9b0  push   ax
  0000:d9b1  lcall  SYS:0f78:0c03 CharToStr
  0000:d9b6  lcall  SYS:0f78:0b66 StrConcat
  0000:d9bb  mov    di, 0x9dd4    ; "p^7  чтобы угостить пацанов пивом"
  0000:d9be  push   cs
  0000:d9bf  push   di
  0000:d9c0  lcall  SYS:0f78:0b66 StrConcat
  0000:d9c5  xor    ax, ax
  0000:d9c7  push   ax
  0000:d9c8  xor    ax, ax
  0000:d9ca  push   ax
  0000:d9cb  xor    ax, ax
  0000:d9cd  push   ax
  0000:d9ce  xor    ax, ax
  0000:d9d0  push   ax
  0000:d9d1  xor    ax, ax
  0000:d9d3  push   ax
  0000:d9d4  lcall  U2:0eed:01c2 PrintLn
  0000:d9d9  cmp    word ptr [g38cb], 2
  0000:d9de  jge    0xd9e7
  0000:d9e0  mov    byte ptr [g3b7a], 0x34
  0000:d9e5  jmp    0xd9ec
L0d9e7:
  0000:d9e7  mov    byte ptr [g3b7a], 0x30
L0d9ec:
  0000:d9ec  cmp    byte ptr [g3e35], 0
  0000:d9f1  jbe    0xda35
  0000:d9f3  lea    di, [bp - 0x200]
  0000:d9f7  push   ss
  0000:d9f8  push   di
  0000:d9f9  mov    di, 0x9dcb    ; "Напиши ^"
  0000:d9fc  push   cs
  0000:d9fd  push   di
  0000:d9fe  lcall  SYS:0f78:0ae7 StrLoad
  0000:da03  lea    di, [bp - 0x100]
  0000:da07  push   ss
  0000:da08  push   di
  0000:da09  mov    al, byte ptr [g3b7a]
  0000:da0c  push   ax
  0000:da0d  lcall  SYS:0f78:0c03 CharToStr
  0000:da12  lcall  SYS:0f78:0b66 StrConcat
  0000:da17  mov    di, 0x9df6    ; "r^7  чтобы занять 2 рубля"
  0000:da1a  push   cs
  0000:da1b  push   di
  0000:da1c  lcall  SYS:0f78:0b66 StrConcat
  0000:da21  xor    ax, ax
  0000:da23  push   ax
  0000:da24  xor    ax, ax
  0000:da26  push   ax
  0000:da27  xor    ax, ax
  0000:da29  push   ax
  0000:da2a  xor    ax, ax
  0000:da2c  push   ax
  0000:da2d  xor    ax, ax
  0000:da2f  push   ax
  0000:da30  lcall  U2:0eed:01c2 PrintLn
L0da35:
  0000:da35  cmp    byte ptr [g3b78], 1
  0000:da3a  jne    0xda55
  0000:da3c  mov    di, 0x9e10    ; "Напиши ^6hp^7 чтобы отпинать мудака который наезжал на пацана"
  0000:da3f  push   cs
  0000:da40  push   di
  0000:da41  xor    ax, ax
  0000:da43  push   ax
  0000:da44  xor    ax, ax
  0000:da46  push   ax
  0000:da47  xor    ax, ax
  0000:da49  push   ax
  0000:da4a  xor    ax, ax
  0000:da4c  push   ax
  0000:da4d  xor    ax, ax
  0000:da4f  push   ax
  0000:da50  lcall  U2:0eed:01c2 PrintLn
L0da55:
  0000:da55  mov    di, 0x9e4e    ; "Напиши ^6s^7  чтобы узнать отношение"
  0000:da58  push   cs
  0000:da59  push   di
  0000:da5a  xor    ax, ax
  0000:da5c  push   ax
  0000:da5d  xor    ax, ax
  0000:da5f  push   ax
  0000:da60  xor    ax, ax
  0000:da62  push   ax
  0000:da63  xor    ax, ax
  0000:da65  push   ax
  0000:da66  xor    ax, ax
  0000:da68  push   ax
  0000:da69  lcall  U2:0eed:01c2 PrintLn
  0000:da6e  cmp    byte ptr [g3695], 0
  0000:da73  je     0xda7c
  0000:da75  cmp    byte ptr [g369a], 0
  0000:da7a  jne    0xdabb
L0da7c:
  0000:da7c  mov    al, byte ptr [g3692]
  0000:da7f  xor    ah, ah
  0000:da81  dec    ax
  0000:da82  mov    dx, 0xa
  0000:da85  mul    dx
  0000:da87  mov    dx, ax
  0000:da89  mov    ax, word ptr [g38a6]
  0000:da8c  sub    ax, dx
  0000:da8e  sub    ax, 5
  0000:da91  mov    si, ax
  0000:da93  shl    ax, 1
  0000:da95  shl    ax, 1
  0000:da97  add    ax, si
  0000:da99  add    ax, word ptr [g38cb]
  0000:da9d  cmp    ax, 0x28
  0000:daa0  jl     0xdabb
  0000:daa2  mov    di, 0x9e73    ; "Напиши ^6a^7  чтобы спросить чё-то"
  0000:daa5  push   cs
  0000:daa6  push   di
  0000:daa7  xor    ax, ax
  0000:daa9  push   ax
  0000:daaa  xor    ax, ax
  0000:daac  push   ax
  0000:daad  xor    ax, ax
  0000:daaf  push   ax
  0000:dab0  xor    ax, ax
  0000:dab2  push   ax
  0000:dab3  xor    ax, ax
  0000:dab5  push   ax
  0000:dab6  lcall  U2:0eed:01c2 PrintLn
L0dabb:
  0000:dabb  cmp    word ptr [g38cb], 0x64
  0000:dac0  jl     0xdae2
  0000:dac2  cmp    byte ptr [g3b79], 0
  0000:dac7  je     0xdae2
  0000:dac9  mov    di, 0x9e96    ; "Напиши ^6d^7 чтобы пойти на дело"
  0000:dacc  push   cs
  0000:dacd  push   di
  0000:dace  xor    ax, ax
  0000:dad0  push   ax
  0000:dad1  xor    ax, ax
  0000:dad3  push   ax
  0000:dad4  xor    ax, ax
  0000:dad6  push   ax
  0000:dad7  xor    ax, ax
  0000:dad9  push   ax
  0000:dada  xor    ax, ax
  0000:dadc  push   ax
  0000:dadd  lcall  U2:0eed:01c2 PrintLn
L0dae2:
  0000:dae2  mov    di, 0x9eb7    ; "^0Притон\"
  0000:dae5  push   cs
  0000:dae6  push   di
  0000:dae7  xor    ax, ax
  0000:dae9  push   ax
  0000:daea  xor    ax, ax
  0000:daec  push   ax
  0000:daed  xor    ax, ax
  0000:daef  push   ax
  0000:daf0  xor    ax, ax
  0000:daf2  push   ax
  0000:daf3  xor    ax, ax
  0000:daf5  push   ax
  0000:daf6  lcall  U2:0eed:0000 Print
  0000:dafb  mov    di, 0x3ecc
  0000:dafe  push   ds
  0000:daff  push   di
  0000:db00  mov    di, 0x3a72
  0000:db03  push   ds
  0000:db04  push   di
  0000:db05  mov    ax, 0xff
  0000:db08  push   ax
  0000:db09  lcall  SYS:0f78:06c6 ReadStr
  0000:db0e  lcall  SYS:0f78:059d ReadLnEnd
  0000:db13  lcall  SYS:0f78:0291 IOCheck
  0000:db18  mov    di, 0x3a72
  0000:db1b  push   ds
  0000:db1c  push   di
  0000:db1d  lcall  U2:0eed:0216 LowerCase
  0000:db22  mov    di, 0x3a72
  0000:db25  push   ds
  0000:db26  push   di
  0000:db27  mov    di, 0x9ec1    ; "p"
  0000:db2a  push   cs
  0000:db2b  push   di
  0000:db2c  lcall  SYS:0f78:0bd8 StrCmp
  0000:db31  jne    0xdb77
  0000:db33  cmp    word ptr [g38c3], 0
  0000:db38  jle    0xdb5e
  0000:db3a  dec    word ptr [g38c3]
  0000:db3e  add    word ptr [g38cb], 5
  0000:db43  mov    di, 0x9ec3    ; "^2Ты угостил пацанов пивом. Понтовость улутшилась на 5."
  0000:db46  push   cs
  0000:db47  push   di
  0000:db48  xor    ax, ax
  0000:db4a  push   ax
  0000:db4b  xor    ax, ax
  0000:db4d  push   ax
  0000:db4e  xor    ax, ax
  0000:db50  push   ax
  0000:db51  xor    ax, ax
  0000:db53  push   ax
  0000:db54  xor    ax, ax
  0000:db56  push   ax
  0000:db57  lcall  U2:0eed:01c2 PrintLn
  0000:db5c  jmp    0xdb77
L0db5e:
  0000:db5e  mov    di, 0x9efb    ; "^6А нет у тебя пива."
  0000:db61  push   cs
  0000:db62  push   di
  0000:db63  xor    ax, ax
  0000:db65  push   ax
  0000:db66  xor    ax, ax
  0000:db68  push   ax
  0000:db69  xor    ax, ax
  0000:db6b  push   ax
  0000:db6c  xor    ax, ax
  0000:db6e  push   ax
  0000:db6f  xor    ax, ax
  0000:db71  push   ax
  0000:db72  lcall  U2:0eed:01c2 PrintLn
L0db77:
  0000:db77  mov    di, 0x3a72
  0000:db7a  push   ds
  0000:db7b  push   di
  0000:db7c  mov    di, 0x9a50    ; "r"
  0000:db7f  push   cs
  0000:db80  push   di
  0000:db81  lcall  SYS:0f78:0bd8 StrCmp
  0000:db86  jne    0xdbf3
  0000:db88  cmp    byte ptr [g3e35], 0
  0000:db8d  jbe    0xdbda
  0000:db8f  cmp    word ptr [g38cb], 0
  0000:db94  jle    0xdbbf
  0000:db96  add    word ptr [g38c7], 2
  0000:db9b  sub    word ptr [g38cb], 2
  0000:dba0  dec    byte ptr [g3e35]
  0000:dba4  mov    di, 0x9f10    ; "^2Ты занял 2 рубля на пиво. Понтовость уменьшилась на 2."
  0000:dba7  push   cs
  0000:dba8  push   di
  0000:dba9  xor    ax, ax
  0000:dbab  push   ax
  0000:dbac  xor    ax, ax
  0000:dbae  push   ax
  0000:dbaf  xor    ax, ax
  0000:dbb1  push   ax
  0000:dbb2  xor    ax, ax
  0000:dbb4  push   ax
  0000:dbb5  xor    ax, ax
  0000:dbb7  push   ax
  0000:dbb8  lcall  U2:0eed:01c2 PrintLn
  0000:dbbd  jmp    0xdbd8
L0dbbf:
  0000:dbbf  mov    di, 0x9f49    ; "^6Ты не можешь занять денег."
  0000:dbc2  push   cs
  0000:dbc3  push   di
  0000:dbc4  xor    ax, ax
  0000:dbc6  push   ax
  0000:dbc7  xor    ax, ax
  0000:dbc9  push   ax
  0000:dbca  xor    ax, ax
  0000:dbcc  push   ax
  0000:dbcd  xor    ax, ax
  0000:dbcf  push   ax
  0000:dbd0  xor    ax, ax
  0000:dbd2  push   ax
  0000:dbd3  lcall  U2:0eed:01c2 PrintLn
L0dbd8:
  0000:dbd8  jmp    0xdbf3
L0dbda:
  0000:dbda  mov    di, 0x9f66    ; "^6Ты уже всю мелочь выгреб!"
  0000:dbdd  push   cs
  0000:dbde  push   di
  0000:dbdf  xor    ax, ax
  0000:dbe1  push   ax
  0000:dbe2  xor    ax, ax
  0000:dbe4  push   ax
  0000:dbe5  xor    ax, ax
  0000:dbe7  push   ax
  0000:dbe8  xor    ax, ax
  0000:dbea  push   ax
  0000:dbeb  xor    ax, ax
  0000:dbed  push   ax
  0000:dbee  lcall  U2:0eed:01c2 PrintLn
L0dbf3:
  0000:dbf3  cmp    byte ptr [g3b78], 1
  0000:dbf8  jne    0xdc63
  0000:dbfa  mov    di, 0x3a72
  0000:dbfd  push   ds
  0000:dbfe  push   di
  0000:dbff  mov    di, 0x9f82    ; "hp"
  0000:dc02  push   cs
  0000:dc03  push   di
  0000:dc04  lcall  SYS:0f78:0bd8 StrCmp
  0000:dc09  jne    0xdc63
  0000:dc0b  mov    al, 1
  0000:dc0d  push   ax
  0000:dc0e  call   0x10d14
  0000:dc11  mov    byte ptr [g3b72], 1
  0000:dc16  lea    di, [bp - 0x100]
  0000:dc1a  push   ss
  0000:dc1b  push   di
  0000:dc1c  mov    di, 0x90c0    ; "^6Это "
  0000:dc1f  push   cs
  0000:dc20  push   di
  0000:dc21  lcall  SYS:0f78:0ae7 StrLoad
  0000:dc26  mov    di, word ptr [g3952]
  0000:dc2a  mov    cl, 8
  0000:dc2c  shl    di, cl
  0000:dc2e  add    di, 0x2e
  0000:dc32  push   ds
  0000:dc33  push   di
  0000:dc34  lcall  SYS:0f78:0b66 StrConcat
  0000:dc39  mov    di, 0x90c7    ; " # уровня."
  0000:dc3c  push   cs
  0000:dc3d  push   di
  0000:dc3e  lcall  SYS:0f78:0b66 StrConcat
  0000:dc43  push   word ptr [g395c]
  0000:dc47  xor    ax, ax
  0000:dc49  push   ax
  0000:dc4a  xor    ax, ax
  0000:dc4c  push   ax
  0000:dc4d  xor    ax, ax
  0000:dc4f  push   ax
  0000:dc50  xor    ax, ax
  0000:dc52  push   ax
  0000:dc53  lcall  U2:0eed:01c2 PrintLn
  0000:dc58  mov    al, 6
  0000:dc5a  push   ax
  0000:dc5b  call   0x13d11
  0000:dc5e  mov    byte ptr [g3b78], 0
L0dc63:
  0000:dc63  mov    di, 0x3a72
  0000:dc66  push   ds
  0000:dc67  push   di
  0000:dc68  mov    di, 0x9f85    ; "s"
  0000:dc6b  push   cs
  0000:dc6c  push   di
  0000:dc6d  lcall  SYS:0f78:0bd8 StrCmp
  0000:dc72  jne    0xdcba
  0000:dc74  mov    di, 0x9f87    ; "^4Твоя понтовость сейчас = #."
  0000:dc77  push   cs
  0000:dc78  push   di
  0000:dc79  push   word ptr [g38cb]
  0000:dc7d  xor    ax, ax
  0000:dc7f  push   ax
  0000:dc80  xor    ax, ax
  0000:dc82  push   ax
  0000:dc83  xor    ax, ax
  0000:dc85  push   ax
  0000:dc86  xor    ax, ax
  0000:dc88  push   ax
  0000:dc89  lcall  U2:0eed:01c2 PrintLn
  0000:dc8e  mov    al, byte ptr [g3692]
  0000:dc91  xor    ah, ah
  0000:dc93  mov    dx, 0xa
  0000:dc96  mul    dx
  0000:dc98  add    ax, 0xa
  0000:dc9b  cmp    ax, word ptr [g38cb]
  0000:dc9f  jg     0xdcba
  0000:dca1  mov    di, 0x9fa5    ; "^0Да если чё мы за тебя впрягаемся."
  0000:dca4  push   cs
  0000:dca5  push   di
  0000:dca6  xor    ax, ax
  0000:dca8  push   ax
  0000:dca9  xor    ax, ax
  0000:dcab  push   ax
  0000:dcac  xor    ax, ax
  0000:dcae  push   ax
  0000:dcaf  xor    ax, ax
  0000:dcb1  push   ax
  0000:dcb2  xor    ax, ax
  0000:dcb4  push   ax
  0000:dcb5  lcall  U2:0eed:01c2 PrintLn
L0dcba:
  0000:dcba  cmp    byte ptr [g3695], 0
  0000:dcbf  je     0xdcc8
  0000:dcc1  cmp    byte ptr [g369a], 0
  0000:dcc6  jne    0xdd32
L0dcc8:
  0000:dcc8  mov    al, byte ptr [g3692]
  0000:dccb  xor    ah, ah
  0000:dccd  dec    ax
  0000:dcce  mov    dx, 0xa
  0000:dcd1  mul    dx
  0000:dcd3  mov    dx, ax
  0000:dcd5  mov    ax, word ptr [g38a6]
  0000:dcd8  sub    ax, dx
  0000:dcda  shl    ax, 1
  0000:dcdc  add    ax, word ptr [g38cb]
  0000:dce0  cmp    ax, 0x28
  0000:dce3  jl     0xdd32
  0000:dce5  mov    di, 0x3a72
  0000:dce8  push   ds
  0000:dce9  push   di
  0000:dcea  mov    di, 0x9fc9    ; "a"
  0000:dced  push   cs
  0000:dcee  push   di
  0000:dcef  lcall  SYS:0f78:0bd8 StrCmp
  0000:dcf4  jne    0xdd32
  0000:dcf6  mov    byte ptr [g3695], 1
  0000:dcfb  mov    byte ptr [g369a], 1
  0000:dd00  mov    di, 0x9fcb    ; "^0Тут у нас есть пара мест куда тебе стоит сходить"
  0000:dd03  push   cs
  0000:dd04  push   di
  0000:dd05  xor    ax, ax
  0000:dd07  push   ax
  0000:dd08  xor    ax, ax
  0000:dd0a  push   ax
  0000:dd0b  xor    ax, ax
  0000:dd0d  push   ax
  0000:dd0e  xor    ax, ax
  0000:dd10  push   ax
  0000:dd11  xor    ax, ax
  0000:dd13  push   ax
  0000:dd14  lcall  U2:0eed:01c2 PrintLn
  0000:dd19  mov    di, 0x9ffe    ; "^2Ты узнал где находится качалка и где находятся барыги"
  0000:dd1c  push   cs
  0000:dd1d  push   di
  0000:dd1e  xor    ax, ax
  0000:dd20  push   ax
  0000:dd21  xor    ax, ax
  0000:dd23  push   ax
  0000:dd24  xor    ax, ax
  0000:dd26  push   ax
  0000:dd27  xor    ax, ax
  0000:dd29  push   ax
  0000:dd2a  xor    ax, ax
  0000:dd2c  push   ax
  0000:dd2d  lcall  U2:0eed:01c2 PrintLn
L0dd32:
  0000:dd32  mov    di, 0x3a72
  0000:dd35  push   ds
  0000:dd36  push   di
  0000:dd37  mov    di, 0xa036    ; "d"
  0000:dd3a  push   cs
  0000:dd3b  push   di
  0000:dd3c  lcall  SYS:0f78:0bd8 StrCmp
  0000:dd41  je     0xdd46
  0000:dd43  jmp    0xdecd
L0dd46:
  0000:dd46  cmp    word ptr [g38cb], 0x64
  0000:dd4b  jge    0xdd50
  0000:dd4d  jmp    0xdecd
L0dd50:
  0000:dd50  cmp    byte ptr [g3b79], 0
  0000:dd55  jne    0xdd5a
  0000:dd57  jmp    0xdecd
L0dd5a:
  0000:dd5a  mov    di, 0xa038    ; "^0Давай быстрее.."
  0000:dd5d  push   cs
  0000:dd5e  push   di
  0000:dd5f  xor    ax, ax
  0000:dd61  push   ax
  0000:dd62  xor    ax, ax
  0000:dd64  push   ax
  0000:dd65  xor    ax, ax
  0000:dd67  push   ax
  0000:dd68  xor    ax, ax
  0000:dd6a  push   ax
  0000:dd6b  xor    ax, ax
  0000:dd6d  push   ax
  0000:dd6e  lcall  U2:0eed:01c2 PrintLn
  0000:dd73  mov    di, 0xa04a    ; "^2Ты пришел воровать деньги"
  0000:dd76  push   cs
  0000:dd77  push   di
  0000:dd78  xor    ax, ax
  0000:dd7a  push   ax
  0000:dd7b  xor    ax, ax
  0000:dd7d  push   ax
  0000:dd7e  xor    ax, ax
  0000:dd80  push   ax
  0000:dd81  xor    ax, ax
  0000:dd83  push   ax
  0000:dd84  xor    ax, ax
  0000:dd86  push   ax
  0000:dd87  lcall  U2:0eed:01c2 PrintLn
  0000:dd8c  mov    al, byte ptr [g3692]
  0000:dd8f  xor    ah, ah
  0000:dd91  mov    dx, 0xf
  0000:dd94  mul    dx
  0000:dd96  push   ax
  0000:dd97  lcall  SYS:0f78:114b Random
  0000:dd9c  xor    dx, dx
  0000:dd9e  mov    cx, ax
  0000:dda0  mov    bx, dx
  0000:dda2  mov    ax, word ptr [g38a4]
  0000:dda5  cdq    
  0000:dda6  cmp    dx, bx
  0000:dda8  jl     0xddb6
  0000:ddaa  jle    0xddaf
  0000:ddac  jmp    0xde36
L0ddaf:
  0000:ddaf  cmp    ax, cx
  0000:ddb1  jb     0xddb6
  0000:ddb3  jmp    0xde36
L0ddb6:
  0000:ddb6  mov    di, 0xa066    ; "^4Шухер менты!"
  0000:ddb9  push   cs
  0000:ddba  push   di
  0000:ddbb  xor    ax, ax
  0000:ddbd  push   ax
  0000:ddbe  xor    ax, ax
  0000:ddc0  push   ax
  0000:ddc1  xor    ax, ax
  0000:ddc3  push   ax
  0000:ddc4  xor    ax, ax
  0000:ddc6  push   ax
  0000:ddc7  xor    ax, ax
  0000:ddc9  push   ax
  0000:ddca  lcall  U2:0eed:01c2 PrintLn
  0000:ddcf  mov    al, byte ptr [g3692]
  0000:ddd2  xor    ah, ah
  0000:ddd4  mov    dx, 0xf
  0000:ddd7  mul    dx
  0000:ddd9  push   ax
  0000:ddda  lcall  SYS:0f78:114b Random
  0000:dddf  xor    dx, dx
  0000:dde1  mov    cx, ax
  0000:dde3  mov    bx, dx
  0000:dde5  mov    ax, word ptr [g38a4]
  0000:dde8  cdq    
  0000:dde9  cmp    dx, bx
  0000:ddeb  jl     0xddf3
  0000:dded  jg     0xde1a
  0000:ddef  cmp    ax, cx
  0000:ddf1  jae    0xde1a
L0ddf3:
  0000:ddf3  mov    al, 2
  0000:ddf5  push   ax
  0000:ddf6  call   0x10d14
  0000:ddf9  mov    al, 5
  0000:ddfb  push   ax
  0000:ddfc  call   0x13d11
  0000:ddff  mov    di, 0xa075    ; "^6Пора валить!"
  0000:de02  push   cs
  0000:de03  push   di
  0000:de04  xor    ax, ax
  0000:de06  push   ax
  0000:de07  xor    ax, ax
  0000:de09  push   ax
  0000:de0a  xor    ax, ax
  0000:de0c  push   ax
  0000:de0d  xor    ax, ax
  0000:de0f  push   ax
  0000:de10  xor    ax, ax
  0000:de12  push   ax
  0000:de13  lcall  U2:0eed:01c2 PrintLn
  0000:de18  jmp    0xde33
L0de1a:
  0000:de1a  mov    di, 0xa084    ; "^2Ты смылся от ментов."
  0000:de1d  push   cs
  0000:de1e  push   di
  0000:de1f  xor    ax, ax
  0000:de21  push   ax
  0000:de22  xor    ax, ax
  0000:de24  push   ax
  0000:de25  xor    ax, ax
  0000:de27  push   ax
  0000:de28  xor    ax, ax
  0000:de2a  push   ax
  0000:de2b  xor    ax, ax
  0000:de2d  push   ax
  0000:de2e  lcall  U2:0eed:01c2 PrintLn
L0de33:
  0000:de33  jmp    0xdec8
L0de36:
  0000:de36  mov    di, 0xa09b    ; "^2Ты наваровал денег"
  0000:de39  push   cs
  0000:de3a  push   di
  0000:de3b  xor    ax, ax
  0000:de3d  push   ax
  0000:de3e  xor    ax, ax
  0000:de40  push   ax
  0000:de41  xor    ax, ax
  0000:de43  push   ax
  0000:de44  xor    ax, ax
  0000:de46  push   ax
  0000:de47  xor    ax, ax
  0000:de49  push   ax
  0000:de4a  lcall  U2:0eed:01c2 PrintLn
  0000:de4f  mov    al, byte ptr [g3692]
  0000:de52  xor    ah, ah
  0000:de54  mov    dx, 0xa
  0000:de57  mul    dx
  0000:de59  push   ax
  0000:de5a  lcall  SYS:0f78:114b Random
  0000:de5f  mov    cx, ax
  0000:de61  mov    al, byte ptr [g3692]
  0000:de64  xor    ah, ah
  0000:de66  mov    dx, 0xa
  0000:de69  mul    dx
  0000:de6b  add    ax, cx
  0000:de6d  add    word ptr [g38c7], ax
  0000:de71  mov    al, byte ptr [g3692]
  0000:de74  xor    ah, ah
  0000:de76  mov    dx, 0xa
  0000:de79  mul    dx
  0000:de7b  push   ax
  0000:de7c  lcall  SYS:0f78:114b Random
  0000:de81  mov    cx, ax
  0000:de83  mov    al, byte ptr [g3692]
  0000:de86  xor    ah, ah
  0000:de88  mov    dx, 0xa
  0000:de8b  mul    dx
  0000:de8d  add    ax, cx
  0000:de8f  add    word ptr [g38c9], ax
  0000:de93  mov    di, 0x908b    ; "^6Ты получаешь # качков опыта"
  0000:de96  push   cs
  0000:de97  push   di
  0000:de98  mov    al, byte ptr [g3692]
  0000:de9b  xor    ah, ah
  0000:de9d  mov    dx, 0xc
  0000:dea0  mul    dx
  0000:dea2  push   ax
  0000:dea3  xor    ax, ax
  0000:dea5  push   ax
  0000:dea6  xor    ax, ax
  0000:dea8  push   ax
  0000:dea9  xor    ax, ax
  0000:deab  push   ax
  0000:deac  xor    ax, ax
  0000:deae  push   ax
  0000:deaf  lcall  U2:0eed:01c2 PrintLn
  0000:deb4  mov    al, byte ptr [g3692]
  0000:deb7  xor    ah, ah
  0000:deb9  mov    dx, 0xc
  0000:debc  mul    dx
  0000:debe  add    word ptr [g38ce], ax
  0000:dec2  mov    al, 0
  0000:dec4  push   ax
  0000:dec5  call   0x12526
L0dec8:
  0000:dec8  mov    byte ptr [g3b79], 0
L0decd:
  0000:decd  mov    di, 0x3a72
  0000:ded0  push   ds
  0000:ded1  push   di
  0000:ded2  mov    di, 0x848e    ; "w"
  0000:ded5  push   cs
  0000:ded6  push   di
  0000:ded7  lcall  SYS:0f78:0bd8 StrCmp
  0000:dedc  je     0xdee1
  0000:dede  jmp    0xdae2
L0dee1:
  0000:dee1  jmp    0xdefc
L0dee3:
  0000:dee3  mov    di, 0xa0b0    ; "^4Тебя мудака такого туда не пустят - поднимай понтовость"
  0000:dee6  push   cs
  0000:dee7  push   di
  0000:dee8  xor    ax, ax
  0000:deea  push   ax
  0000:deeb  xor    ax, ax
  0000:deed  push   ax
  0000:deee  xor    ax, ax
  0000:def0  push   ax
  0000:def1  xor    ax, ax
  0000:def3  push   ax
  0000:def4  xor    ax, ax
  0000:def6  push   ax
  0000:def7  lcall  U2:0eed:01c2 PrintLn
L0defc:
  0000:defc  mov    di, 0x3972
  0000:deff  push   ds
  0000:df00  push   di
  0000:df01  mov    di, 0xa0ea    ; "kl"
  0000:df04  push   cs
  0000:df05  push   di
  0000:df06  lcall  SYS:0f78:0bd8 StrCmp
  0000:df0b  je     0xdf10
  0000:df0d  jmp    0xe386
L0df10:
  0000:df10  cmp    byte ptr [g3699], 1
  0000:df15  je     0xdf1a
  0000:df17  jmp    0xe36d
L0df1a:
  0000:df1a  cmp    byte ptr [g3b77], 0
  0000:df1f  jbe    0xdf3d
  0000:df21  mov    di, 0xa0ed    ; "^6Тебе не стоит пока туда соваться"
  0000:df24  push   cs
  0000:df25  push   di
  0000:df26  xor    ax, ax
  0000:df28  push   ax
  0000:df29  xor    ax, ax
  0000:df2b  push   ax
  0000:df2c  xor    ax, ax
  0000:df2e  push   ax
  0000:df2f  xor    ax, ax
  0000:df31  push   ax
  0000:df32  xor    ax, ax
  0000:df34  push   ax
  0000:df35  lcall  U2:0eed:01c2 PrintLn
  0000:df3a  jmp    0xe36b
L0df3d:
  0000:df3d  mov    di, 0xa110    ; "Ты пришел в клуб напиши  ^6w^7  чтобы уйти"
  0000:df40  push   cs
  0000:df41  push   di
  0000:df42  xor    ax, ax
  0000:df44  push   ax
  0000:df45  xor    ax, ax
  0000:df47  push   ax
  0000:df48  xor    ax, ax
  0000:df4a  push   ax
  0000:df4b  xor    ax, ax
  0000:df4d  push   ax
  0000:df4e  xor    ax, ax
  0000:df50  push   ax
  0000:df51  lcall  U2:0eed:01c2 PrintLn
  0000:df56  mov    di, 0xa13b    ; " Здесь можно сыграть в карты (^6p^7 Минимальная ставка- 5р.)"
  0000:df59  push   cs
  0000:df5a  push   di
  0000:df5b  xor    ax, ax
  0000:df5d  push   ax
  0000:df5e  xor    ax, ax
  0000:df60  push   ax
  0000:df61  xor    ax, ax
  0000:df63  push   ax
  0000:df64  xor    ax, ax
  0000:df66  push   ax
  0000:df67  xor    ax, ax
  0000:df69  push   ax
  0000:df6a  lcall  U2:0eed:01c2 PrintLn
  0000:df6f  cmp    word ptr [g38c7], 0xf
  0000:df74  jl     0xdf7d
  0000:df76  mov    byte ptr [g3b7a], 0x30
  0000:df7b  jmp    0xdf82
L0df7d:
  0000:df7d  mov    byte ptr [g3b7a], 0x34
L0df82:
  0000:df82  lea    di, [bp - 0x200]
  0000:df86  push   ss
  0000:df87  push   di
  0000:df88  mov    di, 0xa178    ; " 1 -  ^"
  0000:df8b  push   cs
  0000:df8c  push   di
  0000:df8d  lcall  SYS:0f78:0ae7 StrLoad
  0000:df92  lea    di, [bp - 0x100]
  0000:df96  push   ss
  0000:df97  push   di
  0000:df98  mov    al, byte ptr [g3b7a]
  0000:df9b  push   ax
  0000:df9c  lcall  SYS:0f78:0c03 CharToStr
  0000:dfa1  lcall  SYS:0f78:0b66 StrConcat
  0000:dfa6  mov    di, 0xa180    ; "15^7  потусоваться на дискотеке(Ловкость +1)"
  0000:dfa9  push   cs
  0000:dfaa  push   di
  0000:dfab  lcall  SYS:0f78:0b66 StrConcat
  0000:dfb0  xor    ax, ax
  0000:dfb2  push   ax
  0000:dfb3  xor    ax, ax
  0000:dfb5  push   ax
  0000:dfb6  xor    ax, ax
  0000:dfb8  push   ax
  0000:dfb9  xor    ax, ax
  0000:dfbb  push   ax
  0000:dfbc  xor    ax, ax
  0000:dfbe  push   ax
  0000:dfbf  lcall  U2:0eed:01c2 PrintLn
  0000:dfc4  cmp    byte ptr [g3692], 1
  0000:dfc9  jbe    0xe020
  0000:dfcb  cmp    word ptr [g38c7], 0x16
  0000:dfd0  jl     0xdfd9
  0000:dfd2  mov    byte ptr [g3b7a], 0x30
  0000:dfd7  jmp    0xdfde
L0dfd9:
  0000:dfd9  mov    byte ptr [g3b7a], 0x34
L0dfde:
  0000:dfde  lea    di, [bp - 0x200]
  0000:dfe2  push   ss
  0000:dfe3  push   di
  0000:dfe4  mov    di, 0xa1ad    ; " 2 -  ^"
  0000:dfe7  push   cs
  0000:dfe8  push   di
  0000:dfe9  lcall  SYS:0f78:0ae7 StrLoad
  0000:dfee  lea    di, [bp - 0x100]
  0000:dff2  push   ss
  0000:dff3  push   di
  0000:dff4  mov    al, byte ptr [g3b7a]
  0000:dff7  push   ax
  0000:dff8  lcall  SYS:0f78:0c03 CharToStr
  0000:dffd  lcall  SYS:0f78:0b66 StrConcat
  0000:e002  mov    di, 0xa1b5    ; "22^7  разузнать приемы мухлёжников(Удача +1)"
  0000:e005  push   cs
  0000:e006  push   di
  0000:e007  lcall  SYS:0f78:0b66 StrConcat
  0000:e00c  xor    ax, ax
  0000:e00e  push   ax
  0000:e00f  xor    ax, ax
  0000:e011  push   ax
  0000:e012  xor    ax, ax
  0000:e014  push   ax
  0000:e015  xor    ax, ax
  0000:e017  push   ax
  0000:e018  xor    ax, ax
  0000:e01a  push   ax
  0000:e01b  lcall  U2:0eed:01c2 PrintLn
L0e020:
  0000:e020  mov    byte ptr [g3c82], 5
L0e025:
  0000:e025  mov    di, 0xa1e2    ; "^0Клуб\"
  0000:e028  push   cs
  0000:e029  push   di
  0000:e02a  xor    ax, ax
  0000:e02c  push   ax
  0000:e02d  xor    ax, ax
  0000:e02f  push   ax
  0000:e030  xor    ax, ax
  0000:e032  push   ax
  0000:e033  xor    ax, ax
  0000:e035  push   ax
  0000:e036  xor    ax, ax
  0000:e038  push   ax
  0000:e039  lcall  U2:0eed:0000 Print
  0000:e03e  mov    di, 0x3ecc
  0000:e041  push   ds
  0000:e042  push   di
  0000:e043  mov    di, 0x3a72
  0000:e046  push   ds
  0000:e047  push   di
  0000:e048  mov    ax, 0xff
  0000:e04b  push   ax
  0000:e04c  lcall  SYS:0f78:06c6 ReadStr
  0000:e051  lcall  SYS:0f78:059d ReadLnEnd
  0000:e056  lcall  SYS:0f78:0291 IOCheck
  0000:e05b  mov    di, 0x3a72
  0000:e05e  push   ds
  0000:e05f  push   di
  0000:e060  lcall  U2:0eed:0216 LowerCase
  0000:e065  mov    di, 0x3a72
  0000:e068  push   ds
  0000:e069  push   di
  0000:e06a  mov    di, 0x9ec1    ; "p"
  0000:e06d  push   cs
  0000:e06e  push   di
  0000:e06f  lcall  SYS:0f78:0bd8 StrCmp
  0000:e074  je     0xe079
  0000:e076  jmp    0xe274
L0e079:
  0000:e079  mov    al, byte ptr [g3c82]
  0000:e07c  xor    ah, ah
  0000:e07e  cmp    ax, word ptr [g38c7]
  0000:e082  jle    0xe087
  0000:e084  jmp    0xe258
L0e087:
  0000:e087  mov    di, 0xa1ea    ; "Ты поставил # рублей"
  0000:e08a  push   cs
  0000:e08b  push   di
  0000:e08c  mov    al, byte ptr [g3c82]
  0000:e08f  xor    ah, ah
  0000:e091  push   ax
  0000:e092  xor    ax, ax
  0000:e094  push   ax
  0000:e095  xor    ax, ax
  0000:e097  push   ax
  0000:e098  xor    ax, ax
  0000:e09a  push   ax
  0000:e09b  xor    ax, ax
  0000:e09d  push   ax
  0000:e09e  lcall  U2:0eed:01c2 PrintLn
  0000:e0a3  mov    al, byte ptr [g3c82]
  0000:e0a6  xor    ah, ah
  0000:e0a8  sub    word ptr [g38c7], ax
  0000:e0ac  mov    al, byte ptr [g3692]
  0000:e0af  xor    ah, ah
  0000:e0b1  mov    dx, 0xc
  0000:e0b4  mul    dx
  0000:e0b6  push   ax
  0000:e0b7  lcall  SYS:0f78:114b Random
  0000:e0bc  xor    dx, dx
  0000:e0be  mov    cx, ax
  0000:e0c0  mov    bx, dx
  0000:e0c2  mov    ax, word ptr [g38a4]
  0000:e0c5  cdq    
  0000:e0c6  cmp    dx, bx
  0000:e0c8  jg     0xe0d0
  0000:e0ca  jl     0xe129
  0000:e0cc  cmp    ax, cx
  0000:e0ce  jb     0xe129
L0e0d0:
  0000:e0d0  mov    al, byte ptr [g3c82]
  0000:e0d3  xor    ah, ah
  0000:e0d5  shl    ax, 1
  0000:e0d7  add    word ptr [g38c7], ax
  0000:e0db  mov    di, 0xa1ff    ; "^2Ты выиграл # рублей "
  0000:e0de  push   cs
  0000:e0df  push   di
  0000:e0e0  mov    al, byte ptr [g3c82]
  0000:e0e3  xor    ah, ah
  0000:e0e5  push   ax
  0000:e0e6  xor    ax, ax
  0000:e0e8  push   ax
  0000:e0e9  xor    ax, ax
  0000:e0eb  push   ax
  0000:e0ec  xor    ax, ax
  0000:e0ee  push   ax
  0000:e0ef  xor    ax, ax
  0000:e0f1  push   ax
  0000:e0f2  lcall  U2:0eed:01c2 PrintLn
  0000:e0f7  add    byte ptr [g3c82], 2
  0000:e0fc  mov    di, 0x908b    ; "^6Ты получаешь # качков опыта"
  0000:e0ff  push   cs
  0000:e100  push   di
  0000:e101  mov    al, byte ptr [g3692]
  0000:e104  xor    ah, ah
  0000:e106  push   ax
  0000:e107  xor    ax, ax
  0000:e109  push   ax
  0000:e10a  xor    ax, ax
  0000:e10c  push   ax
  0000:e10d  xor    ax, ax
  0000:e10f  push   ax
  0000:e110  xor    ax, ax
  0000:e112  push   ax
  0000:e113  lcall  U2:0eed:01c2 PrintLn
  0000:e118  mov    al, byte ptr [g3692]
  0000:e11b  xor    ah, ah
  0000:e11d  add    word ptr [g38ce], ax
  0000:e121  mov    al, 0
  0000:e123  push   ax
  0000:e124  call   0x12526
  0000:e127  jmp    0xe14a
L0e129:
  0000:e129  mov    di, 0xa216    ; "^4Ты проиграл # рублей"
  0000:e12c  push   cs
  0000:e12d  push   di
  0000:e12e  mov    al, byte ptr [g3c82]
  0000:e131  xor    ah, ah
  0000:e133  push   ax
  0000:e134  xor    ax, ax
  0000:e136  push   ax
  0000:e137  xor    ax, ax
  0000:e139  push   ax
  0000:e13a  xor    ax, ax
  0000:e13c  push   ax
  0000:e13d  xor    ax, ax
  0000:e13f  push   ax
  0000:e140  lcall  U2:0eed:01c2 PrintLn
  0000:e145  mov    byte ptr [g3c82], 5
L0e14a:
  0000:e14a  cmp    byte ptr [g3c82], 0x11
  0000:e14f  jae    0xe174
  0000:e151  cmp    byte ptr [g3c82], 5
  0000:e156  jbe    0xe174
  0000:e158  mov    di, 0xa22d    ; "^6Ставки изменились. Теперь ставка - #"
  0000:e15b  push   cs
  0000:e15c  push   di
  0000:e15d  mov    al, byte ptr [g3c82]
  0000:e160  xor    ah, ah
  0000:e162  push   ax
  0000:e163  xor    ax, ax
  0000:e165  push   ax
  0000:e166  xor    ax, ax
  0000:e168  push   ax
  0000:e169  xor    ax, ax
  0000:e16b  push   ax
  0000:e16c  xor    ax, ax
  0000:e16e  push   ax
  0000:e16f  lcall  U2:0eed:01c2 PrintLn
L0e174:
  0000:e174  cmp    byte ptr [g3c82], 0x11
  0000:e179  jae    0xe17e
  0000:e17b  jmp    0xe256
L0e17e:
  0000:e17e  mov    al, 1
  0000:e180  push   ax
  0000:e181  call   0x10d14
  0000:e184  mov    byte ptr [g3b72], 1
  0000:e189  mov    di, 0xa254    ; "^4Козёл! Да ты мухлевал!"
  0000:e18c  push   cs
  0000:e18d  push   di
  0000:e18e  xor    ax, ax
  0000:e190  push   ax
  0000:e191  xor    ax, ax
  0000:e193  push   ax
  0000:e194  xor    ax, ax
  0000:e196  push   ax
  0000:e197  xor    ax, ax
  0000:e199  push   ax
  0000:e19a  xor    ax, ax
  0000:e19c  push   ax
  0000:e19d  lcall  U2:0eed:01c2 PrintLn
  0000:e1a2  lea    di, [bp - 0x100]
  0000:e1a6  push   ss
  0000:e1a7  push   di
  0000:e1a8  mov    di, 0x90c0    ; "^6Это "
  0000:e1ab  push   cs
  0000:e1ac  push   di
  0000:e1ad  lcall  SYS:0f78:0ae7 StrLoad
  0000:e1b2  mov    di, word ptr [g3952]
  0000:e1b6  mov    cl, 8
  0000:e1b8  shl    di, cl
  0000:e1ba  add    di, 0x2e
  0000:e1be  push   ds
  0000:e1bf  push   di
  0000:e1c0  lcall  SYS:0f78:0b66 StrConcat
  0000:e1c5  mov    di, 0x90c7    ; " # уровня."
  0000:e1c8  push   cs
  0000:e1c9  push   di
  0000:e1ca  lcall  SYS:0f78:0b66 StrConcat
  0000:e1cf  push   word ptr [g395c]
  0000:e1d3  xor    ax, ax
  0000:e1d5  push   ax
  0000:e1d6  xor    ax, ax
  0000:e1d8  push   ax
  0000:e1d9  xor    ax, ax
  0000:e1db  push   ax
  0000:e1dc  xor    ax, ax
  0000:e1de  push   ax
  0000:e1df  lcall  U2:0eed:01c2 PrintLn
  0000:e1e4  mov    di, 0xa26d    ; "^6Ты получаешь # качков опыта за победу в игре"
  0000:e1e7  push   cs
  0000:e1e8  push   di
  0000:e1e9  mov    al, byte ptr [g3692]
  0000:e1ec  xor    ah, ah
  0000:e1ee  mov    si, ax
  0000:e1f0  shl    ax, 1
  0000:e1f2  shl    ax, 1
  0000:e1f4  add    ax, si
  0000:e1f6  push   ax
  0000:e1f7  xor    ax, ax
  0000:e1f9  push   ax
  0000:e1fa  xor    ax, ax
  0000:e1fc  push   ax
  0000:e1fd  xor    ax, ax
  0000:e1ff  push   ax
  0000:e200  xor    ax, ax
  0000:e202  push   ax
  0000:e203  lcall  U2:0eed:01c2 PrintLn
  0000:e208  mov    al, byte ptr [g3692]
  0000:e20b  xor    ah, ah
  0000:e20d  mov    si, ax
  0000:e20f  shl    ax, 1
  0000:e211  shl    ax, 1
  0000:e213  add    ax, si
  0000:e215  add    word ptr [g38ce], ax
  0000:e219  mov    al, 0
  0000:e21b  push   ax
  0000:e21c  call   0x12526
  0000:e21f  mov    al, 2
  0000:e221  push   ax
  0000:e222  call   0x13d11
  0000:e225  mov    di, 0xa29c    ; "^6Уноси ноги, пока не отобрали деньги другие канадидаты"
  0000:e228  push   cs
  0000:e229  push   di
  0000:e22a  xor    ax, ax
  0000:e22c  push   ax
  0000:e22d  xor    ax, ax
  0000:e22f  push   ax
  0000:e230  xor    ax, ax
  0000:e232  push   ax
  0000:e233  xor    ax, ax
  0000:e235  push   ax
  0000:e236  xor    ax, ax
  0000:e238  push   ax
  0000:e239  lcall  U2:0eed:01c2 PrintLn
  0000:e23e  mov    byte ptr [g3b77], 5
  0000:e243  mov    di, 0x848e    ; "w"
  0000:e246  push   cs
  0000:e247  push   di
  0000:e248  mov    di, 0x3a72
  0000:e24b  push   ds
  0000:e24c  push   di
  0000:e24d  mov    ax, 0xff
  0000:e250  push   ax
  0000:e251  lcall  SYS:0f78:0b01 StrStore
L0e256:
  0000:e256  jmp    0xe274
L0e258:
  0000:e258  mov    di, 0xa2d4    ; "^6Не хватает денег - надо #."
  0000:e25b  push   cs
  0000:e25c  push   di
  0000:e25d  mov    al, byte ptr [g3c82]
  0000:e260  xor    ah, ah
  0000:e262  push   ax
  0000:e263  xor    ax, ax
  0000:e265  push   ax
  0000:e266  xor    ax, ax
  0000:e268  push   ax
  0000:e269  xor    ax, ax
  0000:e26b  push   ax
  0000:e26c  xor    ax, ax
  0000:e26e  push   ax
  0000:e26f  lcall  U2:0eed:01c2 PrintLn
L0e274:
  0000:e274  mov    di, 0x3a72
  0000:e277  push   ds
  0000:e278  push   di
  0000:e279  mov    di, 0x8dca    ; "1"
  0000:e27c  push   cs
  0000:e27d  push   di
  0000:e27e  lcall  SYS:0f78:0bd8 StrCmp
  0000:e283  jne    0xe2e2
  0000:e285  cmp    word ptr [g38c7], 0xf
  0000:e28a  jge    0xe2a7
  0000:e28c  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:e28f  push   cs
  0000:e290  push   di
  0000:e291  xor    ax, ax
  0000:e293  push   ax
  0000:e294  xor    ax, ax
  0000:e296  push   ax
  0000:e297  xor    ax, ax
  0000:e299  push   ax
  0000:e29a  xor    ax, ax
  0000:e29c  push   ax
  0000:e29d  xor    ax, ax
  0000:e29f  push   ax
  0000:e2a0  lcall  U2:0eed:01c2 PrintLn
  0000:e2a5  jmp    0xe2e2
L0e2a7:
  0000:e2a7  sub    word ptr [g38c7], 0xf
  0000:e2ac  mov    di, 0xa2f1    ; "^2Ты прокачиваешь ловкость."
  0000:e2af  push   cs
  0000:e2b0  push   di
  0000:e2b1  xor    ax, ax
  0000:e2b3  push   ax
  0000:e2b4  xor    ax, ax
  0000:e2b6  push   ax
  0000:e2b7  xor    ax, ax
  0000:e2b9  push   ax
  0000:e2ba  xor    ax, ax
  0000:e2bc  push   ax
  0000:e2bd  xor    ax, ax
  0000:e2bf  push   ax
  0000:e2c0  lcall  U2:0eed:01c2 PrintLn
  0000:e2c5  inc    word ptr [g38a0]
  0000:e2c9  mov    di, 0x940d    ; "^1Ловкость +1 "
  0000:e2cc  push   cs
  0000:e2cd  push   di
  0000:e2ce  xor    ax, ax
  0000:e2d0  push   ax
  0000:e2d1  xor    ax, ax
  0000:e2d3  push   ax
  0000:e2d4  xor    ax, ax
  0000:e2d6  push   ax
  0000:e2d7  xor    ax, ax
  0000:e2d9  push   ax
  0000:e2da  xor    ax, ax
  0000:e2dc  push   ax
  0000:e2dd  lcall  U2:0eed:01c2 PrintLn
L0e2e2:
  0000:e2e2  cmp    byte ptr [g3692], 1
  0000:e2e7  jbe    0xe357
  0000:e2e9  mov    di, 0x3a72
  0000:e2ec  push   ds
  0000:e2ed  push   di
  0000:e2ee  mov    di, 0x8e4b    ; "2"
  0000:e2f1  push   cs
  0000:e2f2  push   di
  0000:e2f3  lcall  SYS:0f78:0bd8 StrCmp
  0000:e2f8  jne    0xe357
  0000:e2fa  cmp    word ptr [g38c7], 0x16
  0000:e2ff  jge    0xe31c
  0000:e301  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:e304  push   cs
  0000:e305  push   di
  0000:e306  xor    ax, ax
  0000:e308  push   ax
  0000:e309  xor    ax, ax
  0000:e30b  push   ax
  0000:e30c  xor    ax, ax
  0000:e30e  push   ax
  0000:e30f  xor    ax, ax
  0000:e311  push   ax
  0000:e312  xor    ax, ax
  0000:e314  push   ax
  0000:e315  lcall  U2:0eed:01c2 PrintLn
  0000:e31a  jmp    0xe357
L0e31c:
  0000:e31c  sub    word ptr [g38c7], 0x16
  0000:e321  mov    di, 0xa30d    ; "^2Ты прокачиваешь удачу."
  0000:e324  push   cs
  0000:e325  push   di
  0000:e326  xor    ax, ax
  0000:e328  push   ax
  0000:e329  xor    ax, ax
  0000:e32b  push   ax
  0000:e32c  xor    ax, ax
  0000:e32e  push   ax
  0000:e32f  xor    ax, ax
  0000:e331  push   ax
  0000:e332  xor    ax, ax
  0000:e334  push   ax
  0000:e335  lcall  U2:0eed:01c2 PrintLn
  0000:e33a  inc    word ptr [g38a4]
  0000:e33e  mov    di, 0x942c    ; "^1Удача +1 "
  0000:e341  push   cs
  0000:e342  push   di
  0000:e343  xor    ax, ax
  0000:e345  push   ax
  0000:e346  xor    ax, ax
  0000:e348  push   ax
  0000:e349  xor    ax, ax
  0000:e34b  push   ax
  0000:e34c  xor    ax, ax
  0000:e34e  push   ax
  0000:e34f  xor    ax, ax
  0000:e351  push   ax
  0000:e352  lcall  U2:0eed:01c2 PrintLn
L0e357:
  0000:e357  mov    di, 0x3a72
  0000:e35a  push   ds
  0000:e35b  push   di
  0000:e35c  mov    di, 0x848e    ; "w"
  0000:e35f  push   cs
  0000:e360  push   di
  0000:e361  lcall  SYS:0f78:0bd8 StrCmp
  0000:e366  je     0xe36b
  0000:e368  jmp    0xe025
L0e36b:
  0000:e36b  jmp    0xe386
L0e36d:
  0000:e36d  mov    di, 0xa326    ; "^6Ты пока что неузнал где в этом районе клуб"
  0000:e370  push   cs
  0000:e371  push   di
  0000:e372  xor    ax, ax
  0000:e374  push   ax
  0000:e375  xor    ax, ax
  0000:e377  push   ax
  0000:e378  xor    ax, ax
  0000:e37a  push   ax
  0000:e37b  xor    ax, ax
  0000:e37d  push   ax
  0000:e37e  xor    ax, ax
  0000:e380  push   ax
  0000:e381  lcall  U2:0eed:01c2 PrintLn
L0e386:
  0000:e386  mov    di, 0x3972
  0000:e389  push   ds
  0000:e38a  push   di
  0000:e38b  mov    di, 0xa353    ; "trn"
  0000:e38e  push   cs
  0000:e38f  push   di
  0000:e390  lcall  SYS:0f78:0bd8 StrCmp
  0000:e395  je     0xe39a
  0000:e397  jmp    0xe961
L0e39a:
  0000:e39a  cmp    byte ptr [g369a], 1
  0000:e39f  je     0xe3a4
  0000:e3a1  jmp    0xe948
L0e3a4:
  0000:e3a4  mov    al, byte ptr [g38b2]
  0000:e3a7  mov    byte ptr [g3e34], al
  0000:e3aa  cmp    byte ptr [g38b4], 0
  0000:e3af  je     0xe3bc
  0000:e3b1  cmp    byte ptr [g38b7], 0
  0000:e3b6  jne    0xe3bc
  0000:e3b8  dec    byte ptr [g3e34]
L0e3bc:
  0000:e3bc  cmp    byte ptr [g38b7], 0
  0000:e3c1  je     0xe3c8
  0000:e3c3  sub    byte ptr [g3e34], 2
L0e3c8:
  0000:e3c8  cmp    byte ptr [g38b6], 0
  0000:e3cd  je     0xe3db
  0000:e3cf  cmp    byte ptr [g38b9], 0
  0000:e3d4  jne    0xe3db
  0000:e3d6  sub    byte ptr [g3e34], 2
L0e3db:
  0000:e3db  cmp    byte ptr [g38b9], 0
  0000:e3e0  je     0xe3e7
  0000:e3e2  sub    byte ptr [g3e34], 4
L0e3e7:
  0000:e3e7  mov    di, 0xa357    ; "Ты пришел в качалку напиши  ^6w^7  чтобы уйти"
  0000:e3ea  push   cs
  0000:e3eb  push   di
  0000:e3ec  xor    ax, ax
  0000:e3ee  push   ax
  0000:e3ef  xor    ax, ax
  0000:e3f1  push   ax
  0000:e3f2  xor    ax, ax
  0000:e3f4  push   ax
  0000:e3f5  xor    ax, ax
  0000:e3f7  push   ax
  0000:e3f8  xor    ax, ax
  0000:e3fa  push   ax
  0000:e3fb  lcall  U2:0eed:01c2 PrintLn
  0000:e400  cmp    word ptr [g38c7], 0x14
  0000:e405  jl     0xe40e
  0000:e407  mov    byte ptr [g3b7a], 0x30
  0000:e40c  jmp    0xe413
L0e40e:
  0000:e40e  mov    byte ptr [g3b7a], 0x34
L0e413:
  0000:e413  lea    di, [bp - 0x200]
  0000:e417  push   ss
  0000:e418  push   di
  0000:e419  mov    di, 0xa178    ; " 1 -  ^"
  0000:e41c  push   cs
  0000:e41d  push   di
  0000:e41e  lcall  SYS:0f78:0ae7 StrLoad
  0000:e423  lea    di, [bp - 0x100]
  0000:e427  push   ss
  0000:e428  push   di
  0000:e429  mov    al, byte ptr [g3b7a]
  0000:e42c  push   ax
  0000:e42d  lcall  SYS:0f78:0c03 CharToStr
  0000:e432  lcall  SYS:0f78:0b66 StrConcat
  0000:e437  mov    di, 0xa385    ; "20^7  качаться гателями и шгангой(Сила +1)"
  0000:e43a  push   cs
  0000:e43b  push   di
  0000:e43c  lcall  SYS:0f78:0b66 StrConcat
  0000:e441  xor    ax, ax
  0000:e443  push   ax
  0000:e444  xor    ax, ax
  0000:e446  push   ax
  0000:e447  xor    ax, ax
  0000:e449  push   ax
  0000:e44a  xor    ax, ax
  0000:e44c  push   ax
  0000:e44d  xor    ax, ax
  0000:e44f  push   ax
  0000:e450  lcall  U2:0eed:01c2 PrintLn
  0000:e455  cmp    word ptr [g38c7], 0x14
  0000:e45a  jl     0xe463
  0000:e45c  mov    byte ptr [g3b7a], 0x30
  0000:e461  jmp    0xe468
L0e463:
  0000:e463  mov    byte ptr [g3b7a], 0x34
L0e468:
  0000:e468  lea    di, [bp - 0x200]
  0000:e46c  push   ss
  0000:e46d  push   di
  0000:e46e  mov    di, 0xa1ad    ; " 2 -  ^"
  0000:e471  push   cs
  0000:e472  push   di
  0000:e473  lcall  SYS:0f78:0ae7 StrLoad
  0000:e478  lea    di, [bp - 0x100]
  0000:e47c  push   ss
  0000:e47d  push   di
  0000:e47e  mov    al, byte ptr [g3b7a]
  0000:e481  push   ax
  0000:e482  lcall  SYS:0f78:0c03 CharToStr
  0000:e487  lcall  SYS:0f78:0b66 StrConcat
  0000:e48c  mov    di, 0xa3b0    ; "20^7  качаться на тренажерах(Выносливость +1)"
  0000:e48f  push   cs
  0000:e490  push   di
  0000:e491  lcall  SYS:0f78:0b66 StrConcat
  0000:e496  xor    ax, ax
  0000:e498  push   ax
  0000:e499  xor    ax, ax
  0000:e49b  push   ax
  0000:e49c  xor    ax, ax
  0000:e49e  push   ax
  0000:e49f  xor    ax, ax
  0000:e4a1  push   ax
  0000:e4a2  xor    ax, ax
  0000:e4a4  push   ax
  0000:e4a5  lcall  U2:0eed:01c2 PrintLn
  0000:e4aa  cmp    byte ptr [g3692], 1
  0000:e4af  jbe    0xe51a
  0000:e4b1  mov    al, byte ptr [g3692]
  0000:e4b4  xor    ah, ah
  0000:e4b6  mov    dx, 0xa
  0000:e4b9  mul    dx
  0000:e4bb  sub    ax, 3
  0000:e4be  cmp    ax, word ptr [g38a6]
  0000:e4c2  jle    0xe51a
  0000:e4c4  cmp    word ptr [g38c7], 0xa
  0000:e4c9  jl     0xe4d2
  0000:e4cb  mov    byte ptr [g3b7a], 0x30
  0000:e4d0  jmp    0xe4d7
L0e4d2:
  0000:e4d2  mov    byte ptr [g3b7a], 0x34
L0e4d7:
  0000:e4d7  lea    di, [bp - 0x200]
  0000:e4db  push   ss
  0000:e4dc  push   di
  0000:e4dd  mov    di, 0xa3de    ; " 3 -  ^"
  0000:e4e0  push   cs
  0000:e4e1  push   di
  0000:e4e2  lcall  SYS:0f78:0ae7 StrLoad
  0000:e4e7  lea    di, [bp - 0x100]
  0000:e4eb  push   ss
  0000:e4ec  push   di
  0000:e4ed  mov    al, byte ptr [g3b7a]
  0000:e4f0  push   ax
  0000:e4f1  lcall  SYS:0f78:0c03 CharToStr
  0000:e4f6  lcall  SYS:0f78:0b66 StrConcat
  0000:e4fb  mov    di, 0xa3e6    ; "10^7  прокачать # качков опыта"
  0000:e4fe  push   cs
  0000:e4ff  push   di
  0000:e500  lcall  SYS:0f78:0b66 StrConcat
  0000:e505  mov    ax, 0xa
  0000:e508  push   ax
  0000:e509  xor    ax, ax
  0000:e50b  push   ax
  0000:e50c  xor    ax, ax
  0000:e50e  push   ax
  0000:e50f  xor    ax, ax
  0000:e511  push   ax
  0000:e512  xor    ax, ax
  0000:e514  push   ax
  0000:e515  lcall  U2:0eed:01c2 PrintLn
L0e51a:
  0000:e51a  cmp    byte ptr [g3692], 1
  0000:e51f  jbe    0xe576
  0000:e521  cmp    word ptr [g38c7], 0x1e
  0000:e526  jl     0xe52f
  0000:e528  mov    byte ptr [g3b7a], 0x30
  0000:e52d  jmp    0xe534
L0e52f:
  0000:e52f  mov    byte ptr [g3b7a], 0x34
L0e534:
  0000:e534  lea    di, [bp - 0x200]
  0000:e538  push   ss
  0000:e539  push   di
  0000:e53a  mov    di, 0xa405    ; " 4 -  ^"
  0000:e53d  push   cs
  0000:e53e  push   di
  0000:e53f  lcall  SYS:0f78:0ae7 StrLoad
  0000:e544  lea    di, [bp - 0x100]
  0000:e548  push   ss
  0000:e549  push   di
  0000:e54a  mov    al, byte ptr [g3b7a]
  0000:e54d  push   ax
  0000:e54e  lcall  SYS:0f78:0c03 CharToStr
  0000:e553  lcall  SYS:0f78:0b66 StrConcat
  0000:e558  mov    di, 0xa40d    ; "30^7  купить зубную защиту боксёров(-75% что сломают челюсть)"
  0000:e55b  push   cs
  0000:e55c  push   di
  0000:e55d  lcall  SYS:0f78:0b66 StrConcat
  0000:e562  xor    ax, ax
  0000:e564  push   ax
  0000:e565  xor    ax, ax
  0000:e567  push   ax
  0000:e568  xor    ax, ax
  0000:e56a  push   ax
  0000:e56b  xor    ax, ax
  0000:e56d  push   ax
  0000:e56e  xor    ax, ax
  0000:e570  push   ax
  0000:e571  lcall  U2:0eed:01c2 PrintLn
L0e576:
  0000:e576  cmp    byte ptr [g3692], 2
  0000:e57b  jbe    0xe5e4
  0000:e57d  mov    al, byte ptr [g3692]
  0000:e580  xor    ah, ah
  0000:e582  shl    ax, 1
  0000:e584  mov    dx, ax
  0000:e586  mov    al, byte ptr [g3e34]
  0000:e589  xor    ah, ah
  0000:e58b  cmp    ax, dx
  0000:e58d  jge    0xe5e4
  0000:e58f  cmp    word ptr [g38c7], 0x14
  0000:e594  jl     0xe59d
  0000:e596  mov    byte ptr [g3b7a], 0x30
  0000:e59b  jmp    0xe5a2
L0e59d:
  0000:e59d  mov    byte ptr [g3b7a], 0x34
L0e5a2:
  0000:e5a2  lea    di, [bp - 0x200]
  0000:e5a6  push   ss
  0000:e5a7  push   di
  0000:e5a8  mov    di, 0xa44b    ; " 5 -  ^"
  0000:e5ab  push   cs
  0000:e5ac  push   di
  0000:e5ad  lcall  SYS:0f78:0ae7 StrLoad
  0000:e5b2  lea    di, [bp - 0x100]
  0000:e5b6  push   ss
  0000:e5b7  push   di
  0000:e5b8  mov    al, byte ptr [g3b7a]
  0000:e5bb  push   ax
  0000:e5bc  lcall  SYS:0f78:0c03 CharToStr
  0000:e5c1  lcall  SYS:0f78:0b66 StrConcat
  0000:e5c6  mov    di, 0xa453    ; "20^7  прокачать пресс(Броня +1)"
  0000:e5c9  push   cs
  0000:e5ca  push   di
  0000:e5cb  lcall  SYS:0f78:0b66 StrConcat
  0000:e5d0  xor    ax, ax
  0000:e5d2  push   ax
  0000:e5d3  xor    ax, ax
  0000:e5d5  push   ax
  0000:e5d6  xor    ax, ax
  0000:e5d8  push   ax
  0000:e5d9  xor    ax, ax
  0000:e5db  push   ax
  0000:e5dc  xor    ax, ax
  0000:e5de  push   ax
  0000:e5df  lcall  U2:0eed:01c2 PrintLn
L0e5e4:
  0000:e5e4  mov    di, 0xa473    ; "^0Качалка\"
  0000:e5e7  push   cs
  0000:e5e8  push   di
  0000:e5e9  xor    ax, ax
  0000:e5eb  push   ax
  0000:e5ec  xor    ax, ax
  0000:e5ee  push   ax
  0000:e5ef  xor    ax, ax
  0000:e5f1  push   ax
  0000:e5f2  xor    ax, ax
  0000:e5f4  push   ax
  0000:e5f5  xor    ax, ax
  0000:e5f7  push   ax
  0000:e5f8  lcall  U2:0eed:0000 Print
  0000:e5fd  mov    di, 0x3ecc
  0000:e600  push   ds
  0000:e601  push   di
  0000:e602  mov    di, 0x3a72
  0000:e605  push   ds
  0000:e606  push   di
  0000:e607  mov    ax, 0xff
  0000:e60a  push   ax
  0000:e60b  lcall  SYS:0f78:06c6 ReadStr
  0000:e610  lcall  SYS:0f78:059d ReadLnEnd
  0000:e615  lcall  SYS:0f78:0291 IOCheck
  0000:e61a  mov    di, 0x3a72
  0000:e61d  push   ds
  0000:e61e  push   di
  0000:e61f  lcall  U2:0eed:0216 LowerCase
  0000:e624  mov    di, 0x3a72
  0000:e627  push   ds
  0000:e628  push   di
  0000:e629  mov    di, 0x8dca    ; "1"
  0000:e62c  push   cs
  0000:e62d  push   di
  0000:e62e  lcall  SYS:0f78:0bd8 StrCmp
  0000:e633  jne    0xe6b0
  0000:e635  cmp    word ptr [g38c7], 0x14
  0000:e63a  jge    0xe657
  0000:e63c  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:e63f  push   cs
  0000:e640  push   di
  0000:e641  xor    ax, ax
  0000:e643  push   ax
  0000:e644  xor    ax, ax
  0000:e646  push   ax
  0000:e647  xor    ax, ax
  0000:e649  push   ax
  0000:e64a  xor    ax, ax
  0000:e64c  push   ax
  0000:e64d  xor    ax, ax
  0000:e64f  push   ax
  0000:e650  lcall  U2:0eed:01c2 PrintLn
  0000:e655  jmp    0xe6b0
L0e657:
  0000:e657  sub    word ptr [g38c7], 0x14
  0000:e65c  mov    di, 0xa47e    ; "^2Ты прокачиваешь силу."
  0000:e65f  push   cs
  0000:e660  push   di
  0000:e661  xor    ax, ax
  0000:e663  push   ax
  0000:e664  xor    ax, ax
  0000:e666  push   ax
  0000:e667  xor    ax, ax
  0000:e669  push   ax
  0000:e66a  xor    ax, ax
  0000:e66c  push   ax
  0000:e66d  xor    ax, ax
  0000:e66f  push   ax
  0000:e670  lcall  U2:0eed:01c2 PrintLn
  0000:e675  inc    word ptr [g389e]
  0000:e679  inc    word ptr [g38ae]
  0000:e67d  inc    word ptr [g38ac]
  0000:e681  mov    ax, word ptr [g389e]
  0000:e684  cdq    
  0000:e685  mov    cx, 2
  0000:e688  idiv   cx
  0000:e68a  xchg   dx, ax
  0000:e68b  or     ax, ax
  0000:e68d  jne    0xe693
  0000:e68f  inc    word ptr [g38a8]
L0e693:
  0000:e693  inc    word ptr [g38aa]
  0000:e697  mov    di, 0x9402    ; "^1Сила +1 "
  0000:e69a  push   cs
  0000:e69b  push   di
  0000:e69c  xor    ax, ax
  0000:e69e  push   ax
  0000:e69f  xor    ax, ax
  0000:e6a1  push   ax
  0000:e6a2  xor    ax, ax
  0000:e6a4  push   ax
  0000:e6a5  xor    ax, ax
  0000:e6a7  push   ax
  0000:e6a8  xor    ax, ax
  0000:e6aa  push   ax
  0000:e6ab  lcall  U2:0eed:01c2 PrintLn
L0e6b0:
  0000:e6b0  mov    di, 0x3a72
  0000:e6b3  push   ds
  0000:e6b4  push   di
  0000:e6b5  mov    di, 0x8e4b    ; "2"
  0000:e6b8  push   cs
  0000:e6b9  push   di
  0000:e6ba  lcall  SYS:0f78:0bd8 StrCmp
  0000:e6bf  jne    0xe728
  0000:e6c1  cmp    word ptr [g38c7], 0x14
  0000:e6c6  jge    0xe6e3
  0000:e6c8  mov    di, 0x8e4d    ; "^4Не хватает"
  0000:e6cb  push   cs
  0000:e6cc  push   di
  0000:e6cd  xor    ax, ax
  0000:e6cf  push   ax
  0000:e6d0  xor    ax, ax
  0000:e6d2  push   ax
  0000:e6d3  xor    ax, ax
  0000:e6d5  push   ax
  0000:e6d6  xor    ax, ax
  0000:e6d8  push   ax
  0000:e6d9  xor    ax, ax
  0000:e6db  push   ax
  0000:e6dc  lcall  U2:0eed:01c2 PrintLn
  0000:e6e1  jmp    0xe728
L0e6e3:
  0000:e6e3  sub    word ptr [g38c7], 0x14
  0000:e6e8  mov    di, 0xa496    ; "^2Ты прокачиваешь выносливость."
  0000:e6eb  push   cs
  0000:e6ec  push   di
  0000:e6ed  xor    ax, ax
  0000:e6ef  push   ax
  0000:e6f0  xor    ax, ax
  0000:e6f2  push   ax
  0000:e6f3  xor    ax, ax
  0000:e6f5  push   ax
  0000:e6f6  xor    ax, ax
  0000:e6f8  push   ax
  0000:e6f9  xor    ax, ax
  0000:e6fb  push   ax
  0000:e6fc  lcall  U2:0eed:01c2 PrintLn
  0000:e701  inc    word ptr [g38a2]
  0000:e705  add    word ptr [g38ae], 5
  0000:e70a  add    word ptr [g38ac], 5
  0000:e70f  mov    di, 0xa4b6    ; "^1Выносливость +1 "
  0000:e712  push   cs
  0000:e713  push   di
  0000:e714  xor    ax, ax
  0000:e716  push   ax
  0000:e717  xor    ax, ax
  0000:e719  push   ax
  0000:e71a  xor    ax, ax
  0000:e71c  push   ax
  0000:e71d  xor    ax, ax
  0000:e71f  push   ax
  0000:e720  xor    ax, ax
  0000:e722  push   ax
  0000:e723  lcall  U2:0eed:01c2 PrintLn
L0e728:
  0000:e728  cmp    byte ptr [g3692], 1
  0000:e72d  ja     0xe732
  0000:e72f  jmp    0xe7e2
L0e732:
  0000:e732  mov    di, 0x3a72
  0000:e735  push   ds
  0000:e736  push   di
  0000:e737  mov    di, 0x8ea5    ; "3"
  0000:e73a  push   cs
  0000:e73b  push   di
  0000:e73c  lcall  SYS:0f78:0bd8 StrCmp
  0000:e741  je     0xe746
  0000:e743  jmp    0xe7e2
L0e746:
  0000:e746  mov    al, byte ptr [g3692]
  0000:e749  xor    ah, ah
  0000:e74b  mov    dx, 0xa
  0000:e74e  mul    dx
  0000:e750  sub    ax, 3
  0000:e753  cmp    ax, word ptr [g38a6]
  0000:e757  jg     0xe774
  0000:e759  mov    di, 0xa4c9    ; "^6Ты слишком крутой чтобы тренироваться здесь."
  0000:e75c  push   cs
  0000:e75d  push   di
  0000:e75e  xor    ax, ax
  0000:e760  push   ax
  0000:e761  xor    ax, ax
  0000:e763  push   ax
  0000:e764  xor    ax, ax
  0000:e766  push   ax
  0000:e767  xor    ax, ax
  0000:e769  push   ax
  0000:e76a  xor    ax, ax
  0000:e76c  push   ax
  0000:e76d  lcall  U2:0eed:01c2 PrintLn
  0000:e772  jmp    0xe7e2
L0e774:
  0000:e774  cmp    word ptr [g38c7], 0xa
  0000:e779  jge    0xe796
  0000:e77b  mov    di, 0x9473    ; "^4Не хватает деньжат"
  0000:e77e  push   cs
  0000:e77f  push   di
  0000:e780  xor    ax, ax
  0000:e782  push   ax
  0000:e783  xor    ax, ax
  0000:e785  push   ax
  0000:e786  xor    ax, ax
  0000:e788  push   ax
  0000:e789  xor    ax, ax
  0000:e78b  push   ax
  0000:e78c  xor    ax, ax
  0000:e78e  push   ax
  0000:e78f  lcall  U2:0eed:01c2 PrintLn
  0000:e794  jmp    0xe7e2
L0e796:
  0000:e796  sub    word ptr [g38c7], 0xa
  0000:e79b  mov    di, 0xa4f8    ; "^2Ты тренируешься."
  0000:e79e  push   cs
  0000:e79f  push   di
  0000:e7a0  xor    ax, ax
  0000:e7a2  push   ax
  0000:e7a3  xor    ax, ax
  0000:e7a5  push   ax
  0000:e7a6  xor    ax, ax
  0000:e7a8  push   ax
  0000:e7a9  xor    ax, ax
  0000:e7ab  push   ax
  0000:e7ac  xor    ax, ax
  0000:e7ae  push   ax
  0000:e7af  lcall  U2:0eed:01c2 PrintLn
  0000:e7b4  add    word ptr [g38ce], 0xa
  0000:e7b9  mov    di, 0xa50b    ; "^1 +# качков опыта "
  0000:e7bc  push   cs
  0000:e7bd  push   di
  0000:e7be  mov    ax, 0xa
  0000:e7c1  push   ax
  0000:e7c2  xor    ax, ax
  0000:e7c4  push   ax
  0000:e7c5  xor    ax, ax
  0000:e7c7  push   ax
  0000:e7c8  xor    ax, ax
  0000:e7ca  push   ax
  0000:e7cb  xor    ax, ax
  0000:e7cd  push   ax
  0000:e7ce  lcall  U2:0eed:01c2 PrintLn
  0000:e7d3  mov    ax, word ptr [g38ce]
  0000:e7d6  cmp    ax, word ptr [g38d0]
  0000:e7da  jl     0xe7e2
  0000:e7dc  mov    al, 0
  0000:e7de  push   ax
  0000:e7df  call   0x12526
L0e7e2:
  0000:e7e2  cmp    byte ptr [g3692], 1
  0000:e7e7  jbe    0xe861
  0000:e7e9  mov    di, 0x3a72
  0000:e7ec  push   ds
  0000:e7ed  push   di
  0000:e7ee  mov    di, 0x8ef7    ; "4"
  0000:e7f1  push   cs
  0000:e7f2  push   di
  0000:e7f3  lcall  SYS:0f78:0bd8 StrCmp
  0000:e7f8  jne    0xe861
  0000:e7fa  cmp    byte ptr [g394a], 0
  0000:e7ff  jne    0xe848
  0000:e801  cmp    word ptr [g38c7], 0x1e
  0000:e806  jge    0xe823
  0000:e808  mov    di, 0xa51f    ; "^4А не хватает рубликов"
  0000:e80b  push   cs
  0000:e80c  push   di
  0000:e80d  xor    ax, ax
  0000:e80f  push   ax
  0000:e810  xor    ax, ax
  0000:e812  push   ax
  0000:e813  xor    ax, ax
  0000:e815  push   ax
  0000:e816  xor    ax, ax
  0000:e818  push   ax
  0000:e819  xor    ax, ax
  0000:e81b  push   ax
  0000:e81c  lcall  U2:0eed:01c2 PrintLn
  0000:e821  jmp    0xe846
L0e823:
  0000:e823  sub    word ptr [g38c7], 0x1e
  0000:e828  mov    byte ptr [g394a], 1
  0000:e82d  mov    di, 0xa537    ; "^2Ты купил защиту."
  0000:e830  push   cs
  0000:e831  push   di
  0000:e832  xor    ax, ax
  0000:e834  push   ax
  0000:e835  xor    ax, ax
  0000:e837  push   ax
  0000:e838  xor    ax, ax
  0000:e83a  push   ax
  0000:e83b  xor    ax, ax
  0000:e83d  push   ax
  0000:e83e  xor    ax, ax
  0000:e840  push   ax
  0000:e841  lcall  U2:0eed:01c2 PrintLn
L0e846:
  0000:e846  jmp    0xe861
L0e848:
  0000:e848  mov    di, 0xa54a    ; "^6У тебя есть эта штучка."
  0000:e84b  push   cs
  0000:e84c  push   di
  0000:e84d  xor    ax, ax
  0000:e84f  push   ax
  0000:e850  xor    ax, ax
  0000:e852  push   ax
  0000:e853  xor    ax, ax
  0000:e855  push   ax
  0000:e856  xor    ax, ax
  0000:e858  push   ax
  0000:e859  xor    ax, ax
  0000:e85b  push   ax
  0000:e85c  lcall  U2:0eed:01c2 PrintLn
L0e861:
  0000:e861  cmp    byte ptr [g3692], 2
  0000:e866  ja     0xe86b
  0000:e868  jmp    0xe932
L0e86b:
  0000:e86b  mov    di, 0x3a72
  0000:e86e  push   ds
  0000:e86f  push   di
  0000:e870  mov    di, 0x8f6b    ; "5"
  0000:e873  push   cs
  0000:e874  push   di
  0000:e875  lcall  SYS:0f78:0bd8 StrCmp
  0000:e87a  je     0xe87f
  0000:e87c  jmp    0xe932
L0e87f:
  0000:e87f  mov    al, byte ptr [g3692]
  0000:e882  xor    ah, ah
  0000:e884  dec    ax
  0000:e885  dec    ax
  0000:e886  mov    dx, 0xa
  0000:e889  mul    dx
  0000:e88b  mov    dx, ax
  0000:e88d  mov    al, byte ptr [g3e34]
  0000:e890  xor    ah, ah
  0000:e892  cmp    ax, dx
  0000:e894  jge    0xe8f9
  0000:e896  cmp    word ptr [g38c7], 0x14
  0000:e89b  jge    0xe8b8
  0000:e89d  mov    di, 0xa564    ; "^4Не хватает рубликов"
  0000:e8a0  push   cs
  0000:e8a1  push   di
  0000:e8a2  xor    ax, ax
  0000:e8a4  push   ax
  0000:e8a5  xor    ax, ax
  0000:e8a7  push   ax
  0000:e8a8  xor    ax, ax
  0000:e8aa  push   ax
  0000:e8ab  xor    ax, ax
  0000:e8ad  push   ax
  0000:e8ae  xor    ax, ax
  0000:e8b0  push   ax
  0000:e8b1  lcall  U2:0eed:01c2 PrintLn
  0000:e8b6  jmp    0xe8f7
L0e8b8:
  0000:e8b8  sub    word ptr [g38c7], 0x14
  0000:e8bd  mov    di, 0xa57a    ; "^2Ты прокачиваешь пресс."
  0000:e8c0  push   cs
  0000:e8c1  push   di
  0000:e8c2  xor    ax, ax
  0000:e8c4  push   ax
  0000:e8c5  xor    ax, ax
  0000:e8c7  push   ax
  0000:e8c8  xor    ax, ax
  0000:e8ca  push   ax
  0000:e8cb  xor    ax, ax
  0000:e8cd  push   ax
  0000:e8ce  xor    ax, ax
  0000:e8d0  push   ax
  0000:e8d1  lcall  U2:0eed:01c2 PrintLn
  0000:e8d6  inc    byte ptr [g38b2]
  0000:e8da  inc    byte ptr [g3e34]
  0000:e8de  mov    di, 0xa593    ; "^1Броня +1"
  0000:e8e1  push   cs
  0000:e8e2  push   di
  0000:e8e3  xor    ax, ax
  0000:e8e5  push   ax
  0000:e8e6  xor    ax, ax
  0000:e8e8  push   ax
  0000:e8e9  xor    ax, ax
  0000:e8eb  push   ax
  0000:e8ec  xor    ax, ax
  0000:e8ee  push   ax
  0000:e8ef  xor    ax, ax
  0000:e8f1  push   ax
  0000:e8f2  lcall  U2:0eed:01c2 PrintLn
L0e8f7:
  0000:e8f7  jmp    0xe932
L0e8f9:
  0000:e8f9  mov    di, 0xa59e    ; "^6Ты максимально прокачал пресс для своего уровня"
  0000:e8fc  push   cs
  0000:e8fd  push   di
  0000:e8fe  xor    ax, ax
  0000:e900  push   ax
  0000:e901  xor    ax, ax
  0000:e903  push   ax
  0000:e904  xor    ax, ax
  0000:e906  push   ax
  0000:e907  xor    ax, ax
  0000:e909  push   ax
  0000:e90a  xor    ax, ax
  0000:e90c  push   ax
  0000:e90d  lcall  U2:0eed:01c2 PrintLn
  0000:e912  cmp    byte ptr [g3692], 4
  0000:e917  jae    0xe932
  0000:e919  mov    di, 0xa5d0    ; "^6Качай дальше в следующем районе"
  0000:e91c  push   cs
  0000:e91d  push   di
  0000:e91e  xor    ax, ax
  0000:e920  push   ax
  0000:e921  xor    ax, ax
  0000:e923  push   ax
  0000:e924  xor    ax, ax
  0000:e926  push   ax
  0000:e927  xor    ax, ax
  0000:e929  push   ax
  0000:e92a  xor    ax, ax
  0000:e92c  push   ax
  0000:e92d  lcall  U2:0eed:01c2 PrintLn
L0e932:
  0000:e932  mov    di, 0x3a72
  0000:e935  push   ds
  0000:e936  push   di
  0000:e937  mov    di, 0x848e    ; "w"
  0000:e93a  push   cs
  0000:e93b  push   di
  0000:e93c  lcall  SYS:0f78:0bd8 StrCmp
  0000:e941  je     0xe946
  0000:e943  jmp    0xe5e4
L0e946:
  0000:e946  jmp    0xe961
L0e948:
  0000:e948  mov    di, 0xa5f2    ; "^6Ты пока незнаешь где в этом районе качалка"
  0000:e94b  push   cs
  0000:e94c  push   di
  0000:e94d  xor    ax, ax
  0000:e94f  push   ax
  0000:e950  xor    ax, ax
  0000:e952  push   ax
  0000:e953  xor    ax, ax
  0000:e955  push   ax
  0000:e956  xor    ax, ax
  0000:e958  push   ax
  0000:e959  xor    ax, ax
  0000:e95b  push   ax
  0000:e95c  lcall  U2:0eed:01c2 PrintLn
L0e961:
  0000:e961  mov    di, 0x3972
  0000:e964  push   ds
  0000:e965  push   di
  0000:e966  call   0x129c4
  0000:e969  mov    di, 0x3972
  0000:e96c  push   ds
  0000:e96d  push   di
  0000:e96e  mov    di, 0xa61f    ; "kos"
  0000:e971  push   cs
  0000:e972  push   di
  0000:e973  lcall  SYS:0f78:0bd8 StrCmp
  0000:e978  je     0xe97d
  0000:e97a  jmp    0xea8a
L0e97d:
  0000:e97d  cmp    byte ptr [g38b0], 1
  0000:e982  jne    0xe9a0
  0000:e984  mov    di, 0xa623    ; "^4Ты не схавать колёса из-за сломаной челюсти."
  0000:e987  push   cs
  0000:e988  push   di
  0000:e989  xor    ax, ax
  0000:e98b  push   ax
  0000:e98c  xor    ax, ax
  0000:e98e  push   ax
  0000:e98f  xor    ax, ax
  0000:e991  push   ax
  0000:e992  xor    ax, ax
  0000:e994  push   ax
  0000:e995  xor    ax, ax
  0000:e997  push   ax
  0000:e998  lcall  U2:0eed:01c2 PrintLn
  0000:e99d  jmp    0xea8a
L0e9a0:
  0000:e9a0  cmp    byte ptr [g38cd], 0
  0000:e9a5  je     0xe9aa
  0000:e9a7  jmp    0xea71
L0e9aa:
  0000:e9aa  cmp    word ptr [g38c5], 0
  0000:e9af  jg     0xe9b4
  0000:e9b1  jmp    0xea56
L0e9b4:
  0000:e9b4  dec    word ptr [g38c5]
  0000:e9b8  mov    byte ptr [g38cd], 0xa
  0000:e9bd  add    word ptr [g389e], 2
  0000:e9c2  inc    word ptr [g38a8]
  0000:e9c6  add    word ptr [g38aa], 2
  0000:e9cb  mov    ax, word ptr [g38ae]
  0000:e9ce  sub    ax, word ptr [g38ac]
  0000:e9d2  cmp    ax, 0xa
  0000:e9d5  jge    0xea19
  0000:e9d7  mov    di, 0xa652    ; "^2Колёса прибавляют #з. "
  0000:e9da  push   cs
  0000:e9db  push   di
  0000:e9dc  mov    ax, word ptr [g38ae]
  0000:e9df  sub    ax, word ptr [g38ac]
  0000:e9e3  push   ax
  0000:e9e4  xor    ax, ax
  0000:e9e6  push   ax
  0000:e9e7  xor    ax, ax
  0000:e9e9  push   ax
  0000:e9ea  xor    ax, ax
  0000:e9ec  push   ax
  0000:e9ed  xor    ax, ax
  0000:e9ef  push   ax
  0000:e9f0  lcall  U2:0eed:0000 Print
  0000:e9f5  mov    ax, word ptr [g38ae]
  0000:e9f8  mov    word ptr [g38ac], ax
  0000:e9fb  mov    di, 0xa66b    ; "^2Здоровья:#/#. Осталось # косяков"
  0000:e9fe  push   cs
  0000:e9ff  push   di
  0000:ea00  push   word ptr [g38ac]
  0000:ea04  push   word ptr [g38ae]
  0000:ea08  push   word ptr [g38c5]
  0000:ea0c  xor    ax, ax
  0000:ea0e  push   ax
  0000:ea0f  xor    ax, ax
  0000:ea11  push   ax
  0000:ea12  lcall  U2:0eed:01c2 PrintLn
  0000:ea17  jmp    0xea3b
L0ea19:
  0000:ea19  add    word ptr [g38ac], 0xa
  0000:ea1e  mov    di, 0xa68e    ; "^2Колёса прибавляют #з. Здоровья:#/#. Осталось # косякова"
  0000:ea21  push   cs
  0000:ea22  push   di
  0000:ea23  mov    ax, 0xa
  0000:ea26  push   ax
  0000:ea27  push   word ptr [g38ac]
  0000:ea2b  push   word ptr [g38ae]
  0000:ea2f  push   word ptr [g38c5]
  0000:ea33  xor    ax, ax
  0000:ea35  push   ax
  0000:ea36  lcall  U2:0eed:01c2 PrintLn
L0ea3b:
  0000:ea3b  mov    di, 0xa6c8    ; "^2Сила +2."
  0000:ea3e  push   cs
  0000:ea3f  push   di
  0000:ea40  xor    ax, ax
  0000:ea42  push   ax
  0000:ea43  xor    ax, ax
  0000:ea45  push   ax
  0000:ea46  xor    ax, ax
  0000:ea48  push   ax
  0000:ea49  xor    ax, ax
  0000:ea4b  push   ax
  0000:ea4c  xor    ax, ax
  0000:ea4e  push   ax
  0000:ea4f  lcall  U2:0eed:01c2 PrintLn
  0000:ea54  jmp    0xea6f
L0ea56:
  0000:ea56  mov    di, 0xa6d3    ; "^4У тебя нет косяков"
  0000:ea59  push   cs
  0000:ea5a  push   di
  0000:ea5b  xor    ax, ax
  0000:ea5d  push   ax
  0000:ea5e  xor    ax, ax
  0000:ea60  push   ax
  0000:ea61  xor    ax, ax
  0000:ea63  push   ax
  0000:ea64  xor    ax, ax
  0000:ea66  push   ax
  0000:ea67  xor    ax, ax
  0000:ea69  push   ax
  0000:ea6a  lcall  U2:0eed:01c2 PrintLn
L0ea6f:
  0000:ea6f  jmp    0xea8a
L0ea71:
  0000:ea71  mov    di, 0xa6e8    ; "^6Ты неможешь схавать ещё один косяк."
  0000:ea74  push   cs
  0000:ea75  push   di
  0000:ea76  xor    ax, ax
  0000:ea78  push   ax
  0000:ea79  xor    ax, ax
  0000:ea7b  push   ax
  0000:ea7c  xor    ax, ax
  0000:ea7e  push   ax
  0000:ea7f  xor    ax, ax
  0000:ea81  push   ax
  0000:ea82  xor    ax, ax
  0000:ea84  push   ax
  0000:ea85  lcall  U2:0eed:01c2 PrintLn
L0ea8a:
  0000:ea8a  mov    di, 0x3972
  0000:ea8d  push   ds
  0000:ea8e  push   di
  0000:ea8f  mov    di, 0xa70e    ; "i"
  0000:ea92  push   cs
  0000:ea93  push   di
  0000:ea94  lcall  SYS:0f78:0bd8 StrCmp
  0000:ea99  je     0xea9e
  0000:ea9b  jmp    0xec78
L0ea9e:
  0000:ea9e  mov    di, 0xa710    ; "Напиши: ^6w^7    чтобы шататься по окрестностям - искать на свою жопу приключения"
  0000:eaa1  push   cs
  0000:eaa2  push   di
  0000:eaa3  xor    ax, ax
  0000:eaa5  push   ax
  0000:eaa6  xor    ax, ax
  0000:eaa8  push   ax
  0000:eaa9  xor    ax, ax
  0000:eaab  push   ax
  0000:eaac  xor    ax, ax
  0000:eaae  push   ax
  0000:eaaf  xor    ax, ax
  0000:eab1  push   ax
  0000:eab2  lcall  U2:0eed:01c2 PrintLn
  0000:eab7  cmp    byte ptr [g3694], 1
  0000:eabc  jne    0xead7
  0000:eabe  mov    di, 0xa762    ; "Напиши: ^6mar^7  чтобы идти на рынок"
  0000:eac1  push   cs
  0000:eac2  push   di
  0000:eac3  xor    ax, ax
  0000:eac5  push   ax
  0000:eac6  xor    ax, ax
  0000:eac8  push   ax
  0000:eac9  xor    ax, ax
  0000:eacb  push   ax
  0000:eacc  xor    ax, ax
  0000:eace  push   ax
  0000:eacf  xor    ax, ax
  0000:ead1  push   ax
  0000:ead2  lcall  U2:0eed:01c2 PrintLn
L0ead7:
  0000:ead7  cmp    byte ptr [g3695], 1
  0000:eadc  jne    0xeaf7
  0000:eade  mov    di, 0xa787    ; "Напиши: ^6bmar^7 чтобы идти к барыгам"
  0000:eae1  push   cs
  0000:eae2  push   di
  0000:eae3  xor    ax, ax
  0000:eae5  push   ax
  0000:eae6  xor    ax, ax
  0000:eae8  push   ax
  0000:eae9  xor    ax, ax
  0000:eaeb  push   ax
  0000:eaec  xor    ax, ax
  0000:eaee  push   ax
  0000:eaef  xor    ax, ax
  0000:eaf1  push   ax
  0000:eaf2  lcall  U2:0eed:01c2 PrintLn
L0eaf7:
  0000:eaf7  cmp    byte ptr [g3698], 1
  0000:eafc  jne    0xeb17
  0000:eafe  mov    di, 0xa7ad    ; "Напиши: ^6rep^7  чтобы идти к ветеринару"
  0000:eb01  push   cs
  0000:eb02  push   di
  0000:eb03  xor    ax, ax
  0000:eb05  push   ax
  0000:eb06  xor    ax, ax
  0000:eb08  push   ax
  0000:eb09  xor    ax, ax
  0000:eb0b  push   ax
  0000:eb0c  xor    ax, ax
  0000:eb0e  push   ax
  0000:eb0f  xor    ax, ax
  0000:eb11  push   ax
  0000:eb12  lcall  U2:0eed:01c2 PrintLn
L0eb17:
  0000:eb17  cmp    byte ptr [g3697], 1
  0000:eb1c  jne    0xeb37
  0000:eb1e  mov    di, 0xa7d6    ; "Напиши: ^6girl^7 чтобы завалиться к своей девчонке"
  0000:eb21  push   cs
  0000:eb22  push   di
  0000:eb23  xor    ax, ax
  0000:eb25  push   ax
  0000:eb26  xor    ax, ax
  0000:eb28  push   ax
  0000:eb29  xor    ax, ax
  0000:eb2b  push   ax
  0000:eb2c  xor    ax, ax
  0000:eb2e  push   ax
  0000:eb2f  xor    ax, ax
  0000:eb31  push   ax
  0000:eb32  lcall  U2:0eed:01c2 PrintLn
L0eb37:
  0000:eb37  cmp    byte ptr [g3696], 1
  0000:eb3c  jne    0xeb57
  0000:eb3e  mov    di, 0xa809    ; "Напиши: ^6pr^7   чтобы идти в местный притон гопоты"
  0000:eb41  push   cs
  0000:eb42  push   di
  0000:eb43  xor    ax, ax
  0000:eb45  push   ax
  0000:eb46  xor    ax, ax
  0000:eb48  push   ax
  0000:eb49  xor    ax, ax
  0000:eb4b  push   ax
  0000:eb4c  xor    ax, ax
  0000:eb4e  push   ax
  0000:eb4f  xor    ax, ax
  0000:eb51  push   ax
  0000:eb52  lcall  U2:0eed:01c2 PrintLn
L0eb57:
  0000:eb57  cmp    byte ptr [g3699], 1
  0000:eb5c  jne    0xeb77
  0000:eb5e  mov    di, 0xa83d    ; "Напиши: ^6kl^7   чтобы идти в клуб"
  0000:eb61  push   cs
  0000:eb62  push   di
  0000:eb63  xor    ax, ax
  0000:eb65  push   ax
  0000:eb66  xor    ax, ax
  0000:eb68  push   ax
  0000:eb69  xor    ax, ax
  0000:eb6b  push   ax
  0000:eb6c  xor    ax, ax
  0000:eb6e  push   ax
  0000:eb6f  xor    ax, ax
  0000:eb71  push   ax
  0000:eb72  lcall  U2:0eed:01c2 PrintLn
L0eb77:
  0000:eb77  cmp    byte ptr [g369a], 1
  0000:eb7c  jne    0xeb97
  0000:eb7e  mov    di, 0xa860    ; "Напиши: ^6trn^7  чтобы идти в качалку"
  0000:eb81  push   cs
  0000:eb82  push   di
  0000:eb83  xor    ax, ax
  0000:eb85  push   ax
  0000:eb86  xor    ax, ax
  0000:eb88  push   ax
  0000:eb89  xor    ax, ax
  0000:eb8b  push   ax
  0000:eb8c  xor    ax, ax
  0000:eb8e  push   ax
  0000:eb8f  xor    ax, ax
  0000:eb91  push   ax
  0000:eb92  lcall  U2:0eed:01c2 PrintLn
L0eb97:
  0000:eb97  mov    di, 0xa886    ; "Напиши: ^6s^7    чтобы посмотреть в лужу на свою уродскую рожу"
  0000:eb9a  push   cs
  0000:eb9b  push   di
  0000:eb9c  xor    ax, ax
  0000:eb9e  push   ax
  0000:eb9f  xor    ax, ax
  0000:eba1  push   ax
  0000:eba2  xor    ax, ax
  0000:eba4  push   ax
  0000:eba5  xor    ax, ax
  0000:eba7  push   ax
  0000:eba8  xor    ax, ax
  0000:ebaa  push   ax
  0000:ebab  lcall  U2:0eed:01c2 PrintLn
  0000:ebb0  mov    di, 0xa8c5    ; "Напиши: ^6sv^7   чтобы приглядеться к пинаемому мудаку"
  0000:ebb3  push   cs
  0000:ebb4  push   di
  0000:ebb5  xor    ax, ax
  0000:ebb7  push   ax
  0000:ebb8  xor    ax, ax
  0000:ebba  push   ax
  0000:ebbb  xor    ax, ax
  0000:ebbd  push   ax
  0000:ebbe  xor    ax, ax
  0000:ebc0  push   ax
  0000:ebc1  xor    ax, ax
  0000:ebc3  push   ax
  0000:ebc4  lcall  U2:0eed:01c2 PrintLn
  0000:ebc9  mov    di, 0xa8fc    ; "Напиши: ^6k^7    чтобы гасить мудака который тебе попался на дороге"
  0000:ebcc  push   cs
  0000:ebcd  push   di
  0000:ebce  xor    ax, ax
  0000:ebd0  push   ax
  0000:ebd1  xor    ax, ax
  0000:ebd3  push   ax
  0000:ebd4  xor    ax, ax
  0000:ebd6  push   ax
  0000:ebd7  xor    ax, ax
  0000:ebd9  push   ax
  0000:ebda  xor    ax, ax
  0000:ebdc  push   ax
  0000:ebdd  lcall  U2:0eed:01c2 PrintLn
  0000:ebe2  mov    di, 0xa940    ; "Напиши: ^6v^7    чтобы позвать подкрепление"
  0000:ebe5  push   cs
  0000:ebe6  push   di
  0000:ebe7  xor    ax, ax
  0000:ebe9  push   ax
  0000:ebea  xor    ax, ax
  0000:ebec  push   ax
  0000:ebed  xor    ax, ax
  0000:ebef  push   ax
  0000:ebf0  xor    ax, ax
  0000:ebf2  push   ax
  0000:ebf3  xor    ax, ax
  0000:ebf5  push   ax
  0000:ebf6  lcall  U2:0eed:01c2 PrintLn
  0000:ebfb  mov    di, 0xa96c    ; "Напиши: ^6kos^7  чтобы схавать косяк"
  0000:ebfe  push   cs
  0000:ebff  push   di
  0000:ec00  xor    ax, ax
  0000:ec02  push   ax
  0000:ec03  xor    ax, ax
  0000:ec05  push   ax
  0000:ec06  xor    ax, ax
  0000:ec08  push   ax
  0000:ec09  xor    ax, ax
  0000:ec0b  push   ax
  0000:ec0c  xor    ax, ax
  0000:ec0e  push   ax
  0000:ec0f  lcall  U2:0eed:01c2 PrintLn
  0000:ec14  mov    di, 0xa991    ; "Напиши: ^6h^7    чтобы выпить пиво (если не охото к ветеринару)"
  0000:ec17  push   cs
  0000:ec18  push   di
  0000:ec19  xor    ax, ax
  0000:ec1b  push   ax
  0000:ec1c  xor    ax, ax
  0000:ec1e  push   ax
  0000:ec1f  xor    ax, ax
  0000:ec21  push   ax
  0000:ec22  xor    ax, ax
  0000:ec24  push   ax
  0000:ec25  xor    ax, ax
  0000:ec27  push   ax
  0000:ec28  lcall  U2:0eed:01c2 PrintLn
  0000:ec2d  mov    di, 0xa9d1    ; "Напиши: ^6mh^7   чтобы набухаться до чёртиков"
  0000:ec30  push   cs
  0000:ec31  push   di
  0000:ec32  xor    ax, ax
  0000:ec34  push   ax
  0000:ec35  xor    ax, ax
  0000:ec37  push   ax
  0000:ec38  xor    ax, ax
  0000:ec3a  push   ax
  0000:ec3b  xor    ax, ax
  0000:ec3d  push   ax
  0000:ec3e  xor    ax, ax
  0000:ec40  push   ax
  0000:ec41  lcall  U2:0eed:01c2 PrintLn
  0000:ec46  mov    di, 0xa9ff    ; "Напиши: ^6name^7 чтобы сменить погоняло"
  0000:ec49  push   cs
  0000:ec4a  push   di
  0000:ec4b  xor    ax, ax
  0000:ec4d  push   ax
  0000:ec4e  xor    ax, ax
  0000:ec50  push   ax
  0000:ec51  xor    ax, ax
  0000:ec53  push   ax
  0000:ec54  xor    ax, ax
  0000:ec56  push   ax
  0000:ec57  xor    ax, ax
  0000:ec59  push   ax
  0000:ec5a  lcall  U2:0eed:01c2 PrintLn
  0000:ec5f  mov    di, 0xaa27    ; "Напиши: ^6e^7    если захочешь выйти"
  0000:ec62  push   cs
  0000:ec63  push   di
  0000:ec64  xor    ax, ax
  0000:ec66  push   ax
  0000:ec67  xor    ax, ax
  0000:ec69  push   ax
  0000:ec6a  xor    ax, ax
  0000:ec6c  push   ax
  0000:ec6d  xor    ax, ax
  0000:ec6f  push   ax
  0000:ec70  xor    ax, ax
  0000:ec72  push   ax
  0000:ec73  lcall  U2:0eed:01c2 PrintLn
L0ec78:
  0000:ec78  mov    di, 0x3972
  0000:ec7b  push   ds
  0000:ec7c  push   di
  0000:ec7d  mov    di, 0x9f85    ; "s"
  0000:ec80  push   cs
  0000:ec81  push   di
  0000:ec82  lcall  SYS:0f78:0bd8 StrCmp
  0000:ec87  jne    0xec8c
  0000:ec89  call   0x11a03
L0ec8c:
  0000:ec8c  mov    di, 0x3972
  0000:ec8f  push   ds
  0000:ec90  push   di
  0000:ec91  mov    di, 0xaa4c    ; "f"
  0000:ec94  push   cs
  0000:ec95  push   di
  0000:ec96  lcall  SYS:0f78:0bd8 StrCmp
  0000:ec9b  jne    0xecbd
  0000:ec9d  cmp    byte ptr [g394d], 0
  0000:eca2  je     0xecbd
  0000:eca4  mov    di, 0xaa4e    ; "^6Ты чё псих? мигом менты накроют!"
  0000:eca7  push   cs
  0000:eca8  push   di
  0000:eca9  xor    ax, ax
  0000:ecab  push   ax
  0000:ecac  xor    ax, ax
  0000:ecae  push   ax
  0000:ecaf  xor    ax, ax
  0000:ecb1  push   ax
  0000:ecb2  xor    ax, ax
  0000:ecb4  push   ax
  0000:ecb5  xor    ax, ax
  0000:ecb7  push   ax
  0000:ecb8  lcall  U2:0eed:01c2 PrintLn
L0ecbd:
  0000:ecbd  mov    di, 0x3972
  0000:ecc0  push   ds
  0000:ecc1  push   di
  0000:ecc2  mov    di, 0xaa71    ; "k"
  0000:ecc5  push   cs
  0000:ecc6  push   di
  0000:ecc7  lcall  SYS:0f78:0bd8 StrCmp
  0000:eccc  jne    0xece7
  0000:ecce  mov    di, 0xaa73    ; "^6Чё машешь копытами? Ищи мудака которого будешь пинать!"
  0000:ecd1  push   cs
  0000:ecd2  push   di
  0000:ecd3  xor    ax, ax
  0000:ecd5  push   ax
  0000:ecd6  xor    ax, ax
  0000:ecd8  push   ax
  0000:ecd9  xor    ax, ax
  0000:ecdb  push   ax
  0000:ecdc  xor    ax, ax
  0000:ecde  push   ax
  0000:ecdf  xor    ax, ax
  0000:ece1  push   ax
  0000:ece2  lcall  U2:0eed:01c2 PrintLn
L0ece7:
  0000:ece7  mov    di, 0x3972
  0000:ecea  push   ds
  0000:eceb  push   di
  0000:ecec  mov    di, 0xaaac    ; "name"
  0000:ecef  push   cs
  0000:ecf0  push   di
  0000:ecf1  lcall  SYS:0f78:0bd8 StrCmp
  0000:ecf6  je     0xecfb
  0000:ecf8  jmp    0xeda1
L0ecfb:
  0000:ecfb  lea    di, [bp - 0x100]
  0000:ecff  push   ss
  0000:ed00  push   di
  0000:ed01  mov    di, 0xaab1    ; "^2Звали тебя:^7 "
  0000:ed04  push   cs
  0000:ed05  push   di
  0000:ed06  lcall  SYS:0f78:0ae7 StrLoad
  0000:ed0b  mov    di, 0x379c
  0000:ed0e  push   ds
  0000:ed0f  push   di
  0000:ed10  lcall  SYS:0f78:0b66 StrConcat
  0000:ed15  xor    ax, ax
  0000:ed17  push   ax
  0000:ed18  xor    ax, ax
  0000:ed1a  push   ax
  0000:ed1b  xor    ax, ax
  0000:ed1d  push   ax
  0000:ed1e  xor    ax, ax
  0000:ed20  push   ax
  0000:ed21  xor    ax, ax
  0000:ed23  push   ax
  0000:ed24  lcall  U2:0eed:01c2 PrintLn
  0000:ed29  mov    di, 0xaac2    ; "^2А теперь будут:^7 "
  0000:ed2c  push   cs
  0000:ed2d  push   di
  0000:ed2e  xor    ax, ax
  0000:ed30  push   ax
  0000:ed31  xor    ax, ax
  0000:ed33  push   ax
  0000:ed34  xor    ax, ax
  0000:ed36  push   ax
  0000:ed37  xor    ax, ax
  0000:ed39  push   ax
  0000:ed3a  xor    ax, ax
  0000:ed3c  push   ax
  0000:ed3d  lcall  U2:0eed:0000 Print
  0000:ed42  mov    di, 0x3ecc
  0000:ed45  push   ds
  0000:ed46  push   di
  0000:ed47  mov    di, 0x379c
  0000:ed4a  push   ds
  0000:ed4b  push   di
  0000:ed4c  mov    ax, 0xff
  0000:ed4f  push   ax
  0000:ed50  lcall  SYS:0f78:06c6 ReadStr
  0000:ed55  lcall  SYS:0f78:059d ReadLnEnd
  0000:ed5a  lcall  SYS:0f78:0291 IOCheck
  0000:ed5f  cmp    byte ptr [g379c], 0
  0000:ed64  jne    0xed79
  0000:ed66  mov    di, 0xaad7    ; "Раз^6дол^4бай"
  0000:ed69  push   cs
  0000:ed6a  push   di
  0000:ed6b  mov    di, 0x379c
  0000:ed6e  push   ds
  0000:ed6f  push   di
  0000:ed70  mov    ax, 0xff
  0000:ed73  push   ax
  0000:ed74  lcall  SYS:0f78:0b01 StrStore
L0ed79:
  0000:ed79  lea    di, [bp - 0x100]
  0000:ed7d  push   ss
  0000:ed7e  push   di
  0000:ed7f  mov    di, 0xaae5    ; "^7 "
  0000:ed82  push   cs
  0000:ed83  push   di
  0000:ed84  lcall  SYS:0f78:0ae7 StrLoad
  0000:ed89  mov    di, 0x379c
  0000:ed8c  push   ds
  0000:ed8d  push   di
  0000:ed8e  lcall  SYS:0f78:0b66 StrConcat
  0000:ed93  mov    di, 0x379c
  0000:ed96  push   ds
  0000:ed97  push   di
  0000:ed98  mov    ax, 0xff
  0000:ed9b  push   ax
  0000:ed9c  lcall  SYS:0f78:0b01 StrStore
L0eda1:
  0000:eda1  mov    di, 0x3972
  0000:eda4  push   ds
  0000:eda5  push   di
  0000:eda6  mov    di, 0xaae9    ; "version"
  0000:eda9  push   cs
  0000:edaa  push   di
  0000:edab  lcall  SYS:0f78:0bd8 StrCmp
  0000:edb0  jne    0xedcb
  0000:edb2  mov    di, 0xaaf1    ; "^4Gopnik: ^7version 1.02 june,sept 2003"
  0000:edb5  push   cs
  0000:edb6  push   di
  0000:edb7  xor    ax, ax
  0000:edb9  push   ax
  0000:edba  xor    ax, ax
  0000:edbc  push   ax
  0000:edbd  xor    ax, ax
  0000:edbf  push   ax
  0000:edc0  xor    ax, ax
  0000:edc2  push   ax
  0000:edc3  xor    ax, ax
  0000:edc5  push   ax
  0000:edc6  lcall  U2:0eed:01c2 PrintLn
L0edcb:
  0000:edcb  mov    di, 0x3972
  0000:edce  push   ds
  0000:edcf  push   di
  0000:edd0  mov    di, 0xab19    ; "help"
  0000:edd3  push   cs
  0000:edd4  push   di
  0000:edd5  lcall  SYS:0f78:0bd8 StrCmp
  0000:edda  jne    0xeddf
  0000:eddc  call   0x15f55
L0eddf:
  0000:eddf  mov    di, 0x3972
  0000:ede2  push   ds
  0000:ede3  push   di
  0000:ede4  mov    di, 0xab1e    ; "exit"
  0000:ede7  push   cs
  0000:ede8  push   di
  0000:ede9  lcall  SYS:0f78:0bd8 StrCmp
  0000:edee  je     0xee04
  0000:edf0  mov    di, 0x3972
  0000:edf3  push   ds
  0000:edf4  push   di
  0000:edf5  mov    di, 0x9b6e    ; "e"
  0000:edf8  push   cs
  0000:edf9  push   di
  0000:edfa  lcall  SYS:0f78:0bd8 StrCmp
  0000:edff  je     0xee04
  0000:ee01  jmp    0xab75
L0ee04:
  0000:ee04  mov    di, 0xab23    ; "^6Блин не быть тебе нормальным пацаном"
  0000:ee07  push   cs
  0000:ee08  push   di
  0000:ee09  xor    ax, ax
  0000:ee0b  push   ax
  0000:ee0c  xor    ax, ax
  0000:ee0e  push   ax
  0000:ee0f  xor    ax, ax
  0000:ee11  push   ax
  0000:ee12  xor    ax, ax
  0000:ee14  push   ax
  0000:ee15  xor    ax, ax
  0000:ee17  push   ax
  0000:ee18  lcall  U2:0eed:01c2 PrintLn
  0000:ee1d  mov    di, 0xab4a    ; "^1А результат:"
  0000:ee20  push   cs
  0000:ee21  push   di
  0000:ee22  xor    ax, ax
  0000:ee24  push   ax
  0000:ee25  xor    ax, ax
  0000:ee27  push   ax
  0000:ee28  xor    ax, ax
  0000:ee2a  push   ax
  0000:ee2b  xor    ax, ax
  0000:ee2d  push   ax
  0000:ee2e  xor    ax, ax
  0000:ee30  push   ax
  0000:ee31  lcall  U2:0eed:01c2 PrintLn
  0000:ee36  call   0x11a03
  0000:ee39  lcall  CRT:0f16:031a ReadKey
  0000:ee3e  mov    sp, bp
  0000:ee40  pop    bp
  0000:ee41  xor    ax, ax
  0000:ee43  lcall  SYS:0f78:0116 Halt
  0000:ee48  add    byte ptr [bx + si], al
  0000:ee4a  add    byte ptr [bx + si], al
  0000:ee4c  add    byte ptr [bx + si], al
  0000:ee4e  add    byte ptr [bx + si], al

;================ proc 0ee5:0000 FindFirst  callers: 06a8a
  0ee5:0000  push   bp
  0ee5:0001  mov    bp, sp
  0ee5:0003  sub    sp, 0x50
  0ee5:0006  push   ds
  0ee5:0007  lds    si, ptr [bp + 0xc]
  0ee5:000a  lea    di, [bp - 0x50]
  0ee5:000d  push   ss
  0ee5:000e  pop    es
  0ee5:000f  cld    
  0ee5:0010  lodsb  al, byte ptr [si]
  0ee5:0011  cmp    al, 0x4f
  0ee5:0013  jb     0xee67
  0ee5:0015  mov    al, 0x4f
L0ee67:
  0ee5:0017  cwde   
  0ee5:0018  xchg   cx, ax
  0ee5:0019  rep movsb byte ptr es:[di], byte ptr [si]
  0ee5:001b  xor    al, al
  0ee5:001d  stosb  byte ptr es:[di], al
  0ee5:001e  lds    dx, ptr [bp + 6]
  0ee5:0021  mov    ah, 0x1a
  0ee5:0023  int    0x21
  0ee5:0025  lea    dx, [bp - 0x50]
  0ee5:0028  push   ss
  0ee5:0029  pop    ds
  0ee5:002a  mov    cx, word ptr [bp + 0xa]
  0ee5:002d  mov    ah, 0x4e
  0ee5:002f  int    0x21
  0ee5:0031  pop    ds
  0ee5:0032  les    di, ptr [bp + 6]
  0ee5:0035  call   0xeea8
  0ee5:0038  mov    sp, bp
  0ee5:003a  pop    bp
  0ee5:003b  retf   0xa

;================ proc 0ee5:003e FindNext  callers: 06b2b
  0ee5:003e  push   bp
  0ee5:003f  mov    bp, sp
  0ee5:0041  push   ds
  0ee5:0042  lds    dx, ptr [bp + 6]
  0ee5:0045  mov    ah, 0x1a
  0ee5:0047  int    0x21
  0ee5:0049  pop    ds
  0ee5:004a  mov    ah, 0x4f
  0ee5:004c  int    0x21
  0ee5:004e  les    di, ptr [bp + 6]
  0ee5:0051  call   0xeea8
  0ee5:0054  pop    bp
  0ee5:0055  retf   4

;================ proc 0ee5:0058  callers: 0ee85 0eea1
  0ee5:0058  jb     0xeec8
  0ee5:005a  add    di, 0x1e
  0ee5:005d  push   ds
  0ee5:005e  push   es
  0ee5:005f  pop    ds
  0ee5:0060  xor    al, al
  0ee5:0062  mov    cx, 0x100
  0ee5:0065  cld    
  0ee5:0066  repne scasb al, byte ptr es:[di]
  0ee5:0068  not    cl
  0ee5:006a  mov    al, cl
  0ee5:006c  dec    di
  0ee5:006d  mov    si, di
  0ee5:006f  dec    si
  0ee5:0070  std    
  0ee5:0071  rep movsb byte ptr es:[di], byte ptr [si]
  0ee5:0073  stosb  byte ptr es:[di], al
  0ee5:0074  cld    
  0ee5:0075  pop    ds
  0ee5:0076  xor    ax, ax
L0eec8:
  0ee5:0078  mov    word ptr [g3eb6], ax
  0ee5:007b  ret    
; ---- data 0ee5:007c (4 bytes)
;   0ee5:007c str ""
;   0ee5:007d str ""
;   0ee5:007e str ""
;   0ee5:007f str ""

;================ proc 0eed:0000 Print  callers: 0ae50 01be4 01c04 01c24 01e7c 01ea3 01eca 01eea …63
  0eed:0000  push   bp
  0eed:0001  mov    bp, sp
  0eed:0003  mov    ax, 0x604
  0eed:0006  lcall  SYS:0f78:02cd StackCheck
  0eed:000b  sub    sp, 0x604
  0eed:000f  mov    bx, ss
  0eed:0011  mov    es, bx
  0eed:0013  mov    bx, ds
  0eed:0015  cld    
  0eed:0016  lea    di, [bp - 0x100]
  0eed:001a  lds    si, ptr [bp + 0x10]
  0eed:001d  lodsb  al, byte ptr [si]
  0eed:001e  stosb  byte ptr es:[di], al
  0eed:001f  xchg   cx, ax
  0eed:0020  xor    ch, ch
  0eed:0022  rep movsb byte ptr es:[di], byte ptr [si]
  0eed:0024  mov    ds, bx
  0eed:0026  mov    al, 0xf
  0eed:0028  push   ax
  0eed:0029  lcall  CRT:0f16:0263 TextColor
  0eed:002e  xor    ax, ax
  0eed:0030  mov    word ptr [bp - 0x102], ax
  0eed:0034  mov    ax, word ptr [bp + 0xe]
  0eed:0037  cdq    
  0eed:0038  push   dx
  0eed:0039  push   ax
  0eed:003a  xor    ax, ax
  0eed:003c  push   ax
  0eed:003d  lea    di, [bp - 0x604]
  0eed:0041  push   ss
  0eed:0042  push   di
  0eed:0043  mov    ax, 0xff
  0eed:0046  push   ax
  0eed:0047  lcall  SYS:0f78:12d0 StrLong
  0eed:004c  mov    ax, word ptr [bp + 0xc]
  0eed:004f  cdq    
  0eed:0050  push   dx
  0eed:0051  push   ax
  0eed:0052  xor    ax, ax
  0eed:0054  push   ax
  0eed:0055  lea    di, [bp - 0x504]
  0eed:0059  push   ss
  0eed:005a  push   di
  0eed:005b  mov    ax, 0xff
  0eed:005e  push   ax
  0eed:005f  lcall  SYS:0f78:12d0 StrLong
  0eed:0064  mov    ax, word ptr [bp + 0xa]
  0eed:0067  cdq    
  0eed:0068  push   dx
  0eed:0069  push   ax
  0eed:006a  xor    ax, ax
  0eed:006c  push   ax
  0eed:006d  lea    di, [bp - 0x404]
  0eed:0071  push   ss
  0eed:0072  push   di
  0eed:0073  mov    ax, 0xff
  0eed:0076  push   ax
  0eed:0077  lcall  SYS:0f78:12d0 StrLong
  0eed:007c  mov    ax, word ptr [bp + 8]
  0eed:007f  cdq    
  0eed:0080  push   dx
  0eed:0081  push   ax
  0eed:0082  xor    ax, ax
  0eed:0084  push   ax
  0eed:0085  lea    di, [bp - 0x304]
  0eed:0089  push   ss
  0eed:008a  push   di
  0eed:008b  mov    ax, 0xff
  0eed:008e  push   ax
  0eed:008f  lcall  SYS:0f78:12d0 StrLong
  0eed:0094  mov    ax, word ptr [bp + 6]
  0eed:0097  cdq    
  0eed:0098  push   dx
  0eed:0099  push   ax
  0eed:009a  xor    ax, ax
  0eed:009c  push   ax
  0eed:009d  lea    di, [bp - 0x204]
  0eed:00a1  push   ss
  0eed:00a2  push   di
  0eed:00a3  mov    ax, 0xff
  0eed:00a6  push   ax
  0eed:00a7  lcall  SYS:0f78:12d0 StrLong
  0eed:00ac  mov    word ptr [bp - 0x104], 1
L0ef82:
  0eed:00b2  inc    word ptr [bp - 0x102]
L0ef86:
  0eed:00b6  mov    di, word ptr [bp - 0x102]
  0eed:00ba  cmp    byte ptr [bp + di - 0x100], 0x5e
  0eed:00bf  jne    0xf005
  0eed:00c1  mov    al, byte ptr [bp - 0x100]
  0eed:00c5  xor    ah, ah
  0eed:00c7  cmp    ax, word ptr [bp - 0x102]
  0eed:00cb  jle    0xf005
  0eed:00cd  mov    ax, word ptr [bp - 0x102]
  0eed:00d1  inc    ax
  0eed:00d2  mov    di, ax
  0eed:00d4  cmp    byte ptr [bp + di - 0x100], 0x30
  0eed:00d9  jb     0xf005
  0eed:00db  mov    ax, word ptr [bp - 0x102]
  0eed:00df  inc    ax
  0eed:00e0  mov    di, ax
  0eed:00e2  cmp    byte ptr [bp + di - 0x100], 0x37
  0eed:00e7  ja     0xf005
  0eed:00e9  mov    al, 0xf
  0eed:00eb  push   ax
  0eed:00ec  lcall  CRT:0f16:0263 TextColor
  0eed:00f1  mov    ax, word ptr [bp - 0x102]
  0eed:00f5  inc    ax
  0eed:00f6  mov    di, ax
  0eed:00f8  mov    al, byte ptr [bp + di - 0x100]
  0eed:00fc  xor    ah, ah
  0eed:00fe  sub    ax, 0x30
  0eed:0101  cmp    ax, 8
  0eed:0104  jge    0xf000
  0eed:0106  mov    ax, word ptr [bp - 0x102]
  0eed:010a  inc    ax
  0eed:010b  mov    di, ax
  0eed:010d  mov    al, byte ptr [bp + di - 0x100]
  0eed:0111  xor    ah, ah
  0eed:0113  sub    ax, 0x30
  0eed:0116  or     ax, ax
  0eed:0118  jl     0xf000
  0eed:011a  mov    ax, word ptr [bp - 0x102]
  0eed:011e  inc    ax
  0eed:011f  mov    di, ax
  0eed:0121  mov    al, byte ptr [bp + di - 0x100]
  0eed:0125  xor    ah, ah
  0eed:0127  sub    ax, 0x28
  0eed:012a  push   ax
  0eed:012b  lcall  CRT:0f16:0263 TextColor
L0f000:
  0eed:0130  add    word ptr [bp - 0x102], 2
L0f005:
  0eed:0135  mov    di, word ptr [bp - 0x102]
  0eed:0139  cmp    byte ptr [bp + di - 0x100], 0x5e
  0eed:013e  jne    0xf013
  0eed:0140  jmp    0xef86
L0f013:
  0eed:0143  mov    di, word ptr [bp - 0x102]
  0eed:0147  cmp    byte ptr [bp + di - 0x100], 0x23
  0eed:014c  jne    0xf049
  0eed:014e  mov    di, 0x3fcc
  0eed:0151  push   ds
  0eed:0152  push   di
  0eed:0153  mov    di, word ptr [bp - 0x104]
  0eed:0157  mov    cl, 8
  0eed:0159  shl    di, cl
  0eed:015b  lea    di, [bp + di - 0x704]
  0eed:015f  push   ss
  0eed:0160  push   di
  0eed:0161  xor    ax, ax
  0eed:0163  push   ax
  0eed:0164  lcall  SYS:0f78:0701 WriteStr
  0eed:0169  lcall  SYS:0f78:05fe WriteEnd
  0eed:016e  lcall  SYS:0f78:0291 IOCheck
  0eed:0173  inc    word ptr [bp - 0x104]
  0eed:0177  jmp    0xf075
L0f049:
  0eed:0179  mov    al, byte ptr [bp - 0x100]
  0eed:017d  xor    ah, ah
  0eed:017f  cmp    ax, word ptr [bp - 0x102]
  0eed:0183  jl     0xf075
  0eed:0185  mov    di, 0x3fcc
  0eed:0188  push   ds
  0eed:0189  push   di
  0eed:018a  mov    di, word ptr [bp - 0x102]
  0eed:018e  mov    al, byte ptr [bp + di - 0x100]
  0eed:0192  push   ax
  0eed:0193  xor    ax, ax
  0eed:0195  push   ax
  0eed:0196  lcall  SYS:0f78:067b WriteChar
  0eed:019b  lcall  SYS:0f78:05fe WriteEnd
  0eed:01a0  lcall  SYS:0f78:0291 IOCheck
L0f075:
  0eed:01a5  mov    al, byte ptr [bp - 0x100]
  0eed:01a9  xor    ah, ah
  0eed:01ab  cmp    ax, word ptr [bp - 0x102]
  0eed:01af  jle    0xf084
  0eed:01b1  jmp    0xef82
L0f084:
  0eed:01b4  mov    al, 0xf
  0eed:01b6  push   ax
  0eed:01b7  lcall  CRT:0f16:0263 TextColor
  0eed:01bc  mov    sp, bp
  0eed:01be  pop    bp
  0eed:01bf  retf   0xe

;================ proc 0eed:01c2 PrintLn  callers: 0d7f3 0ecb8 0ece2 0edc6 0ee18 0ee31 01a76 01aa4 …602
  0eed:01c2  push   bp
  0eed:01c3  mov    bp, sp
  0eed:01c5  mov    ax, 0x100
  0eed:01c8  lcall  SYS:0f78:02cd StackCheck
  0eed:01cd  sub    sp, 0x100
  0eed:01d1  mov    bx, ss
  0eed:01d3  mov    es, bx
  0eed:01d5  mov    bx, ds
  0eed:01d7  cld    
  0eed:01d8  lea    di, [bp - 0x100]
  0eed:01dc  lds    si, ptr [bp + 0x10]
  0eed:01df  lodsb  al, byte ptr [si]
  0eed:01e0  stosb  byte ptr es:[di], al
  0eed:01e1  xchg   cx, ax
  0eed:01e2  xor    ch, ch
  0eed:01e4  rep movsb byte ptr es:[di], byte ptr [si]
  0eed:01e6  mov    ds, bx
  0eed:01e8  lea    di, [bp - 0x100]
  0eed:01ec  push   ss
  0eed:01ed  push   di
  0eed:01ee  push   word ptr [bp + 0xe]
  0eed:01f1  push   word ptr [bp + 0xc]
  0eed:01f4  push   word ptr [bp + 0xa]
  0eed:01f7  push   word ptr [bp + 8]
  0eed:01fa  push   word ptr [bp + 6]
  0eed:01fd  push   cs
  0eed:01fe  call   0xeed0    ; Print
  0eed:0201  mov    di, 0x3fcc
  0eed:0204  push   ds
  0eed:0205  push   di
  0eed:0206  lcall  SYS:0f78:05dd WriteLnEnd
  0eed:020b  lcall  SYS:0f78:0291 IOCheck
  0eed:0210  mov    sp, bp
  0eed:0212  pop    bp
  0eed:0213  retf   0xe

;================ proc 0eed:0216 LowerCase  callers: 0ae77 0e61f 0e060 04431 0db1d 0d528 0c8c9 0d2ed …19
  0eed:0216  push   bp
  0eed:0217  mov    bp, sp
  0eed:0219  mov    ax, 2
  0eed:021c  lcall  SYS:0f78:02cd StackCheck
  0eed:0221  sub    sp, 2
  0eed:0224  les    di, ptr [bp + 6]
  0eed:0227  mov    al, byte ptr es:[di]
  0eed:022a  mov    byte ptr [bp - 2], al
  0eed:022d  mov    al, 1
  0eed:022f  cmp    al, byte ptr [bp - 2]
  0eed:0232  ja     0xf155
  0eed:0234  mov    byte ptr [bp - 1], al
  0eed:0237  jmp    0xf10c
L0f109:
  0eed:0239  inc    byte ptr [bp - 1]
L0f10c:
  0eed:023c  mov    al, byte ptr [bp - 1]
  0eed:023f  xor    ah, ah
  0eed:0241  les    di, ptr [bp + 6]
  0eed:0244  add    di, ax
  0eed:0246  cmp    byte ptr es:[di], 0x41
  0eed:024a  jb     0xf14d
  0eed:024c  mov    al, byte ptr [bp - 1]
  0eed:024f  xor    ah, ah
  0eed:0251  les    di, ptr [bp + 6]
  0eed:0254  add    di, ax
  0eed:0256  cmp    byte ptr es:[di], 0x5a
  0eed:025a  ja     0xf14d
  0eed:025c  mov    al, byte ptr [bp - 1]
  0eed:025f  xor    ah, ah
  0eed:0261  les    di, ptr [bp + 6]
  0eed:0264  add    di, ax
  0eed:0266  mov    al, byte ptr es:[di]
  0eed:0269  xor    ah, ah
  0eed:026b  add    ax, 0x20
  0eed:026e  mov    dl, al
  0eed:0270  mov    al, byte ptr [bp - 1]
  0eed:0273  xor    ah, ah
  0eed:0275  les    di, ptr [bp + 6]
  0eed:0278  add    di, ax
  0eed:027a  mov    byte ptr es:[di], dl
L0f14d:
  0eed:027d  mov    al, byte ptr [bp - 1]
  0eed:0280  cmp    al, byte ptr [bp - 2]
  0eed:0283  jne    0xf109
L0f155:
  0eed:0285  mov    sp, bp
  0eed:0287  pop    bp
  0eed:0288  retf   4
; ---- data 0eed:028b (5 bytes)
;   0eed:028b str ""
;   0eed:028c str ""
;   0eed:028d str ""
;   0eed:028e str ""
;   0eed:028f str ""
L0f160:
  0f16:0000  push   bp
  0f16:0001  mov    bp, sp
  0f16:0003  mov    ax, 0xff
  0f16:0006  lcall  SYS:0f78:0116 Halt
  0f16:000b  pop    bp
  0f16:000c  ret    

;================ proc 0f16:000d CrtInit  callers: 0ab5e
  0f16:000d  push   bp
  0f16:000e  mov    bp, sp
  0f16:0010  call   0xf19b
  0f16:0013  mov    di, 0x3ecc
  0f16:0016  push   ds
  0f16:0017  push   di
  0f16:0018  push   cs
  0f16:0019  call   0xf49c
  0f16:001c  mov    di, 0x3ecc
  0f16:001f  push   ds
  0f16:0020  push   di
  0f16:0021  lcall  SYS:0f78:0364 ResetText
  0f16:0026  mov    di, 0x3fcc
  0f16:0029  push   ds
  0f16:002a  push   di
  0f16:002b  push   cs
  0f16:002c  call   0xf49c
  0f16:002f  mov    di, 0x3fcc
  0f16:0032  push   ds
  0f16:0033  push   di
  0f16:0034  lcall  SYS:0f78:0369 RewriteText
  0f16:0039  pop    bp
  0f16:003a  retf   

;================ proc 0f16:003b  callers: 0f170
  0f16:003b  mov    ah, 0xf
  0f16:003d  call   0xf774
  0f16:0040  cmp    al, 7
  0f16:0042  je     0xf1ae
  0f16:0044  cmp    al, 3
  0f16:0046  jbe    0xf1ae
  0f16:0048  mov    ax, 3
  0f16:004b  call   0xf203
L0f1ae:
  0f16:004e  call   0xf250
  0f16:0051  mov    ah, 8
  0f16:0053  xor    bh, bh
  0f16:0055  call   0xf774
  0f16:0058  mov    al, ah
  0f16:005a  and    al, 0x7f
  0f16:005c  mov    byte ptr [g3ec8], al
  0f16:005f  mov    byte ptr [g3ebe], al
  0f16:0062  xor    ax, ax
  0f16:0064  mov    byte ptr [g3eb9], al
  0f16:0067  mov    byte ptr [g3ec9], al
  0f16:006a  mov    byte ptr [g3eca], al
  0f16:006d  inc    ax
  0f16:006e  mov    byte ptr [g3eb8], al
  0f16:0071  mov    es, word ptr [g3684]
  0f16:0075  mov    di, 0x6c
  0f16:0078  mov    al, byte ptr es:[di]
L0f1db:
  0f16:007b  cmp    al, byte ptr es:[di]
  0f16:007e  je     0xf1db
  0f16:0080  mov    al, byte ptr es:[di]
  0f16:0083  mov    cx, 0xffff
  0f16:0086  call   0xf428
  0f16:0089  mov    ax, 0x37
  0f16:008c  xchg   cx, ax
  0f16:008d  not    ax
  0f16:008f  xor    dx, dx
  0f16:0091  div    cx
  0f16:0093  mov    word ptr [g3ec4], ax
  0f16:0096  push   ds
  0f16:0097  push   cs
  0f16:0098  pop    ds
  0f16:0099  mov    dx, 0x138
  0f16:009c  mov    ax, 0x251b
  0f16:009f  int    0x21
  0f16:00a1  pop    ds
  0f16:00a2  ret    

;================ proc 0f16:00a3  callers: 0f1ab
  0f16:00a3  mov    es, word ptr [g3684]
  0f16:00a7  and    byte ptr es:[g0087], 0xfe
  0f16:00ad  cmp    al, 7
  0f16:00af  je     0xf217
  0f16:00b1  cmp    al, 4
  0f16:00b3  jb     0xf217
  0f16:00b5  mov    al, 3
L0f217:
  0f16:00b7  push   ax
  0f16:00b8  mov    ah, 0
  0f16:00ba  call   0xf774
  0f16:00bd  pop    ax
  0f16:00be  or     ah, ah
  0f16:00c0  je     0xf24f
  0f16:00c2  mov    ax, 0x1112
  0f16:00c5  mov    bl, 0
  0f16:00c7  call   0xf774
  0f16:00ca  mov    ax, 0x1130
  0f16:00cd  mov    bh, 0
  0f16:00cf  mov    dl, 0
  0f16:00d1  call   0xf774
  0f16:00d4  cmp    dl, 0x2a
  0f16:00d7  jne    0xf24f
  0f16:00d9  or     byte ptr es:[g0087], 1
  0f16:00df  mov    ax, 0x100
  0f16:00e2  mov    cx, 0x600
  0f16:00e5  call   0xf774
  0f16:00e8  mov    ah, 0x12
  0f16:00ea  mov    bl, 0x20
  0f16:00ec  call   0xf774
L0f24f:
  0f16:00ef  ret    

;================ proc 0f16:00f0  callers: 0f1ae
  0f16:00f0  mov    ah, 0xf
  0f16:00f2  call   0xf774
  0f16:00f5  push   ax
  0f16:00f6  mov    ax, 0x1130
  0f16:00f9  mov    bh, 0
  0f16:00fb  mov    dl, 0
  0f16:00fd  call   0xf774
  0f16:0100  pop    ax
  0f16:0101  mov    cl, 0
  0f16:0103  or     dl, dl
  0f16:0105  jne    0xf26f
  0f16:0107  mov    dl, 0x18
  0f16:0109  cmp    al, 3
  0f16:010b  ja     0xf26f
  0f16:010d  mov    cl, 1
L0f26f:
  0f16:010f  mov    dh, dl
  0f16:0111  mov    dl, ah
  0f16:0113  dec    dl
  0f16:0115  mov    ah, 0
  0f16:0117  cmp    dh, 0x18
  0f16:011a  jbe    0xf27e
  0f16:011c  mov    ah, 1
L0f27e:
  0f16:011e  mov    word ptr [g3ebc], ax
  0f16:0121  mov    word ptr [g3ec6], dx
  0f16:0125  mov    byte ptr [g3ebb], cl
  0f16:0129  mov    byte ptr [g3eba], 1
  0f16:012e  xor    ax, ax
  0f16:0130  mov    word ptr [g3ec0], ax
  0f16:0133  mov    word ptr [g3ec2], dx
  0f16:0137  ret    
; ---- data 0f16:0138 (22 bytes)
;   0f16:0138 db 50
;   0f16:0139 db 1e
;   0f16:013a db b8
;   0f16:013b db ae
;   0f16:013c db 10
;   0f16:013d db 8e
;   0f16:013e db d8
;   0f16:013f db 80
;   0f16:0140 db 3e
;   0f16:0141 db b8
;   0f16:0142 db 3e
;   0f16:0143 str ""
;   0f16:0144 db 74
;   0f16:0145 db 05
;   0f16:0146 db c6
;   0f16:0147 db 06
;   0f16:0148 db ca
;   0f16:0149 db 3e
;   0f16:014a db 01
;   0f16:014b db 1f
;   0f16:014c db 58
;   0f16:014d db cf

;================ proc 0f16:014e  callers: 0f498
  0f16:014e  cmp    byte ptr [g3eca], 0
  0f16:0153  jne    0xf2b6
  0f16:0155  ret    
L0f2b6:
  0f16:0156  mov    byte ptr [g3eca], 0
L0f2bb:
  0f16:015b  mov    ah, 1
  0f16:015d  int    0x16
  0f16:015f  je     0xf2c7
  0f16:0161  mov    ah, 0
  0f16:0163  int    0x16
  0f16:0165  jmp    0xf2bb
L0f2c7:
  0f16:0167  mov    al, 0x5e
  0f16:0169  call   0xf5e9
  0f16:016c  mov    al, 0x43
  0f16:016e  call   0xf5e9
  0f16:0171  call   0xf5e2
  0f16:0174  jmp    0xf160
; ---- data 0f16:0177 (85 bytes)
;   0f16:0177 db 8b
;   0f16:0178 db dc
;   0f16:0179 db 36
;   0f16:017a db 8b
;   0f16:017b db 47
;   0f16:017c str "ш# ш"
;   0f16:0181 db 6d
;   0f16:0182 db ff
;   0f16:0183 db a0
;   0f16:0184 db c8
;   0f16:0185 db 3e
;   0f16:0186 db a2
;   0f16:0187 db be
;   0f16:0188 db 3e
;   0f16:0189 db ca
;   0f16:018a db 02
;   0f16:018b str ""
;   0f16:018c db 8b
;   0f16:018d db dc
;   0f16:018e db 36
;   0f16:018f db 8a
;   0f16:0190 db 57
;   0f16:0191 db 0a
;   0f16:0192 db 36
;   0f16:0193 db 8a
;   0f16:0194 db 77
;   0f16:0195 db 08
;   0f16:0196 db 36
;   0f16:0197 db 8a
;   0f16:0198 db 4f
;   0f16:0199 db 06
;   0f16:019a db 36
;   0f16:019b db 8a
;   0f16:019c db 6f
;   0f16:019d str ":╤w'"
;   0f16:01a2 db 3a
;   0f16:01a3 db f5
;   0f16:01a4 db 77
;   0f16:01a5 db 23
;   0f16:01a6 db fe
;   0f16:01a7 db ca
;   0f16:01a8 db 78
;   0f16:01a9 db 1f
;   0f16:01aa db fe
;   0f16:01ab db ce
;   0f16:01ac db 78
;   0f16:01ad db 1b
;   0f16:01ae db fe
;   0f16:01af db c9
;   0f16:01b0 db 3a
;   0f16:01b1 db 0e
;   0f16:01b2 db c6
;   0f16:01b3 db 3e
;   0f16:01b4 db 77
;   0f16:01b5 db 13
;   0f16:01b6 db fe
;   0f16:01b7 db cd
;   0f16:01b8 db 3a
;   0f16:01b9 db 2e
;   0f16:01ba db c7
;   0f16:01bb db 3e
;   0f16:01bc db 77
;   0f16:01bd db 0b
;   0f16:01be db 89
;   0f16:01bf db 16
;   0f16:01c0 db c0
;   0f16:01c1 db 3e
;   0f16:01c2 db 89
;   0f16:01c3 db 0e
;   0f16:01c4 db c2
;   0f16:01c5 db 3e
;   0f16:01c6 db e8
;   0f16:01c7 db 41
;   0f16:01c8 db 03
;   0f16:01c9 db ca
;   0f16:01ca db 08
;   0f16:01cb str ""

;================ proc 0f16:01cc ClrScr  callers: 00b67 0075a 00ab9 06a1c 004b7
  0f16:01cc  mov    ax, 0x600
  0f16:01cf  mov    bh, byte ptr [g3ebe]
  0f16:01d3  mov    cx, word ptr [g3ec0]
  0f16:01d7  mov    dx, word ptr [g3ec2]
  0f16:01db  call   0xf774
  0f16:01de  mov    dx, word ptr [g3ec0]
  0f16:01e2  call   0xf66a
  0f16:01e5  retf   
; ---- data 0f16:01e6 (125 bytes)
;   0f16:01e6 db e8
;   0f16:01e7 db 1a
;   0f16:01e8 db 03
;   0f16:01e9 db b8
;   0f16:01ea str ""
;   0f16:01eb str "К>╛>Л╩"
;   0f16:01f2 db 8a
;   0f16:01f3 db 16
;   0f16:01f4 db c2
;   0f16:01f5 db 3e
;   0f16:01f6 db e8
;   0f16:01f7 db 1b
;   0f16:01f8 db 04
;   0f16:01f9 db cb
;   0f16:01fa db b8
;   0f16:01fb db 01
;   0f16:01fc db 07
;   0f16:01fd db eb
;   0f16:01fe db 03
;   0f16:01ff db b8
;   0f16:0200 db 01
;   0f16:0201 db 06
;   0f16:0202 db 50
;   0f16:0203 db e8
;   0f16:0204 db fd
;   0f16:0205 str "XК"
;   0f16:0208 db 3e
;   0f16:0209 db be
;   0f16:020a db 3e
;   0f16:020b db 8a
;   0f16:020c db 0e
;   0f16:020d db c0
;   0f16:020e db 3e
;   0f16:020f db 8a
;   0f16:0210 db ee
;   0f16:0211 db 8b
;   0f16:0212 db 16
;   0f16:0213 db c2
;   0f16:0214 db 3e
;   0f16:0215 db 3a
;   0f16:0216 db ee
;   0f16:0217 db 75
;   0f16:0218 str "2└"
;   0f16:021b db e8
;   0f16:021c db f6
;   0f16:021d str "╦Л▄"
;   0f16:0221 db 36
;   0f16:0222 db 8a
;   0f16:0223 db 57
;   0f16:0224 db 06
;   0f16:0225 db 36
;   0f16:0226 db 8a
;   0f16:0227 db 77
;   0f16:0228 db 04
;   0f16:0229 db fe
;   0f16:022a db ca
;   0f16:022b db 02
;   0f16:022c db 16
;   0f16:022d db c0
;   0f16:022e db 3e
;   0f16:022f db 72
;   0f16:0230 db 17
;   0f16:0231 db 3a
;   0f16:0232 db 16
;   0f16:0233 db c2
;   0f16:0234 db 3e
;   0f16:0235 db 77
;   0f16:0236 db 11
;   0f16:0237 db fe
;   0f16:0238 db ce
;   0f16:0239 str "6┴"
;   0f16:023c db 3e
;   0f16:023d db 72
;   0f16:023e db 09
;   0f16:023f db 3a
;   0f16:0240 db 36
;   0f16:0241 db c3
;   0f16:0242 db 3e
;   0f16:0243 db 77
;   0f16:0244 db 03
;   0f16:0245 db e8
;   0f16:0246 db c2
;   0f16:0247 db 02
;   0f16:0248 db ca
;   0f16:0249 db 04
;   0f16:024a str ""
;   0f16:024b db e8
;   0f16:024c db b5
;   0f16:024d str "К┬"
;   0f16:0250 db 2a
;   0f16:0251 str "└>■└╦ш"
;   0f16:0258 db a9
;   0f16:0259 str "К╞"
;   0f16:025c db 2a
;   0f16:025d db 06
;   0f16:025e db c1
;   0f16:025f db 3e
;   0f16:0260 db fe
;   0f16:0261 db c0
;   0f16:0262 db cb

;================ proc 0f16:0263 TextColor  callers: 0eef9 0efbc 0effb 0f087 00aa7 00ab4 004a5 004b2
  0f16:0263  mov    bx, sp
  0f16:0265  mov    al, byte ptr ss:[bx + 4]
  0f16:0269  test   al, 0xf0
  0f16:026b  je     0xf3d1
  0f16:026d  and    al, 0xf
  0f16:026f  or     al, 0x80
L0f3d1:
  0f16:0271  and    byte ptr [g3ebe], 0x70
  0f16:0276  or     byte ptr [g3ebe], al
  0f16:027a  retf   2
; ---- data 0f16:027d (43 bytes)
;   0f16:027d db 8b
;   0f16:027e db dc
;   0f16:027f db 36
;   0f16:0280 db 8a
;   0f16:0281 db 47
;   0f16:0282 db 04
;   0f16:0283 db 24
;   0f16:0284 db 07
;   0f16:0285 db b1
;   0f16:0286 str "╥рА&"
;   0f16:028b db be
;   0f16:028c db 3e
;   0f16:028d db 8f
;   0f16:028e db 08
;   0f16:028f db 06
;   0f16:0290 db be
;   0f16:0291 db 3e
;   0f16:0292 db ca
;   0f16:0293 db 02
;   0f16:0294 str ""
;   0f16:0295 db 80
;   0f16:0296 db 26
;   0f16:0297 db be
;   0f16:0298 db 3e
;   0f16:0299 db f7
;   0f16:029a db cb
;   0f16:029b db 80
;   0f16:029c db 0e
;   0f16:029d db be
;   0f16:029e db 3e
;   0f16:029f str "╦а╚>в╛>╦"

;================ proc 0f16:02a8 Delay  callers: 00b62
  0f16:02a8  mov    bx, sp
  0f16:02aa  mov    dx, word ptr ss:[bx + 4]
  0f16:02ae  or     dx, dx
  0f16:02b0  je     0xf425
  0f16:02b2  mov    es, word ptr [g3684]
  0f16:02b6  xor    di, di
  0f16:02b8  mov    al, byte ptr es:[di]
L0f41b:
  0f16:02bb  mov    cx, word ptr [g3ec4]
  0f16:02bf  call   0xf428
  0f16:02c2  dec    dx
  0f16:02c3  jne    0xf41b
L0f425:
  0f16:02c5  retf   2

;================ proc 0f16:02c8  callers: 0f41f 0f1e6
L0f428:
  0f16:02c8  mov    bx, 4
L0f42b:
  0f16:02cb  dec    bx
  0f16:02cc  jne    0xf42b
  0f16:02ce  cmp    al, byte ptr es:[di]
  0f16:02d1  loope  0xf428
  0f16:02d3  ret    
; ---- data 0f16:02d4 (52 bytes)
;   0f16:02d4 db 8b
;   0f16:02d5 db dc
;   0f16:02d6 db 36
;   0f16:02d7 db 8b
;   0f16:02d8 db 5f
;   0f16:02d9 str "╕▌4║"
;   0f16:02de db 12
;   0f16:02df str ""
;   0f16:02e0 db 3b
;   0f16:02e1 db d3
;   0f16:02e2 db 73
;   0f16:02e3 db 1a
;   0f16:02e4 db f7
;   0f16:02e5 db f3
;   0f16:02e6 db 8b
;   0f16:02e7 db d8
;   0f16:02e8 db e4
;   0f16:02e9 db 61
;   0f16:02ea db a8
;   0f16:02eb db 03
;   0f16:02ec db 75
;   0f16:02ed db 08
;   0f16:02ee db 0c
;   0f16:02ef str "цa░"
;   0f16:02f3 db b6
;   0f16:02f4 db e6
;   0f16:02f5 db 43
;   0f16:02f6 db 8a
;   0f16:02f7 db c3
;   0f16:02f8 db e6
;   0f16:02f9 db 42
;   0f16:02fa db 8a
;   0f16:02fb db c7
;   0f16:02fc db e6
;   0f16:02fd db 42
;   0f16:02fe db ca
;   0f16:02ff db 02
;   0f16:0300 str ""
;   0f16:0301 db e4
;   0f16:0302 db 61
;   0f16:0303 db 24
;   0f16:0304 db fc
;   0f16:0305 db e6
;   0f16:0306 db 61
;   0f16:0307 db cb

;================ proc 0f16:0308 KeyPressed  callers: 00cf4
  0f16:0308  cmp    byte ptr [g3ec9], 0
  0f16:030d  jne    0xf477
  0f16:030f  mov    ah, 1
  0f16:0311  int    0x16
  0f16:0313  mov    al, 0
  0f16:0315  je     0xf479
L0f477:
  0f16:0317  mov    al, 1
L0f479:
  0f16:0319  retf   

;================ proc 0f16:031a ReadKey  callers: 0ee39 05164 05182 050b3 050d1 050ef 0510d 0512e …59
  0f16:031a  mov    al, byte ptr [g3ec9]
  0f16:031d  mov    byte ptr [g3ec9], 0
  0f16:0322  or     al, al
  0f16:0324  jne    0xf498
  0f16:0326  xor    ah, ah
  0f16:0328  int    0x16
  0f16:032a  or     al, al
  0f16:032c  jne    0xf498
  0f16:032e  mov    byte ptr [g3ec9], ah
  0f16:0332  or     ah, ah
  0f16:0334  jne    0xf498
  0f16:0336  mov    al, 3
L0f498:
  0f16:0338  call   0xf2ae
  0f16:033b  retf   

;================ proc 0f16:033c  callers: 0f179 0f18c
  0f16:033c  mov    bx, sp
  0f16:033e  push   ds
  0f16:033f  lds    di, ptr ss:[bx + 4]
  0f16:0343  mov    word ptr [di + 2], 0xd7b0
  0f16:0348  mov    word ptr [di + 4], 0x80
  0f16:034d  lea    ax, [di + 0x80]
  0f16:0351  mov    word ptr [di + 0xc], ax
  0f16:0354  mov    word ptr [di + 0xe], ds
  0f16:0357  mov    word ptr [di + 0x10], 0x367
  0f16:035c  mov    word ptr [di + 0x12], cs
  0f16:035f  mov    byte ptr [di + 0x30], 0
  0f16:0363  pop    ds
  0f16:0364  retf   4
; ---- data 0f16:0367 (283 bytes)
;   0f16:0367 db 8b
;   0f16:0368 db dc
;   0f16:0369 db 1e
;   0f16:036a db 36
;   0f16:036b db c5
;   0f16:036c db 7f
;   0f16:036d db 04
;   0f16:036e db b8
;   0f16:036f db 9f
;   0f16:0370 db 03
;   0f16:0371 db bb
;   0f16:0372 db 7d
;   0f16:0373 str "Л╦Б}"
;   0f16:0378 str "▒╫"
;   0f16:037b db 74
;   0f16:037c db 0a
;   0f16:037d db c7
;   0f16:037e db 45
;   0f16:037f str "▓╫"
;   0f16:0382 db b8
;   0f16:0383 db 4c
;   0f16:0384 str "Л╪ЙE"
;   0f16:0389 db 14
;   0f16:038a db 8c
;   0f16:038b db 4d
;   0f16:038c db 16
;   0f16:038d db 89
;   0f16:038e db 5d
;   0f16:038f db 18
;   0f16:0390 db 8c
;   0f16:0391 db 4d
;   0f16:0392 db 1a
;   0f16:0393 db 89
;   0f16:0394 db 4d
;   0f16:0395 db 1c
;   0f16:0396 db 8c
;   0f16:0397 db 4d
;   0f16:0398 db 1e
;   0f16:0399 db 33
;   0f16:039a db c0
;   0f16:039b db 1f
;   0f16:039c db ca
;   0f16:039d db 04
;   0f16:039e str ""
;   0f16:039f db 55
;   0f16:03a0 db 8b
;   0f16:03a1 db ec
;   0f16:03a2 db c4
;   0f16:03a3 db 7e
;   0f16:03a4 db 06
;   0f16:03a5 db 26
;   0f16:03a6 db 8b
;   0f16:03a7 db 55
;   0f16:03a8 str "JJ&Л"
;   0f16:03ad db 75
;   0f16:03ae db 08
;   0f16:03af db 26
;   0f16:03b0 db c4
;   0f16:03b1 db 7d
;   0f16:03b2 db 0c
;   0f16:03b3 db 33
;   0f16:03b4 db db
;   0f16:03b5 db c6
;   0f16:03b6 db 06
;   0f16:03b7 db c9
;   0f16:03b8 db 3e
;   0f16:03b9 str ""
;   0f16:03ba db 0e
;   0f16:03bb db e8
;   0f16:03bc db 5c
;   0f16:03bd db ff
;   0f16:03be db b9
;   0f16:03bf db 01
;   0f16:03c0 str ""
;   0f16:03c1 db 3c
;   0f16:03c2 db 08
;   0f16:03c3 db 74
;   0f16:03c4 db 34
;   0f16:03c5 db 3c
;   0f16:03c6 db 13
;   0f16:03c7 db 74
;   0f16:03c8 db 30
;   0f16:03c9 db 3c
;   0f16:03ca str "tDI<"
;   0f16:03cf db 1b
;   0f16:03d0 db 74
;   0f16:03d1 db 27
;   0f16:03d2 db 3c
;   0f16:03d3 str "t"
;   0f16:03d5 db 23
;   0f16:03d6 db 3c
;   0f16:03d7 db 06
;   0f16:03d8 db 74
;   0f16:03d9 db 37
;   0f16:03da db 3c
;   0f16:03db db 1a
;   0f16:03dc db 74
;   0f16:03dd db 46
;   0f16:03de db 3c
;   0f16:03df db 0d
;   0f16:03e0 db 74
;   0f16:03e1 db 4f
;   0f16:03e2 db 3c
;   0f16:03e3 db 20
;   0f16:03e4 db 72
;   0f16:03e5 db cf
;   0f16:03e6 db 3b
;   0f16:03e7 db da
;   0f16:03e8 db 74
;   0f16:03e9 db cb
;   0f16:03ea db 26
;   0f16:03eb db 88
;   0f16:03ec str "C"
;   0f16:03ee db e8
;   0f16:03ef db 98
;   0f16:03f0 str ""
;   0f16:03f1 db 3b
;   0f16:03f2 db de
;   0f16:03f3 db 76
;   0f16:03f4 db c0
;   0f16:03f5 db 8b
;   0f16:03f6 db f3
;   0f16:03f7 db eb
;   0f16:03f8 db bc
;   0f16:03f9 db 0b
;   0f16:03fa db db
;   0f16:03fb db 74
;   0f16:03fc db b8
;   0f16:03fd db b0
;   0f16:03fe db 08
;   0f16:03ff db e8
;   0f16:0400 db 87
;   0f16:0401 str ""
;   0f16:0402 db b0
;   0f16:0403 db 20
;   0f16:0404 db e8
;   0f16:0405 db 82
;   0f16:0406 str ""
;   0f16:0407 db b0
;   0f16:0408 db 08
;   0f16:0409 db e8
;   0f16:040a db 7d
;   0f16:040b str ""
;   0f16:040c db 4b
;   0f16:040d db e2
;   0f16:040e db ea
;   0f16:040f db eb
;   0f16:0410 db a4
;   0f16:0411 db 3b
;   0f16:0412 db de
;   0f16:0413 db 74
;   0f16:0414 db a0
;   0f16:0415 db 26
;   0f16:0416 db 8a
;   0f16:0417 str "<"
;   0f16:0419 db 20
;   0f16:041a db 72
;   0f16:041b db 99
;   0f16:041c db e8
;   0f16:041d db 6a
;   0f16:041e str ""
;   0f16:041f db 43
;   0f16:0420 db e2
;   0f16:0421 db ef
;   0f16:0422 db eb
;   0f16:0423 db 91
;   0f16:0424 db 80
;   0f16:0425 db 3e
;   0f16:0426 db b9
;   0f16:0427 db 3e
;   0f16:0428 str ""
;   0f16:0429 db 74
;   0f16:042a db 8a
;   0f16:042b db 26
;   0f16:042c db 88
;   0f16:042d str "C"
;   0f16:042f db eb
;   0f16:0430 db 0a
;   0f16:0431 db e8
;   0f16:0432 db 4e
;   0f16:0433 str ""
;   0f16:0434 db 26
;   0f16:0435 db c7
;   0f16:0436 str "♪"
;   0f16:0438 db 0a
;   0f16:0439 db 43
;   0f16:043a db 43
;   0f16:043b db c4
;   0f16:043c db 7e
;   0f16:043d db 06
;   0f16:043e db 33
;   0f16:043f db c0
;   0f16:0440 db 26
;   0f16:0441 db 89
;   0f16:0442 db 45
;   0f16:0443 db 08
;   0f16:0444 db 26
;   0f16:0445 db 89
;   0f16:0446 db 5d
;   0f16:0447 db 0a
;   0f16:0448 db 5d
;   0f16:0449 db ca
;   0f16:044a db 04
;   0f16:044b str ""
;   0f16:044c db 8b
;   0f16:044d db dc
;   0f16:044e db 36
;   0f16:044f db c4
;   0f16:0450 db 7f
;   0f16:0451 db 04
;   0f16:0452 db 26
;   0f16:0453 db 8b
;   0f16:0454 db 4d
;   0f16:0455 db 08
;   0f16:0456 db 26
;   0f16:0457 db 29
;   0f16:0458 db 4d
;   0f16:0459 db 08
;   0f16:045a db e3
;   0f16:045b db 19
;   0f16:045c db 26
;   0f16:045d db c4
;   0f16:045e db 7d
;   0f16:045f db 0c
;   0f16:0460 db 80
;   0f16:0461 db 3e
;   0f16:0462 db ba
;   0f16:0463 db 3e
;   0f16:0464 str ""
;   0f16:0465 db 75
;   0f16:0466 db 0b
;   0f16:0467 db 26
;   0f16:0468 db 8a
;   0f16:0469 db 05
;   0f16:046a db e8
;   0f16:046b db 1c
;   0f16:046c str ""
;   0f16:046d db 47
;   0f16:046e db e2
;   0f16:046f db f7
;   0f16:0470 db eb
;   0f16:0471 db 03
;   0f16:0472 db e8
;   0f16:0473 db 9c
;   0f16:0474 str ""
;   0f16:0475 db e8
;   0f16:0476 db d6
;   0f16:0477 db fc
;   0f16:0478 db 33
;   0f16:0479 db c0
;   0f16:047a db ca
;   0f16:047b db 04
;   0f16:047c str ""
;   0f16:047d db 33
;   0f16:047e db c0
;   0f16:047f db ca
;   0f16:0480 db 04
;   0f16:0481 str ""

;================ proc 0f16:0482  callers: 0f2d1
  0f16:0482  mov    al, 0xd
  0f16:0484  call   0xf5e9
  0f16:0487  mov    al, 0xa

;================ proc 0f16:0489  callers: 0f2c9 0f2ce 0f5e4
  0f16:0489  push   bx
  0f16:048a  push   cx
  0f16:048b  push   dx
  0f16:048c  push   es
  0f16:048d  push   ax
  0f16:048e  call   0xf663
  0f16:0491  pop    ax
  0f16:0492  cmp    al, 7
  0f16:0494  je     0xf620
  0f16:0496  cmp    al, 8
  0f16:0498  je     0xf627
  0f16:049a  cmp    al, 0xd
  0f16:049c  je     0xf631
  0f16:049e  cmp    al, 0xa
  0f16:04a0  je     0xf637
  0f16:04a2  mov    ah, 9
  0f16:04a4  mov    bl, byte ptr [g3ebe]
  0f16:04a8  xor    bh, bh
  0f16:04aa  mov    cx, 1
  0f16:04ad  push   dx
  0f16:04ae  call   0xf774
  0f16:04b1  pop    dx
  0f16:04b2  inc    dl
  0f16:04b4  cmp    dl, byte ptr [g3ec2]
  0f16:04b8  jbe    0xf63a
  0f16:04ba  mov    dl, byte ptr [g3ec0]
  0f16:04be  jmp    0xf637
L0f620:
  0f16:04c0  mov    ah, 0xe
  0f16:04c2  call   0xf774
  0f16:04c5  jmp    0xf63a
L0f627:
  0f16:04c7  cmp    dl, byte ptr [g3ec0]
  0f16:04cb  je     0xf63a
  0f16:04cd  dec    dl
  0f16:04cf  jmp    0xf63a
L0f631:
  0f16:04d1  mov    dl, byte ptr [g3ec0]
  0f16:04d5  jmp    0xf63a
L0f637:
  0f16:04d7  call   0xf642
L0f63a:
  0f16:04da  call   0xf66a
  0f16:04dd  pop    es
  0f16:04de  pop    dx
  0f16:04df  pop    cx
  0f16:04e0  pop    bx
  0f16:04e1  ret    

;================ proc 0f16:04e2  callers: 0f637
  0f16:04e2  inc    dh
  0f16:04e4  cmp    dh, byte ptr [g3ec3]
  0f16:04e8  jbe    0xf662
  0f16:04ea  dec    dh
  0f16:04ec  push   cx
  0f16:04ed  push   dx
  0f16:04ee  mov    ax, 0x601
  0f16:04f1  mov    bh, byte ptr [g3ebe]
  0f16:04f5  mov    cx, word ptr [g3ec0]
  0f16:04f9  mov    dx, word ptr [g3ec2]
  0f16:04fd  call   0xf774
  0f16:0500  pop    dx
  0f16:0501  pop    cx
L0f662:
  0f16:0502  ret    

;================ proc 0f16:0503  callers: 0f5ee
  0f16:0503  mov    ah, 3
  0f16:0505  xor    bh, bh
  0f16:0507  jmp    0xf774

;================ proc 0f16:050a  callers: 0f63a 0f342
  0f16:050a  mov    ah, 2
  0f16:050c  xor    bh, bh
  0f16:050e  jmp    0xf774
; ---- data 0f16:0511 (259 bytes)
;   0f16:0511 db 1e
;   0f16:0512 db 8e
;   0f16:0513 db 1e
;   0f16:0514 db 84
;   0f16:0515 db 36
;   0f16:0516 db 8b
;   0f16:0517 db 16
;   0f16:0518 db 50
;   0f16:0519 str ""
;   0f16:051a db 1f
;   0f16:051b db 8b
;   0f16:051c db da
;   0f16:051d db 8b
;   0f16:051e db f7
;   0f16:051f db 26
;   0f16:0520 db 8a
;   0f16:0521 db 05
;   0f16:0522 db 3c
;   0f16:0523 db 07
;   0f16:0524 db 74
;   0f16:0525 db 21
;   0f16:0526 db 3c
;   0f16:0527 str "t,<◙t5<♪"
;   0f16:0530 db 74
;   0f16:0531 db 39
;   0f16:0532 db 47
;   0f16:0533 db fe
;   0f16:0534 db c2
;   0f16:0535 db 3a
;   0f16:0536 db 16
;   0f16:0537 db c2
;   0f16:0538 db 3e
;   0f16:0539 db 76
;   0f16:053a db 3c
;   0f16:053b db e8
;   0f16:053c db 6e
;   0f16:053d str ""
;   0f16:053e db e8
;   0f16:053f db a1
;   0f16:0540 db ff
;   0f16:0541 db 8a
;   0f16:0542 db 16
;   0f16:0543 db c0
;   0f16:0544 db 3e
;   0f16:0545 db eb
;   0f16:0546 db 2c
;   0f16:0547 db e8
;   0f16:0548 db 62
;   0f16:0549 str ""
;   0f16:054a db 51
;   0f16:054b db 52
;   0f16:054c db b8
;   0f16:054d db 07
;   0f16:054e db 0e
;   0f16:054f db e8
;   0f16:0550 db c2
;   0f16:0551 str ""
;   0f16:0552 db 5a
;   0f16:0553 db 59
;   0f16:0554 db eb
;   0f16:0555 db 1c
;   0f16:0556 db e8
;   0f16:0557 db 53
;   0f16:0558 str ""
;   0f16:0559 db 3a
;   0f16:055a db 16
;   0f16:055b db c0
;   0f16:055c db 3e
;   0f16:055d db 74
;   0f16:055e db 13
;   0f16:055f db fe
;   0f16:0560 db ca
;   0f16:0561 db eb
;   0f16:0562 db 0f
;   0f16:0563 db e8
;   0f16:0564 db 46
;   0f16:0565 str ""
;   0f16:0566 db e8
;   0f16:0567 db 79
;   0f16:0568 db ff
;   0f16:0569 db eb
;   0f16:056a db 07
;   0f16:056b db e8
;   0f16:056c db 3e
;   0f16:056d str ""
;   0f16:056e db 8a
;   0f16:056f db 16
;   0f16:0570 db c0
;   0f16:0571 db 3e
;   0f16:0572 db 47
;   0f16:0573 db 8b
;   0f16:0574 db f7
;   0f16:0575 db 8b
;   0f16:0576 db da
;   0f16:0577 db e2
;   0f16:0578 db a6
;   0f16:0579 db e8
;   0f16:057a db 30
;   0f16:057b str ""
;   0f16:057c db 1e
;   0f16:057d db 8e
;   0f16:057e db 1e
;   0f16:057f db 84
;   0f16:0580 db 36
;   0f16:0581 db 89
;   0f16:0582 db 16
;   0f16:0583 db 50
;   0f16:0584 str ""
;   0f16:0585 db 8a
;   0f16:0586 db c6
;   0f16:0587 db f6
;   0f16:0588 db 26
;   0f16:0589 db 4a
;   0f16:058a str ""
;   0f16:058b db 32
;   0f16:058c db f6
;   0f16:058d str "┬Л╚"
;   0f16:0591 db 8b
;   0f16:0592 db 16
;   0f16:0593 db 63
;   0f16:0594 str ""
;   0f16:0595 db b0
;   0f16:0596 db 0e
;   0f16:0597 db ee
;   0f16:0598 db eb
;   0f16:0599 str ""
;   0f16:059a db 8a
;   0f16:059b db c5
;   0f16:059c db 42
;   0f16:059d db ee
;   0f16:059e db eb
;   0f16:059f str ""
;   0f16:05a0 db 4a
;   0f16:05a1 db b0
;   0f16:05a2 db 0f
;   0f16:05a3 db ee
;   0f16:05a4 db eb
;   0f16:05a5 str ""
;   0f16:05a6 db 8a
;   0f16:05a7 db c1
;   0f16:05a8 db 42
;   0f16:05a9 db ee
;   0f16:05aa db 1f
;   0f16:05ab db c3
;   0f16:05ac db 3b
;   0f16:05ad db f7
;   0f16:05ae db 74
;   0f16:05af db 63
;   0f16:05b0 db 51
;   0f16:05b1 db 52
;   0f16:05b2 db 57
;   0f16:05b3 db 1e
;   0f16:05b4 db 06
;   0f16:05b5 db 8b
;   0f16:05b6 db cf
;   0f16:05b7 db 2b
;   0f16:05b8 db ce
;   0f16:05b9 db 1e
;   0f16:05ba db 8e
;   0f16:05bb db 1e
;   0f16:05bc db 84
;   0f16:05bd db 36
;   0f16:05be db 8a
;   0f16:05bf db c7
;   0f16:05c0 db f6
;   0f16:05c1 db 26
;   0f16:05c2 db 4a
;   0f16:05c3 str ""
;   0f16:05c4 db 32
;   0f16:05c5 db ff
;   0f16:05c6 str "├╤р"
;   0f16:05ca db 8b
;   0f16:05cb db f8
;   0f16:05cc db 8b
;   0f16:05cd db 16
;   0f16:05ce db 63
;   0f16:05cf str ""
;   0f16:05d0 db 83
;   0f16:05d1 db c2
;   0f16:05d2 db 06
;   0f16:05d3 db 80
;   0f16:05d4 db 3e
;   0f16:05d5 db 49
;   0f16:05d6 str ""
;   0f16:05d7 db 07
;   0f16:05d8 db 1f
;   0f16:05d9 db a1
;   0f16:05da db 8a
;   0f16:05db db 36
;   0f16:05dc db 75
;   0f16:05dd str "бИ6"
;   0f16:05e1 db 8a
;   0f16:05e2 db 1e
;   0f16:05e3 db bb
;   0f16:05e4 db 3e
;   0f16:05e5 db 8a
;   0f16:05e6 db 3e
;   0f16:05e7 db be
;   0f16:05e8 db 3e
;   0f16:05e9 db 06
;   0f16:05ea db 1f
;   0f16:05eb db 8e
;   0f16:05ec db c0
;   0f16:05ed db fc
;   0f16:05ee db 0a
;   0f16:05ef db db
;   0f16:05f0 db 74
;   0f16:05f1 db 16
;   0f16:05f2 db ac
;   0f16:05f3 db 8a
;   0f16:05f4 db d8
;   0f16:05f5 db ec
;   0f16:05f6 db a8
;   0f16:05f7 str "u"
;   0f16:05f9 db fb
;   0f16:05fa db fa
;   0f16:05fb db ec
;   0f16:05fc db a8
;   0f16:05fd str "t"
;   0f16:05ff db fb
;   0f16:0600 db 8b
;   0f16:0601 db c3
;   0f16:0602 db ab
;   0f16:0603 db fb
;   0f16:0604 db e2
;   0f16:0605 db ec
;   0f16:0606 db eb
;   0f16:0607 str "Кчмлт№"
;   0f16:060e db 07
;   0f16:060f db 1f
;   0f16:0610 db 5f
;   0f16:0611 db 5a
;   0f16:0612 db 59
;   0f16:0613 db c3

;================ proc 0f16:0614  callers: 0f60e 0f65d 0f622 0f33b 0f19d 0f1b5 0f252 0f25d …13
L0f774:
  0f16:0614  push   si
  0f16:0615  push   di
  0f16:0616  push   bp
  0f16:0617  push   es
  0f16:0618  int    0x10
  0f16:061a  pop    es
  0f16:061b  pop    bp
  0f16:061c  pop    di
  0f16:061d  pop    si
  0f16:061e  ret    
; ---- data 0f16:061f (1 bytes)
;   0f16:061f str ""

;================ proc 0f78:0000 SysInit  callers: 0ab59
  0f78:0000  mov    dx, 0x10ae
  0f78:0003  mov    ds, dx
  0f78:0005  mov    word ptr [g3678], es
  0f78:0009  xor    bp, bp
  0f78:000b  call   0x10acc
  0f78:000e  call   0xf831
  0f78:0011  mov    ax, sp
  0f78:0013  add    ax, 0x13
  0f78:0016  mov    cl, 4
  0f78:0018  shr    ax, cl
  0f78:001a  mov    dx, ss
  0f78:001c  add    ax, dx
  0f78:001e  mov    word ptr [g364a], ax
  0f78:0021  mov    word ptr [g364c], ax
  0f78:0024  add    ax, word ptr [g3644]
  0f78:0028  mov    word ptr [g364e], ax
  0f78:002b  mov    word ptr [g3658], ax
  0f78:002e  mov    word ptr [g365c], ax
  0f78:0031  mov    word ptr [g3664], ax
  0f78:0034  mov    es, word ptr [g3678]
  0f78:0038  mov    ax, word ptr es:[2]
  0f78:003c  mov    word ptr [g3660], ax
  0f78:003f  mov    word ptr [g366a], 0xd6
  0f78:0045  mov    word ptr [g366c], cs
  0f78:0049  mov    di, 0x40cc
  0f78:004c  mov    si, 0x239
  0f78:004f  mov    cx, 0x13
  0f78:0052  nop    
L0f7d3:
  0f78:0053  cld    
  0f78:0054  lodsb  al, byte ptr cs:[si]
  0f78:0056  mov    ah, 0x35
  0f78:0058  int    0x21
  0f78:005a  mov    word ptr [di], bx
  0f78:005c  mov    word ptr [di + 2], es
  0f78:005f  add    di, 4
  0f78:0062  loop   0xf7d3
  0f78:0064  push   ds
  0f78:0065  push   cs
  0f78:0066  pop    ds
  0f78:0067  mov    dx, 0x10c
  0f78:006a  mov    ax, 0x2500
  0f78:006d  int    0x21
  0f78:006f  mov    dx, 0x113
  0f78:0072  mov    ax, 0x2523
  0f78:0075  int    0x21
  0f78:0077  mov    dx, 0xdb
  0f78:007a  mov    ax, 0x2524
  0f78:007d  int    0x21
  0f78:007f  mov    dx, 0x104
  0f78:0082  mov    ax, 0x253f
  0f78:0085  int    0x21
  0f78:0087  pop    ds
  0f78:0088  mov    ax, 0x3ecc
  0f78:008b  push   ds
  0f78:008c  push   ax
  0f78:008d  push   ds
  0f78:008e  push   ax
  0f78:008f  mov    ax, 0x263
  0f78:0092  push   cs
  0f78:0093  push   ax
  0f78:0094  push   cs
  0f78:0095  call   0xfa66
  0f78:0098  push   cs
  0f78:0099  call   0xfae4    ; ResetText
  0f78:009c  mov    ax, 0x3fcc
  0f78:009f  push   ds
  0f78:00a0  push   ax
  0f78:00a1  push   ds
  0f78:00a2  push   ax
  0f78:00a3  mov    ax, 0x263
  0f78:00a6  push   cs
  0f78:00a7  push   ax
  0f78:00a8  push   cs
  0f78:00a9  call   0xfa66
  0f78:00ac  push   cs
  0f78:00ad  call   0xfae9    ; RewriteText
  0f78:00b0  retf   

;================ proc 0f78:00b1  callers: 0f78e
  0f78:00b1  xor    ax, ax
  0f78:00b3  pushf  
  0f78:00b4  pop    bx
  0f78:00b5  and    bh, 0xf
  0f78:00b8  push   bx
  0f78:00b9  popf   
  0f78:00ba  pushf  
  0f78:00bb  pop    cx
  0f78:00bc  and    ch, 0xf0
  0f78:00bf  cmp    ch, 0xf0
  0f78:00c2  je     0xf852
  0f78:00c4  inc    ax
  0f78:00c5  or     bh, 0xf0
  0f78:00c8  push   bx
  0f78:00c9  popf   
  0f78:00ca  pushf  
  0f78:00cb  pop    cx
  0f78:00cc  and    ch, 0xf0
  0f78:00cf  je     0xf852
  0f78:00d1  inc    ax
L0f852:
  0f78:00d2  mov    byte ptr [g368c], al
  0f78:00d5  ret    
; ---- data 0f78:00d6 (57 bytes)
;   0f78:00d6 db 33
;   0f78:00d7 db c0
;   0f78:00d8 db ca
;   0f78:00d9 db 02
;   0f78:00da str ""
;   0f78:00db db fb
;   0f78:00dc db 83
;   0f78:00dd db c4
;   0f78:00de db 06
;   0f78:00df db 58
;   0f78:00e0 db 83
;   0f78:00e1 db e7
;   0f78:00e2 db 1f
;   0f78:00e3 db 81
;   0f78:00e4 db c7
;   0f78:00e5 db 96
;   0f78:00e6 str ""
;   0f78:00e7 db 80
;   0f78:00e8 db fc
;   0f78:00e9 db 39
;   0f78:00ea db 73
;   0f78:00eb str "┐  "
;   0f78:00ef db 57
;   0f78:00f0 db b4
;   0f78:00f1 db 54
;   0f78:00f2 db cd
;   0f78:00f3 db 21
;   0f78:00f4 db 8b
;   0f78:00f5 db ec
;   0f78:00f6 db 80
;   0f78:00f7 db 4e
;   0f78:00f8 db 16
;   0f78:00f9 str "X"
;   0f78:00fb db 5b
;   0f78:00fc db 59
;   0f78:00fd db 5a
;   0f78:00fe db 5e
;   0f78:00ff db 5f
;   0f78:0100 db 5d
;   0f78:0101 db 1f
;   0f78:0102 db 07
;   0f78:0103 db cf
;   0f78:0104 db b8
;   0f78:0105 db d0
;   0f78:0106 str ""
;   0f78:0107 db 83
;   0f78:0108 db c4
;   0f78:0109 db 06
;   0f78:010a db eb
;   0f78:010b db 03
;   0f78:010c db b8
;   0f78:010d db c8
;   0f78:010e str ""
L0f88f:
  0f78:010f  pop    cx
  0f78:0110  pop    bx
  0f78:0111  jmp    0xf89a
; ---- data 0f78:0113 (3 bytes)
;   0f78:0113 db b8
;   0f78:0114 db ff
;   0f78:0115 str ""

;================ proc 0f78:0116 Halt  callers: 0ee43 0f166 04c5f 00ac0
  0f78:0116  xor    cx, cx
  0f78:0118  xor    bx, bx
L0f89a:
  0f78:011a  mov    dx, 0x10ae
  0f78:011d  mov    ds, dx
  0f78:011f  sti    
  0f78:0120  mov    word ptr [g3672], ax
  0f78:0123  mov    ax, cx
  0f78:0125  or     ax, bx
  0f78:0127  je     0xf8e6
  0f78:0129  mov    ax, word ptr [g3650]
L0f8ac:
  0f78:012c  or     ax, ax
  0f78:012e  je     0xf8df
  0f78:0130  mov    es, ax
  0f78:0132  mov    ax, word ptr es:[g0010]
  0f78:0136  or     ax, ax
  0f78:0138  je     0xf8d5
  0f78:013a  sub    ax, bx
  0f78:013c  ja     0xf8d5
  0f78:013e  neg    ax
  0f78:0140  cmp    ax, 0x1000
  0f78:0143  jae    0xf8d5
  0f78:0145  mov    dx, 0x10
  0f78:0148  mul    dx
  0f78:014a  add    ax, cx
  0f78:014c  jb     0xf8d5
  0f78:014e  cmp    ax, word ptr es:[8]
  0f78:0153  jb     0xf8db
L0f8d5:
  0f78:0155  mov    ax, word ptr es:[g0014]
  0f78:0159  jmp    0xf8ac
L0f8db:
  0f78:015b  mov    cx, ax
  0f78:015d  mov    bx, es
L0f8df:
  0f78:015f  sub    bx, word ptr [g3678]
  0f78:0163  sub    bx, 0x10
L0f8e6:
  0f78:0166  mov    word ptr [g3674], cx
  0f78:016a  mov    word ptr [g3676], bx
  0f78:016e  les    bx, ptr [g366e]
  0f78:0172  mov    ax, es
  0f78:0174  or     ax, bx
  0f78:0176  je     0xf90b
  0f78:0178  xor    ax, ax
  0f78:017a  mov    word ptr [g366e], ax
  0f78:017d  mov    word ptr [g3670], ax
  0f78:0180  mov    word ptr [g367c], ax
  0f78:0183  mov    ax, 0x16e
  0f78:0186  push   cs
  0f78:0187  push   ax
  0f78:0188  push   es
  0f78:0189  push   bx
  0f78:018a  retf   
L0f90b:
  0f78:018b  mov    ax, 0x3ecc
  0f78:018e  push   ds
  0f78:018f  push   ax
  0f78:0190  push   cs
  0f78:0191  call   0xfb3e
  0f78:0194  mov    ax, 0x3fcc
  0f78:0197  push   ds
  0f78:0198  push   ax
  0f78:0199  push   cs
  0f78:019a  call   0xfb3e
  0f78:019d  mov    di, 0x40cc
  0f78:01a0  mov    si, 0x239
  0f78:01a3  mov    cx, 0x13
  0f78:01a6  nop    
L0f927:
  0f78:01a7  cld    
  0f78:01a8  lodsb  al, byte ptr cs:[si]
  0f78:01aa  mov    ah, 0x25
  0f78:01ac  push   ds
  0f78:01ad  lds    dx, ptr [di]
  0f78:01af  int    0x21
  0f78:01b1  pop    ds
  0f78:01b2  add    di, 4
  0f78:01b5  loop   0xf927
  0f78:01b7  mov    ax, word ptr [g3674]
  0f78:01ba  or     ax, word ptr [g3676]
  0f78:01be  je     0xf969
  0f78:01c0  mov    bx, 0x24c
  0f78:01c3  call   0xf970
  0f78:01c6  mov    ax, word ptr [g3672]
  0f78:01c9  call   0xf97e
  0f78:01cc  mov    bx, 0x25b
  0f78:01cf  call   0xf970
  0f78:01d2  mov    ax, word ptr [g3676]
  0f78:01d5  call   0xf998
  0f78:01d8  mov    al, 0x3a
  0f78:01da  call   0xf9b2
  0f78:01dd  mov    ax, word ptr [g3674]
  0f78:01e0  call   0xf998
  0f78:01e3  mov    bx, 0x260
  0f78:01e6  call   0xf970
L0f969:
  0f78:01e9  mov    ax, word ptr [g3672]
  0f78:01ec  mov    ah, 0x4c
  0f78:01ee  int    0x21

;================ proc 0f78:01f0  callers: 0f943 0f94f 0f966
L0f970:
  0f78:01f0  mov    al, byte ptr cs:[bx]
  0f78:01f3  or     al, al
  0f78:01f5  je     0xf97d
  0f78:01f7  call   0xf9b2
  0f78:01fa  inc    bx
  0f78:01fb  jmp    0xf970
L0f97d:
  0f78:01fd  ret    

;================ proc 0f78:01fe  callers: 0f949
  0f78:01fe  mov    cl, 0x64
  0f78:0200  call   0xf98a
  0f78:0203  mov    cl, 0xa
  0f78:0205  call   0xf98a
  0f78:0208  jmp    0xf98e

;================ proc 0f78:020a  callers: 0f980 0f985
  0f78:020a  xor    ah, ah
  0f78:020c  div    cl
L0f98e:
  0f78:020e  add    al, 0x30
  0f78:0210  push   ax
  0f78:0211  call   0xf9b2
  0f78:0214  pop    ax
  0f78:0215  mov    al, ah
  0f78:0217  ret    

;================ proc 0f78:0218  callers: 0f955 0f960
  0f78:0218  push   ax
  0f78:0219  mov    al, ah
  0f78:021b  call   0xf99f
  0f78:021e  pop    ax

;================ proc 0f78:021f  callers: 0f99b
  0f78:021f  push   ax
  0f78:0220  mov    cl, 4
  0f78:0222  shr    al, cl
  0f78:0224  call   0xf9aa
  0f78:0227  pop    ax
  0f78:0228  and    al, 0xf

;================ proc 0f78:022a  callers: 0f9a4
  0f78:022a  add    al, 0x30
  0f78:022c  cmp    al, 0x3a
  0f78:022e  jb     0xf9b2
  0f78:0230  add    al, 7

;================ proc 0f78:0232  callers: 0f95a 0f977 0f991
L0f9b2:
  0f78:0232  mov    dl, al
  0f78:0234  mov    ah, 6
  0f78:0236  int    0x21
  0f78:0238  ret    
; ---- data 0f78:0239 (81 bytes)
;   0f78:0239 str ""
;   0f78:023a db 02
;   0f78:023b str "!#$456789:;<=>?uRuntime err"
;   0f78:0257 db 6f
;   0f78:0258 db 72
;   0f78:0259 db 20
;   0f78:025a str ""
;   0f78:025b db 20
;   0f78:025c db 61
;   0f78:025d db 74
;   0f78:025e db 20
;   0f78:025f str ""
;   0f78:0260 db 2e
;   0f78:0261 db 0d
;   0f78:0262 db 0a
;   0f78:0263 str ""
;   0f78:0264 db 50
;   0f78:0265 db 6f
;   0f78:0266 db 72
;   0f78:0267 db 74
;   0f78:0268 db 69
;   0f78:0269 db 6f
;   0f78:026a db 6e
;   0f78:026b db 73
;   0f78:026c db 20
;   0f78:026d db 43
;   0f78:026e db 6f
;   0f78:026f db 70
;   0f78:0270 db 79
;   0f78:0271 db 72
;   0f78:0272 db 69
;   0f78:0273 db 67
;   0f78:0274 db 68
;   0f78:0275 db 74
;   0f78:0276 db 20
;   0f78:0277 db 28
;   0f78:0278 db 63
;   0f78:0279 db 29
;   0f78:027a db 20
;   0f78:027b db 31
;   0f78:027c db 39
;   0f78:027d db 38
;   0f78:027e db 33
;   0f78:027f db 2c
;   0f78:0280 db 39
;   0f78:0281 db 32
;   0f78:0282 db 20
;   0f78:0283 db 42
;   0f78:0284 db 6f
;   0f78:0285 db 72
;   0f78:0286 db 6c
;   0f78:0287 db 61
;   0f78:0288 db 6e
;   0f78:0289 db 64

;================ proc 0f78:028a IOResult  callers: 06bd4 06c8c
  0f78:028a  xor    ax, ax
  0f78:028c  xchg   word ptr [g367c], ax
  0f78:0290  retf   

;================ proc 0f78:0291 IOCheck  callers: 0ae6d 01c33 0202d 0f0db 0f03e 0f070 023af 01d4c …69
  0f78:0291  cmp    word ptr [g367c], 0
  0f78:0296  jne    0xfa19
  0f78:0298  retf   
L0fa19:
  0f78:0299  mov    ax, word ptr [g367c]
  0f78:029c  jmp    0xf88f
; ---- data 0f78:029f (46 bytes)
;   0f78:029f db 8b
;   0f78:02a0 db f4
;   0f78:02a1 db 36
;   0f78:02a2 db 8e
;   0f78:02a3 db 44
;   0f78:02a4 str "&;"
;   0f78:02a7 db 55
;   0f78:02a8 db 02
;   0f78:02a9 db 7f
;   0f78:02aa db 07
;   0f78:02ab db 7c
;   0f78:02ac db 14
;   0f78:02ad db 26
;   0f78:02ae db 3b
;   0f78:02af db 05
;   0f78:02b0 db 72
;   0f78:02b1 db 0f
;   0f78:02b2 db 26
;   0f78:02b3 db 3b
;   0f78:02b4 db 55
;   0f78:02b5 db 06
;   0f78:02b6 db 7c
;   0f78:02b7 db 08
;   0f78:02b8 db 7f
;   0f78:02b9 db 07
;   0f78:02ba db 26
;   0f78:02bb db 3b
;   0f78:02bc db 45
;   0f78:02bd db 04
;   0f78:02be db 77
;   0f78:02bf str "╦"
;   0f78:02c1 db b8
;   0f78:02c2 db c9
;   0f78:02c3 str ""
;   0f78:02c4 db e9
;   0f78:02c5 db 48
;   0f78:02c6 db fe
;   0f78:02c7 db b8
;   0f78:02c8 db d7
;   0f78:02c9 str ""
;   0f78:02ca db e9
;   0f78:02cb db 42
;   0f78:02cc db fe

;================ proc 0f78:02cd StackCheck  callers: 0ab69 01a09 0f098 0eed6 05f5b 029ca 0252c 0f0ec …18
  0f78:02cd  add    ax, 0x200
  0f78:02d0  jb     0xfa5f
  0f78:02d2  sub    ax, sp
  0f78:02d4  jae    0xfa5f
  0f78:02d6  neg    ax
  0f78:02d8  cmp    ax, word ptr [g367a]
  0f78:02dc  jb     0xfa5f
  0f78:02de  retf   
L0fa5f:
  0f78:02df  mov    ax, 0xca
  0f78:02e2  jmp    0xf88f
; ---- data 0f78:02e5 (1 bytes)
;   0f78:02e5 db ba

;================ proc 0f78:02e6  callers: 0f815 0f829
  0f78:02e6  xor    dx, dx
  0f78:02e8  mov    bx, sp
  0f78:02ea  push   ds
  0f78:02eb  les    di, ptr ss:[bx + 8]
  0f78:02ef  lds    si, ptr ss:[bx + 4]
  0f78:02f3  cld    
  0f78:02f4  xor    ax, ax
  0f78:02f6  stosw  word ptr es:[di], ax
  0f78:02f7  mov    ax, 0xd7b0
  0f78:02fa  stosw  word ptr es:[di], ax
  0f78:02fb  mov    ax, 0x80
  0f78:02fe  stosw  word ptr es:[di], ax
  0f78:02ff  xor    ax, ax
  0f78:0301  stosw  word ptr es:[di], ax
  0f78:0302  stosw  word ptr es:[di], ax
  0f78:0303  stosw  word ptr es:[di], ax
  0f78:0304  lea    ax, [di + 0x74]
  0f78:0307  stosw  word ptr es:[di], ax
  0f78:0308  mov    ax, es
  0f78:030a  stosw  word ptr es:[di], ax
  0f78:030b  mov    ax, 0xd03
  0f78:030e  stosw  word ptr es:[di], ax
  0f78:030f  mov    ax, 0xf78
  0f78:0312  stosw  word ptr es:[di], ax
  0f78:0313  xor    ax, ax
  0f78:0315  mov    cx, 0xe
  0f78:0318  rep stosw word ptr es:[di], ax
  0f78:031a  mov    cx, 0x4f
  0f78:031d  or     dx, dx
  0f78:031f  jne    0xfaaa
  0f78:0321  lodsb  al, byte ptr [si]
  0f78:0322  cmp    cl, al
  0f78:0324  jbe    0xfaaa
  0f78:0326  mov    cl, al
  0f78:0328  jcxz   0xfab2
L0faaa:
  0f78:032a  lodsb  al, byte ptr [si]
  0f78:032b  or     al, al
  0f78:032d  je     0xfab2
  0f78:032f  stosb  byte ptr es:[di], al
  0f78:0330  loop   0xfaaa
L0fab2:
  0f78:0332  xor    al, al
  0f78:0334  stosb  byte ptr es:[di], al
  0f78:0335  pop    ds
  0f78:0336  retf   8
; ---- data 0f78:0339 (43 bytes)
;   0f78:0339 db 8b
;   0f78:033a db dc
;   0f78:033b db 36
;   0f78:033c db c4
;   0f78:033d db 7f
;   0f78:033e db 0a
;   0f78:033f db 36
;   0f78:0340 db 8b
;   0f78:0341 db 47
;   0f78:0342 db 04
;   0f78:0343 db 26
;   0f78:0344 db 89
;   0f78:0345 db 45
;   0f78:0346 db 04
;   0f78:0347 db 36
;   0f78:0348 db 8b
;   0f78:0349 db 47
;   0f78:034a db 06
;   0f78:034b db 26
;   0f78:034c db 89
;   0f78:034d db 45
;   0f78:034e db 0c
;   0f78:034f db 36
;   0f78:0350 db 8b
;   0f78:0351 db 47
;   0f78:0352 db 08
;   0f78:0353 db 26
;   0f78:0354 db 89
;   0f78:0355 db 45
;   0f78:0356 db 0e
;   0f78:0357 db 33
;   0f78:0358 db c0
;   0f78:0359 db 26
;   0f78:035a db 89
;   0f78:035b db 45
;   0f78:035c db 08
;   0f78:035d db 26
;   0f78:035e db 89
;   0f78:035f db 45
;   0f78:0360 db 0a
;   0f78:0361 db ca
;   0f78:0362 db 0a
;   0f78:0363 str ""

;================ proc 0f78:0364 ResetText  callers: 0f181 0f819
  0f78:0364  mov    dx, 0xd7b1
  0f78:0367  jmp    0xfaf1

;================ proc 0f78:0369 RewriteText  callers: 0f194 0f82d
  0f78:0369  mov    dx, 0xd7b2
  0f78:036c  jmp    0xfaf1
; ---- data 0f78:036e (3 bytes)
;   0f78:036e db ba
;   0f78:036f db b3
;   0f78:0370 db d7
L0faf1:
  0f78:0371  push   bp
  0f78:0372  mov    bp, sp
  0f78:0374  les    di, ptr [bp + 6]
  0f78:0377  mov    ax, word ptr es:[di + 2]
  0f78:037b  cmp    ax, 0xd7b1
  0f78:037e  je     0xfb12
  0f78:0380  cmp    ax, 0xd7b2
  0f78:0383  je     0xfb12
  0f78:0385  cmp    ax, 0xd7b0
  0f78:0388  je     0xfb1a
  0f78:038a  mov    word ptr [g367c], 0x66
  0f78:0390  jmp    0xfb36
L0fb12:
  0f78:0392  push   dx
  0f78:0393  push   es
  0f78:0394  push   di
  0f78:0395  push   cs
  0f78:0396  call   0xfb3e
  0f78:0399  pop    dx
L0fb1a:
  0f78:039a  xor    ax, ax
  0f78:039c  mov    word ptr es:[di + 2], dx
  0f78:03a0  mov    word ptr es:[di + 8], ax
  0f78:03a4  mov    word ptr es:[di + 0xa], ax
  0f78:03a8  mov    bx, 0x10
  0f78:03ab  call   0xfb7a
  0f78:03ae  je     0xfb36
  0f78:03b0  mov    word ptr es:[di + 2], 0xd7b0
L0fb36:
  0f78:03b6  pop    bp
  0f78:03b7  retf   4
; ---- data 0f78:03ba (4 bytes)
;   0f78:03ba db b0
;   0f78:03bb str ""
;   0f78:03bc db eb
;   0f78:03bd db 02

;================ proc 0f78:03be  callers: 0f911 0f91a 0fb16
  0f78:03be  mov    al, 1
  0f78:03c0  push   bp
  0f78:03c1  mov    bp, sp
  0f78:03c3  les    di, ptr [bp + 6]
  0f78:03c6  cmp    word ptr es:[di + 2], 0xd7b1
  0f78:03cc  je     0xfb66
  0f78:03ce  cmp    word ptr es:[di + 2], 0xd7b2
  0f78:03d4  je     0xfb5e
  0f78:03d6  mov    word ptr [g367c], 0x67
  0f78:03dc  jmp    0xfb76
L0fb5e:
  0f78:03de  push   ax
  0f78:03df  mov    bx, 0x14
  0f78:03e2  call   0xfb7a
  0f78:03e5  pop    ax
L0fb66:
  0f78:03e6  or     al, al
  0f78:03e8  je     0xfb76
  0f78:03ea  mov    bx, 0x1c
  0f78:03ed  call   0xfb7a
  0f78:03f0  mov    word ptr es:[di + 2], 0xd7b0
L0fb76:
  0f78:03f6  pop    bp
  0f78:03f7  retf   4

;================ proc 0f78:03fa  callers: 0fb62 0fb6d 0fb2b
  0f78:03fa  push   es
  0f78:03fb  push   di
  0f78:03fc  push   es
  0f78:03fd  push   di
  0f78:03fe  lcall  es:[bx + di]
  0f78:0401  or     ax, ax
  0f78:0403  je     0xfb88
  0f78:0405  mov    word ptr [g367c], ax
L0fb88:
  0f78:0408  pop    di
  0f78:0409  pop    es
  0f78:040a  ret    
; ---- data 0f78:040b (142 bytes)
;   0f78:040b db 8b
;   0f78:040c db dc
;   0f78:040d db 1e
;   0f78:040e db 36
;   0f78:040f db c4
;   0f78:0410 db 7f
;   0f78:0411 db 04
;   0f78:0412 db 26
;   0f78:0413 db c5
;   0f78:0414 db 55
;   0f78:0415 db 0c
;   0f78:0416 db 26
;   0f78:0417 db 8b
;   0f78:0418 db 4d
;   0f78:0419 db 04
;   0f78:041a db 26
;   0f78:041b db 8b
;   0f78:041c db 1d
;   0f78:041d db b4
;   0f78:041e db 3f
;   0f78:041f db cd
;   0f78:0420 db 21
;   0f78:0421 db 72
;   0f78:0422 db 10
;   0f78:0423 db 26
;   0f78:0424 db 89
;   0f78:0425 db 45
;   0f78:0426 db 0a
;   0f78:0427 db 33
;   0f78:0428 db c0
;   0f78:0429 db 26
;   0f78:042a db c7
;   0f78:042b db 45
;   0f78:042c db 08
;   0f78:042d str ""
;   0f78:042e str ""
;   0f78:042f db 1f
;   0f78:0430 db ca
;   0f78:0431 db 04
;   0f78:0432 str ""
;   0f78:0433 db 26
;   0f78:0434 db c7
;   0f78:0435 db 45
;   0f78:0436 db 0a
;   0f78:0437 str ""
;   0f78:0438 str ""
;   0f78:0439 db eb
;   0f78:043a db ee
;   0f78:043b db 8b
;   0f78:043c db dc
;   0f78:043d db 1e
;   0f78:043e db 36
;   0f78:043f db c4
;   0f78:0440 db 7f
;   0f78:0441 db 04
;   0f78:0442 db 26
;   0f78:0443 db c5
;   0f78:0444 db 55
;   0f78:0445 db 0c
;   0f78:0446 db 33
;   0f78:0447 db c9
;   0f78:0448 db 26
;   0f78:0449 db 87
;   0f78:044a db 4d
;   0f78:044b db 08
;   0f78:044c db 26
;   0f78:044d db 8b
;   0f78:044e db 1d
;   0f78:044f db b4
;   0f78:0450 db 40
;   0f78:0451 db cd
;   0f78:0452 db 21
;   0f78:0453 db 72
;   0f78:0454 db 07
;   0f78:0455 db 2b
;   0f78:0456 db c1
;   0f78:0457 db 74
;   0f78:0458 db 03
;   0f78:0459 db b8
;   0f78:045a db 65
;   0f78:045b str ""
;   0f78:045c db 1f
;   0f78:045d db ca
;   0f78:045e db 04
;   0f78:045f str ""
;   0f78:0460 db 8b
;   0f78:0461 db dc
;   0f78:0462 db 1e
;   0f78:0463 db 36
;   0f78:0464 db c4
;   0f78:0465 db 7f
;   0f78:0466 db 04
;   0f78:0467 db 26
;   0f78:0468 db c5
;   0f78:0469 db 55
;   0f78:046a db 0c
;   0f78:046b db 33
;   0f78:046c db c9
;   0f78:046d db 26
;   0f78:046e db 87
;   0f78:046f db 4d
;   0f78:0470 db 08
;   0f78:0471 db 26
;   0f78:0472 db 8b
;   0f78:0473 db 1d
;   0f78:0474 db b4
;   0f78:0475 db 40
;   0f78:0476 db cd
;   0f78:0477 db 21
;   0f78:0478 db 72
;   0f78:0479 str "3└"
;   0f78:047c db 1f
;   0f78:047d db ca
;   0f78:047e db 04
;   0f78:047f str ""
;   0f78:0480 db 8b
;   0f78:0481 db dc
;   0f78:0482 db 36
;   0f78:0483 db c4
;   0f78:0484 db 7f
;   0f78:0485 db 04
;   0f78:0486 db 26
;   0f78:0487 db 8b
;   0f78:0488 db 1d
;   0f78:0489 db 83
;   0f78:048a db fb
;   0f78:048b db 04
;   0f78:048c db 76
;   0f78:048d db 06
;   0f78:048e db b4
;   0f78:048f db 3e
;   0f78:0490 db cd
;   0f78:0491 db 21
;   0f78:0492 db 72
;   0f78:0493 str "3└"
;   0f78:0496 db ca
;   0f78:0497 db 04
;   0f78:0498 str ""

;================ proc 0f78:0499  callers: 0fd28 0fe59
  0f78:0499  cmp    word ptr [g367c], 0
  0f78:049e  jne    0xfc55
  0f78:04a0  cmp    word ptr es:[bx + 2], 0xd7b1
  0f78:04a6  jne    0xfc56
  0f78:04a8  mov    si, word ptr es:[bx + 8]
  0f78:04ac  cmp    si, word ptr es:[bx + 0xa]
  0f78:04b0  je     0xfc5d
L0fc32:
  0f78:04b2  push   ds
  0f78:04b3  push   es
  0f78:04b4  push   bx
  0f78:04b5  push   dx
  0f78:04b6  lds    dx, ptr es:[bx + 0xc]
  0f78:04ba  mov    bx, word ptr es:[bx + 0xa]
  0f78:04be  pop    es
  0f78:04bf  add    bx, dx
  0f78:04c1  add    si, dx
  0f78:04c3  cld    
  0f78:04c4  call   ax
  0f78:04c6  sub    si, dx
  0f78:04c8  mov    dx, es
  0f78:04ca  pop    bx
  0f78:04cb  pop    es
  0f78:04cc  pop    ds
  0f78:04cd  mov    word ptr es:[bx + 8], si
  0f78:04d1  or     ax, ax
  0f78:04d3  jne    0xfc5d
L0fc55:
  0f78:04d5  ret    
L0fc56:
  0f78:04d6  mov    word ptr [g367c], 0x68
  0f78:04dc  ret    
L0fc5d:
  0f78:04dd  push   ax
  0f78:04de  push   cx
  0f78:04df  push   dx
  0f78:04e0  push   di
  0f78:04e1  push   es
  0f78:04e2  push   bx
  0f78:04e3  call   0xfd99
  0f78:04e6  pop    bx
  0f78:04e7  pop    es
  0f78:04e8  pop    di
  0f78:04e9  pop    dx
  0f78:04ea  pop    cx
  0f78:04eb  pop    ax
  0f78:04ec  mov    si, word ptr es:[bx + 8]
  0f78:04f0  cmp    si, word ptr es:[bx + 0xa]
  0f78:04f4  jne    0xfc32
  0f78:04f6  ret    

;================ proc 0f78:04f7  callers: 0fe97 0fe07
  0f78:04f7  cmp    word ptr [g367c], 0
  0f78:04fc  jne    0xfcbe
  0f78:04fe  cmp    word ptr es:[bx + 2], 0xd7b2
  0f78:0504  jne    0xfcbf
L0fc86:
  0f78:0506  mov    cx, word ptr es:[bx + 4]
  0f78:050a  mov    di, word ptr es:[bx + 8]
  0f78:050e  sub    cx, di
  0f78:0510  sub    dx, cx
  0f78:0512  jae    0xfc98
  0f78:0514  add    cx, dx
  0f78:0516  xor    dx, dx
L0fc98:
  0f78:0518  push   es
  0f78:0519  les    si, ptr es:[bx + 0xc]
  0f78:051d  add    di, si
  0f78:051f  mov    al, 0x20
  0f78:0521  cld    
  0f78:0522  rep stosb byte ptr es:[di], al
  0f78:0524  sub    di, si
  0f78:0526  pop    es
  0f78:0527  mov    word ptr es:[bx + 8], di
  0f78:052b  cmp    di, word ptr es:[bx + 4]
  0f78:052f  jne    0xfcba
  0f78:0531  push   dx
  0f78:0532  push   es
  0f78:0533  push   bx
  0f78:0534  call   0xfd99
  0f78:0537  pop    bx
  0f78:0538  pop    es
  0f78:0539  pop    dx
L0fcba:
  0f78:053a  or     dx, dx
  0f78:053c  jne    0xfc86
L0fcbe:
  0f78:053e  ret    
L0fcbf:
  0f78:053f  mov    word ptr [g367c], 0x69
  0f78:0545  ret    

;================ proc 0f78:0546  callers: 0fd6b 0fea6
  0f78:0546  cmp    word ptr [g367c], 0
  0f78:054b  jne    0xfd15
  0f78:054d  cmp    word ptr es:[bx + 2], 0xd7b2
  0f78:0553  jne    0xfd16
L0fcd5:
  0f78:0555  mov    cx, word ptr es:[bx + 4]
  0f78:0559  mov    di, word ptr es:[bx + 8]
  0f78:055d  sub    cx, di
  0f78:055f  sub    ax, cx
  0f78:0561  jae    0xfce7
  0f78:0563  add    cx, ax
  0f78:0565  xor    ax, ax
L0fce7:
  0f78:0567  push   ds
  0f78:0568  push   es
  0f78:0569  push   bx
  0f78:056a  mov    ds, dx
  0f78:056c  les    bx, ptr es:[bx + 0xc]
  0f78:0570  add    di, bx
  0f78:0572  cld    
  0f78:0573  rep movsb byte ptr es:[di], byte ptr [si]
  0f78:0575  sub    di, bx
  0f78:0577  pop    bx
  0f78:0578  pop    es
  0f78:0579  pop    ds
  0f78:057a  mov    word ptr es:[bx + 8], di
  0f78:057e  cmp    di, word ptr es:[bx + 4]
  0f78:0582  jne    0xfd11
  0f78:0584  push   ax
  0f78:0585  push   dx
  0f78:0586  push   si
  0f78:0587  push   es
  0f78:0588  push   bx
  0f78:0589  call   0xfd99
  0f78:058c  pop    bx
  0f78:058d  pop    es
  0f78:058e  pop    si
  0f78:058f  pop    dx
  0f78:0590  pop    ax
L0fd11:
  0f78:0591  or     ax, ax
  0f78:0593  jne    0xfcd5
L0fd15:
  0f78:0595  ret    
L0fd16:
  0f78:0596  mov    word ptr [g367c], 0x69
  0f78:059c  ret    

;================ proc 0f78:059d ReadLnEnd  callers: 0ae68 0ed55 0e610 0e051 04422 0db0e 0d519 0c8ba …24
  0f78:059d  push   bp
  0f78:059e  mov    bp, sp
  0f78:05a0  les    bx, ptr [bp + 6]
  0f78:05a3  mov    ax, 0x5bb
  0f78:05a6  xor    dx, dx
  0f78:05a8  call   0xfc19
  0f78:05ab  jne    0xfd37
  0f78:05ad  cmp    word ptr es:[bx + 0x1a], 0
  0f78:05b2  je     0xfd37
  0f78:05b4  call   0xfda7
L0fd37:
  0f78:05b7  pop    bp
  0f78:05b8  retf   4
; ---- data 0f78:05bb (34 bytes)
;   0f78:05bb db ac
;   0f78:05bc db 3c
;   0f78:05bd db 0d
;   0f78:05be db 74
;   0f78:05bf db 0c
;   0f78:05c0 db 3c
;   0f78:05c1 db 1a
;   0f78:05c2 db 74
;   0f78:05c3 db 11
;   0f78:05c4 db 3b
;   0f78:05c5 db f3
;   0f78:05c6 db 75
;   0f78:05c7 db f3
;   0f78:05c8 db b8
;   0f78:05c9 db bb
;   0f78:05ca db 05
;   0f78:05cb db c3
;   0f78:05cc db 3b
;   0f78:05cd db f3
;   0f78:05ce db 74
;   0f78:05cf db 09
;   0f78:05d0 db ac
;   0f78:05d1 db 3c
;   0f78:05d2 db 0a
;   0f78:05d3 db 74
;   0f78:05d4 str "N"
;   0f78:05d6 db 33
;   0f78:05d7 db c0
;   0f78:05d8 db c3
;   0f78:05d9 db b8
;   0f78:05da db d0
;   0f78:05db db 05
;   0f78:05dc db c3

;================ proc 0f78:05dd WriteLnEnd  callers: 01c2e 02028 0f0d6 023aa 01d47 01df7 01cce 0288b …42
  0f78:05dd  push   bp
  0f78:05de  mov    bp, sp
  0f78:05e0  les    bx, ptr [bp + 6]
  0f78:05e3  mov    ax, 2
  0f78:05e6  mov    si, 0x3690
  0f78:05e9  mov    dx, ds
  0f78:05eb  call   0xfcc6
  0f78:05ee  jne    0xfd7a
  0f78:05f0  cmp    word ptr es:[bx + 0x1a], 0
  0f78:05f5  je     0xfd7a
  0f78:05f7  call   0xfda7
L0fd7a:
  0f78:05fa  pop    bp
  0f78:05fb  retf   4

;================ proc 0f78:05fe WriteEnd  callers: 0f039 0f06b 00b85
  0f78:05fe  push   bp
  0f78:05ff  mov    bp, sp
  0f78:0601  les    bx, ptr [bp + 6]
  0f78:0604  cmp    word ptr es:[bx + 0x1a], 0
  0f78:0609  je     0xfd95
  0f78:060b  cmp    word ptr [g367c], 0
  0f78:0610  jne    0xfd95
  0f78:0612  call   0xfda7
L0fd95:
  0f78:0615  pop    bp
  0f78:0616  retf   4

;================ proc 0f78:0619  callers: 0fd09 0fcb4 0fe37 0fc63
  0f78:0619  push   es
  0f78:061a  push   bx
  0f78:061b  lcall  es:[bx + 0x14]
  0f78:061f  or     ax, ax
  0f78:0621  je     0xfda6
  0f78:0623  mov    word ptr [g367c], ax
L0fda6:
  0f78:0626  ret    

;================ proc 0f78:0627  callers: 0fd77 0fd92 0fd34
  0f78:0627  push   es
  0f78:0628  push   bx
  0f78:0629  lcall  es:[bx + 0x18]
  0f78:062d  or     ax, ax
  0f78:062f  je     0xfdb4
  0f78:0631  mov    word ptr [g367c], ax
L0fdb4:
  0f78:0634  ret    
; ---- data 0f78:0635 (70 bytes)
;   0f78:0635 db 55
;   0f78:0636 db 8b
;   0f78:0637 db ec
;   0f78:0638 db 83
;   0f78:0639 db 3e
;   0f78:063a db 7c
;   0f78:063b db 36
;   0f78:063c str ""
;   0f78:063d db 75
;   0f78:063e db 38
;   0f78:063f db c4
;   0f78:0640 db 5e
;   0f78:0641 db 06
;   0f78:0642 db 26
;   0f78:0643 db 81
;   0f78:0644 db 7f
;   0f78:0645 str "▒╫"
;   0f78:0648 db 75
;   0f78:0649 db 27
;   0f78:064a db 26
;   0f78:064b db 8b
;   0f78:064c db 7f
;   0f78:064d db 08
;   0f78:064e db 26
;   0f78:064f db 3b
;   0f78:0650 db 7f
;   0f78:0651 db 0a
;   0f78:0652 db 75
;   0f78:0653 db 10
;   0f78:0654 db e8
;   0f78:0655 db c2
;   0f78:0656 db ff
;   0f78:0657 db c4
;   0f78:0658 db 5e
;   0f78:0659 db 06
;   0f78:065a db 26
;   0f78:065b db 8b
;   0f78:065c db 7f
;   0f78:065d db 08
;   0f78:065e db 26
;   0f78:065f db 3b
;   0f78:0660 db 7f
;   0f78:0661 db 0a
;   0f78:0662 db 74
;   0f78:0663 db 13
;   0f78:0664 db 26
;   0f78:0665 db ff
;   0f78:0666 db 47
;   0f78:0667 db 08
;   0f78:0668 db 26
;   0f78:0669 db c4
;   0f78:066a db 5f
;   0f78:066b db 0c
;   0f78:066c db 26
;   0f78:066d db 8a
;   0f78:066e str "]"
;   0f78:0670 db cb
;   0f78:0671 db c7
;   0f78:0672 db 06
;   0f78:0673 db 7c
;   0f78:0674 db 36
;   0f78:0675 db 68
;   0f78:0676 str ""
;   0f78:0677 db b0
;   0f78:0678 db 1a
;   0f78:0679 db eb
;   0f78:067a db f4

;================ proc 0f78:067b WriteChar  callers: 0f066 00b80
  0f78:067b  push   bp
  0f78:067c  mov    bp, sp
  0f78:067e  les    bx, ptr [bp + 0xa]
  0f78:0681  mov    dx, word ptr [bp + 6]
  0f78:0684  dec    dx
  0f78:0685  jle    0xfe0a
  0f78:0687  call   0xfc77
L0fe0a:
  0f78:068a  cmp    word ptr [g367c], 0
  0f78:068f  jne    0xfe3a
  0f78:0691  cmp    word ptr es:[bx + 2], 0xd7b2
  0f78:0697  jne    0xfe3e
  0f78:0699  inc    word ptr es:[bx + 8]
  0f78:069d  mov    di, word ptr es:[bx + 8]
  0f78:06a1  mov    dx, word ptr es:[bx + 4]
  0f78:06a5  les    bx, ptr es:[bx + 0xc]
  0f78:06a9  mov    al, byte ptr [bp + 8]
  0f78:06ac  mov    byte ptr es:[bx + di - 1], al
  0f78:06b0  cmp    di, dx
  0f78:06b2  jne    0xfe3a
  0f78:06b4  les    bx, ptr [bp + 0xa]
  0f78:06b7  call   0xfd99
L0fe3a:
  0f78:06ba  pop    bp
  0f78:06bb  retf   4
L0fe3e:
  0f78:06be  mov    word ptr [g367c], 0x69
  0f78:06c4  jmp    0xfe3a

;================ proc 0f78:06c6 ReadStr  callers: 0ae63 0ed50 0e60b 0e04c 0441d 0db09 0d514 0c8b5 …24
  0f78:06c6  push   bp
  0f78:06c7  mov    bp, sp
  0f78:06c9  les    bx, ptr [bp + 0xc]
  0f78:06cc  mov    ax, 0x6e9
  0f78:06cf  mov    cx, word ptr [bp + 6]
  0f78:06d2  mov    di, word ptr [bp + 8]
  0f78:06d5  mov    dx, word ptr [bp + 0xa]
  0f78:06d8  inc    di
  0f78:06d9  call   0xfc19
  0f78:06dc  mov    ax, di
  0f78:06de  les    di, ptr [bp + 8]
  0f78:06e1  sub    ax, di
  0f78:06e3  dec    ax
  0f78:06e4  stosb  byte ptr es:[di], al
  0f78:06e5  pop    bp
  0f78:06e6  retf   6
; ---- data 0f78:06e9 (24 bytes)
;   0f78:06e9 db ac
;   0f78:06ea db 3c
;   0f78:06eb db 0d
;   0f78:06ec db 74
;   0f78:06ed db 0f
;   0f78:06ee db 3c
;   0f78:06ef db 1a
;   0f78:06f0 db 74
;   0f78:06f1 db 0b
;   0f78:06f2 db aa
;   0f78:06f3 db 3b
;   0f78:06f4 db f3
;   0f78:06f5 db e0
;   0f78:06f6 db f2
;   0f78:06f7 db e3
;   0f78:06f8 db 05
;   0f78:06f9 db b8
;   0f78:06fa db e9
;   0f78:06fb db 06
;   0f78:06fc db c3
;   0f78:06fd db 4e
;   0f78:06fe db 33
;   0f78:06ff db c0
;   0f78:0700 db c3

;================ proc 0f78:0701 WriteStr  callers: 0f034
  0f78:0701  push   bp
  0f78:0702  mov    bp, sp
  0f78:0704  les    bx, ptr [bp + 8]
  0f78:0707  mov    al, byte ptr es:[bx]
  0f78:070a  xor    ah, ah
  0f78:070c  les    bx, ptr [bp + 0xc]
  0f78:070f  mov    dx, word ptr [bp + 6]
  0f78:0712  sub    dx, ax
  0f78:0714  jle    0xfe9b
  0f78:0716  push   ax
  0f78:0717  call   0xfc77
  0f78:071a  pop    ax
L0fe9b:
  0f78:071b  or     ax, ax
  0f78:071d  je     0xfea9
  0f78:071f  mov    si, word ptr [bp + 8]
  0f78:0722  mov    dx, word ptr [bp + 0xa]
  0f78:0725  inc    si
  0f78:0726  call   0xfcc6
L0fea9:
  0f78:0729  pop    bp
  0f78:072a  retf   6
; ---- data 0f78:072d (1 bytes)
;   0f78:072d db ba

;================ proc 0f78:072e Assign  callers: 07640 0768e 0acab 06bc1 06c79
  0f78:072e  xor    dx, dx
  0f78:0730  mov    bx, sp
  0f78:0732  push   ds
  0f78:0733  les    di, ptr ss:[bx + 8]
  0f78:0737  lds    si, ptr ss:[bx + 4]
  0f78:073b  cld    
  0f78:073c  xor    ax, ax
  0f78:073e  stosw  word ptr es:[di], ax
  0f78:073f  mov    ax, 0xd7b0
  0f78:0742  stosw  word ptr es:[di], ax
  0f78:0743  xor    ax, ax
  0f78:0745  mov    cx, 0x16
  0f78:0748  rep stosw word ptr es:[di], ax
  0f78:074a  mov    cx, 0x4f
  0f78:074d  or     dx, dx
  0f78:074f  jne    0xfeda
  0f78:0751  lodsb  al, byte ptr [si]
  0f78:0752  cmp    cl, al
  0f78:0754  jbe    0xfeda
  0f78:0756  mov    cl, al
  0f78:0758  jcxz   0xfee2
L0feda:
  0f78:075a  lodsb  al, byte ptr [si]
  0f78:075b  or     al, al
  0f78:075d  je     0xfee2
  0f78:075f  stosb  byte ptr es:[di], al
  0f78:0760  loop   0xfeda
L0fee2:
  0f78:0762  xor    al, al
  0f78:0764  stosb  byte ptr es:[di], al
  0f78:0765  pop    ds
  0f78:0766  retf   8

;================ proc 0f78:0769 Reset  callers: 06bcf 06c87
  0f78:0769  mov    al, byte ptr [g368e]
  0f78:076c  mov    ah, 0x3d
  0f78:076e  xor    dx, dx
  0f78:0770  jmp    0xfef8

;================ proc 0f78:0772 Rewrite  callers: 0764e 0769c 0acb9
  0f78:0772  mov    ax, 0x3c00
  0f78:0775  mov    dx, 1
L0fef8:
  0f78:0778  push   bp
  0f78:0779  mov    bp, sp
  0f78:077b  les    di, ptr [bp + 8]
  0f78:077e  cmp    word ptr es:[di + 2], 0xd7b0
  0f78:0784  je     0xff20
  0f78:0786  cmp    word ptr es:[di + 2], 0xd7b3
  0f78:078c  je     0xff16
  0f78:078e  mov    word ptr [g367c], 0x66
  0f78:0794  jmp    0xff4a
L0ff16:
  0f78:0796  push   ax
  0f78:0797  push   dx
  0f78:0798  push   es
  0f78:0799  push   di
  0f78:079a  push   cs
  0f78:079b  call   0xff6a    ; Close
  0f78:079e  pop    dx
  0f78:079f  pop    ax
L0ff20:
  0f78:07a0  cmp    byte ptr es:[di + 0x30], 0
  0f78:07a5  je     0xff39
  0f78:07a7  push   ds
  0f78:07a8  lea    dx, [di + 0x30]
  0f78:07ab  push   es
  0f78:07ac  pop    ds
  0f78:07ad  xor    cx, cx
  0f78:07af  int    0x21
  0f78:07b1  pop    ds
  0f78:07b2  jae    0xff3a
  0f78:07b4  mov    word ptr [g367c], ax
  0f78:07b7  jmp    0xff4a
L0ff39:
  0f78:07b9  xchg   dx, ax
L0ff3a:
  0f78:07ba  mov    word ptr es:[di + 2], 0xd7b3
  0f78:07c0  mov    word ptr es:[di], ax
  0f78:07c3  mov    ax, word ptr [bp + 6]
  0f78:07c6  mov    word ptr es:[di + 4], ax
L0ff4a:
  0f78:07ca  pop    bp
  0f78:07cb  retf   6
; ---- data 0f78:07ce (28 bytes)
;   0f78:07ce db 8b
;   0f78:07cf db dc
;   0f78:07d0 db 36
;   0f78:07d1 db c4
;   0f78:07d2 db 7f
;   0f78:07d3 db 04
;   0f78:07d4 db e8
;   0f78:07d5 db 38
;   0f78:07d6 str ""
;   0f78:07d7 db 75
;   0f78:07d8 db 0e
;   0f78:07d9 db 33
;   0f78:07da db c9
;   0f78:07db db 26
;   0f78:07dc db 8b
;   0f78:07dd db 1d
;   0f78:07de db b4
;   0f78:07df db 40
;   0f78:07e0 db cd
;   0f78:07e1 db 21
;   0f78:07e2 db 73
;   0f78:07e3 str "г|6"
;   0f78:07e7 db ca
;   0f78:07e8 db 04
;   0f78:07e9 str ""

;================ proc 0f78:07ea Close  callers: 0766a 07724 0ff1b 0acd5 06c13 06d1b
  0f78:07ea  mov    bx, sp
  0f78:07ec  les    di, ptr ss:[bx + 4]
  0f78:07f0  call   0xff8f
  0f78:07f3  jne    0xff8c
  0f78:07f5  mov    bx, word ptr es:[di]
  0f78:07f8  cmp    bx, 4
  0f78:07fb  jbe    0xff86
  0f78:07fd  mov    ah, 0x3e
  0f78:07ff  int    0x21
  0f78:0801  jae    0xff86
  0f78:0803  mov    word ptr [g367c], ax
L0ff86:
  0f78:0806  mov    word ptr es:[di + 2], 0xd7b0
L0ff8c:
  0f78:080c  retf   4

;================ proc 0f78:080f  callers: 0ff70 0ffb0
  0f78:080f  cmp    word ptr es:[di + 2], 0xd7b3
  0f78:0815  je     0xff9d
  0f78:0817  mov    word ptr [g367c], 0x67
L0ff9d:
  0f78:081d  ret    

;================ proc 0f78:081e ReadRec  callers: 06c06 06ca2 06cb4 06cc6 06cd8 06cea 06cfc 06d0e
  0f78:081e  mov    ah, 0x3f
  0f78:0820  mov    dx, 0x64
  0f78:0823  jmp    0xffaa

;================ proc 0f78:0825 WriteRec  callers: 0765d 076ab 076bd 076cf 076e1 076f3 07705 07717 …9
  0f78:0825  mov    ah, 0x40
  0f78:0827  mov    dx, 0x65
L0ffaa:
  0f78:082a  push   bp
  0f78:082b  mov    bp, sp
  0f78:082d  les    di, ptr [bp + 0xa]
  0f78:0830  call   0xff8f
  0f78:0833  jne    0xffd0
  0f78:0835  push   ds
  0f78:0836  push   dx
  0f78:0837  lds    dx, ptr [bp + 6]
  0f78:083a  mov    cx, word ptr es:[di + 4]
  0f78:083e  mov    bx, word ptr es:[di]
  0f78:0841  int    0x21
  0f78:0843  pop    dx
  0f78:0844  pop    ds
  0f78:0845  jb     0xffcd
  0f78:0847  cmp    ax, cx
  0f78:0849  je     0xffd0
  0f78:084b  mov    ax, dx
L0ffcd:
  0f78:084d  mov    word ptr [g367c], ax
L0ffd0:
  0f78:0850  pop    bp
  0f78:0851  retf   4
; ---- data 0f78:0854 (152 bytes)
;   0f78:0854 db b3
;   0f78:0855 db 3f
;   0f78:0856 db b9
;   0f78:0857 db 64
;   0f78:0858 str ""
;   0f78:0859 db eb
;   0f78:085a db 05
;   0f78:085b db b3
;   0f78:085c db 40
;   0f78:085d db b9
;   0f78:085e db 65
;   0f78:085f str ""
;   0f78:0860 db 55
;   0f78:0861 db 8b
;   0f78:0862 db ec
;   0f78:0863 db c4
;   0f78:0864 db 7e
;   0f78:0865 db 10
;   0f78:0866 db e8
;   0f78:0867 db a6
;   0f78:0868 db ff
;   0f78:0869 db 75
;   0f78:086a db 3f
;   0f78:086b db 8b
;   0f78:086c db 46
;   0f78:086d db 0a
;   0f78:086e db 0b
;   0f78:086f db c0
;   0f78:0870 db 74
;   0f78:0871 db 1c
;   0f78:0872 db 1e
;   0f78:0873 db 51
;   0f78:0874 db 26
;   0f78:0875 db f7
;   0f78:0876 db 65
;   0f78:0877 str "Л╚┼V"
;   0f78:087c db 0c
;   0f78:087d db 8a
;   0f78:087e db e3
;   0f78:087f db 26
;   0f78:0880 db 8b
;   0f78:0881 db 1d
;   0f78:0882 db cd
;   0f78:0883 db 21
;   0f78:0884 db 59
;   0f78:0885 db 1f
;   0f78:0886 db 72
;   0f78:0887 db 1f
;   0f78:0888 db 33
;   0f78:0889 db d2
;   0f78:088a db 26
;   0f78:088b db f7
;   0f78:088c db 75
;   0f78:088d db 04
;   0f78:088e db c4
;   0f78:088f db 7e
;   0f78:0890 db 06
;   0f78:0891 db 8c
;   0f78:0892 db c2
;   0f78:0893 db 0b
;   0f78:0894 db d7
;   0f78:0895 db 74
;   0f78:0896 db 05
;   0f78:0897 db 26
;   0f78:0898 db 89
;   0f78:0899 db 05
;   0f78:089a db eb
;   0f78:089b db 1c
;   0f78:089c db 3b
;   0f78:089d db 46
;   0f78:089e db 0a
;   0f78:089f db 74
;   0f78:08a0 db 17
;   0f78:08a1 db 89
;   0f78:08a2 db 0e
;   0f78:08a3 db 7c
;   0f78:08a4 db 36
;   0f78:08a5 db eb
;   0f78:08a6 db 11
;   0f78:08a7 db a3
;   0f78:08a8 db 7c
;   0f78:08a9 db 36
;   0f78:08aa db c4
;   0f78:08ab db 7e
;   0f78:08ac db 06
;   0f78:08ad db 8c
;   0f78:08ae db c2
;   0f78:08af db 0b
;   0f78:08b0 db d7
;   0f78:08b1 db 74
;   0f78:08b2 db 05
;   0f78:08b3 db 33
;   0f78:08b4 db c0
;   0f78:08b5 db 26
;   0f78:08b6 db 89
;   0f78:08b7 db 05
;   0f78:08b8 db 5d
;   0f78:08b9 db ca
;   0f78:08ba db 0e
;   0f78:08bb str ""
;   0f78:08bc db 55
;   0f78:08bd db 8b
;   0f78:08be db ec
;   0f78:08bf db c4
;   0f78:08c0 db 7e
;   0f78:08c1 db 0a
;   0f78:08c2 db e8
;   0f78:08c3 db 4a
;   0f78:08c4 db ff
;   0f78:08c5 db 75
;   0f78:08c6 db 21
;   0f78:08c7 db 8b
;   0f78:08c8 db 46
;   0f78:08c9 db 08
;   0f78:08ca db 26
;   0f78:08cb db f7
;   0f78:08cc db 65
;   0f78:08cd str "Л╚ЛF"
;   0f78:08d2 db 06
;   0f78:08d3 db 26
;   0f78:08d4 db f7
;   0f78:08d5 db 65
;   0f78:08d6 db 04
;   0f78:08d7 str "╩Л╨"
;   0f78:08db db 26
;   0f78:08dc db 8b
;   0f78:08dd db 1d
;   0f78:08de db b8
;   0f78:08df str ""
;   0f78:08e0 db 42
;   0f78:08e1 db cd
;   0f78:08e2 db 21
;   0f78:08e3 db 73
;   0f78:08e4 str "г|6"
;   0f78:08e8 db 5d
;   0f78:08e9 db ca
;   0f78:08ea db 08
;   0f78:08eb str ""

;================ proc 0f78:08ec GetDir  callers: 06a2d
  0f78:08ec  push   bp
  0f78:08ed  mov    bp, sp
  0f78:08ef  sub    sp, 0x80
  0f78:08f3  push   ds
  0f78:08f4  lea    si, [bp - 0x80]
  0f78:08f7  push   ss
  0f78:08f8  pop    ds
  0f78:08f9  mov    al, byte ptr [bp + 0xc]
  0f78:08fc  or     al, al
  0f78:08fe  jne    0x10086
  0f78:0900  mov    ah, 0x19
  0f78:0902  int    0x21
  0f78:0904  inc    al
L10086:
  0f78:0906  mov    dl, al
  0f78:0908  add    al, 0x40
  0f78:090a  mov    byte ptr [si], al
  0f78:090c  inc    si
  0f78:090d  mov    word ptr [si], 0x5c3a
  0f78:0911  inc    si
  0f78:0912  inc    si
  0f78:0913  mov    ah, 0x47
  0f78:0915  int    0x21
  0f78:0917  jae    0x1009c
  0f78:0919  mov    byte ptr [si], 0
L1009c:
  0f78:091c  lea    si, [bp - 0x80]
  0f78:091f  les    di, ptr [bp + 8]
  0f78:0922  mov    cx, word ptr [bp + 6]
  0f78:0925  xor    bx, bx
  0f78:0927  cld    
L100a8:
  0f78:0928  lodsb  al, byte ptr [si]
  0f78:0929  or     al, al
  0f78:092b  je     0x100b3
  0f78:092d  inc    bx
  0f78:092e  mov    byte ptr es:[bx + di], al
  0f78:0931  loop   0x100a8
L100b3:
  0f78:0933  mov    byte ptr es:[di], bl
  0f78:0936  pop    ds
  0f78:0937  mov    sp, bp
  0f78:0939  pop    bp
  0f78:093a  retf   8
; ---- data 0f78:093d (149 bytes)
;   0f78:093d db 55
;   0f78:093e db 8b
;   0f78:093f db ec
;   0f78:0940 db 81
;   0f78:0941 db ec
;   0f78:0942 db 80
;   0f78:0943 str ""
;   0f78:0944 db e8
;   0f78:0945 db 61
;   0f78:0946 str ""
;   0f78:0947 db 8b
;   0f78:0948 db 46
;   0f78:0949 db 80
;   0f78:094a str "└t*А№:u $▀"
;   0f78:0955 db 2c
;   0f78:0956 db 41
;   0f78:0957 db 8a
;   0f78:0958 db d0
;   0f78:0959 db b4
;   0f78:095a db 0e
;   0f78:095b db cd
;   0f78:095c db 21
;   0f78:095d db b4
;   0f78:095e db 19
;   0f78:095f db cd
;   0f78:0960 db 21
;   0f78:0961 db 3a
;   0f78:0962 db c2
;   0f78:0963 db 74
;   0f78:0964 db 08
;   0f78:0965 db c7
;   0f78:0966 db 06
;   0f78:0967 db 7c
;   0f78:0968 db 36
;   0f78:0969 db 0f
;   0f78:096a str ""
;   0f78:096b db eb
;   0f78:096c db 0b
;   0f78:096d db 80
;   0f78:096e db 7e
;   0f78:096f db 82
;   0f78:0970 str ""
;   0f78:0971 db 74
;   0f78:0972 db 05
;   0f78:0973 db b4
;   0f78:0974 db 3b
;   0f78:0975 db e8
;   0f78:0976 db 4b
;   0f78:0977 str ""
;   0f78:0978 db 8b
;   0f78:0979 db e5
;   0f78:097a db 5d
;   0f78:097b db ca
;   0f78:097c db 04
;   0f78:097d str ""
;   0f78:097e db 55
;   0f78:097f db 8b
;   0f78:0980 db ec
;   0f78:0981 db 81
;   0f78:0982 db ec
;   0f78:0983 db 80
;   0f78:0984 str ""
;   0f78:0985 db e8
;   0f78:0986 db 20
;   0f78:0987 str ""
;   0f78:0988 db b4
;   0f78:0989 db 39
;   0f78:098a db e8
;   0f78:098b db 36
;   0f78:098c str ""
;   0f78:098d db 8b
;   0f78:098e db e5
;   0f78:098f db 5d
;   0f78:0990 db ca
;   0f78:0991 db 04
;   0f78:0992 str ""
;   0f78:0993 db 55
;   0f78:0994 db 8b
;   0f78:0995 db ec
;   0f78:0996 db 81
;   0f78:0997 db ec
;   0f78:0998 db 80
;   0f78:0999 str ""
;   0f78:099a db e8
;   0f78:099b db 0b
;   0f78:099c str ""
;   0f78:099d db b4
;   0f78:099e db 3a
;   0f78:099f db e8
;   0f78:09a0 db 21
;   0f78:09a1 str ""
;   0f78:09a2 db 8b
;   0f78:09a3 db e5
;   0f78:09a4 db 5d
;   0f78:09a5 db ca
;   0f78:09a6 db 04
;   0f78:09a7 str ""
;   0f78:09a8 db 1e
;   0f78:09a9 db c5
;   0f78:09aa db 76
;   0f78:09ab db 06
;   0f78:09ac db 8d
;   0f78:09ad db 7e
;   0f78:09ae db 80
;   0f78:09af db 16
;   0f78:09b0 db 07
;   0f78:09b1 db fc
;   0f78:09b2 db ac
;   0f78:09b3 db 3c
;   0f78:09b4 db 7f
;   0f78:09b5 db 72
;   0f78:09b6 str "░⌂"
;   0f78:09b9 db 98
;   0f78:09ba db 8b
;   0f78:09bb db c8
;   0f78:09bc db f3
;   0f78:09bd db a4
;   0f78:09be db 32
;   0f78:09bf db c0
;   0f78:09c0 db aa
;   0f78:09c1 db 1f
;   0f78:09c2 db c3
;   0f78:09c3 db 1e
;   0f78:09c4 db 8d
;   0f78:09c5 db 56
;   0f78:09c6 db 80
;   0f78:09c7 db 16
;   0f78:09c8 db 1f
;   0f78:09c9 db cd
;   0f78:09ca db 21
;   0f78:09cb db 1f
;   0f78:09cc db 73
;   0f78:09cd str "г|6"
;   0f78:09d1 db c3

;================ proc 0f78:09d2 LongMul  callers: 00e14
  0f78:09d2  cmp    byte ptr [g368c], 2
  0f78:09d7  jb     0x10174
  0f78:09d9  shl    eax, 0x10
  0f78:09dd  shrd   eax, edx, 0x10
  0f78:09e2  shl    ecx, 0x10
  0f78:09e6  shrd   ecx, ebx, 0x10
  0f78:09eb  imul   ecx
  0f78:09ee  shld   edx, eax, 0x10
  0f78:09f3  retf   
L10174:
  0f78:09f4  mov    si, ax
  0f78:09f6  mov    di, dx
  0f78:09f8  mul    cx
  0f78:09fa  push   ax
  0f78:09fb  push   dx
  0f78:09fc  mov    ax, si
  0f78:09fe  mul    bx
  0f78:0a00  mov    bx, ax
  0f78:0a02  mov    ax, di
  0f78:0a04  mul    cx
  0f78:0a06  mov    cx, ax
  0f78:0a08  pop    dx
  0f78:0a09  pop    ax
  0f78:0a0a  add    dx, bx
  0f78:0a0c  add    dx, cx
  0f78:0a0e  retf   

;================ proc 0f78:0a0f LongDiv  callers: 01103
  0f78:0a0f  cmp    byte ptr [g368c], 2
  0f78:0a14  jb     0x101bd
  0f78:0a16  shl    eax, 0x10
  0f78:0a1a  shrd   eax, edx, 0x10
  0f78:0a1f  shl    ecx, 0x10
  0f78:0a23  shrd   ecx, ebx, 0x10
  0f78:0a28  je     0x10208
  0f78:0a2a  cdq    
  0f78:0a2c  idiv   ecx
  0f78:0a2f  mov    ecx, edx
  0f78:0a32  shld   edx, eax, 0x10
  0f78:0a37  shld   ebx, ecx, 0x10
  0f78:0a3c  retf   
L101bd:
  0f78:0a3d  push   bp
  0f78:0a3e  xor    bp, bp
  0f78:0a40  or     dx, dx
  0f78:0a42  jns    0x101cc
  0f78:0a44  inc    bp
  0f78:0a45  neg    ax
  0f78:0a47  adc    dx, 0
  0f78:0a4a  neg    dx
L101cc:
  0f78:0a4c  or     bx, bx
  0f78:0a4e  je     0x1020e
  0f78:0a50  jns    0x101dd
  0f78:0a52  inc    bp
  0f78:0a53  inc    bp
  0f78:0a54  neg    cx
  0f78:0a56  adc    bx, 0
  0f78:0a59  neg    bx
  0f78:0a5b  je     0x10210
L101dd:
  0f78:0a5d  push   bp
  0f78:0a5e  mov    si, cx
  0f78:0a60  mov    di, bx
  0f78:0a62  xor    bx, bx
  0f78:0a64  mov    cx, dx
  0f78:0a66  mov    dx, ax
  0f78:0a68  xor    ax, ax
  0f78:0a6a  mov    bp, 0x10
L101ed:
  0f78:0a6d  shl    ax, 1
  0f78:0a6f  rcl    dx, 1
  0f78:0a71  rcl    cx, 1
  0f78:0a73  rcl    bx, 1
  0f78:0a75  inc    ax
  0f78:0a76  sub    cx, si
  0f78:0a78  sbb    bx, di
  0f78:0a7a  jae    0x10201
  0f78:0a7c  dec    ax
  0f78:0a7d  add    cx, si
  0f78:0a7f  adc    bx, di
L10201:
  0f78:0a81  dec    bp
  0f78:0a82  jne    0x101ed
  0f78:0a84  pop    bp
  0f78:0a85  jmp    0x1021d
L10207:
  0f78:0a87  pop    bp
L10208:
  0f78:0a88  mov    ax, 0xc8
  0f78:0a8b  jmp    0xf88f
L1020e:
  0f78:0a8e  jcxz   0x10207
L10210:
  0f78:0a90  xchg   bx, ax
  0f78:0a91  xchg   dx, ax
  0f78:0a92  div    cx
  0f78:0a94  xchg   bx, ax
  0f78:0a95  div    cx
  0f78:0a97  mov    cx, dx
  0f78:0a99  mov    dx, bx
  0f78:0a9b  xor    bx, bx
L1021d:
  0f78:0a9d  shr    bp, 1
  0f78:0a9f  jae    0x10229
  0f78:0aa1  neg    cx
  0f78:0aa3  adc    bx, 0
  0f78:0aa6  neg    bx
  0f78:0aa8  inc    bp
L10229:
  0f78:0aa9  dec    bp
  0f78:0aaa  jne    0x10233
  0f78:0aac  neg    ax
  0f78:0aae  adc    dx, 0
  0f78:0ab1  neg    dx
L10233:
  0f78:0ab3  pop    bp
  0f78:0ab4  retf   
; ---- data 0f78:0ab5 (50 bytes)
;   0f78:0ab5 db 80
;   0f78:0ab6 db 3e
;   0f78:0ab7 db 8c
;   0f78:0ab8 db 36
;   0f78:0ab9 db 02
;   0f78:0aba db 72
;   0f78:0abb db 06
;   0f78:0abc db 0f
;   0f78:0abd db ad
;   0f78:0abe db d0
;   0f78:0abf db d3
;   0f78:0ac0 db ea
;   0f78:0ac1 db cb
;   0f78:0ac2 db 83
;   0f78:0ac3 db e1
;   0f78:0ac4 db 1f
;   0f78:0ac5 db 74
;   0f78:0ac6 str "╤ъ╤╪т·"
;   0f78:0acd db cb
;   0f78:0ace db 80
;   0f78:0acf db 3e
;   0f78:0ad0 db 8c
;   0f78:0ad1 db 36
;   0f78:0ad2 db 02
;   0f78:0ad3 db 72
;   0f78:0ad4 db 06
;   0f78:0ad5 db 0f
;   0f78:0ad6 db a5
;   0f78:0ad7 db c2
;   0f78:0ad8 db d3
;   0f78:0ad9 db e0
;   0f78:0ada db cb
;   0f78:0adb db 83
;   0f78:0adc db e1
;   0f78:0add db 1f
;   0f78:0ade db 74
;   0f78:0adf str "╤р╤╥т·"
;   0f78:0ae6 db cb

;================ proc 0f78:0ae7 StrLoad  callers: 01a31 01a86 01b29 01e47 0204a 0207b 020ac 020dd …86
  0f78:0ae7  cld    
  0f78:0ae8  mov    bx, sp
  0f78:0aea  mov    dx, ds
  0f78:0aec  les    di, ptr ss:[bx + 8]
  0f78:0af0  lds    si, ptr ss:[bx + 4]
  0f78:0af4  lodsb  al, byte ptr [si]
  0f78:0af5  stosb  byte ptr es:[di], al
  0f78:0af6  mov    cl, al
  0f78:0af8  xor    ch, ch
  0f78:0afa  rep movsb byte ptr es:[di], byte ptr [si]
  0f78:0afc  mov    ds, dx
  0f78:0afe  retf   4

;================ proc 0f78:0b01 StrStore  callers: 01a21 02063 02094 020c5 020f6 0ed74 0ed9c 02722 …24
  0f78:0b01  cld    
  0f78:0b02  mov    bx, sp
  0f78:0b04  mov    dx, ds
  0f78:0b06  lds    si, ptr ss:[bx + 0xa]
  0f78:0b0a  les    di, ptr ss:[bx + 6]
  0f78:0b0e  mov    cx, word ptr ss:[bx + 4]
  0f78:0b12  lodsb  al, byte ptr [si]
  0f78:0b13  cmp    al, cl
  0f78:0b15  jbe    0x10299
  0f78:0b17  mov    al, cl
L10299:
  0f78:0b19  stosb  byte ptr es:[di], al
  0f78:0b1a  mov    cl, al
  0f78:0b1c  xor    ch, ch
  0f78:0b1e  rep movsb byte ptr es:[di], byte ptr [si]
  0f78:0b20  mov    ds, dx
  0f78:0b22  retf   0xa
; ---- data 0f78:0b25 (65 bytes)
;   0f78:0b25 db fc
;   0f78:0b26 db 8b
;   0f78:0b27 db dc
;   0f78:0b28 db 8c
;   0f78:0b29 db da
;   0f78:0b2a db 36
;   0f78:0b2b db c4
;   0f78:0b2c db 7f
;   0f78:0b2d db 0c
;   0f78:0b2e db 36
;   0f78:0b2f db c5
;   0f78:0b30 db 77
;   0f78:0b31 db 08
;   0f78:0b32 db 8a
;   0f78:0b33 str "2ф6Л"
;   0f78:0b38 db 4f
;   0f78:0b39 db 06
;   0f78:0b3a db 0b
;   0f78:0b3b db c9
;   0f78:0b3c db 7f
;   0f78:0b3d db 03
;   0f78:0b3e db b9
;   0f78:0b3f db 01
;   0f78:0b40 str ""
;   0f78:0b41 str "ё+┴"
;   0f78:0b45 db 72
;   0f78:0b46 db 13
;   0f78:0b47 db 40
;   0f78:0b48 db 36
;   0f78:0b49 db 8b
;   0f78:0b4a db 4f
;   0f78:0b4b db 04
;   0f78:0b4c db 0b
;   0f78:0b4d db c9
;   0f78:0b4e db 7d
;   0f78:0b4f str "3╔"
;   0f78:0b52 db 3b
;   0f78:0b53 db c1
;   0f78:0b54 db 76
;   0f78:0b55 db 06
;   0f78:0b56 db 8b
;   0f78:0b57 db c1
;   0f78:0b58 db eb
;   0f78:0b59 str "3└"
;   0f78:0b5c db aa
;   0f78:0b5d db 8b
;   0f78:0b5e db c8
;   0f78:0b5f db f3
;   0f78:0b60 db a4
;   0f78:0b61 db 8e
;   0f78:0b62 db da
;   0f78:0b63 db ca
;   0f78:0b64 db 08
;   0f78:0b65 str ""

;================ proc 0f78:0b66 StrConcat  callers: 01a44 01a4e 01a61 01a90 01b3e 01b48 01b5d 01b67 …186
  0f78:0b66  cld    
  0f78:0b67  mov    bx, sp
  0f78:0b69  mov    dx, ds
  0f78:0b6b  les    di, ptr ss:[bx + 8]
  0f78:0b6f  lds    si, ptr ss:[bx + 4]
  0f78:0b73  mov    cl, byte ptr es:[di]
  0f78:0b76  xor    ch, ch
  0f78:0b78  lodsb  al, byte ptr [si]
  0f78:0b79  add    byte ptr es:[di], al
  0f78:0b7c  jae    0x10306
  0f78:0b7e  mov    byte ptr es:[di], 0xff
  0f78:0b82  mov    al, cl
  0f78:0b84  not    al
L10306:
  0f78:0b86  add    di, cx
  0f78:0b88  inc    di
  0f78:0b89  mov    cl, al
  0f78:0b8b  rep movsb byte ptr es:[di], byte ptr [si]
  0f78:0b8d  mov    ds, dx
  0f78:0b8f  retf   4
; ---- data 0f78:0b92 (70 bytes)
;   0f78:0b92 db 55
;   0f78:0b93 db 8b
;   0f78:0b94 db ec
;   0f78:0b95 db 1e
;   0f78:0b96 db c5
;   0f78:0b97 db 76
;   0f78:0b98 str "№м◙└t,К╨2Ў"
;   0f78:0ba3 db c4
;   0f78:0ba4 db 7e
;   0f78:0ba5 str "&К♪2э+"
;   0f78:0bac db ca
;   0f78:0bad db 72
;   0f78:0bae db 1c
;   0f78:0baf db 41
;   0f78:0bb0 db 47
;   0f78:0bb1 db ac
;   0f78:0bb2 db f2
;   0f78:0bb3 db ae
;   0f78:0bb4 db 75
;   0f78:0bb5 db 15
;   0f78:0bb6 db 8b
;   0f78:0bb7 db c7
;   0f78:0bb8 db 8b
;   0f78:0bb9 db d9
;   0f78:0bba db 8b
;   0f78:0bbb db ca
;   0f78:0bbc db 49
;   0f78:0bbd db f3
;   0f78:0bbe db a6
;   0f78:0bbf db 74
;   0f78:0bc0 db 0e
;   0f78:0bc1 db 8b
;   0f78:0bc2 db f8
;   0f78:0bc3 db 8b
;   0f78:0bc4 db cb
;   0f78:0bc5 db 8b
;   0f78:0bc6 db 76
;   0f78:0bc7 db 0a
;   0f78:0bc8 db 46
;   0f78:0bc9 db eb
;   0f78:0bca db e6
;   0f78:0bcb db 33
;   0f78:0bcc db c0
;   0f78:0bcd db eb
;   0f78:0bce db 04
;   0f78:0bcf db 48
;   0f78:0bd0 db 2b
;   0f78:0bd1 db 46
;   0f78:0bd2 db 06
;   0f78:0bd3 db 1f
;   0f78:0bd4 db 5d
;   0f78:0bd5 db ca
;   0f78:0bd6 db 08
;   0f78:0bd7 str ""

;================ proc 0f78:0bd8 StrCmp  callers: 0ae86 0ae97 0b94a 0c4be 0d3a6 0d6ed 0d7d8 0d802 …93
  0f78:0bd8  cld    
  0f78:0bd9  mov    bx, sp
  0f78:0bdb  mov    dx, ds
  0f78:0bdd  lds    si, ptr ss:[bx + 8]
  0f78:0be1  les    di, ptr ss:[bx + 4]
  0f78:0be5  lodsb  al, byte ptr [si]
  0f78:0be6  mov    ah, byte ptr es:[di]
  0f78:0be9  inc    di
  0f78:0bea  mov    cl, al
  0f78:0bec  cmp    cl, ah
  0f78:0bee  jbe    0x10372
  0f78:0bf0  mov    cl, ah
L10372:
  0f78:0bf2  or     cl, cl
  0f78:0bf4  je     0x1037c
  0f78:0bf6  xor    ch, ch
  0f78:0bf8  repe cmpsb byte ptr [si], byte ptr es:[di]
  0f78:0bfa  jne    0x1037e
L1037c:
  0f78:0bfc  cmp    al, ah
L1037e:
  0f78:0bfe  mov    ds, dx
  0f78:0c00  retf   8

;================ proc 0f78:0c03 CharToStr  callers: 01b39 01b58 01b77 01b96 01e57 0217b 0e42d 0e482 …58
  0f78:0c03  cld    
  0f78:0c04  mov    bx, sp
  0f78:0c06  les    di, ptr ss:[bx + 6]
  0f78:0c0a  mov    al, 1
  0f78:0c0c  stosb  byte ptr es:[di], al
  0f78:0c0d  mov    al, byte ptr ss:[bx + 4]
  0f78:0c11  stosb  byte ptr es:[di], al
  0f78:0c12  retf   2
; ---- data 0f78:0c15 (469 bytes)
;   0f78:0c15 db fc
;   0f78:0c16 db 8b
;   0f78:0c17 db dc
;   0f78:0c18 db 8c
;   0f78:0c19 db da
;   0f78:0c1a db 36
;   0f78:0c1b db c4
;   0f78:0c1c db 7f
;   0f78:0c1d db 0a
;   0f78:0c1e db 36
;   0f78:0c1f db c5
;   0f78:0c20 db 77
;   0f78:0c21 db 06
;   0f78:0c22 db 36
;   0f78:0c23 db 8b
;   0f78:0c24 db 47
;   0f78:0c25 str "кЛ╚є"
;   0f78:0c2a db a4
;   0f78:0c2b db 8e
;   0f78:0c2c db da
;   0f78:0c2d db ca
;   0f78:0c2e db 06
;   0f78:0c2f str ""
;   0f78:0c30 db 55
;   0f78:0c31 db 8b
;   0f78:0c32 db ec
;   0f78:0c33 db 81
;   0f78:0c34 db ec
;   0f78:0c35 str ""
;   0f78:0c36 str "Г~"
;   0f78:0c39 db 06
;   0f78:0c3a str "}"
;   0f78:0c3c db 05
;   0f78:0c3d db c7
;   0f78:0c3e db 46
;   0f78:0c3f db 06
;   0f78:0c40 db 01
;   0f78:0c41 str ""
;   0f78:0c42 db 8d
;   0f78:0c43 db be
;   0f78:0c44 str ""
;   0f78:0c45 db ff
;   0f78:0c46 db 16
;   0f78:0c47 db 57
;   0f78:0c48 db c4
;   0f78:0c49 db 7e
;   0f78:0c4a db 0a
;   0f78:0c4b db 06
;   0f78:0c4c db 57
;   0f78:0c4d db b8
;   0f78:0c4e db 01
;   0f78:0c4f str ""
;   0f78:0c50 db 50
;   0f78:0c51 db 8b
;   0f78:0c52 db 46
;   0f78:0c53 db 06
;   0f78:0c54 db 48
;   0f78:0c55 db 50
;   0f78:0c56 db 0e
;   0f78:0c57 db e8
;   0f78:0c58 db cb
;   0f78:0c59 db fe
;   0f78:0c5a db c4
;   0f78:0c5b db 7e
;   0f78:0c5c db 0e
;   0f78:0c5d db 06
;   0f78:0c5e db 57
;   0f78:0c5f db 0e
;   0f78:0c60 db e8
;   0f78:0c61 str " Н╛"
;   0f78:0c65 str ""
;   0f78:0c66 db fe
;   0f78:0c67 db 16
;   0f78:0c68 db 57
;   0f78:0c69 db c4
;   0f78:0c6a db 7e
;   0f78:0c6b db 0a
;   0f78:0c6c db 06
;   0f78:0c6d db 57
;   0f78:0c6e db ff
;   0f78:0c6f db 76
;   0f78:0c70 db 06
;   0f78:0c71 db b8
;   0f78:0c72 db ff
;   0f78:0c73 str ""
;   0f78:0c74 db 50
;   0f78:0c75 db 0e
;   0f78:0c76 db e8
;   0f78:0c77 db ac
;   0f78:0c78 db fe
;   0f78:0c79 db 0e
;   0f78:0c7a db e8
;   0f78:0c7b db e9
;   0f78:0c7c db fe
;   0f78:0c7d db c4
;   0f78:0c7e db 7e
;   0f78:0c7f db 0a
;   0f78:0c80 db 06
;   0f78:0c81 db 57
;   0f78:0c82 db ff
;   0f78:0c83 db 76
;   0f78:0c84 db 08
;   0f78:0c85 db 0e
;   0f78:0c86 db e8
;   0f78:0c87 db 78
;   0f78:0c88 db fe
;   0f78:0c89 db 8b
;   0f78:0c8a db e5
;   0f78:0c8b db 5d
;   0f78:0c8c db ca
;   0f78:0c8d db 0c
;   0f78:0c8e str ""
;   0f78:0c8f db 55
;   0f78:0c90 db 8b
;   0f78:0c91 db ec
;   0f78:0c92 db 81
;   0f78:0c93 db ec
;   0f78:0c94 str ""
;   0f78:0c95 str "Г~"
;   0f78:0c98 db 06
;   0f78:0c99 str ""
;   0f78:0c9a db 7e
;   0f78:0c9b db 61
;   0f78:0c9c db 81
;   0f78:0c9d db 7e
;   0f78:0c9e db 08
;   0f78:0c9f db ff
;   0f78:0ca0 str ""
;   0f78:0ca1 db 7f
;   0f78:0ca2 db 5a
;   0f78:0ca3 db 81
;   0f78:0ca4 db 7e
;   0f78:0ca5 db 06
;   0f78:0ca6 db ff
;   0f78:0ca7 str ""
;   0f78:0ca8 db 7e
;   0f78:0ca9 db 05
;   0f78:0caa db c7
;   0f78:0cab db 46
;   0f78:0cac db 06
;   0f78:0cad db ff
;   0f78:0cae str ""
;   0f78:0caf db 83
;   0f78:0cb0 db 7e
;   0f78:0cb1 db 08
;   0f78:0cb2 str "}"
;   0f78:0cb4 db 05
;   0f78:0cb5 db c7
;   0f78:0cb6 db 46
;   0f78:0cb7 db 08
;   0f78:0cb8 db 01
;   0f78:0cb9 str ""
;   0f78:0cba db 8d
;   0f78:0cbb db be
;   0f78:0cbc str ""
;   0f78:0cbd db ff
;   0f78:0cbe db 16
;   0f78:0cbf db 57
;   0f78:0cc0 db c4
;   0f78:0cc1 db 7e
;   0f78:0cc2 db 0a
;   0f78:0cc3 db 06
;   0f78:0cc4 db 57
;   0f78:0cc5 db b8
;   0f78:0cc6 db 01
;   0f78:0cc7 str ""
;   0f78:0cc8 db 50
;   0f78:0cc9 db 8b
;   0f78:0cca db 46
;   0f78:0ccb db 08
;   0f78:0ccc db 48
;   0f78:0ccd db 50
;   0f78:0cce db 0e
;   0f78:0ccf db e8
;   0f78:0cd0 db 53
;   0f78:0cd1 db fe
;   0f78:0cd2 db 8d
;   0f78:0cd3 db be
;   0f78:0cd4 str ""
;   0f78:0cd5 db fe
;   0f78:0cd6 db 16
;   0f78:0cd7 db 57
;   0f78:0cd8 db c4
;   0f78:0cd9 db 7e
;   0f78:0cda db 0a
;   0f78:0cdb db 06
;   0f78:0cdc db 57
;   0f78:0cdd db 8b
;   0f78:0cde db 46
;   0f78:0cdf db 08
;   0f78:0ce0 db 03
;   0f78:0ce1 db 46
;   0f78:0ce2 db 06
;   0f78:0ce3 db 50
;   0f78:0ce4 db b8
;   0f78:0ce5 db ff
;   0f78:0ce6 str ""
;   0f78:0ce7 db 50
;   0f78:0ce8 db 0e
;   0f78:0ce9 db e8
;   0f78:0cea db 39
;   0f78:0ceb db fe
;   0f78:0cec db 0e
;   0f78:0ced db e8
;   0f78:0cee db 76
;   0f78:0cef db fe
;   0f78:0cf0 db c4
;   0f78:0cf1 db 7e
;   0f78:0cf2 db 0a
;   0f78:0cf3 db 06
;   0f78:0cf4 db 57
;   0f78:0cf5 db b8
;   0f78:0cf6 db ff
;   0f78:0cf7 str ""
;   0f78:0cf8 db 50
;   0f78:0cf9 db 0e
;   0f78:0cfa db e8
;   0f78:0cfb str "■Лх]"
;   0f78:0d00 db ca
;   0f78:0d01 db 08
;   0f78:0d02 str ""
;   0f78:0d03 db 8b
;   0f78:0d04 db dc
;   0f78:0d05 db 1e
;   0f78:0d06 db 36
;   0f78:0d07 db c5
;   0f78:0d08 db 7f
;   0f78:0d09 str "3╔Й♪"
;   0f78:0d0e db b8
;   0f78:0d0f str ""
;   0f78:0d10 db 3d
;   0f78:0d11 db 81
;   0f78:0d12 db 7d
;   0f78:0d13 str "▒╫"
;   0f78:0d16 db 74
;   0f78:0d17 db 0d
;   0f78:0d18 db b0
;   0f78:0d19 db 02
;   0f78:0d1a db ff
;   0f78:0d1b db 05
;   0f78:0d1c db 81
;   0f78:0d1d db 7d
;   0f78:0d1e str "│╫"
;   0f78:0d21 db 74
;   0f78:0d22 str "┤<"
;   0f78:0d25 db 80
;   0f78:0d26 db 7d
;   0f78:0d27 db 30
;   0f78:0d28 str ""
;   0f78:0d29 db 74
;   0f78:0d2a db 09
;   0f78:0d2b db 8d
;   0f78:0d2c db 55
;   0f78:0d2d db 30
;   0f78:0d2e db cd
;   0f78:0d2f db 21
;   0f78:0d30 db 72
;   0f78:0d31 db 5a
;   0f78:0d32 db 89
;   0f78:0d33 db 05
;   0f78:0d34 db b8
;   0f78:0d35 db 0b
;   0f78:0d36 db 04
;   0f78:0d37 db ba
;   0f78:0d38 db 78
;   0f78:0d39 db 0f
;   0f78:0d3a db 33
;   0f78:0d3b db c9
;   0f78:0d3c db 33
;   0f78:0d3d db db
;   0f78:0d3e db 81
;   0f78:0d3f db 7d
;   0f78:0d40 str "▒╫"
;   0f78:0d43 db 74
;   0f78:0d44 db 2f
;   0f78:0d45 db 8b
;   0f78:0d46 db 1d
;   0f78:0d47 db b8
;   0f78:0d48 str ""
;   0f78:0d49 db 44
;   0f78:0d4a db cd
;   0f78:0d4b db 21
;   0f78:0d4c db f6
;   0f78:0d4d db c2
;   0f78:0d4e db 80
;   0f78:0d4f db b8
;   0f78:0d50 db 60
;   0f78:0d51 db 04
;   0f78:0d52 db ba
;   0f78:0d53 db 78
;   0f78:0d54 db 0f
;   0f78:0d55 db 8b
;   0f78:0d56 db c8
;   0f78:0d57 db 8b
;   0f78:0d58 db da
;   0f78:0d59 db 75
;   0f78:0d5a db 14
;   0f78:0d5b db 81
;   0f78:0d5c db 7d
;   0f78:0d5d str "│╫"
;   0f78:0d60 db 75
;   0f78:0d61 db 03
;   0f78:0d62 db e8
;   0f78:0d63 db 2b
;   0f78:0d64 str ""
;   0f78:0d65 db b8
;   0f78:0d66 db 3b
;   0f78:0d67 db 04
;   0f78:0d68 db ba
;   0f78:0d69 db 78
;   0f78:0d6a db 0f
;   0f78:0d6b db 33
;   0f78:0d6c db c9
;   0f78:0d6d db 33
;   0f78:0d6e db db
;   0f78:0d6f db c7
;   0f78:0d70 db 45
;   0f78:0d71 str "▓╫"
;   0f78:0d74 db 89
;   0f78:0d75 db 45
;   0f78:0d76 db 14
;   0f78:0d77 db 89
;   0f78:0d78 db 55
;   0f78:0d79 db 16
;   0f78:0d7a db 89
;   0f78:0d7b db 4d
;   0f78:0d7c db 18
;   0f78:0d7d db 89
;   0f78:0d7e db 5d
;   0f78:0d7f db 1a
;   0f78:0d80 db c7
;   0f78:0d81 db 45
;   0f78:0d82 db 1c
;   0f78:0d83 db 80
;   0f78:0d84 db 04
;   0f78:0d85 db c7
;   0f78:0d86 db 45
;   0f78:0d87 db 1e
;   0f78:0d88 db 78
;   0f78:0d89 db 0f
;   0f78:0d8a db 33
;   0f78:0d8b db c0
;   0f78:0d8c db 1f
;   0f78:0d8d db ca
;   0f78:0d8e db 04
;   0f78:0d8f str ""
;   0f78:0d90 db 33
;   0f78:0d91 db d2
;   0f78:0d92 db 33
;   0f78:0d93 db c9
;   0f78:0d94 db 8b
;   0f78:0d95 db 1d
;   0f78:0d96 db b8
;   0f78:0d97 str "B═"
;   0f78:0d9a db 21
;   0f78:0d9b db 2d
;   0f78:0d9c db 80
;   0f78:0d9d str ""
;   0f78:0d9e db 83
;   0f78:0d9f db da
;   0f78:0da0 str ""
;   0f78:0da1 db 73
;   0f78:0da2 str "3└3╥"
;   0f78:0da7 db 8b
;   0f78:0da8 db ca
;   0f78:0da9 db 8b
;   0f78:0daa db d0
;   0f78:0dab db 8b
;   0f78:0dac db 1d
;   0f78:0dad db b8
;   0f78:0dae str ""
;   0f78:0daf db 42
;   0f78:0db0 db cd
;   0f78:0db1 db 21
;   0f78:0db2 db 8d
;   0f78:0db3 db 95
;   0f78:0db4 db 80
;   0f78:0db5 str ""
;   0f78:0db6 db b9
;   0f78:0db7 db 80
;   0f78:0db8 str ""
;   0f78:0db9 db 8b
;   0f78:0dba db 1d
;   0f78:0dbb db b4
;   0f78:0dbc db 3f
;   0f78:0dbd db cd
;   0f78:0dbe db 21
;   0f78:0dbf db 73
;   0f78:0dc0 str "3└"
;   0f78:0dc3 db 33
;   0f78:0dc4 db db
;   0f78:0dc5 db 3b
;   0f78:0dc6 db d8
;   0f78:0dc7 db 74
;   0f78:0dc8 db 20
;   0f78:0dc9 db 80
;   0f78:0dca db b9
;   0f78:0dcb db 80
;   0f78:0dcc str ""
;   0f78:0dcd db 1a
;   0f78:0dce db 74
;   0f78:0dcf str "CыЄ"
;   0f78:0dd3 db 8b
;   0f78:0dd4 db d3
;   0f78:0dd5 db 2b
;   0f78:0dd6 db d0
;   0f78:0dd7 db b9
;   0f78:0dd8 db ff
;   0f78:0dd9 db ff
;   0f78:0dda db 8b
;   0f78:0ddb db 1d
;   0f78:0ddc db b8
;   0f78:0ddd str "B═"
;   0f78:0de0 db 21
;   0f78:0de1 db 33
;   0f78:0de2 db c9
;   0f78:0de3 db 8b
;   0f78:0de4 db 1d
;   0f78:0de5 db b4
;   0f78:0de6 db 40
;   0f78:0de7 db cd
;   0f78:0de8 db 21
;   0f78:0de9 db c3

;================ proc 0f78:0dea  callers: 10885
  0f78:0dea  xor    di, 0x8000

;================ proc 0f78:0dee  callers: 1087f
  0f78:0dee  or     cl, cl
  0f78:0df0  je     0x105ed
  0f78:0df2  or     al, al
  0f78:0df4  je     0x105ee
  0f78:0df6  cmp    al, cl
  0f78:0df8  jbe    0x1057f
  0f78:0dfa  xchg   cx, ax
  0f78:0dfb  xchg   si, bx
  0f78:0dfd  xchg   di, dx
L1057f:
  0f78:0dff  sub    al, cl
  0f78:0e01  neg    al
  0f78:0e03  cmp    al, 0x29
  0f78:0e05  jae    0x105ee
  0f78:0e07  xchg   cl, al
  0f78:0e09  push   bp
  0f78:0e0a  push   ax
  0f78:0e0b  mov    ah, dh
  0f78:0e0d  and    ah, 0x80
  0f78:0e10  mov    bp, ax
  0f78:0e12  xor    ax, di
  0f78:0e14  pop    ax
  0f78:0e15  pushf  
  0f78:0e16  mov    al, 0
  0f78:0e18  or     dh, 0x80
  0f78:0e1b  or     di, 0x8000
L1059f:
  0f78:0e1f  cmp    cl, 8
  0f78:0e22  jb     0x105b5
  0f78:0e24  mov    al, ah
  0f78:0e26  mov    ah, bl
  0f78:0e28  mov    bl, bh
  0f78:0e2a  mov    bh, dl
  0f78:0e2c  mov    dl, dh
  0f78:0e2e  xor    dh, dh
  0f78:0e30  sub    cl, 8
  0f78:0e33  jmp    0x1059f
L105b5:
  0f78:0e35  or     cl, cl
  0f78:0e37  je     0x105c3
L105b9:
  0f78:0e39  shr    dx, 1
  0f78:0e3b  rcr    bx, 1
  0f78:0e3d  rcr    ax, 1
  0f78:0e3f  dec    cl
  0f78:0e41  jne    0x105b9
L105c3:
  0f78:0e43  popf   
  0f78:0e44  js     0x105fd
  0f78:0e46  add    ax, cx
  0f78:0e48  adc    bx, si
  0f78:0e4a  adc    dx, di
  0f78:0e4c  mov    cx, bp
  0f78:0e4e  pop    bp
  0f78:0e4f  jae    0x105db
  0f78:0e51  rcr    dx, 1
  0f78:0e53  rcr    bx, 1
  0f78:0e55  rcr    ax, 1
  0f78:0e57  inc    cl
  0f78:0e59  je     0x105fb
L105db:
  0f78:0e5b  add    ax, 0x80
  0f78:0e5e  adc    bx, 0
  0f78:0e61  adc    dx, 0
  0f78:0e64  jb     0x105f5
L105e6:
  0f78:0e66  mov    al, cl
  0f78:0e68  and    dh, 0x7f
  0f78:0e6b  or     dh, ch
L105ed:
  0f78:0e6d  ret    
L105ee:
  0f78:0e6e  mov    ax, cx
  0f78:0e70  mov    bx, si
  0f78:0e72  mov    dx, di
  0f78:0e74  ret    
L105f5:
  0f78:0e75  rcr    dx, 1
  0f78:0e77  inc    cl
  0f78:0e79  jne    0x105e6
L105fb:
  0f78:0e7b  stc    
  0f78:0e7c  ret    
L105fd:
  0f78:0e7d  sub    ax, cx
  0f78:0e7f  sbb    bx, si
  0f78:0e81  sbb    dx, di
  0f78:0e83  mov    cx, bp
  0f78:0e85  pop    bp
  0f78:0e86  jae    0x10618
  0f78:0e88  not    dx
  0f78:0e8a  not    bx
  0f78:0e8c  neg    ax
  0f78:0e8e  cmc    
  0f78:0e8f  adc    bx, 0
  0f78:0e92  adc    dx, 0
  0f78:0e95  xor    ch, 0x80
L10618:
  0f78:0e98  mov    di, dx
  0f78:0e9a  or     di, bx
  0f78:0e9c  or     di, ax
  0f78:0e9e  je     0x105ed
L10620:
  0f78:0ea0  or     dh, dh
  0f78:0ea2  js     0x105db
  0f78:0ea4  shl    ax, 1
  0f78:0ea6  rcl    bx, 1
  0f78:0ea8  rcl    dx, 1
  0f78:0eaa  dec    cl
  0f78:0eac  jne    0x10620
L1062e:
  0f78:0eae  jmp    0x1072d

;================ proc 0f78:0eb1  callers: 10891
  0f78:0eb1  or     al, al
  0f78:0eb3  je     0x1062e
  0f78:0eb5  or     cl, cl
  0f78:0eb7  je     0x1062e
  0f78:0eb9  push   bp
  0f78:0eba  mov    bp, dx
  0f78:0ebc  xor    dx, di
  0f78:0ebe  and    dx, 0x8000
  0f78:0ec2  xchg   al, dl
  0f78:0ec4  add    dl, cl
  0f78:0ec6  adc    dh, al
  0f78:0ec8  mov    cl, al
  0f78:0eca  or     bp, 0x8000
  0f78:0ece  or     di, 0x8000
  0f78:0ed2  push   dx
  0f78:0ed3  or     ah, ah
  0f78:0ed5  jne    0x1065b
  0f78:0ed7  or     bx, bx
  0f78:0ed9  je     0x10668
L1065b:
  0f78:0edb  or     ch, ch
  0f78:0edd  jne    0x10685
  0f78:0edf  or     si, si
  0f78:0ee1  jne    0x10685
  0f78:0ee3  xchg   cx, ax
  0f78:0ee4  xchg   si, bx
  0f78:0ee6  xchg   di, bp
L10668:
  0f78:0ee8  mov    ax, cx
  0f78:0eea  mul    bp
  0f78:0eec  mov    bx, dx
  0f78:0eee  mov    ax, si
  0f78:0ef0  mul    bp
  0f78:0ef2  add    bx, ax
  0f78:0ef4  adc    dx, 0
  0f78:0ef7  mov    cx, dx
  0f78:0ef9  mov    ax, di
  0f78:0efb  mul    bp
  0f78:0efd  add    ax, cx
  0f78:0eff  adc    dx, 0
  0f78:0f02  jmp    0x10700
; ---- data 0f78:0f04 (1 bytes)
;   0f78:0f04 db 90
L10685:
  0f78:0f05  push   di
  0f78:0f06  push   si
  0f78:0f07  push   cx
  0f78:0f08  push   bp
  0f78:0f09  push   bx
  0f78:0f0a  push   ax
  0f78:0f0b  mov    bp, sp
  0f78:0f0d  xor    cx, cx
  0f78:0f0f  mov    al, byte ptr [bp + 1]
  0f78:0f12  mul    byte ptr [bp + 7]
  0f78:0f15  mov    si, ax
  0f78:0f17  mov    di, cx
  0f78:0f19  mov    bx, cx
  0f78:0f1b  mov    ax, word ptr [bp]
  0f78:0f1e  mul    word ptr [bp + 8]
  0f78:0f21  add    si, ax
  0f78:0f23  adc    di, dx
  0f78:0f25  adc    bx, cx
  0f78:0f27  mov    ax, word ptr [bp + 2]
  0f78:0f2a  mul    word ptr [bp + 6]
  0f78:0f2d  add    si, ax
  0f78:0f2f  adc    di, dx
  0f78:0f31  adc    bx, cx
  0f78:0f33  mov    si, cx
  0f78:0f35  mov    ax, word ptr [bp]
  0f78:0f38  mul    word ptr [bp + 0xa]
  0f78:0f3b  add    di, ax
  0f78:0f3d  adc    bx, dx
  0f78:0f3f  adc    si, cx
  0f78:0f41  mov    ax, word ptr [bp + 2]
  0f78:0f44  mul    word ptr [bp + 8]
  0f78:0f47  add    di, ax
  0f78:0f49  adc    bx, dx
  0f78:0f4b  adc    si, cx
  0f78:0f4d  mov    ax, word ptr [bp + 4]
  0f78:0f50  mul    word ptr [bp + 6]
  0f78:0f53  add    di, ax
  0f78:0f55  adc    bx, dx
  0f78:0f57  adc    si, cx
  0f78:0f59  mov    di, cx
  0f78:0f5b  mov    ax, word ptr [bp + 2]
  0f78:0f5e  mul    word ptr [bp + 0xa]
  0f78:0f61  add    bx, ax
  0f78:0f63  adc    si, dx
  0f78:0f65  adc    di, cx
  0f78:0f67  mov    ax, word ptr [bp + 4]
  0f78:0f6a  mul    word ptr [bp + 8]
  0f78:0f6d  add    bx, ax
  0f78:0f6f  adc    si, dx
  0f78:0f71  adc    di, cx
  0f78:0f73  mov    ax, word ptr [bp + 4]
  0f78:0f76  mul    word ptr [bp + 0xa]
  0f78:0f79  add    ax, si
  0f78:0f7b  adc    dx, di
  0f78:0f7d  add    sp, 0xc
L10700:
  0f78:0f80  xchg   bx, ax
  0f78:0f81  pop    cx
  0f78:0f82  pop    bp
  0f78:0f83  or     dh, dh
  0f78:0f85  js     0x1070e
  0f78:0f87  shl    ax, 1
  0f78:0f89  rcl    bx, 1
  0f78:0f8b  rcl    dx, 1
  0f78:0f8d  dec    cx
L1070e:
  0f78:0f8e  sub    cx, 0x8081
L10712:
  0f78:0f92  add    ax, 0x80
  0f78:0f95  adc    bx, 0
  0f78:0f98  adc    dx, 0
  0f78:0f9b  jae    0x10720
  0f78:0f9d  rcr    dx, 1
  0f78:0f9f  inc    cx
L10720:
  0f78:0fa0  test   ch, 0x40
  0f78:0fa3  jne    0x1072d
  0f78:0fa5  inc    cx
  0f78:0fa6  mov    al, cl
  0f78:0fa8  xor    dh, ch
  0f78:0faa  shr    ch, 1
  0f78:0fac  ret    
L1072d:
  0f78:0fad  xor    ax, ax
  0f78:0faf  mov    bx, ax
  0f78:0fb1  mov    dx, ax
  0f78:0fb3  ret    

;================ proc 0f78:0fb4  callers: 1089b
  0f78:0fb4  or     al, al
  0f78:0fb6  je     0x1072d
  0f78:0fb8  push   bp
  0f78:0fb9  mov    bp, dx
  0f78:0fbb  xor    dx, di
  0f78:0fbd  or     di, 0x8000
  0f78:0fc1  or     bp, 0x8000
  0f78:0fc5  and    dx, 0x8000
  0f78:0fc9  xchg   dl, al
  0f78:0fcb  sub    dl, cl
  0f78:0fcd  sbb    dh, al
  0f78:0fcf  push   dx
  0f78:0fd0  mov    al, 2
  0f78:0fd2  mov    dx, 1
L10755:
  0f78:0fd5  cmp    bp, di
  0f78:0fd7  jne    0x1075f
  0f78:0fd9  cmp    bx, si
  0f78:0fdb  jne    0x1075f
  0f78:0fdd  cmp    ah, ch
L1075f:
  0f78:0fdf  jb     0x10767
  0f78:0fe1  sub    ah, ch
  0f78:0fe3  sbb    bx, si
  0f78:0fe5  sbb    bp, di
L10767:
  0f78:0fe7  rcl    dx, 1
  0f78:0fe9  jb     0x1077c
L1076b:
  0f78:0feb  shl    ah, 1
  0f78:0fed  rcl    bx, 1
  0f78:0fef  rcl    bp, 1
  0f78:0ff1  jae    0x10755
  0f78:0ff3  sub    ah, ch
  0f78:0ff5  sbb    bx, si
  0f78:0ff7  sbb    bp, di
  0f78:0ff9  clc    
  0f78:0ffa  jmp    0x10767
L1077c:
  0f78:0ffc  dec    al
  0f78:0ffe  js     0x1078a
  0f78:1000  push   dx
  0f78:1001  mov    dx, 1
  0f78:1004  jne    0x1076b
  0f78:1006  mov    dl, 0x40
  0f78:1008  jmp    0x1076b
L1078a:
  0f78:100a  mov    ax, dx
  0f78:100c  mov    cl, 6
  0f78:100e  shl    ax, cl
  0f78:1010  pop    bx
  0f78:1011  pop    dx
  0f78:1012  pop    cx
  0f78:1013  pop    bp
  0f78:1014  not    ax
  0f78:1016  not    bx
  0f78:1018  xor    dx, 0xffff
  0f78:101b  js     0x107a4
  0f78:101d  rcl    ax, 1
  0f78:101f  rcl    bx, 1
  0f78:1021  rcl    dx, 1
  0f78:1023  dec    cx
L107a4:
  0f78:1024  add    cx, 0x8080
  0f78:1028  jmp    0x10712

;================ proc 0f78:102b  callers: 108a1
  0f78:102b  push   dx
  0f78:102c  xor    dx, di
  0f78:102e  pop    dx
  0f78:102f  jns    0x107b6
  0f78:1031  push   dx
  0f78:1032  rcl    dx, 1
  0f78:1034  pop    dx
  0f78:1035  ret    
L107b6:
  0f78:1036  test   dh, 0x80
  0f78:1039  je     0x107c2
  0f78:103b  call   0x107c2
  0f78:103e  je     0x107d4
  0f78:1040  cmc    
  0f78:1041  ret    

;================ proc 0f78:1042  callers: 107bb
L107c2:
  0f78:1042  cmp    al, cl
  0f78:1044  jne    0x107d4
  0f78:1046  or     al, al
  0f78:1048  je     0x107d4
  0f78:104a  cmp    dx, di
  0f78:104c  jne    0x107d4
  0f78:104e  cmp    bx, si
  0f78:1050  jne    0x107d4
  0f78:1052  cmp    ah, ch
L107d4:
  0f78:1054  ret    

;================ proc 0f78:1055  callers: 108a5
  0f78:1055  mov    bx, ax
  0f78:1057  or     bx, dx
  0f78:1059  je     0x10810
  0f78:105b  mov    ch, dh
  0f78:105d  or     dx, dx
  0f78:105f  jns    0x107e8
  0f78:1061  neg    dx
  0f78:1063  neg    ax
  0f78:1065  sbb    dx, 0
L107e8:
  0f78:1068  mov    bx, ax
  0f78:106a  mov    ax, 0xa0
  0f78:106d  or     dx, dx
  0f78:106f  jne    0x107fd
  0f78:1071  xchg   bx, dx
  0f78:1073  mov    al, 0x90
  0f78:1075  or     dh, dh
  0f78:1077  jne    0x107fd
  0f78:1079  xchg   dl, dh
  0f78:107b  mov    al, 0x88
L107fd:
  0f78:107d  or     dx, dx
  0f78:107f  js     0x10809
L10801:
  0f78:1081  dec    al
  0f78:1083  add    bx, bx
  0f78:1085  adc    dx, dx
  0f78:1087  jns    0x10801
L10809:
  0f78:1089  or     ch, ch
  0f78:108b  js     0x10810
  0f78:108d  and    dh, 0x7f
L10810:
  0f78:1090  ret    

;================ proc 0f78:1091  callers: 108b3
  0f78:1091  xchg   bx, ax
  0f78:1092  mov    cl, 0xa0
  0f78:1094  sub    cl, bl
  0f78:1096  jb     0x10873
  0f78:1098  mov    bl, dh
  0f78:109a  or     dh, 0x80
  0f78:109d  cmp    cl, 0x20
  0f78:10a0  jae    0x10874
  0f78:10a2  cmp    cl, 0x10
  0f78:10a5  jb     0x10830
  0f78:10a7  mov    bh, ah
  0f78:10a9  mov    ax, dx
  0f78:10ab  xor    dx, dx
  0f78:10ad  sub    cl, 0x10
L10830:
  0f78:10b0  cmp    cl, 8
  0f78:10b3  jb     0x10842
  0f78:10b5  mov    bh, al
  0f78:10b7  mov    al, ah
  0f78:10b9  mov    ah, dl
  0f78:10bb  mov    dl, dh
  0f78:10bd  xor    dh, dh
  0f78:10bf  sub    cl, 8
L10842:
  0f78:10c2  or     cl, cl
  0f78:10c4  je     0x10850
L10846:
  0f78:10c6  shr    dx, 1
  0f78:10c8  rcr    ax, 1
  0f78:10ca  rcr    bh, 1
  0f78:10cc  dec    cl
  0f78:10ce  jne    0x10846
L10850:
  0f78:10d0  or     ch, ch
  0f78:10d2  je     0x1085e
  0f78:10d4  add    bh, bh
  0f78:10d6  adc    ax, 0
  0f78:10d9  adc    dx, 0
  0f78:10dc  jb     0x10873
L1085e:
  0f78:10de  mov    cx, ax
  0f78:10e0  or     cx, dx
  0f78:10e2  je     0x10873
  0f78:10e4  or     bl, bl
  0f78:10e6  jns    0x1086f
  0f78:10e8  neg    dx
  0f78:10ea  neg    ax
  0f78:10ec  sbb    dx, 0
L1086f:
  0f78:10ef  xor    bl, dh
  0f78:10f1  add    bl, bl
L10873:
  0f78:10f3  ret    
L10874:
  0f78:10f4  mov    bh, dh
  0f78:10f6  mov    ax, 0
  0f78:10f9  mov    dx, 0
  0f78:10fc  je     0x10850
  0f78:10fe  ret    

;================ proc 0f78:10ff RAdd  callers: 00e29
  0f78:10ff  call   0x1056e
  0f78:1102  jb     0x108bf
  0f78:1104  retf   

;================ proc 0f78:1105 RSub  callers: 00e35
  0f78:1105  call   0x1056a
  0f78:1108  jb     0x108bf
  0f78:110a  retf   
; ---- data 0f78:110b (6 bytes)
;   0f78:110b db 8b
;   0f78:110c db c8
;   0f78:110d db 8b
;   0f78:110e db f3
;   0f78:110f db 8b
;   0f78:1110 db fa

;================ proc 0f78:1111 RMul  callers: 0500a 00e6c
  0f78:1111  call   0x10631
  0f78:1114  jb     0x108bf
  0f78:1116  retf   

;================ proc 0f78:1117 RDiv  callers: 02118 02148 04ffd 014d5 01505 00e21 0104c 0107f …10
  0f78:1117  or     cl, cl
  0f78:1119  je     0x108c5
  0f78:111b  call   0x10734
  0f78:111e  jb     0x108bf
  0f78:1120  retf   

;================ proc 0f78:1121 RCmp  callers: 02124 02154 014e1 01511
  0f78:1121  call   0x107ab
  0f78:1124  retf   

;================ proc 0f78:1125 RFloat  callers: 02104 02110 02134 02140 04ff0 014c1 014cd 014f1 …17
  0f78:1125  call   0x107d5
  0f78:1128  retf   
; ---- data 0f78:1129 (8 bytes)
;   0f78:1129 db b5
;   0f78:112a str ""
;   0f78:112b db e8
;   0f78:112c db 63
;   0f78:112d db ff
;   0f78:112e db 72
;   0f78:112f db 09
;   0f78:1130 db cb

;================ proc 0f78:1131 RRound  callers: 0500f 00e3a 00e71 01051 01084 010e7 01124
  0f78:1131  mov    ch, 1
  0f78:1133  call   0x10811
  0f78:1136  jb     0x108b9
  0f78:1138  retf   
L108b9:
  0f78:1139  mov    ax, 0xcf
  0f78:113c  jmp    0xf88f
L108bf:
  0f78:113f  mov    ax, 0xcd
  0f78:1142  jmp    0xf88f
L108c5:
  0f78:1145  mov    ax, 0xc8
  0f78:1148  jmp    0xf88f

;================ proc 0f78:114b Random  callers: 025fe 0e0b7 052d5 05402 05427 05454 05617 05681 …86
  0f78:114b  call   0x10928
  0f78:114e  mov    bx, sp
  0f78:1150  mov    cx, dx
  0f78:1152  mul    word ptr ss:[bx + 4]
  0f78:1156  mov    ax, cx
  0f78:1158  mov    cx, dx
  0f78:115a  mul    word ptr ss:[bx + 4]
  0f78:115e  add    ax, cx
  0f78:1160  adc    dx, 0
  0f78:1163  mov    ax, dx
  0f78:1165  retf   2
; ---- data 0f78:1168 (64 bytes)
;   0f78:1168 db e8
;   0f78:1169 db 3d
;   0f78:116a str ""
;   0f78:116b db 93
;   0f78:116c db b8
;   0f78:116d db 80
;   0f78:116e str ""
;   0f78:116f db b9
;   0f78:1170 db 20
;   0f78:1171 str ""
;   0f78:1172 db f6
;   0f78:1173 db c6
;   0f78:1174 db 80
;   0f78:1175 db 75
;   0f78:1176 str "╤у╤╥■╚тє2└"
;   0f78:1181 db 80
;   0f78:1182 db e6
;   0f78:1183 db 7f
;   0f78:1184 db cb
;   0f78:1185 db e8
;   0f78:1186 db 20
;   0f78:1187 str ""
;   0f78:1188 db cd
;   0f78:1189 db 3c
;   0f78:118a db 9f
;   0f78:118b db 06
;   0f78:118c db a6
;   0f78:118d db 11
;   0f78:118e db cd
;   0f78:118f db 37
;   0f78:1190 db 06
;   0f78:1191 db 7e
;   0f78:1192 db 36
;   0f78:1193 db cd
;   0f78:1194 db 3c
;   0f78:1195 db 98
;   0f78:1196 db 06
;   0f78:1197 db a2
;   0f78:1198 db 11
;   0f78:1199 db cd
;   0f78:119a db 35
;   0f78:119b db fd
;   0f78:119c db cd
;   0f78:119d db 39
;   0f78:119e db d9
;   0f78:119f db cd
;   0f78:11a0 db 3d
;   0f78:11a1 db cb
;   0f78:11a2 str ""
;   0f78:11a3 str ""
;   0f78:11a4 str ""
;   0f78:11a5 db 4f
;   0f78:11a6 db e0
;   0f78:11a7 db ff

;================ proc 0f78:11a8  callers: 108cb
  0f78:11a8  mov    ax, word ptr [g367e]
  0f78:11ab  mov    bx, word ptr [g3680]
  0f78:11af  mov    cx, ax
  0f78:11b1  mul    word ptr cs:[g11de]
  0f78:11b6  shl    cx, 1
  0f78:11b8  shl    cx, 1
  0f78:11ba  shl    cx, 1
  0f78:11bc  add    ch, cl
  0f78:11be  add    dx, cx
  0f78:11c0  add    dx, bx
  0f78:11c2  shl    bx, 1
  0f78:11c4  shl    bx, 1
  0f78:11c6  add    dx, bx
  0f78:11c8  add    dh, bl
  0f78:11ca  mov    cl, 5
  0f78:11cc  shl    bx, cl
  0f78:11ce  add    dh, bl
  0f78:11d0  add    ax, 1
  0f78:11d3  adc    dx, 0
  0f78:11d6  mov    word ptr [g367e], ax
  0f78:11d9  mov    word ptr [g3680], dx
  0f78:11dd  ret    
; ---- data 0f78:11de (2 bytes)
;   0f78:11de db 05
;   0f78:11df db 84

;================ proc 0f78:11e0 Randomize  callers: 06a5d
  0f78:11e0  mov    ah, 0x2c
  0f78:11e2  int    0x21
  0f78:11e4  mov    word ptr [g367e], cx
  0f78:11e8  mov    word ptr [g3680], dx
  0f78:11ec  retf   

;================ proc 0f78:11ed  callers: 10a61
  0f78:11ed  mov    cx, di
  0f78:11ef  mov    si, 0xa
  0f78:11f2  mov    bx, dx
  0f78:11f4  or     bx, bx
  0f78:11f6  jns    0x10989
  0f78:11f8  neg    bx
  0f78:11fa  neg    ax
  0f78:11fc  sbb    bx, 0
  0f78:11ff  call   0x10989
  0f78:1202  dec    di
  0f78:1203  mov    byte ptr es:[di], 0x2d
  0f78:1207  inc    cx
  0f78:1208  ret    

;================ proc 0f78:1209  callers: 1097f
L10989:
  0f78:1209  xor    dx, dx
  0f78:120b  xchg   bx, ax
  0f78:120c  div    si
  0f78:120e  xchg   bx, ax
  0f78:120f  div    si
  0f78:1211  add    dl, 0x30
  0f78:1214  cmp    dl, 0x3a
  0f78:1217  jb     0x1099c
  0f78:1219  add    dl, 7
L1099c:
  0f78:121c  dec    di
  0f78:121d  mov    byte ptr es:[di], dl
  0f78:1220  mov    dx, ax
  0f78:1222  or     dx, bx
  0f78:1224  jne    0x10989
  0f78:1226  sub    cx, di
  0f78:1228  ret    

;================ proc 0f78:1229  callers: 10ab2
  0f78:1229  xor    ax, ax
  0f78:122b  xor    dx, dx
  0f78:122d  xor    si, si
  0f78:122f  jcxz   0x10a0e
  0f78:1231  cmp    byte ptr es:[di], 0x2b
  0f78:1235  je     0x109be
  0f78:1237  cmp    byte ptr es:[di], 0x2d
  0f78:123b  jne    0x109c2
  0f78:123d  dec    si
L109be:
  0f78:123e  inc    di
  0f78:123f  dec    cx
  0f78:1240  je     0x10a0e
L109c2:
  0f78:1242  cmp    byte ptr es:[di], 0x24
  0f78:1246  je     0x10a10
L109c8:
  0f78:1248  mov    bl, byte ptr es:[di]
  0f78:124b  sub    bl, 0x3a
  0f78:124e  add    bl, 0xa
  0f78:1251  jae    0x109f8
  0f78:1253  test   dh, 0xf0
  0f78:1256  jne    0x10a0e
  0f78:1258  push   bx
  0f78:1259  shl    ax, 1
  0f78:125b  rcl    dx, 1
  0f78:125d  push   dx
  0f78:125e  push   ax
  0f78:125f  shl    ax, 1
  0f78:1261  rcl    dx, 1
  0f78:1263  shl    ax, 1
  0f78:1265  rcl    dx, 1
  0f78:1267  pop    bx
  0f78:1268  add    ax, bx
  0f78:126a  pop    bx
  0f78:126b  adc    dx, bx
  0f78:126d  pop    bx
  0f78:126e  xor    bh, bh
  0f78:1270  add    ax, bx
  0f78:1272  adc    dx, 0
  0f78:1275  inc    di
  0f78:1276  loop   0x109c8
L109f8:
  0f78:1278  mov    bx, ax
  0f78:127a  or     bx, dx
  0f78:127c  je     0x10a0d
  0f78:127e  or     si, si
  0f78:1280  jns    0x10a09
  0f78:1282  neg    dx
  0f78:1284  neg    ax
  0f78:1286  sbb    dx, 0
L10a09:
  0f78:1289  xor    si, dx
  0f78:128b  js     0x10a0e
L10a0d:
  0f78:128d  ret    
L10a0e:
  0f78:128e  stc    
  0f78:128f  ret    
L10a10:
  0f78:1290  inc    di
  0f78:1291  dec    cx
  0f78:1292  je     0x10a0e
L10a14:
  0f78:1294  mov    bl, byte ptr es:[di]
  0f78:1297  cmp    bl, 0x61
  0f78:129a  jb     0x10a1f
  0f78:129c  sub    bl, 0x20
L10a1f:
  0f78:129f  sub    bl, 0x3a
  0f78:12a2  add    bl, 0xa
  0f78:12a5  jb     0x10a32
  0f78:12a7  sub    bl, 0x17
  0f78:12aa  add    bl, 6
  0f78:12ad  jae    0x109f8
  0f78:12af  add    bl, 0xa
L10a32:
  0f78:12b2  mov    bh, 4
L10a34:
  0f78:12b4  shl    ax, 1
  0f78:12b6  rcl    dx, 1
  0f78:12b8  jb     0x10a0e
  0f78:12ba  dec    bh
  0f78:12bc  jne    0x10a34
  0f78:12be  or     al, bl
  0f78:12c0  inc    di
  0f78:12c1  loop   0x10a14
  0f78:12c3  or     si, si
  0f78:12c5  jns    0x10a4e
  0f78:12c7  neg    dx
  0f78:12c9  neg    ax
  0f78:12cb  sbb    dx, 0
L10a4e:
  0f78:12ce  clc    
  0f78:12cf  ret    

;================ proc 0f78:12d0 StrLong  callers: 0ef17 0ef2f 0ef47 0ef5f 0ef77 0ac73
  0f78:12d0  push   bp
  0f78:12d1  mov    bp, sp
  0f78:12d3  sub    sp, 0x20
  0f78:12d6  mov    ax, word ptr [bp + 0xe]
  0f78:12d9  mov    dx, word ptr [bp + 0x10]
  0f78:12dc  lea    di, [bp]
  0f78:12df  push   ss
  0f78:12e0  pop    es
  0f78:12e1  call   0x1096d
  0f78:12e4  push   ds
  0f78:12e5  mov    si, di
  0f78:12e7  push   ss
  0f78:12e8  pop    ds
  0f78:12e9  les    di, ptr [bp + 8]
  0f78:12ec  mov    dx, word ptr [bp + 6]
  0f78:12ef  mov    ax, word ptr [bp + 0xc]
  0f78:12f2  cmp    ax, dx
  0f78:12f4  jle    0x10a78
  0f78:12f6  mov    ax, dx
L10a78:
  0f78:12f8  cmp    cx, dx
  0f78:12fa  jle    0x10a7e
  0f78:12fc  mov    cx, dx
L10a7e:
  0f78:12fe  cmp    ax, cx
  0f78:1300  jge    0x10a84
  0f78:1302  mov    ax, cx
L10a84:
  0f78:1304  cld    
  0f78:1305  stosb  byte ptr es:[di], al
  0f78:1306  sub    ax, cx
  0f78:1308  je     0x10a92
  0f78:130a  push   cx
  0f78:130b  mov    cx, ax
  0f78:130d  mov    al, 0x20
  0f78:130f  rep stosb byte ptr es:[di], al
  0f78:1311  pop    cx
L10a92:
  0f78:1312  rep movsb byte ptr es:[di], byte ptr [si]
  0f78:1314  pop    ds
  0f78:1315  mov    sp, bp
  0f78:1317  pop    bp
  0f78:1318  retf   0xc

;================ proc 0f78:131b ValLong  callers: 06fe8 07125 06bf4
  0f78:131b  push   bp
  0f78:131c  mov    bp, sp
  0f78:131e  les    di, ptr [bp + 0xa]
  0f78:1321  mov    cl, byte ptr es:[di]
  0f78:1324  xor    ch, ch
  0f78:1326  inc    di
  0f78:1327  jcxz   0x10ab2
L10aa9:
  0f78:1329  cmp    byte ptr es:[di], 0x20
  0f78:132d  jne    0x10ab2
  0f78:132f  inc    di
  0f78:1330  loop   0x10aa9
L10ab2:
  0f78:1332  call   0x109a9
  0f78:1335  jb     0x10ab9
  0f78:1337  jcxz   0x10ac2
L10ab9:
  0f78:1339  mov    cx, di
  0f78:133b  sub    cx, word ptr [bp + 0xa]
  0f78:133e  xor    ax, ax
  0f78:1340  xor    dx, dx
L10ac2:
  0f78:1342  les    di, ptr [bp + 6]
  0f78:1345  mov    word ptr es:[di], cx
  0f78:1348  pop    bp
  0f78:1349  retf   8

;================ proc 0f78:134c  callers: 0f78b
  0f78:134c  mov    di, 0x3692
  0f78:134f  push   ds
  0f78:1350  pop    es
  0f78:1351  mov    cx, 0x4118
  0f78:1354  sub    cx, di
  0f78:1356  shr    cx, 1
  0f78:1358  xor    ax, ax
  0f78:135a  cld    
  0f78:135b  rep stosw word ptr es:[di], ax
  0f78:135d  ret    
