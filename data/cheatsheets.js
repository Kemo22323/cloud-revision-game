// One cheat sheet per lab. HTML strings rendered into the .cs container.
// Strictly slide-accurate - no extra topics beyond the PPTX + 2 Lab 5 markdowns.
window.CHEATSHEETS = {
  1: {
    title: "Lab 1 - Cloud Computing & Virtual Machines",
    sections: [
      {
        id: "intro",
        title: "What is Cloud Computing?",
        html: `
          <p>A collection of online managed services (especially data storage and computing power) owned, run, and maintained by a cloud provider, without direct active management from users. <b>Pay for what you use.</b></p>
          <p><b>Examples:</b> Google Drive / OneDrive / iCloud (backup), Gmail / Outlook (web mail).</p>
          <h3>Cloud computing model - 3 properties</h3>
          <ul>
            <li><b>Elastic resources</b> - scale up/down quickly to meet changing demand.</li>
            <li><b>Metered services</b> - pay only for what you use.</li>
            <li><b>Self-service</b> - find IT resources via self-service access.</li>
          </ul>
          <h3>Pre-cloud challenges</h3>
          <ul><li>Cost</li><li>Scalability</li><li>Reliability</li><li>Security</li><li>Mobility</li></ul>
        `
      },
      {
        id: "models",
        title: "Cloud Service Models (Pizza analogy)",
        html: `
          <table>
            <tr><th>Model</th><th>Stands for</th><th>Key features</th></tr>
            <tr><td><b>IaaS</b></td><td>Infrastructure as a Service</td><td>Pay on demand instead of buying hardware. Scalable infrastructure. Avoid hardware maintenance. Virtualizes admin tasks.</td></tr>
            <tr><td><b>PaaS</b></td><td>Platform as a Service</td><td>Platform with tools to test/develop/host apps. Focus on dev only. Provider manages security/OS/server software/backups. Enables collaboration.</td></tr>
            <tr><td><b>SaaS</b></td><td>Software as a Service</td><td>Subscription-model software. No installs/upgrades by users. Data secure in cloud (no loss on equipment failure). Accessible from any internet device.</td></tr>
          </table>
          <h3>Who manages what</h3>
          <p>Stack from bottom up: <code>Networking, Storage, Servers, Virtualization, OS, Middleware, Runtime, Data, Applications</code>.</p>
          <ul>
            <li><b>On-prem</b>: client manages everything.</li>
            <li><b>IaaS</b>: provider manages Networking-Virtualization.</li>
            <li><b>PaaS</b>: provider manages up to Runtime.</li>
            <li><b>SaaS</b>: provider manages everything.</li>
          </ul>
          <h3>Example services per model</h3>
          <ul>
            <li><b>IaaS</b>: Virtual servers, bare metal machines, block/file/object storage, backup, IP management, VPNs, firewalls, load balancers, automation.</li>
            <li><b>PaaS</b>: Runtimes & dev platforms, databases, analytics, integration, starter kits, mobile platforms, push notifications, messaging, dev tools, CI/CD.</li>
            <li><b>SaaS</b>: Email & collaboration, CRM, ERP, video streaming, marketing, talent management, advertising.</li>
          </ul>
        `
      },
      {
        id: "os-recap",
        title: "OS, Kernel & Virtualization Recap",
        html: `
          <ul>
            <li><b>OS</b> - system software that manages computer hardware, software resources, and provides common services for programs.</li>
            <li><b>Kernel</b> - portion of OS code that is always resident in memory; facilitates interactions between hardware and software components.</li>
            <li><b>Virtualization</b> - the act of creating a virtual version of something. Running more than one OS on a single physical hardware. (e.g. partitioning a single disk into two virtual disks.)</li>
          </ul>
        `
      },
      {
        id: "physical-vm",
        title: "Physical Machine vs Virtual Machine",
        html: `
          <h3>Physical Machine (PM)</h3>
          <p>The physical hardware (CPU, RAM, Hard Disk, Network cards) generally referred to as the <b>"host"</b>.</p>
          <h3>Virtual Machine (VM)</h3>
          <p>A tightly isolated software container that can run OSes and applications as if it were a physical computer. VMs are <b>sandboxed</b> from the rest of the physical machine.</p>
          <p>Per VMware: "Virtual machines are software computers that provide the same functionality as physical computers... but are computer files that run on a physical computer and behave like a physical computer."</p>
          <h3>PM vs VM</h3>
          <table>
            <tr><th></th><th>Physical Machine</th><th>Virtual Machine</th></tr>
            <tr><td>Relocation</td><td>Difficult, downtime, hardware-specific</td><td>Easy, encapsulated into files, hardware-independent</td></tr>
            <tr><td>Management</td><td>Physical maintenance, hardware failures = downtime</td><td>Isolated from each other, insulated from hardware changes</td></tr>
            <tr><td>Hardware limits</td><td>Hardware changes limit app support</td><td>Can support legacy apps</td></tr>
          </table>
          <p>VM is the <b>"guest"</b>. Creating VMs requires a <b>Hypervisor</b>.</p>
        `
      },
      {
        id: "hypervisors",
        title: "Hypervisors (3 types)",
        html: `
          <p>Hypervisor (a.k.a. Virtual Machine Monitor / VMM) - software/firmware/hardware that creates and runs VMs. Provides a layer between hardware (host) and VMs (guests). Enables virtualization.</p>
          <table>
            <tr><th>Type</th><th>Description</th><th>Examples</th></tr>
            <tr><td><b>Type-1 (Bare-metal)</b></td><td>Runs directly on system hardware - <b>no OS required</b>. Best performance & efficiency. Used in production / data centers (low overhead).</td><td>VMware ESXi, Microsoft Hyper-V, Xen</td></tr>
            <tr><td><b>Type-2 (Hosted)</b></td><td>Installed on existing OS. Relies on host OS for CPU/memory/disk/network calls. Supports wide hardware. Ideal for home labs / testing.</td><td>Oracle VirtualBox, VMware Workstation, Oracle Solaris Zones, VMware Fusion, KVM</td></tr>
            <tr><td><b>Cloud Hypervisor</b></td><td>VM manager that lets you create/run/maintain VMs on a cloud platform hosted by a central server.</td><td>(cloud-provider managed)</td></tr>
          </table>
          <h3>VM drawbacks</h3>
          <ul>
            <li>VMs (guests) are <b>not as efficient</b> at hardware access - app layer depends on Guest OS, Hypervisor, Host OS before reaching hardware.</li>
            <li>Running multiple VMs on one host can bring performance instability.</li>
          </ul>
        `
      },
      {
        id: "vbox",
        title: "VirtualBox & VM Files",
        html: `
          <p>To create a VM you install a Type-2 Hypervisor (e.g. <b>Oracle VM VirtualBox</b>). Then: New &rarr; name/folder/type/version &rarr; memory &rarr; create virtual hard disk &rarr; choose format &rarr; choose growth type (default <b>Dynamically allocated</b>) &rarr; size (at least 10GB).</p>
          <h3>Virtual disk formats</h3>
          <table>
            <tr><th>Format</th><th>Stands for</th><th>Origin</th></tr>
            <tr><td><b>VDI</b></td><td>Virtual Disk Image</td><td>Native to VirtualBox - works best (recommended)</td></tr>
            <tr><td><b>VHD</b></td><td>Virtual Hard Disk</td><td>Native to Microsoft Virtual PC, also works on VirtualBox</td></tr>
            <tr><td><b>VMDK</b></td><td>Virtual Machine Disk</td><td>Originally developed by VMware, also works on VirtualBox</td></tr>
          </table>
          <h3>Files that make up a VM</h3>
          <table>
            <tr><th>File / Folder</th><th>Purpose</th></tr>
            <tr><td><code>Logs/</code></td><td>Logs for VM sessions, written by VirtualBox</td></tr>
            <tr><td><code>Snapshots/</code></td><td>VM snapshots (filename = hash, not snapshot name)</td></tr>
            <tr><td><code>*.vbox</code></td><td>VM details as shown in VirtualBox Manager</td></tr>
            <tr><td><code>*.vbox-prev</code></td><td>Backup of the .vbox file</td></tr>
            <tr><td><code>*.vdi</code></td><td>Virtual hard drive - stores the contents of the VM's HDD</td></tr>
          </table>
        `
      }
    ]
  },

  2: {
    title: "Lab 2 - Linux Essentials & CLI",
    sections: [
      {
        id: "linux-intro",
        title: "Why Linux & Command Syntax",
        html: `
          <p><b>Linux</b> is an OS that runs on hardware. Used on desktops/laptops, web servers, mobile (Android), public cloud (Google, Amazon, etc.), Chromebooks, networking (Cisco).</p>
          <p>Linux desktops use a <b>GUI</b> but also a more efficient <b>CLI</b> (command-line interface) - text-based interface for typed commands.</p>
          <h3>Command syntax</h3>
          <pre>command [option(s)] [argument(s)]</pre>
          <ul>
            <li><b>Command</b> - the program/action name.</li>
            <li><b>Option / flag</b> - modifies behavior. Invoked with <code>-</code> or <code>--</code>.</li>
            <li><b>Argument / parameter</b> - target the command acts upon.</li>
          </ul>
          <p>Options can be combined: <code>ls -rl</code> = <code>ls -lr</code> = <code>ls -r -l</code>.</p>
        `
      },
      {
        id: "basic-commands",
        title: "Basic Commands Reference",
        html: `
          <table>
            <tr><th>Command</th><th>Purpose</th><th>Example</th></tr>
            <tr><td><code>echo</code></td><td>Display a line of text as standard output</td><td><code>echo "Welcome to Cloud Course"</code></td></tr>
            <tr><td><code>pwd</code></td><td>Print working directory</td><td><code>pwd</code> &rarr; <code>/home/sysadmin</code></td></tr>
            <tr><td><code>cd</code></td><td>Change directory (relative/absolute paths)</td><td><code>cd Documents</code> · <code>cd /home/sysadmin/Documents</code></td></tr>
            <tr><td><code>cd ~</code> / <code>cd</code></td><td>Go to user's home directory</td><td><code>cd ~</code></td></tr>
            <tr><td><code>cd ..</code></td><td>Move one directory up</td><td><code>cd ..</code></td></tr>
            <tr><td><code>cd -</code></td><td>Move to previous directory (Back)</td><td><code>cd -</code></td></tr>
            <tr><td><code>ls</code></td><td>List files. <code>-l</code> long, <code>-r/--reverse</code> reverse, combinable.</td><td><code>ls -l</code> · <code>ls -rl</code></td></tr>
            <tr><td><code>cat</code></td><td>Concatenate / display file contents (small files)</td><td><code>cat file.txt</code></td></tr>
            <tr><td><code>touch</code></td><td>Create empty file</td><td><code>touch mynotes.txt</code></td></tr>
            <tr><td><code>&gt;</code> / <code>&gt;&gt;</code></td><td>Redirect stdout (overwrite / append)</td><td><code>&gt; mytest.txt</code> · <code>echo hi &gt;&gt; f.txt</code></td></tr>
            <tr><td><code>cp</code></td><td>Copy file or dir (<code>-R</code> recursive)</td><td><code>cp file.txt Documents</code> · <code>cp -R Documents Backup</code></td></tr>
            <tr><td><code>mv</code></td><td>Move / rename</td><td><code>mv a.txt b.txt</code></td></tr>
            <tr><td><code>rm</code></td><td>Remove file (<code>-r</code> for directory)</td><td><code>rm file.txt</code> · <code>rm -r dir</code></td></tr>
            <tr><td><code>mkdir</code></td><td>Create directory (<code>-p</code> creates parents)</td><td><code>mkdir -p a/b</code></td></tr>
            <tr><td><code>rmdir</code></td><td>Remove EMPTY directory</td><td><code>rmdir empty_dir</code></td></tr>
            <tr><td><code>grep</code></td><td>Search input lines matching pattern. <code>-i</code> case-insensitive, <code>^x</code> line starts with.</td><td><code>grep 'root' /etc/passwd</code></td></tr>
            <tr><td><code>ps</code></td><td>List processes in current terminal. <code>-e</code> = every process.</td><td><code>ps -e</code></td></tr>
            <tr><td><code>ping</code></td><td>Check network/server reachability (ICMP)</td><td><code>ping google.com</code></td></tr>
          </table>
          <p><code>ps</code> columns: <b>PID</b> (unique id), <b>TTY</b> (terminal type), <b>TIME</b> (running time), <b>CMD</b> (command).</p>
        `
      },
      {
        id: "perms",
        title: "Permissions: chmod & chown",
        html: `
          <p><code>ls -l</code> output: <code>d/-</code> dir or regular file, then permissions for <b>user, group, others</b>.</p>
          <ul>
            <li><code>r--</code> = read-only · <code>rw-</code> = read & write · <code>---</code> = none · <code>--x</code> = execute</li>
          </ul>
          <h3>Symbolic chmod</h3>
          <pre>chmod [&lt;SET&gt;&lt;ACTION&gt;&lt;PERMISSIONS&gt;]... FILE</pre>
          <ul>
            <li><b>SET</b>: <code>u</code> user · <code>g</code> group · <code>o</code> others · <code>a</code> all</li>
            <li><b>ACTION</b>: <code>+</code> add · <code>-</code> remove · <code>=</code> exact</li>
            <li><b>PERMISSION</b>: <code>r</code> read · <code>w</code> write · <code>x</code> execute</li>
          </ul>
          <p>Example: <code>chmod u+x hello.sh</code></p>
          <h3>Octal / numeric chmod</h3>
          <p>Each digit = sum of <b>r=4, w=2, x=1</b> for user/group/others.</p>
          <table>
            <tr><th>Mask</th><th>Symbolic</th><th>Binary</th></tr>
            <tr><td><code>644</code></td><td><code>rw-r--r--</code></td><td><code>110100100</code></td></tr>
            <tr><td><code>755</code></td><td><code>rwxr-xr-x</code></td><td><code>111101101</code></td></tr>
            <tr><td><code>750</code></td><td><code>rwxr-x---</code></td><td>(user rwx, group rx, others none)</td></tr>
            <tr><td><code>777</code></td><td><code>rwxrwxrwx</code></td><td>everyone rwx</td></tr>
          </table>
          <h3>chown - change ownership</h3>
          <pre>chown [option] owner[:group] file(s)</pre>
          <p>Example: <code>chown mohamed:users hello.sh</code></p>
          <h3>sudo - administrative access</h3>
          <p><b>sudo</b> = <i>super user do</i>. Lets you perform tasks that require admin/root permissions.</p>
          <pre>sudo [OPTIONS] COMMAND</pre>
          <p><code>whoami</code> &rarr; current user. <code>sudo whoami</code> &rarr; <code>root</code>.</p>
        `
      },
      {
        id: "apt",
        title: "Package Management (apt-get / apt-cache)",
        html: `
          <p>Course uses <b>Ubuntu</b> (Debian derivative). <b>apt-get</b> = Advanced Package Tool, front-end to dpkg.</p>
          <table>
            <tr><th>Command</th><th>Purpose</th></tr>
            <tr><td><code>sudo apt-get update</code></td><td>Refresh list of available packages from repositories</td></tr>
            <tr><td><code>apt-cache search [keyword]</code></td><td>Search packages for keyword</td></tr>
            <tr><td><code>sudo apt-get install [package]</code></td><td>Install a package</td></tr>
            <tr><td><code>sudo apt-get upgrade</code></td><td>Upgrade all packages and dependencies</td></tr>
            <tr><td><code>sudo apt-get remove [pkg]</code></td><td>Delete all but configuration files</td></tr>
            <tr><td><code>sudo apt-get purge [pkg]</code></td><td>Delete ALL package files (incl. config)</td></tr>
          </table>
          <h3>Hands-on quick reference (Lab 2 task)</h3>
          <pre>mkdir FCIS24 FCIS25
cd FCIS24
touch cloud.txt network.txt security.txt
chmod 777 *
echo "Hello Cloud Computing Course!" &gt; cloud.txt
cp cloud.txt ../FCIS25/
mv network.txt security.txt ../FCIS25/
cd ..
rm -r FCIS24
ls FCIS25
cat FCIS25/cloud.txt</pre>
        `
      }
    ]
  },

  3: {
    title: "Lab 3 - Bash Shell Scripting",
    sections: [
      {
        id: "shell",
        title: "Shell, Bash & Script Files",
        html: `
          <p><b>Shell</b> - environment for the user to interact with the machine. <i>NOT</i> an OS or part of Linux kernel. Uses the kernel to execute programs/files.</p>
          <p><b>Shell scripting</b> - automate trivial tasks. Plain text file with <code>.sh</code> extension; executable like normal commands.</p>
          <h3>Command-line shell types</h3>
          <table>
            <tr><th>Shell</th><th>Author / origin</th><th>Config files</th></tr>
            <tr><td><b>Bourne (sh)</b></td><td>Stephen Bourne. First Unix shell. Standard for scripting.</td><td><code>~/.profile</code></td></tr>
            <tr><td><b>C Shell (csh)</b></td><td>Bill Joy. Modeled on C language. Adds history & command editing.</td><td><code>~/.cshrc</code>, <code>~/.login</code></td></tr>
            <tr><td><b>Bourne Again (bash)</b></td><td>GNU project. Replacement for sh. Adds csh interactivity.</td><td><code>~/.bashrc</code>, <code>~/.profile</code></td></tr>
          </table>
          <p><b>Bash</b> = UNIX shell, command interpreter, AND a programming language. Default shell on many Linux + macOS distros.</p>
          <h3>Bash script file</h3>
          <ul>
            <li>Extension <code>.sh</code> OR first line <code>#!/bin/bash</code></li>
            <li>User must have execute permissions to run.</li>
          </ul>
          <pre>#!/bin/bash
echo "What is your name?"
read PERSON
echo "Hello, $PERSON"</pre>
        `
      },
      {
        id: "echo-comments",
        title: "Echo, Comments, Date/Sleep",
        html: `
          <h3>echo</h3>
          <pre>echo [option(s)] [string]
echo "Hello World!"           # plain
echo -e "Hello\\nWorld!"      # interpret escapes
echo -n "Hello World!"        # no trailing newline</pre>
          <h3>Comments</h3>
          <pre># single line comment
&lt;&lt;MY_COMMENT
   This is a multi-line
   comment in Bash
MY_COMMENT</pre>
          <h3>Date</h3>
          <pre>date +&lt;format-option(s)&gt;
d=$(date +%m-%d-%Y)         # 03-03-2023
d=$(date '+%A %d-%B, %Y')   # Friday 03-March, 2023
d=$(date +%m-%Y)            # 03-2023</pre>
          <p><b>Date format options</b>: <code>%a</code> short weekday · <code>%A</code> full weekday · <code>%b</code> short month · <code>%B</code> full month · <code>%d</code> day · <code>%D</code> MM/DD/YY · <code>%m</code> month number · <code>%Y</code> year.</p>
        `
      },
      {
        id: "vars",
        title: "Variables (incl. Special Variables)",
        html: `
          <pre>variableName=value     # NO spaces around =
age=10                 # number
ch='c'                 # character
str="Hello Bob!"       # string
arr=("bash" "shell" "script")  # array
echo "\${arr[0]}"</pre>
          <ul>
            <li>Variables are <b>case-sensitive</b>.</li>
            <li><b>No space</b> between name, <code>=</code>, and value.</li>
          </ul>
          <h3>Special variables</h3>
          <table>
            <tr><th>Variable</th><th>Meaning</th></tr>
            <tr><td><code>$0</code></td><td>Filename of current script</td></tr>
            <tr><td><code>$n</code></td><td>Positional argument (e.g. $1, $2)</td></tr>
            <tr><td><code>$#</code></td><td>Number of arguments supplied</td></tr>
            <tr><td><code>$*</code></td><td>All received args as a string ("$1 $2")</td></tr>
            <tr><td><code>$@</code></td><td>All received args in a string array (("$1" "$2"))</td></tr>
            <tr><td><code>$?</code></td><td>Exit status of the last command</td></tr>
            <tr><td><code>$$</code></td><td>Process ID number</td></tr>
          </table>
          <h3>Local variables in functions</h3>
          <pre>function bashShell {
    local SHELL="Bash"
    echo $SHELL
}</pre>
        `
      },
      {
        id: "ops",
        title: "Operators & Arithmetic Expansion",
        html: `
          <h3>Arithmetic operators</h3>
          <table>
            <tr><th>Operator</th><th>Description</th></tr>
            <tr><td><code>+</code></td><td>Add</td></tr>
            <tr><td><code>-</code></td><td>Subtract</td></tr>
            <tr><td><code>*</code></td><td>Multiply</td></tr>
            <tr><td><code>/</code></td><td>Divide</td></tr>
            <tr><td><code>%</code></td><td>Modulo (remainder)</td></tr>
            <tr><td><code>=</code></td><td>Equality (numbers)</td></tr>
            <tr><td><code>!=</code></td><td>Not equal</td></tr>
          </table>
          <h3>Arithmetic expansion (integers)</h3>
          <pre>x=$((2 + 3))           # 5
result=$((num1 + num2))</pre>
          <h3>Floating point with bc</h3>
          <pre>add=$(echo "$num1 + $num2" | bc)
div=$(echo "scale=4; $num1 / $num2" | bc)</pre>
          <h3>Command substitution</h3>
          <p><code>$( COMMAND )</code> or backticks <code>\`COMMAND\`</code> - shell interprets the inside.</p>
          <h3>Piping</h3>
          <p>Passes stdout of one command as stdin of the next, respecting sequence.</p>
          <h3>Relational / numeric test operators</h3>
          <ul>
            <li><code>-eq</code> equals · <code>-ne</code> not equals · <code>-lt</code> less than · <code>-gt</code> greater than · <code>-le</code> less or equal · <code>-ge</code> greater or equal</li>
          </ul>
          <h3>String / file test operators</h3>
          <ul>
            <li><code>=</code> strings equal · <code>!=</code> strings not equal</li>
            <li><code>-z</code> length zero · <code>-n</code> length non-zero</li>
            <li><code>-f</code> file exists</li>
          </ul>
        `
      },
      {
        id: "ctrl",
        title: "Conditionals & Loops",
        html: `
          <h3>If / elif / else</h3>
          <pre>if [ expression ]; then
    # commands
elif [[ expression ]]; then
    # commands
else
    # commands
fi</pre>
          <p>Example with numbers (uses <code>-eq</code>, <code>-lt</code> and <code>&&</code>):</p>
          <pre>n=2
if [ $n -eq 1 ]; then
    echo value of n is 1
elif [[ $n -eq 2 && $n -lt 5 ]]; then
    echo value of n is less than threshold
fi</pre>
          <h3>Case</h3>
          <pre>case EXPRESSION in
  CASE1)
    COMMAND-LIST
    ;;
  CASE2)
    COMMAND-LIST
    ;;
  *)
    COMMAND-LIST
    ;;
esac</pre>
          <h3>For loops</h3>
          <pre># Iterate over an array
arr=("bash" "shell" "script")
for i in "\${arr[@]}"; do
    echo $i
done

# Words in a string
str="bash shell script"
for i in $str; do echo $i; done

# Sequence of numbers
for i in $(seq 1 10); do echo $i; done

# C-style counter
for ((i = 1; i &lt; \${#arr[@]} + 1; i++)); do
    echo $i " : " \${arr[$i - 1]}
done

# break example
for i in "\${arr[@]}"; do
    echo $i
    if [ $i == "lemon" ]; then break; fi
done</pre>
          <h3>While / Until</h3>
          <pre>while [ $i -lt $count ]; do
    echo "$i"
    i=$((i + 1))
done

until [ $i -lt $count ]; do
    echo "$i"
    i=$((i - 1))
done</pre>
        `
      },
      {
        id: "fn",
        title: "Functions",
        html: `
          <pre>function &lt;function_name&gt; {
    # function body
}

# OR
&lt;function_name&gt; () {
    # function body
}</pre>
          <ul>
            <li>Define BEFORE you call.</li>
            <li>Args inside function: <code>$1</code>, <code>$2</code>, ...</li>
            <li>Use <code>local var=value</code> for variables scoped to the function.</li>
          </ul>
          <pre>function functionWithArgs {
    echo $1 : $2 is $3 years old
}
functionWithArgs "$(date +"[%m-%d %H:%M:%S]")" "Ahmed" "25"</pre>
          <h3>Hands-on Q1 - reverse a number</h3>
          <pre>#!/bin/bash
if [ $# -eq 1 ]; then
  if [ $1 -gt 0 ]; then
    num=$1; revNum=0
    while [ $num -ne 0 ]; do
      testnum=$(( $num % 10 ))
      revNum=$(( $revNum * 10 + $testnum ))
      num=$(( $num / 10 ))
    done
    echo "Reverse Number: $revNum of $1"
  else
    echo "Input is less than 0, retry with a different number."
  fi
else
  echo "ERROR: Retry with one parameter."
fi</pre>
          <h3>Hands-on Q2 - validate password strength</h3>
          <p>Conditions: length &ge; 8, contains digit, upper, lower; otherwise "Weak Password".</p>
          <pre>read password
len="\${#password}"
if [ $len -ge 8 ]; then
  echo "$password" | grep -q [0-9] && \\
  echo "$password" | grep -q [A-Z] && \\
  echo "$password" | grep -q [a-z] && \\
  echo "Strong Password" || echo "Weak Password"
else
  echo "Weak Password -&gt; length &lt; 8"
fi</pre>
        `
      }
    ]
  },

  4: {
    title: "Lab 4 - Docker Introduction",
    sections: [
      {
        id: "problem",
        title: "The Problem & 3 Solutions",
        html: `
          <p><b>Problem:</b> Three Python apps using different Python versions can't all run on one machine - same OS can't host multiple Python versions cleanly.</p>
          <table>
            <tr><th>Solution</th><th>How</th><th>Trade-off</th></tr>
            <tr><td>1. Multiple physical machines</td><td>One machine per version</td><td>Expensive, wasteful</td></tr>
            <tr><td>2. VMs</td><td>One physical host with hypervisor + 3 guest OSes</td><td>Heavy: each VM has its own full OS</td></tr>
            <tr><td>3. <b>Containers (Docker)</b></td><td>One host OS + Docker Engine + 3 isolated containers sharing the kernel</td><td>Lightweight, share OS kernel - same OS family required.</td></tr>
          </table>
          <h3>What is a Container?</h3>
          <ul>
            <li>Standardized packaging for software and dependencies.</li>
            <li>Isolates apps from each other.</li>
            <li><b>Share the same OS kernel.</b></li>
            <li>Works for all major Linux distributions.</li>
            <li>Created by using an <b>image</b>.</li>
          </ul>
          <p>Container runtime examples: <b>Docker, runC, containerd, Windows Containers.</b></p>
        `
      },
      {
        id: "what-docker",
        title: "What & Why Docker",
        html: `
          <p><b>Docker</b> - software platform that simplifies building/running/managing/distributing applications. It virtualizes the OS of the host on which it's installed. Developed in Go.</p>
          <h3>Why Docker?</h3>
          <ul>
            <li>Eliminate "works on my machine" issues.</li>
            <li>Run/manage apps side-by-side in isolated containers - better compute density.</li>
          </ul>
          <h3>Advantages</h3>
          <ul>
            <li>Multiple apps with different requirements on same host (must share OS kernel family).</li>
            <li>Storage optimized · Robustness · Reduces costs · Easy & faster configuration · App isolation · Security · High productivity · High scalability · Infrastructure independent.</li>
          </ul>
          <h3>Disadvantage</h3>
          <p>Apps with <b>different OS requirements</b> (e.g. Linux vs Windows kernel) <b>cannot</b> be hosted together on the same Docker host.</p>
        `
      },
      {
        id: "engine",
        title: "Docker Engine Components",
        html: `
          <p>Docker Engine - core of Docker. <b>Client-server</b> based application. Three main components:</p>
          <table>
            <tr><th>Component</th><th>Purpose</th></tr>
            <tr><td><b>Server</b> (daemon: <code>dockerd</code>)</td><td>Creates and manages images, containers, networks, volumes on the Docker platform.</td></tr>
            <tr><td><b>REST API</b></td><td>Specifies how applications interact with and instruct the Server.</td></tr>
            <tr><td><b>Client (CLI)</b></td><td>Allows users to interact with Docker using commands.</td></tr>
          </table>
          <h3>Architecture (text view)</h3>
          <pre>Container -&gt; Operating System (kernel)
Many containers share the same OS kernel.
On Windows: Docker for Windows uses WSL or a Linux VM.</pre>
        `
      },
      {
        id: "cli",
        title: "Basic Commands & Terminology",
        html: `
          <h3>Command-line structure</h3>
          <pre>docker &lt;command&gt; [option(s)]
docker version       # CLI + server versions, verify CLI talks to engine
docker info          # Most configuration values of engine
docker run           # Run container</pre>
          <h3>Management command format (added in 2017)</h3>
          <pre>docker &lt;command&gt; &lt;sub-command&gt; [option(s)]
# old           ↔  new
docker run     ↔  docker container run
docker build   ↔  docker image build
docker ps      ↔  docker container ls</pre>
          <h3>Terminology</h3>
          <table>
            <tr><th>Term</th><th>Definition</th></tr>
            <tr><td><b>Image</b></td><td>Template (stored in registry) that contains: application, cut-down OS, runtime (Node/Python/Java), 3rd-party libs, env vars, all dependencies.</td></tr>
            <tr><td><b>Container</b></td><td>An <b>instance</b> of an image running as a process. Many containers can run from the same image.</td></tr>
            <tr><td><b>Docker Hub</b></td><td>Docker's <b>default image registry</b>. Official online repository. Allows storing/distributing custom images publicly or privately.</td></tr>
          </table>
        `
      },
      {
        id: "vm-vs-docker",
        title: "VMs vs Docker",
        html: `
          <table>
            <tr><th></th><th>VM</th><th>Docker container</th></tr>
            <tr><td>Boots</td><td>Full guest OS</td><td>Shares host kernel</td></tr>
            <tr><td>Size</td><td>Heavy (GBs)</td><td>Lightweight (MBs)</td></tr>
            <tr><td>Hardware access</td><td>Through Guest OS &rarr; Hypervisor &rarr; Host OS</td><td>Direct via host kernel</td></tr>
            <tr><td>Isolation</td><td>Strong (own OS)</td><td>Process-level (kernel namespaces)</td></tr>
            <tr><td>Mixed OS hosting</td><td>Yes (different guest OSes)</td><td>No (containers must share host kernel family)</td></tr>
          </table>
        `
      }
    ]
  },

  5: {
    title: "Lab 5 - Container Lifecycle & Persistence",
    sections: [
      {
        id: "run-flow",
        title: "What docker container run does",
        html: `
          <pre>docker container run --publish 80:80 nginx</pre>
          <ul>
            <li>Looks for image locally in <b>image cache</b>; if not found pulls from Docker Hub.</li>
            <li>Downloads latest version (e.g. <code>nginx:latest</code>) by default.</li>
            <li>Creates a new container based on that image.</li>
            <li>Gives it a virtual IP on a private network inside the docker engine.</li>
            <li>Opens host port and forwards to container port.</li>
            <li>Starts the container by using the <code>CMD</code> in the image's Dockerfile.</li>
          </ul>
        `
      },
      {
        id: "lifecycle-cli",
        title: "Lifecycle CLI Reference",
        html: `
          <table>
            <tr><th>Command</th><th>Purpose</th></tr>
            <tr><td><code>docker image pull &lt;image&gt;</code></td><td>Download image from Docker Hub if not local</td></tr>
            <tr><td><code>docker container start &lt;name|id&gt;</code></td><td>Start one or more stopped containers</td></tr>
            <tr><td><code>docker container stop &lt;name|id&gt;</code></td><td>Stop one or more running containers</td></tr>
            <tr><td><code>docker container ls</code></td><td>List <b>running</b> containers</td></tr>
            <tr><td><code>docker container ls -a</code></td><td>List <b>all</b> containers</td></tr>
            <tr><td><code>docker container rm &lt;name|id&gt;</code></td><td>Remove one or more containers</td></tr>
            <tr><td><code>docker container rm -f</code></td><td>Force remove a running container</td></tr>
            <tr><td><code>docker container top &lt;c&gt;</code></td><td>Display running processes of a container</td></tr>
            <tr><td><code>docker container inspect &lt;c&gt;</code></td><td>Detailed info on configuration(s)</td></tr>
            <tr><td><code>docker container stats</code></td><td>Live stream of container resource usage</td></tr>
            <tr><td><code>docker container logs &lt;c&gt;</code></td><td>Print container logs (used to find MySQL random root password)</td></tr>
          </table>
          <h3>Important flags</h3>
          <table>
            <tr><th>Flag</th><th>Meaning</th></tr>
            <tr><td><code>-d</code> / <code>--detach</code></td><td>Run container in background</td></tr>
            <tr><td><code>-p HOST:CONTAINER</code> / <code>--publish</code></td><td>Map host port to container port</td></tr>
            <tr><td><code>--name &lt;n&gt;</code></td><td>Assign a friendly name</td></tr>
            <tr><td><code>-e KEY=VAL</code> / <code>--env</code></td><td>Pass environment variable</td></tr>
            <tr><td><code>-v NAME:/PATH</code> / <code>--volume</code></td><td>Mount a named volume</td></tr>
            <tr><td><code>-it</code> = <code>-i -t</code></td><td>Interactive + pseudo-tty (like SSH terminal)</td></tr>
          </table>
        `
      },
      {
        id: "shell-inside",
        title: "Getting a Shell Inside Containers",
        html: `
          <table>
            <tr><th>Command</th><th>Purpose</th></tr>
            <tr><td><code>docker container run -it</code></td><td>Start a NEW container interactively</td></tr>
            <tr><td><code>docker container exec -it</code></td><td>Run an additional command in an EXISTING container</td></tr>
          </table>
          <ul>
            <li><code>-t</code> pseudo-tty - simulates a real terminal (like SSH).</li>
            <li><code>-i</code> interactive - keeps session open to receive terminal input.</li>
          </ul>
          <h3>Demo</h3>
          <pre>docker container run -it --name webserver nginx bash
# write 'exit' to leave the container shell

docker container run -it --name ubuntu-os ubuntu
# inside: apt-get update && apt-get install nano -y
#         nano test.txt   (Ctrl+O save, Ctrl+X exit)

docker container run -d -p 3306:3306 --name db \\
  -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker container exec -it db bash</pre>
        `
      },
      {
        id: "handson-multi",
        title: "Hands-On: Multiple Containers",
        html: `
          <p>Run nginx, mysql, and httpd (apache) all detached, named, with port mappings.</p>
          <pre>docker container run -d -p 3306:3306 --name db \\
  -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql
docker container logs db | grep -i "root password"

docker container run -d --name webserver -p 8080:80 httpd
docker container run --publish 80:80 -d --name proxy nginx

docker container ls

# clean up
docker container stop webserver proxy db
docker container rm   webserver proxy db</pre>
          <p>Both <code>stop</code> and <code>rm</code> accept multiple names/IDs.</p>
        `
      },
      {
        id: "persistence",
        title: "MySQL Persistence (from markdowns)",
        html: `
          <h3>Without persistence - data is lost</h3>
          <pre>docker pull mysql:8

docker run -d \\
  --name mysql-demo \\
  -e MYSQL_ROOT_PASSWORD=rootpass \\
  -p 3306:3306 \\
  mysql:8

docker exec -it mysql-demo bash
mysql -u root -p
# password: rootpass

CREATE DATABASE demo;
USE demo;
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), age INT);
INSERT INTO users (name, age) VALUES ('saif', 20);
SELECT * FROM users;</pre>
          <p>Inspect container IP:</p>
          <pre>docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql-demo</pre>
          <p>Stop &amp; remove container, then re-run a fresh container - <b>demo database is gone</b>. Containers are <b>ephemeral</b>; the writable layer is destroyed when the container is removed.</p>
          <h3>Fix with a Volume</h3>
          <pre>docker volume create mysql-data

docker run -d \\
  --name mysql-demo \\
  -e MYSQL_ROOT_PASSWORD=rootpass \\
  -p 3306:3306 \\
  -v mysql-data:/var/lib/mysql \\
  mysql:8</pre>
          <p><code>/var/lib/mysql</code> is the MySQL data directory. After removing &amp; re-running with the SAME volume, data persists.</p>
          <h3>Architecture</h3>
          <pre>Application
   |  3306
   v
Docker Host
   |
   v
Container (MySQL)
   |
   v
Volume (Persistent Storage)</pre>
          <h3>Optional CRUD UI</h3>
          <pre>docker run -d -p 8080:80 phpmyadmin/phpmyadmin
# host: mysql-demo, user: root, password: rootpass</pre>
        `
      }
    ]
  },

  6: {
    title: "Lab 6 - Docker Networks & Volumes",
    sections: [
      {
        id: "intro",
        title: "Why Docker Networks?",
        html: `
          <p>3-tier app: clients (browsers/mobile) &harr; app/logic tier &harr; database. You can run app + DB on same Linux server, each in its own container; you need a way to connect them. The answer: <b>Docker Networking</b>.</p>
          <ul>
            <li>Allows containers to communicate with each other and with external systems.</li>
            <li>Provides <b>complete isolation</b> for containers.</li>
            <li>A container can be added to <b>more than one</b> network.</li>
          </ul>
          <p><b>Best practice:</b> Create a new virtual network for each app. e.g. <code>my_web_app</code> for mysql + php/apache; <code>my_api</code> for mongo + nodejs.</p>
        `
      },
      {
        id: "types",
        title: "Network Driver Types",
        html: `
          <table>
            <tr><th>Driver</th><th>Description</th></tr>
            <tr><td><b>Bridge</b></td><td>Default private network on host. Containers get internal IPs and communicate easily. Docker daemon defines the default <b>docker0</b> bridge. Best for standalone containers. Each container connects via NAT firewall on host IP. Containers on same virtual network can talk WITHOUT <code>-p</code>.</td></tr>
            <tr><td><b>Host</b></td><td>Bypasses Docker's network stack and uses the host's network directly. Containers don't get separate IPs; their ports are directly on the host's network.</td></tr>
            <tr><td><b>None</b></td><td>No external network access and no inter-container communication. Loopback only. Used to disable networking.</td></tr>
            <tr><td><b>Overlay</b></td><td>Listed as an additional network driver type.</td></tr>
            <tr><td><b>Custom</b></td><td>User-defined network with specific config (type, subnet, gateway, DNS). Provides isolation and control. Skip virtual networks entirely with <code>--network=host</code>.</td></tr>
          </table>
          <p>"Batteries Included, But Removable" - defaults work, but parts are easy to swap out.</p>
        `
      },
      {
        id: "cli",
        title: "docker network CLI",
        html: `
          <table>
            <tr><th>Command</th><th>Purpose</th></tr>
            <tr><td><code>docker network create &lt;net&gt;</code></td><td>Create a new network</td></tr>
            <tr><td><code>docker network ls</code></td><td>List all available networks</td></tr>
            <tr><td><code>docker network inspect &lt;net&gt;</code></td><td>Inspect a network's details</td></tr>
            <tr><td><code>docker network connect &lt;net&gt; &lt;container&gt;</code></td><td>Connect a container to a network (dynamically creates a NIC)</td></tr>
            <tr><td><code>docker network disconnect &lt;net&gt; &lt;container&gt;</code></td><td>Disconnect a container from a network</td></tr>
            <tr><td><code>docker network rm &lt;net&gt;</code></td><td>Remove a network</td></tr>
            <tr><td><code>docker network prune</code></td><td>Remove ALL unused networks at once</td></tr>
          </table>
        `
      },
      {
        id: "dns",
        title: "DNS & Demo",
        html: `
          <ul>
            <li>Containers <b>shouldn't rely on IPs</b> for inter-communication.</li>
            <li><b>DNS for friendly names is built-in IF you use custom networks.</b></li>
            <li>The default <code>bridge</code> network does NOT have the DNS server built-in by default. Use <code>--link</code> to manually link containers on the default bridge.</li>
            <li>DNS = Domain Name System. Translates human-readable domain names to machine-readable IP addresses.</li>
          </ul>
          <h3>Demo</h3>
          <pre>docker container run -d --name webserver nginx
docker network ls
docker network inspect bridge

docker network create my_app_net
docker container run -d --name new_nginx --network my_app_net nginx
docker network inspect my_app_net
docker network connect my_app_net webserver
docker container exec -it webserver curl new_nginx
docker network disconnect my_app_net webserver</pre>
        `
      },
      {
        id: "vols",
        title: "Volumes Intro",
        html: `
          <p>Volumes - <b>persistent data stores</b> for containers, created and managed by Docker.</p>
          <pre>docker volume create &lt;name-of-volume&gt;
docker volume ls           # list volumes
docker volume inspect &lt;v&gt;  # inspect</pre>
          <ul>
            <li>Volumes are <b>not</b> a good choice if you need to access files from the host - the volume is <b>completely managed by Docker</b>. Use <b>bind mounts</b> for that.</li>
            <li>Often a better choice than writing data directly to a container - a volume doesn't increase container size.</li>
            <li>A volume's contents <b>exist outside the lifecycle</b> of a given container; the writable layer dies with the container.</li>
          </ul>
          <h3>Mount syntax</h3>
          <pre>--volume &lt;name&gt;:&lt;path-in-container&gt;
# OR (more generic)
--mount type=volume,src=myvolume,dst=/data,ro,volume-subpath=/foo</pre>
        `
      }
    ]
  },

  7: {
    title: "Lab 7 - Dockerfile & Docker Compose",
    sections: [
      {
        id: "image",
        title: "What is an Image?",
        html: `
          <p>An <b>Image</b> = ordered collection of root filesystem changes + execution parameters for use within a container runtime.</p>
          <ul>
            <li>App binaries and dependencies.</li>
            <li>Metadata about the image data and how to run it.</li>
            <li><b>NOT</b> a complete OS. <b>No kernel</b>, no kernel modules (drivers).</li>
          </ul>
          <p>Images are <b>read-only blueprints</b> that include container-creation instructions. Two ways to create one:</p>
          <ol>
            <li><b>Interactive method</b> - launch a container, modify environment, then commit changes to a new image.</li>
            <li><b>Dockerfile method</b> - write a text Dockerfile and run <code>docker build</code>.</li>
          </ol>
          <h3>Interactive method commands</h3>
          <pre>docker pull &lt;base-image&gt;
docker run -it &lt;base-image&gt;
# modify the container, then in another shell:
docker commit &lt;container&gt; &lt;new-image-name&gt;</pre>
        `
      },
      {
        id: "dockerfile",
        title: "Dockerfile Syntax",
        html: `
          <p>A <b>Dockerfile</b> is a text configuration file with instructions to build images. Source code for image creation. More systematic, flexible, and efficient than the interactive method.</p>
          <table>
            <tr><th>Instruction</th><th>Purpose</th></tr>
            <tr><td><code>FROM</code></td><td>Base/parent image. Use <code>FROM scratch</code> to create a new base image.</td></tr>
            <tr><td><code>ENV</code></td><td>Set environment variable. Multiple via <code>key=value</code>; without <code>=</code> only one variable.</td></tr>
            <tr><td><code>RUN</code></td><td>Execute shell command in a new layer; commit result in the new image.</td></tr>
            <tr><td><code>WORKDIR</code></td><td>Change current working directory in the image (used by subsequent instructions).</td></tr>
            <tr><td><code>ADD</code></td><td>Add files from local host to the image. Supports tar extraction & remote URLs (vs COPY).</td></tr>
            <tr><td><code>COPY</code></td><td>Copy files (similar to ADD but without tar/URL features).</td></tr>
            <tr><td><code>EXPOSE</code></td><td>Tell the port the container listens on. <b>Does NOT actually publish</b> at build time - just metadata.</td></tr>
            <tr><td><code>CMD</code></td><td>Default command when container starts. <b>Only one CMD</b> per Dockerfile - last one wins. Overridden by command passed to <code>docker run</code>.</td></tr>
            <tr><td><code>ENTRYPOINT</code></td><td>Make the container an executable. Has <b>exec</b> and <b>shell</b> forms. <code>docker run</code> args are appended after exec-form ENTRYPOINT. Override with <code>--entrypoint</code>.</td></tr>
          </table>
          <h3>Example Dockerfile (custom nginx)</h3>
          <pre>FROM ubuntu
ENV APP=nginx
RUN apt-get update && apt-get install -y nginx
WORKDIR /var/www/html
COPY . index.html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]</pre>
        `
      },
      {
        id: "layers",
        title: "Docker Image Layers",
        html: `
          <ul>
            <li>An image consists of <b>read-only layers</b> built on top of each other.</li>
            <li>Docker uses the <b>Union File System (UFS)</b> to build an image.</li>
            <li>UFS layers multiple directories on a single Linux host and presents them as one directory.</li>
            <li>Each Dockerfile instruction creates a layer; each layer is a <b>set of differences</b> from the layer before it.</li>
            <li>Layers are <b>shared across containers</b>.</li>
          </ul>
          <h3>Why layers</h3>
          <p>If layers are unchanged on rebuild, Docker uses cache (<b>"Using cache"</b>) instead of redoing them. Layers shared with other containers are reused, not recreated.</p>
          <h3>Inspect</h3>
          <pre>docker image build -t python-hello-world .
docker image ls
docker image history python-hello-world
docker image inspect python-hello-world
docker image run -p 5000:5000 -d python-hello-world</pre>
          <h3>Hands-on Python image</h3>
          <pre>FROM python
COPY .  /src
CMD ["python", "/src/PythonExample.py"]</pre>
          <pre>docker image build -t python-application .
docker image ls
docker container run python-application</pre>
        `
      },
      {
        id: "compose",
        title: "Docker Compose",
        html: `
          <p>An app may consist of multiple containers running different services (frontend + app server + DB). Manually managing them is tedious. <b>Docker Compose</b> = software for defining and running multi-container apps.</p>
          <ul>
            <li>Two components: a YAML file (<code>docker-compose.yml</code>) and a CLI tool (<code>docker-compose</code>).</li>
            <li>YAML file defines services, networks, volumes - including image, config, and connections.</li>
            <li>CLI interacts with the Docker Engine to create/start/stop/remove containers.</li>
            <li>Recommend version 2 minimum; format versions: 1, 2, 2.1, 3, 3.1, etc.</li>
          </ul>
          <h3>Common commands</h3>
          <pre>docker-compose up        # setup volumes/networks and start all containers
docker-compose down      # stop all containers and remove cont/vol/net
docker-compose build     # build custom images
docker-compose up --build
docker-compose -f &lt;file&gt; ...   # use non-default filename</pre>
          <h3>YAML skeleton</h3>
          <pre>version: "3.5"

services:
  servicename:
    image:           # optional if you use build:
    command:         # replace default CMD
    environment:     # same as -e
    volumes:         # same as -v
  servicename2:

networks:            # same as docker network create
volumes:             # same as docker volume create</pre>
          <h3>Example 1 - Nginx + HTTPD</h3>
          <pre>version: '3'
services:
  nginx-server:
    image: nginx
    ports:
      - "80:80"
  httpd-server:
    image: httpd
    ports:
      - "8080:80"</pre>
          <h3>Example 2 - api + db with custom network</h3>
          <pre>version: '3.9'
services:
  api:
    build: .
    ports:
      - '3000:3000'
    depends_on:
      - db
    networks:
      - web-app-net
  db:
    image: 'postgres'
    ports:
      - '4321:5432'
    environment:
      POSTGRES_DB: 'testUser'
      POSTGRES_PASSWORD: 'mypassword123'
      POSTGRES_USER: 'testUser'
    networks:
      - web-app-net

networks:
  web-app-net:</pre>
          <h3>Why Compose?</h3>
          <ul>
            <li>Manage complex stacks with multiple services and dependencies.</li>
            <li>Consistency across dev/staging/prod.</li>
            <li>One-liner dev environment startups: <code>docker-compose up</code>.</li>
          </ul>
        `
      }
    ]
  },

  8: {
    title: "Lab 8 - Kubernetes",
    sections: [
      {
        id: "intro",
        title: "What is Kubernetes & Why?",
        html: `
          <p><b>Kubernetes (K8s)</b> - an open-source <b>next-gen container scheduler</b> made by Google. Designed as a loosely-coupled collection of components for <b>deploying, maintaining, and scaling applications</b>.</p>
          <h3>Why K8s?</h3>
          <ul>
            <li><b>Update an app version</b>: in plain Docker you must delete the old container and create a new one. K8s automates this.</li>
            <li><b>Huge concurrent users</b>: without a load balancer or scaling support, the app can go down. K8s handles scaling and load balancing.</li>
          </ul>
          <h3>Definitions</h3>
          <table>
            <tr><th>Term</th><th>Meaning</th></tr>
            <tr><td><b>Pod</b></td><td>Smallest unit of work or management in K8s. Comprises <b>one or more containers</b> sharing storage, network, and context (namespace, cgroups).</td></tr>
            <tr><td><b>Node</b></td><td>A single host (server), physical or virtual, capable of running pods. Two types: <b>Control Plane Node (Master)</b> and <b>Worker Node</b>.</td></tr>
            <tr><td><b>Cluster</b></td><td>Collection of hosts that aggregate available resources (CPU, RAM, disk, devices) into one usable pool.</td></tr>
          </table>
        `
      },
      {
        id: "master",
        title: "Master Components",
        html: `
          <table>
            <tr><th>Component</th><th>Role</th></tr>
            <tr><td><b>kube-apiserver</b></td><td><b>Main entry point</b> to the control plane &amp; datastore. Exposes a REST API. Handles AuthN, AuthZ, request validation, admission control. Front-end to <b>etcd</b>.</td></tr>
            <tr><td><b>etcd</b></td><td><b>Distributed key-value store</b>. Stores all cluster data (state, configurations, objects). Strongly consistent and highly available.</td></tr>
            <tr><td><b>kube-controller-manager</b></td><td>Runs <b>controllers</b> - daemons that watch cluster state via the apiserver and take action to reconcile (Node controller, ReplicaSet controller, etc.).</td></tr>
            <tr><td><b>cloud-controller-manager</b></td><td>Daemon that lets K8s interact with cloud providers (AWS/GCP/Azure). Runs Node Controller, Route Controller, Service Controller, PersistentVolumeLabel Controller.</td></tr>
            <tr><td><b>kube-scheduler</b></td><td>Decides where a new pod should run. Evaluates workload requirements (CPU/RAM/zones/affinity) and matches a suitable node. <b>Policy-rich</b>.</td></tr>
          </table>
        `
      },
      {
        id: "node",
        title: "Node Components",
        html: `
          <table>
            <tr><th>Component</th><th>Role</th></tr>
            <tr><td><b>kubelet</b></td><td>Node agent on each K8s node. Monitors and manages pods. Takes <b>PodSpecs</b> (YAML manifests) and ensures described containers are running and healthy.</td></tr>
            <tr><td><b>kube-proxy</b></td><td>Manages <b>network routing</b> for each node. Forwards requests to appropriate pods. Modes: <b>userspace</b>, <b>iptables</b>, <b>ipvs</b> (best perf).</td></tr>
            <tr><td><b>Container runtime</b></td><td>The software that actually runs containers. K8s talks to it via the <b>CRI</b> (Container Runtime Interface). Examples: <b>containerd</b>, <b>CRI-O</b>, <b>rkt</b>, <b>Kata</b>, <b>Virtlet</b>.</td></tr>
          </table>
        `
      },
      {
        id: "core",
        title: "Core Concepts: Namespace, Labels, Selectors",
        html: `
          <ul>
            <li><b>Namespace</b> - logical cluster / environment. Primary method of dividing a cluster or scoping access.</li>
            <li><b>Label</b> - key-value pair used to <b>identify, describe, group</b> related objects. <b>Strict syntax</b> and limited character set. e.g. <code>app: nginx</code>, <code>tier: frontend</code>.</li>
            <li><b>Annotation</b> - key-value pair with <b>non-identifying metadata</b>. <b>No syntax limits</b>. Anything: doc links, build info, monitoring data. <b>Not used for filtering / selecting.</b></li>
            <li><b>Selector</b> - filter using labels. Equality-based (<code>=</code>, <code>==</code>, <code>!=</code>) or simple key-value. <b>Set-based</b>: <code>key in (a,b)</code>, <code>key notin (c,d)</code>. Operators: <code>In</code>, <code>NotIn</code>, <code>Exists</code>, <code>DoesNotExist</code>.</li>
          </ul>
          <p><b>Set-based selectors supported on:</b> Job, Deployment, ReplicaSet, DaemonSet, PersistentVolumeClaims.</p>
        `
      },
      {
        id: "cluster-setup",
        title: "Cluster Setup & kubectl",
        html: `
          <p>Two cluster types on kubectl: <b>kubeadm</b> (production - multiple master + worker nodes; hard to test locally) and <b>minikube</b> (test/local - master and node processes on a single machine; Docker container runtime pre-installed).</p>
          <p><b>kubectl</b> - submits commands to the K8s API server (entry point). The worker process on minikube executes commands so pods can run on a node.</p>
          <h3>Important commands</h3>
          <pre>kubectl api-resources
kubectl run pod-name --image image-name
kubectl create -f file.yml
kubectl apply -f file.yml      # Deployment (create/replace)
kubectl get pods
kubectl get po -o wide
kubectl describe pod pod-name
kubectl delete pod pod-name
kubectl get replicaset
kubectl delete replicaset name
kubectl replace -f file.yml
kubectl get deployments
kubectl rollout undo    deployment &lt;name&gt;
kubectl rollout status  deployment &lt;name&gt;
kubectl rollout history deployment &lt;name&gt;</pre>
          <h3>api-resources sample (memorize the SHORT names)</h3>
          <table>
            <tr><th>NAME</th><th>SHORTNAMES</th><th>NAMESPACED</th><th>KIND</th></tr>
            <tr><td>pods</td><td>po</td><td>true</td><td>Pod</td></tr>
            <tr><td>services</td><td>svc</td><td>true</td><td>Service</td></tr>
            <tr><td>deployments</td><td>deploy</td><td>true</td><td>Deployment</td></tr>
            <tr><td>nodes</td><td>no</td><td>false</td><td>Node</td></tr>
            <tr><td>ingresses</td><td>ing</td><td>true</td><td>Ingress</td></tr>
          </table>
        `
      },
      {
        id: "workloads",
        title: "Workloads (ReplicaSet, Deployment, Strategies)",
        html: `
          <table>
            <tr><th>Workload</th><th>Purpose</th></tr>
            <tr><td><b>ReplicaSet</b></td><td>Method of managing pod replicas and their lifecycle: scheduling, scaling, deletion.</td></tr>
            <tr><td><b>Deployment</b></td><td>Declarative method of managing <b>stateless</b> Pods and ReplicaSets. Provides <b>rollback</b> + granular update control.</td></tr>
            <tr><td><b>StatefulSet</b></td><td>For pods that must persist or maintain state. Pod identity (hostname, network, storage) is persisted.</td></tr>
            <tr><td><b>DaemonSet</b></td><td>Ensures all nodes matching certain criteria run an instance of the supplied Pod. Ideal for log forwarding, health monitoring.</td></tr>
            <tr><td><b>Job</b></td><td>Ensures one or more pods execute and successfully terminate (until completion/parallelism met).</td></tr>
            <tr><td><b>CronJob</b></td><td>Extension of Job that runs jobs on a cron-like schedule.</td></tr>
          </table>
          <h3>Deployment Strategies</h3>
          <table>
            <tr><th>Strategy</th><th>How it works</th></tr>
            <tr><td><b>Recreate</b></td><td>Stop ALL old (v1) instances first, then start ALL new (v2) instances.</td></tr>
            <tr><td><b>Rolling Update</b></td><td>Gradually replace v1 with v2 in batches, keeping some old instances live during rollout.</td></tr>
            <tr><td><b>Shadow</b></td><td>Run v2 alongside v1 but send NO real user traffic to v2. Mirror or test traffic only.</td></tr>
            <tr><td><b>Canary</b></td><td>Release v2 to a small subset of real users (1% or a group). Monitor; gradually increase. Rollback fast if issues.</td></tr>
            <tr><td><b>Blue/Green</b></td><td>Two identical envs (blue=v1, green=v2). Switch ALL traffic at once when green is verified. Easy rollback to blue.</td></tr>
            <tr><td><b>A/B Testing</b></td><td>Run multiple versions (A and B) of a feature simultaneously to different user segments. Analyze behavior to pick winner.</td></tr>
          </table>
          <h3>Stateful vs Stateless</h3>
          <table>
            <tr><th>Aspect</th><th>Deployment (Stateless)</th><th>StatefulSet (Stateful)</th></tr>
            <tr><td>Pod names</td><td>Random (nginx-abc123)</td><td>Fixed (pod-0, pod-1)</td></tr>
            <tr><td>Storage</td><td>Shared / ephemeral</td><td>Unique persistent volume per pod</td></tr>
            <tr><td>Startup order</td><td>Any order</td><td>Ordered (pod-0 starts first)</td></tr>
            <tr><td>Use case</td><td>Web servers, APIs</td><td>Databases, Kafka, Zookeeper</td></tr>
            <tr><td>DNS names</td><td>Changeable</td><td>Stable & predictable</td></tr>
          </table>
        `
      },
      {
        id: "network",
        title: "Networking, Services & Ingress",
        html: `
          <h3>Fundamental rules</h3>
          <ul>
            <li>Pods can communicate with Pods <b>without NAT</b>.</li>
            <li>Nodes can communicate with Pods (and vice-versa) <b>without NAT</b>.</li>
            <li>The IP a pod sees itself as is the same IP others see it as.</li>
            <li>Containers in a pod share network namespace + IP - communicate over <b>localhost</b>.</li>
            <li>Pods are ephemeral (die fast); Services have <b>persistent</b> cluster-unique IPs spanning pod lifecycle.</li>
            <li>Networking is plumbed via the <b>CNI (Container Network Interface)</b>. Plugins: Calico, Cilium, Contiv, Contrail, Flannel, GCE, kube-router, Multus, OpenVSwitch, OVN, Romana, Weave.</li>
          </ul>
          <h3>Service types (4)</h3>
          <table>
            <tr><th>Type</th><th>Purpose</th></tr>
            <tr><td><b>ClusterIP</b></td><td>Exposes service on a strictly cluster-internal IP. <b>Default.</b></td></tr>
            <tr><td><b>NodePort</b></td><td>Exposes service on each node's IP at a statically-defined port (range 30000-32767).</td></tr>
            <tr><td><b>LoadBalancer</b></td><td>Works with cloud provider to expose service outside the cluster on a static external IP.</td></tr>
            <tr><td><b>ExternalName</b></td><td>References endpoints OUTSIDE the cluster by providing a static internally-referenced DNS name.</td></tr>
          </table>
          <h3>NodePort vs LoadBalancer vs Ingress</h3>
          <table>
            <tr><th>Feature</th><th>NodePort</th><th>LoadBalancer</th><th>Ingress</th></tr>
            <tr><td>External IP</td><td>No (use node IP + port)</td><td>Yes (from cloud provider)</td><td>Yes (shared across services)</td></tr>
            <tr><td>Use case</td><td>Simple setups, dev/test</td><td>Production with cloud provider</td><td>HTTP(S) routing, multiple services, host/path-based</td></tr>
            <tr><td>TLS</td><td>No</td><td>Via app/service</td><td>Yes (natively with certs)</td></tr>
            <tr><td>Needs Ingress Controller?</td><td>No</td><td>No</td><td>Yes (nginx, traefik, etc.)</td></tr>
          </table>
          <p><b>Ingress Controller</b> - deployed as a pod to one or more hosts. Options: <b>Nginx, HAproxy, Contour, Traefik</b>. Specific features passed through annotations.</p>
        `
      },
      {
        id: "storage",
        title: "Storage: Volumes, PV, PVC, StorageClass",
        html: `
          <ul>
            <li><b>Volume</b> - storage tied to <b>Pod lifecycle</b>; consumable by one or more containers within the pod.</li>
            <li><b>PersistentVolume (PV)</b> - represents a storage resource. Commonly linked to backing storage (NFS, GCEPersistentDisk, RBD, etc.). <b>Lifecycle independent of a pod.</b></li>
            <li><b>PersistentVolumeClaim (PVC)</b> - a request for storage that satisfies a set of requirements. Used with dynamically provisioned storage.</li>
            <li><b>StorageClass</b> - abstraction over an external storage resource. Includes a <b>Provisioner</b>, parameters, and a PV <b>reclaimPolicy</b>.</li>
          </ul>
          <h3>PV parameters</h3>
          <ul>
            <li><b>Capacity</b></li>
            <li><b>accessModes</b>: ReadOnlyMany (ROX), ReadWriteOnce (RWO), ReadWriteMany (RWX)</li>
            <li><b>persistentVolumeReclaimPolicy</b>: Retain, Recycle, Delete</li>
            <li><b>StorageClass</b></li>
          </ul>
          <p>PVs are <b>cluster-wide</b> (not directly consumable by a Pod). PVCs are <b>scoped to namespaces</b>. PVCs match PVs/StorageClasses based on <code>storageClass</code> and selectors.</p>
        `
      },
      {
        id: "config-rbac",
        title: "ConfigMap/Secret & RBAC",
        html: `
          <h3>ConfigMap & Secret</h3>
          <ul>
            <li><b>ConfigMap</b> - externalized data stored in K8s. Referenced as command-line arg, env var, or injected as a file into a volume mount. Ideal for separating containerized apps from configuration.</li>
            <li><b>Secret</b> - functionally identical to ConfigMaps but stored encoded as <b>base64</b> and encrypted at rest (if configured).</li>
          </ul>
          <p>Used in pod config: injected as a file, passed as env var, or used as a container command (requires passing as env var).</p>
          <h3>RBAC quartet + Service Account</h3>
          <table>
            <tr><th>Object</th><th>Purpose</th><th>Scope</th></tr>
            <tr><td><b>Role</b></td><td>Set of permissions: verbs (get/list/watch/...) over resources scoped to apiGroups.</td><td>Namespace</td></tr>
            <tr><td><b>ClusterRole</b></td><td>Same as Role but applied <b>cluster-wide</b>; can manage non-namespaced resources (like nodes).</td><td>Cluster</td></tr>
            <tr><td><b>RoleBinding</b></td><td>Grants permissions of a Role to one or more <b>subjects</b>: User, Group, or ServiceAccount.</td><td>Namespace</td></tr>
            <tr><td><b>ClusterRoleBinding</b></td><td>Grants ClusterRole to subjects across the entire cluster. Multiple subjects allowed; <b>roleRef targets a single role only.</b></td><td>Cluster</td></tr>
            <tr><td><b>ServiceAccount</b></td><td>Identity for pods or external services interacting with the cluster directly.</td><td>Namespace</td></tr>
          </table>
        `
      },
      {
        id: "deploy-flow",
        title: "Behind the Scenes: Deployment from Beginning to End",
        html: `
          <ol>
            <li><b>kubectl</b> performs client-side validation (linting). Manifest is prepared and serialized into a JSON payload.</li>
            <li><b>APIserver request loop</b>: kubectl authenticates (x509, JWT, http-auth-proxy, http-basic). Authorization iterates over Node, ABAC, RBAC, webhook. AdmissionControl checks resource quotas + security. Request stored in etcd. Initializers can mutate before publish. Request published on apiserver.</li>
            <li><b>Deployment Controller</b> notified via callback. Reconciles desired vs current state and forms a request for the new ReplicaSet. Apiserver evaluates &rarr; ReplicaSet published.</li>
            <li><b>ReplicaSet Controller</b> notified. Reconciles desired vs current and requests the desired number of pods. Apiserver evaluates &rarr; Pods published in <b>'Pending'</b> phase.</li>
            <li><b>Scheduler</b> monitors published pods with no <code>NodeName</code>, applies scheduling rules, finds suitable node, POSTs binding to apiserver. Pod status updated and set to <b>'PodScheduled'</b>.</li>
            <li><b>Kubelet PodSync</b>: kubelet on each node polls apiserver for pods matching its NodeName. It pulls secrets, provisions storage, applies AppArmor profiles, asynchronously POSTs PodStatus.</li>
            <li><b>Pause and plumbing</b>: kubelet provisions a <b>'pause' container</b> via the <b>CRI</b>. Pause is the parent for the Pod. Network plumbed via <b>CNI</b> - veth pair attached to pause and to a container bridge (<code>cbr0</code>). IPAM via CNI plugin assigns the IP to the pause container.</li>
            <li><b>Create containers</b>: kubelet pulls images, creates and starts any init containers, then primary pod containers.</li>
            <li><b>Pod Status</b>: liveness/readiness probes execute before PodStatus updated; if all OK, PodStatus &rarr; <b>ready</b>. Pod is deployed!</li>
          </ol>
        `
      }
    ]
  }
};
