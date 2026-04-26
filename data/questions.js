// ~300 questions strictly from the 8 PPTX labs + 2 Lab 5 hands-on markdowns.
// Each item carries: id, lab, slide(s), topic, type, q, ...payload, explanation.
// Types: mcq (single), multi (multi-select), truefalse, fill (text), command (smart matcher), predict (mcq with code), match (pairs)
window.QUESTIONS = [

// ==================== LAB 1 - Cloud Computing & VMs ====================
{ id:'L1-001', lab:1, slide:5, topic:'intro', type:'mcq',
  q:'Which BEST describes Cloud Computing?',
  options:[
    'A standalone laptop running multiple operating systems',
    'A collection of online managed services owned/run/maintained by a provider, paid for as you use',
    'A type of physical server you install in your own data center',
    'A free open-source kernel for Linux distributions'
  ],
  answer:1,
  explanation:'Cloud computing is online managed services owned, run and maintained by a cloud provider. You pay for what you use.' },

{ id:'L1-002', lab:1, slide:6, topic:'intro', type:'multi',
  q:'Which are the THREE properties of the cloud computing model? (select all)',
  options:['Elastic resources','Free of charge','Metered services','Self-service','Closed-source only'],
  answers:[0,2,3],
  explanation:'Cloud model: Elastic resources, Metered services, Self-service.' },

{ id:'L1-003', lab:1, slide:4, topic:'intro', type:'multi',
  q:'Which were the challenges faced BEFORE cloud computing? (select all)',
  options:['Cost','Scalability','Reliability','Mobility','Compilation speed'],
  answers:[0,1,2,3],
  explanation:'Pre-cloud challenges: Cost, Scalability, Reliability, Security, Mobility.' },

{ id:'L1-004', lab:1, slide:11, topic:'iaas', type:'mcq',
  q:'IaaS stands for?',
  options:['Internet as a Service','Infrastructure as a Service','Integration as a Service','Identity as a Service'],
  answer:1,
  explanation:'IaaS = Infrastructure as a Service.' },

{ id:'L1-005', lab:1, slide:12, topic:'paas', type:'mcq',
  q:'PaaS stands for?',
  options:['Platform as a Service','Password as a Service','Provider as a Service','Persistence as a Service'],
  answer:0,
  explanation:'PaaS = Platform as a Service.' },

{ id:'L1-006', lab:1, slide:13, topic:'saas', type:'mcq',
  q:'SaaS stands for?',
  options:['Storage as a Service','Server as a Service','Software as a Service','Stream as a Service'],
  answer:2,
  explanation:'SaaS = Software as a Service.' },

{ id:'L1-007', lab:1, slide:11, topic:'iaas', type:'mcq',
  q:'A key feature of IaaS is that:',
  options:[
    'Users still have to buy and maintain physical hardware',
    'Infrastructure is fixed in size and not scalable',
    'Users pay for IaaS on demand instead of purchasing hardware',
    'It is delivered through a SaaS subscription model'
  ],
  answer:2,
  explanation:'IaaS - users pay on demand instead of purchasing hardware; scalable infrastructure.' },

{ id:'L1-008', lab:1, slide:13, topic:'saas', type:'truefalse',
  q:'With SaaS, users must manage, install and upgrade the software themselves.',
  bool:false,
  explanation:'In SaaS users do NOT manage/install/upgrade; the SaaS provider does.' },

{ id:'L1-009', lab:1, slide:14, topic:'examples', type:'match',
  q:'Match each example service to its cloud model.',
  pairs:[
    {l:'Virtual servers, block storage, load balancers', r:'IaaS'},
    {l:'Databases, analytics, CI/CD, dev tools', r:'PaaS'},
    {l:'CRM, ERP, video streaming, advertising', r:'SaaS'}
  ],
  explanation:'IaaS = compute/storage/network · PaaS = dev platforms/databases/CI · SaaS = end-user apps.' },

{ id:'L1-010', lab:1, slide:15, topic:'responsibility', type:'mcq',
  q:'In SaaS, who manages the OS, middleware, runtime, data and applications?',
  options:['The client','Shared 50/50','The cloud provider manages everything','Only the data tier is managed by the client'],
  answer:2,
  explanation:'In SaaS, the provider manages the entire stack from networking up to applications.' },

{ id:'L1-011', lab:1, slide:16, topic:'virt', type:'mcq',
  q:'Virtualization is best defined as:',
  options:[
    'Buying multiple physical servers',
    'The act of creating a virtual version of something - e.g. running more than one OS on a single physical hardware',
    'A type of cloud service model',
    'Compressing files into smaller archives'
  ],
  answer:1,
  explanation:'Virtualization = creating a virtual version of something; running more than one OS on a single hardware.' },

{ id:'L1-029', lab:1, slide:16, topic:'os', type:'mcq',
  q:'An Operating System (OS) is best defined as:',
  options:[
    'The CPU\'s instruction set',
    'System software that manages computer hardware, software resources, and provides common services for programs',
    'A virtualization platform',
    'A package manager'
  ],
  answer:1,
  explanation:'OS = system software managing hardware/software resources and providing common services.' },

{ id:'L1-030', lab:1, slide:16, topic:'os', type:'mcq',
  q:'The KERNEL is best defined as:',
  options:[
    'The portion of OS code that is always resident in memory and facilitates interactions between hardware and software components',
    'The collection of installed applications',
    'The desktop window manager',
    'The CPU itself'
  ],
  answer:0,
  explanation:'Kernel = always-resident OS code; bridges hardware and software.' },

{ id:'L1-031', lab:1, slide:16, topic:'virt', type:'mcq',
  q:'A simple analogy of virtualization given in the slides is:',
  options:[
    'Splitting a single physical disk into two virtual disks',
    'Connecting two PCs via a cable',
    'Compressing a folder into a zip file',
    'Cloning a Git repository'
  ],
  answer:0,
  explanation:'Virtualization analogy: partition one physical disk into two virtual disks.' },

{ id:'L1-012', lab:1, slide:18, topic:'host-guest', type:'mcq',
  q:'In virtualization terminology, the physical real-world hardware is called the:',
  options:['guest','host','client','kernel'],
  answer:1,
  explanation:'Physical hardware = host. The VM running on it = guest.' },

{ id:'L1-013', lab:1, slide:24, topic:'host-guest', type:'mcq',
  q:'A virtual machine in this terminology is referred to as the:',
  options:['host','guest','daemon','runtime'],
  answer:1,
  explanation:'A VM is the guest; creating guests on a host requires a Hypervisor.' },

{ id:'L1-014', lab:1, slide:19, topic:'vm-def', type:'mcq',
  q:'Which best describes a Virtual Machine?',
  options:[
    'A physical computer wired to a network',
    'A tightly isolated software container that runs OSes and applications as if it were a physical computer',
    'A small kernel module that bypasses the OS',
    'A file format for backups'
  ],
  answer:1,
  explanation:'VM = tightly isolated software container running OSes/apps like a physical computer.' },

{ id:'L1-015', lab:1, slide:23, topic:'vm-vs-pm', type:'truefalse',
  q:'Compared to physical machines, VMs are easier to relocate because they are encapsulated into files and independent of the physical hardware.',
  bool:true,
  explanation:'VMs are easy to relocate - encapsulated into files, hardware-independent.' },

{ id:'L1-016', lab:1, slide:26, topic:'hypervisor', type:'mcq',
  q:'A Hypervisor (VMM) is software/firmware/hardware that:',
  options:[
    'Replaces the host OS entirely',
    'Encrypts data at rest only',
    'Creates and runs virtual machines, providing a layer between the hardware (host) and VMs (guests)',
    'Acts as a load balancer for HTTP traffic'
  ],
  answer:2,
  explanation:'Hypervisor (VMM) creates/runs VMs; layer between host hardware and guests.' },

{ id:'L1-017', lab:1, slide:28, topic:'type1', type:'mcq',
  q:'Type-1 (Bare-metal) hypervisors:',
  options:[
    'Require an existing OS to be installed first',
    'Run directly on system hardware - no OS required',
    'Are mainly used for home labs',
    'Cannot run in production data centers'
  ],
  answer:1,
  explanation:'Type-1 (Bare-metal) runs directly on hardware - no OS required. Best for production / data centers.' },

{ id:'L1-018', lab:1, slide:28, topic:'type1', type:'multi',
  q:'Which are examples of TYPE-1 (Bare-metal) hypervisors? (select all)',
  options:['VMware ESXi','Microsoft Hyper-V','Oracle VirtualBox','Xen','KVM'],
  answers:[0,1,3],
  explanation:'Type-1 examples: VMware ESXi, Microsoft Hyper-V, Xen.' },

{ id:'L1-019', lab:1, slide:29, topic:'type2', type:'multi',
  q:'Which are examples of TYPE-2 (Hosted) hypervisors? (select all)',
  options:['Oracle VirtualBox','VMware Workstation','VMware ESXi','Oracle Solaris Zones','VMware Fusion','KVM'],
  answers:[0,1,3,4,5],
  explanation:'Type-2 examples: Oracle VirtualBox, VMware Workstation, Oracle Solaris Zones, VMware Fusion, KVM.' },

{ id:'L1-020', lab:1, slide:29, topic:'type2', type:'truefalse',
  q:'Type-2 hypervisors rely on the host machine\'s OS for CPU, memory, disk and network calls.',
  bool:true,
  explanation:'Type-2 (Hosted) relies on the host OS for those operations - making it support a wide range of hardware.' },

{ id:'L1-021', lab:1, slide:30, topic:'cloud-hyper', type:'mcq',
  q:'A Cloud Hypervisor is:',
  options:[
    'A bare-metal Linux distribution',
    'A VM manager that lets you create/run/maintain VMs on a cloud-based platform hosted by a central server',
    'A type of container runtime',
    'A network firewall in the cloud'
  ],
  answer:1,
  explanation:'Cloud Hypervisor manages VMs on a cloud platform hosted by a central server.' },

{ id:'L1-022', lab:1, slide:31, topic:'vm-drawback', type:'multi',
  q:'Which are MAIN disadvantages of using VMs? (select all)',
  options:[
    'VMs are not as efficient at hardware access (Guest OS -> Hypervisor -> Host OS layers)',
    'Running multiple VMs on a single host can bring performance instability',
    'VMs cannot be relocated at all',
    'VMs require physical maintenance for each guest'
  ],
  answers:[0,1],
  explanation:'Main drawbacks: layered hardware access inefficiency, and instability with many VMs on one host.' },

{ id:'L1-023', lab:1, slide:32, topic:'vbox', type:'mcq',
  q:'In Lab 1 the recommended Type-2 Hypervisor for the demo is:',
  options:['VMware ESXi','Hyper-V','Oracle VM VirtualBox','KVM'],
  answer:2,
  explanation:'Lab 1 uses Oracle VM VirtualBox.' },

{ id:'L1-024', lab:1, slide:38, topic:'vdi', type:'mcq',
  q:'VDI (in VirtualBox) stands for?',
  options:['Virtual Drive Interface','Virtual Disk Image','Virtual Device Identifier','Variable Data Index'],
  answer:1,
  explanation:'VDI = Virtual Disk Image - the native VirtualBox format (recommended).' },

{ id:'L1-025', lab:1, slide:38, topic:'vhd', type:'mcq',
  q:'VHD is the native virtual disk format of:',
  options:['VirtualBox','Microsoft Virtual PC','VMware','KVM'],
  answer:1,
  explanation:'VHD = Virtual Hard Disk - native to Microsoft Virtual PC; also works on VirtualBox.' },

{ id:'L1-026', lab:1, slide:38, topic:'vmdk', type:'mcq',
  q:'VMDK was originally developed by:',
  options:['Microsoft','Red Hat','VMware','Oracle'],
  answer:2,
  explanation:'VMDK = Virtual Machine Disk - originally developed by VMware; also works on VirtualBox.' },

{ id:'L1-027', lab:1, slide:39, topic:'vbox-disk', type:'mcq',
  q:'When creating a new virtual hard disk in VirtualBox, the DEFAULT storage growth type is:',
  options:['Fixed size','Dynamically allocated','Differencing','Sparse-only'],
  answer:1,
  explanation:'Default is Dynamically allocated.' },

{ id:'L1-028', lab:1, slide:54, topic:'vm-files', type:'match',
  q:'Match each VirtualBox file/folder to its purpose.',
  pairs:[
    {l:'Logs/', r:'Logs for VM sessions, written by VirtualBox'},
    {l:'Snapshots/', r:'VM snapshots (filename = hash, not snapshot name)'},
    {l:'*.vbox', r:'VM details as shown in VirtualBox Manager'},
    {l:'*.vbox-prev', r:'Backup of the *.vbox file'},
    {l:'*.vdi', r:'Virtual hard drive contents'}
  ],
  explanation:'Standard files that make up a VM in VirtualBox.' },

// ==================== LAB 2 - Linux Essentials ====================
{ id:'L2-001', lab:2, slide:4, topic:'cli', type:'mcq',
  q:'CLI stands for?',
  options:['Command Local Interpreter','Common Library Interface','Command-Line Interface','Container Linux Init'],
  answer:2,
  explanation:'CLI = Command-Line Interface; text-based interface for typed commands.' },

{ id:'L2-002', lab:2, slide:5, topic:'syntax', type:'mcq',
  q:'The general Linux command syntax is:',
  options:[
    'argument [option(s)] command',
    'command [option(s)] [argument(s)]',
    'option command argument',
    'argument | command --option'
  ],
  answer:1,
  explanation:'Pattern: command [option(s)] [argument(s)].' },

{ id:'L2-003', lab:2, slide:7, topic:'options', type:'truefalse',
  q:'Combining options is allowed - "ls -rl" is equivalent to "ls -lr" or "ls -r -l".',
  bool:true,
  explanation:'Options can be combined and reordered, e.g. ls -rl == ls -lr == ls -r -l.' },

{ id:'L2-004', lab:2, slide:8, topic:'echo', type:'mcq',
  q:'Which command displays a line of text as standard output?',
  options:['print','say','echo','out'],
  answer:2,
  explanation:'echo displays text on standard output.' },

{ id:'L2-005', lab:2, slide:9, topic:'pwd', type:'fill',
  q:'Type the command that prints your current working directory.',
  accept:['pwd'],
  explanation:'pwd = print working directory.' },

{ id:'L2-006', lab:2, slide:10, topic:'cd', type:'mcq',
  q:'A path that begins with "/" is:',
  options:['A relative path','An absolute path','A symbolic link','A glob pattern'],
  answer:1,
  explanation:'Absolute paths start at the root directory and begin with /.' },

{ id:'L2-007', lab:2, slide:12, topic:'cd', type:'mcq',
  q:'Which shortcut moves you ONE directory up?',
  options:['cd ~','cd .','cd ..','cd -'],
  answer:2,
  explanation:'cd .. goes one directory up.' },

{ id:'L2-008', lab:2, slide:12, topic:'cd', type:'mcq',
  q:'Which shortcut returns you to your PREVIOUS directory (like Back)?',
  options:['cd ~','cd ..','cd -','cd /'],
  answer:2,
  explanation:'cd - moves to previous directory.' },

{ id:'L2-009', lab:2, slide:12, topic:'cd', type:'multi',
  q:'Which commands take you to the user\'s HOME directory? (select all)',
  options:['cd ~','cd home','cd','cd /home'],
  answers:[0,2],
  explanation:'cd ~ or just cd both go to the user home.' },

{ id:'L2-010', lab:2, slide:13, topic:'ls -l', type:'mcq',
  q:'In ls -l output, the leading character "d" means:',
  options:['Disabled file','Directory','Device file','Default permissions'],
  answer:1,
  explanation:'d = directory; - = regular file.' },

{ id:'L2-011', lab:2, slide:13, topic:'perms', type:'mcq',
  q:'The permission string "rw-rw-r--" gives:',
  options:[
    'Read/write to user, read/write to group, read-only to others',
    'Read/write/execute to all',
    'Read-only to all',
    'Execute-only to others'
  ],
  answer:0,
  explanation:'User rw, group rw, others read-only.' },

{ id:'L2-012', lab:2, slide:14, topic:'chmod', type:'mcq',
  q:'In symbolic chmod, the SET letter "a" means:',
  options:['admin','add','all (user, group, others)','any'],
  answer:2,
  explanation:'a = all (u + g + o).' },

{ id:'L2-013', lab:2, slide:14, topic:'chmod', type:'mcq',
  q:'Which symbolic chmod ACTION sets the EXACT permission (replacing existing)?',
  options:['+','-','=','*'],
  answer:2,
  explanation:'= sets the exact permission. + adds; - removes.' },

{ id:'L2-014', lab:2, slide:14, topic:'chmod', type:'fill',
  q:'Add execute permission for the user (owner) on hello.sh using SYMBOLIC chmod.',
  accept:['chmod u+x hello.sh','chmod  u+x hello.sh'],
  explanation:'chmod u+x hello.sh adds execute permission for the user.' },

{ id:'L2-015', lab:2, slide:15, topic:'chmod-octal', type:'mcq',
  q:'The octal mask 644 corresponds to which symbolic permissions?',
  options:['rwxr-xr-x','rw-r--r--','rwxrwxrwx','rw-r-x---'],
  answer:1,
  explanation:'644 = rw-r--r-- (user rw, group r, others r).' },

{ id:'L2-016', lab:2, slide:15, topic:'chmod-octal', type:'mcq',
  q:'The octal mask 755 corresponds to:',
  options:['rwxrwxrwx','rwxr-xr-x','rwxr-x---','rw-rw-rw-'],
  answer:1,
  explanation:'755 = rwxr-xr-x.' },

{ id:'L2-017', lab:2, slide:15, topic:'chmod-octal', type:'fill',
  q:'Set the permission of hello.sh to rwxr-x--- using OCTAL chmod.',
  accept:['chmod 750 hello.sh'],
  explanation:'rwxr-x--- = 750.' },

{ id:'L2-018', lab:2, slide:16, topic:'chown', type:'mcq',
  q:'Which command changes ownership of a file/directory?',
  options:['chmod','chgrp','chown','sudo'],
  answer:2,
  explanation:'chown owner[:group] file changes ownership.' },

{ id:'L2-019', lab:2, slide:17, topic:'sudo', type:'mcq',
  q:'sudo is short for:',
  options:['superuser do','set user data option','single user do once','superuser daemon'],
  answer:0,
  explanation:'sudo = superuser do. Lets you perform tasks requiring root permissions.' },

{ id:'L2-020', lab:2, slide:18, topic:'whoami', type:'predict',
  q:'After running these commands, what does the second one print?\n<pre>$ whoami\nsysadmin\n$ sudo whoami</pre>',
  options:['sysadmin','root','admin','an error'],
  answer:1,
  explanation:'sudo whoami runs whoami as root, so it prints "root".' },

{ id:'L2-021', lab:2, slide:19, topic:'cat', type:'mcq',
  q:'cat is short for:',
  options:['catalog','category','concatenate','category-add-tool'],
  answer:2,
  explanation:'cat = concatenate. Displays the entire contents of the file.' },

{ id:'L2-022', lab:2, slide:20, topic:'create-file', type:'mcq',
  q:'Which redirection symbol APPENDS to a file (vs overwriting)?',
  options:['>','>>','<','<<'],
  answer:1,
  explanation:'> overwrites the file content; >> appends to it.' },

{ id:'L2-023', lab:2, slide:20, topic:'touch', type:'fill',
  q:'Create an empty file named mynotes.txt using the appropriate command.',
  accept:['touch mynotes.txt'],
  explanation:'touch [OPTIONS] FILE creates an empty file.' },

{ id:'L2-024', lab:2, slide:22, topic:'cp', type:'fill',
  q:'Copy the entire Documents directory recursively to Desktop/Documents_backup.',
  accept:['cp -R Documents Desktop/Documents_backup','cp -r Documents Desktop/Documents_backup'],
  explanation:'cp -R (or -r) copies a directory recursively.' },

{ id:'L2-025', lab:2, slide:23, topic:'rm', type:'mcq',
  q:'Why does "rm Directory_backup" fail with "cannot remove ... Is a directory"?',
  options:[
    'Directories must be removed with rm -r',
    'You need sudo for any rm',
    'rm only works on hidden files',
    'You must move the directory first'
  ],
  answer:0,
  explanation:'rm by itself cannot remove directories - use rm -r (or rmdir for empty dirs).' },

{ id:'L2-026', lab:2, slide:24, topic:'mkdir', type:'fill',
  q:'Create the directory path my_directory/Test (creating parents if missing) in ONE command.',
  accept:['mkdir -p my_directory/Test'],
  explanation:'-p creates parent directories if not existing.' },

{ id:'L2-027', lab:2, slide:25, topic:'rmdir', type:'truefalse',
  q:'rmdir works only on EMPTY directories; non-empty ones must be removed with rm -r.',
  bool:true,
  explanation:'rmdir is for empty dirs. Non-empty: rm -r dir.' },

{ id:'L2-028', lab:2, slide:26, topic:'grep', type:'mcq',
  q:'In grep, the option -i:',
  options:['Inverts the match','Is case-insensitive','Includes line numbers','Counts matches only'],
  answer:1,
  explanation:'-i = case-insensitive search.' },

{ id:'L2-029', lab:2, slide:26, topic:'grep', type:'mcq',
  q:'The pattern \'^root\' in grep matches lines that:',
  options:['Contain the word root anywhere','START with "root"','END with "root"','Have root at character position 1 only if uppercase'],
  answer:1,
  explanation:'^ anchors the start of a line; ^root matches lines starting with "root".' },

{ id:'L2-030', lab:2, slide:27, topic:'ps', type:'mcq',
  q:'Which option of ps will display EVERY process?',
  options:['ps -a','ps -e','ps -p','ps -f'],
  answer:1,
  explanation:'ps -e displays every process.' },

{ id:'L2-031', lab:2, slide:27, topic:'ps', type:'match',
  q:'Match the ps column to its meaning.',
  pairs:[
    {l:'PID', r:'Unique process ID'},
    {l:'TTY', r:'Type of the terminal'},
    {l:'TIME', r:'Running time'},
    {l:'CMD', r:'Command that launches the process'}
  ],
  explanation:'PID, TTY, TIME, CMD as defined in slide 27.' },

{ id:'L2-032', lab:2, slide:28, topic:'ping', type:'mcq',
  q:'ping is used for:',
  options:[
    'Listing files',
    'Checking whether a network or a server is reachable',
    'Encrypting traffic',
    'Compiling C code'
  ],
  answer:1,
  explanation:'ping checks reachability of a host/IP using ICMP.' },

{ id:'L2-033', lab:2, slide:30, topic:'apt', type:'mcq',
  q:'apt-get is the front-end program to which Debian tool?',
  options:['rpm','dpkg','yum','snap'],
  answer:1,
  explanation:'apt-get (Advanced Package Tool) is a front-end to dpkg.' },

{ id:'L2-034', lab:2, slide:31, topic:'apt', type:'fill',
  q:'Refresh the list of available packages from the repositories.',
  accept:['sudo apt-get update','apt-get update','sudo apt update'],
  explanation:'apt-get update refreshes the package lists. sudo is required.' },

{ id:'L2-035', lab:2, slide:32, topic:'apt', type:'fill',
  q:'Search the apt cache for packages matching the keyword "nano".',
  accept:['apt-cache search nano'],
  explanation:'apt-cache search [keyword] searches available packages.' },

{ id:'L2-036', lab:2, slide:33, topic:'apt', type:'fill',
  q:'Install the package nano with apt-get.',
  accept:['sudo apt-get install nano','apt-get install nano','sudo apt install nano'],
  explanation:'sudo apt-get install [package] installs a package.' },

{ id:'L2-037', lab:2, slide:34, topic:'apt', type:'mcq',
  q:'To upgrade ALL packages and dependencies on the system you would run:',
  options:['sudo apt-get update','sudo apt-get install all','sudo apt-get upgrade','sudo apt-get refresh'],
  answer:2,
  explanation:'After apt-get update (refresh cache), apt-get upgrade upgrades all packages.' },

{ id:'L2-038', lab:2, slide:35, topic:'apt', type:'mcq',
  q:'What is the difference between apt-get remove and apt-get purge?',
  options:[
    'remove deletes config files; purge keeps them',
    'remove deletes all but the configuration files; purge deletes ALL package files',
    'They are identical',
    'purge only marks the package for removal'
  ],
  answer:1,
  explanation:'remove keeps config files; purge deletes ALL package files including config.' },

{ id:'L2-039', lab:2, slide:38, topic:'handson', type:'fill',
  q:'In one command, set permissions to 777 (rwx for all) for ALL files in the current directory.',
  accept:['chmod 777 *'],
  explanation:'chmod 777 * sets rwxrwxrwx on all files in the directory.' },

{ id:'L2-040', lab:2, slide:38, topic:'handson', type:'fill',
  q:'Write the text "Hello Cloud Computing Course!" into cloud.txt (overwrite contents).',
  accept:['echo "Hello Cloud Computing Course!" > cloud.txt'],
  explanation:'echo "..." > cloud.txt overwrites the file with the text.' },

{ id:'L2-041', lab:2, slide:7, topic:'ls', type:'mcq',
  q:'Which option of ls REVERSES the listing order?',
  options:['-r or --reverse','-l or --long','-h or --human','-a or --all'],
  answer:0,
  explanation:'-r or --reverse reverses the listing.' },

{ id:'L2-042', lab:2, slide:38, topic:'handson', type:'fill',
  q:'Delete the directory FCIS24 INCLUDING its contents.',
  accept:['rm -r FCIS24','rm -rf FCIS24'],
  explanation:'rm -r recursively removes the directory.' },

// ==================== LAB 3 - Bash Scripting ====================
{ id:'L3-001', lab:3, slide:3, topic:'shell', type:'mcq',
  q:'Which statement about Shell is correct?',
  options:[
    'Shell is the Linux kernel itself',
    'Shell is the OS',
    'Shell is an environment for the user to interact with the machine; uses the kernel to execute programs',
    'Shell only runs in graphical mode'
  ],
  answer:2,
  explanation:'Shell is NOT the OS / kernel. It interfaces with the OS and runs commands.' },

{ id:'L3-002', lab:3, slide:5, topic:'scripting', type:'mcq',
  q:'A shell script file should typically have which extension?',
  options:['.bsh','.sh','.shell','.bash-script'],
  answer:1,
  explanation:'Bash scripts use the .sh extension.' },

{ id:'L3-003', lab:3, slide:7, topic:'shells', type:'mcq',
  q:'Who developed the Bourne Shell (sh)?',
  options:['Bill Joy','Stephen Bourne','Linus Torvalds','Brian Kernighan'],
  answer:1,
  explanation:'Bourne Shell developed by Stephen Bourne.' },

{ id:'L3-004', lab:3, slide:8, topic:'shells', type:'mcq',
  q:'C Shell (csh) was developed by:',
  options:['Bill Joy','Stephen Bourne','Dennis Ritchie','Richard Stallman'],
  answer:0,
  explanation:'csh was developed by Bill Joy and modeled on the C language.' },

{ id:'L3-005', lab:3, slide:9, topic:'shells', type:'multi',
  q:'Bash uses which configuration files? (select all)',
  options:['~/.bashrc','~/.profile','~/.cshrc','~/.login'],
  answers:[0,1],
  explanation:'Bash configs: ~/.bashrc and ~/.profile. csh uses ~/.cshrc and ~/.login.' },

{ id:'L3-006', lab:3, slide:9, topic:'shells', type:'mcq',
  q:'Bash was developed for which project as a replacement for sh?',
  options:['BSD','GNU','POSIX','Linux Foundation'],
  answer:1,
  explanation:'Bash was developed for the GNU project as an sh replacement.' },

{ id:'L3-007', lab:3, slide:10, topic:'bash', type:'multi',
  q:'Bash is a:',
  options:['UNIX shell','Command interpreter','Programming language','Network protocol'],
  answers:[0,1,2],
  explanation:'Bash is a UNIX shell, a command interpreter AND a programming language.' },

{ id:'L3-008', lab:3, slide:11, topic:'shebang', type:'fill',
  q:'What is the standard FIRST line in a bash script (the "shebang")?',
  accept:['#!/bin/bash'],
  explanation:'#!/bin/bash tells the OS to execute the script with bash.' },

{ id:'L3-009', lab:3, slide:12, topic:'echo', type:'mcq',
  q:'Which echo flag interprets escape sequences such as \\n?',
  options:['-n','-e','-x','-i'],
  answer:1,
  explanation:'echo -e interprets escapes; -n suppresses the trailing newline.' },

{ id:'L3-010', lab:3, slide:12, topic:'echo', type:'mcq',
  q:'Which echo option suppresses the trailing newline?',
  options:['-n','-e','-c','-s'],
  answer:0,
  explanation:'echo -n outputs without a trailing newline.' },

{ id:'L3-011', lab:3, slide:13, topic:'comments', type:'predict',
  q:'What does this script print?\n<pre>#!/bin/bash\n# this is a single line comment in bash\necho First echo\n&lt;&lt;MY_COMMENT\n   This is a multiple line comment\n   In Bash Scripting\nMY_COMMENT\necho Second echo</pre>',
  options:['First echo / Second echo','First echo only','Second echo only','MY_COMMENT'],
  answer:0,
  explanation:'Single-line and heredoc comments are skipped; both echoes run.' },

{ id:'L3-012', lab:3, slide:15, topic:'vars', type:'truefalse',
  q:'In bash, you may put spaces around the equals sign when declaring a variable, e.g. "variable = value".',
  bool:false,
  explanation:'NO space allowed around = in variable assignment. variable=value is the only correct form.' },

{ id:'L3-013', lab:3, slide:15, topic:'vars', type:'truefalse',
  q:'Bash variable names are case-sensitive.',
  bool:true,
  explanation:'Variable names ARE case-sensitive in bash.' },

{ id:'L3-014', lab:3, slide:16, topic:'special', type:'match',
  q:'Match each special variable to its meaning.',
  pairs:[
    {l:'$0', r:'Filename of the current script'},
    {l:'$#', r:'Number of arguments supplied'},
    {l:'$?', r:'Exit status of the last command'},
    {l:'$$', r:'Process ID number'}
  ],
  explanation:'Special variables defined in slide 16.' },

{ id:'L3-015', lab:3, slide:16, topic:'special', type:'mcq',
  q:'Which special variable stores ALL received arguments as a STRING ARRAY (e.g. ("$1" "$2"))?',
  options:['$*','$@','$#','$?'],
  answer:1,
  explanation:'$@ stores arguments in a string array; $* stores them as a single string.' },

{ id:'L3-016', lab:3, slide:17, topic:'special', type:'predict',
  q:'For "./test.sh 10 15", what does this line print?\n<pre>echo "Total Number of Parameters : $#"</pre>',
  options:['Total Number of Parameters : 0','Total Number of Parameters : 1','Total Number of Parameters : 2','Total Number of Parameters : 10 15'],
  answer:2,
  explanation:'$# is the count of arguments; here 10 and 15 = 2.' },

{ id:'L3-017', lab:3, slide:17, topic:'exit-status', type:'mcq',
  q:'After a successfully executed command, "echo $?" usually prints:',
  options:['1','-1','0','127'],
  answer:2,
  explanation:'$? = exit status of the last command. Success conventionally returns 0.' },

{ id:'L3-018', lab:3, slide:18, topic:'arith-ops', type:'mcq',
  q:'Which operator returns the REMAINDER of integer division in bash?',
  options:['/','%','*','^'],
  answer:1,
  explanation:'% returns the remainder (modulo).' },

{ id:'L3-019', lab:3, slide:19, topic:'arith-expand', type:'predict',
  q:'What does this print?\n<pre>x=$((2 + 3))\necho $x</pre>',
  options:['2+3','5','23','undefined'],
  answer:1,
  explanation:'$(( )) performs integer arithmetic; 2+3 = 5.' },

{ id:'L3-020', lab:3, slide:21, topic:'cmd-sub', type:'mcq',
  q:'Which two syntaxes capture the OUTPUT of a command into a variable?',
  options:['$( COMMAND ) and `COMMAND`','#{ COMMAND } and ${COMMAND}','%[ COMMAND ] and %{COMMAND}','$[ COMMAND ] and ${COMMAND}'],
  answer:0,
  explanation:'$( COMMAND ) or backticks `COMMAND` perform command substitution.' },

{ id:'L3-021', lab:3, slide:22, topic:'bc', type:'fill',
  q:'Add 15.5 + 40 with floating-point precision using bc and store in $add.',
  accept:['add=$(echo "15.5+40" | bc)','add=$(echo "15.5 + 40" | bc)'],
  explanation:'Use bc for floating point: add=$(echo "15.5+40" | bc).' },

{ id:'L3-022', lab:3, slide:23, topic:'pipes', type:'mcq',
  q:'A pipe (|) does what?',
  options:[
    'Runs commands in the background',
    'Passes the output of one command (stdout) as input to the next (stdin)',
    'Schedules a command at fixed times',
    'Compresses output'
  ],
  answer:1,
  explanation:'Pipes feed stdout of one command as stdin of another.' },

{ id:'L3-023', lab:3, slide:24, topic:'date', type:'predict',
  q:'What does this print on Friday March 3, 2023?\n<pre>d=$(date \'+%A %d-%B, %Y\')\necho $d</pre>',
  options:['03-03-2023','Friday 03-March, 2023','Mar 3, 2023','03-2023'],
  answer:1,
  explanation:'%A full weekday + %d day + %B full month + %Y year &rarr; "Friday 03-March, 2023".' },

{ id:'L3-024', lab:3, slide:25, topic:'date', type:'match',
  q:'Match the date format option to what it produces.',
  pairs:[
    {l:'%a', r:'Short weekday (Mon)'},
    {l:'%A', r:'Full weekday (Monday)'},
    {l:'%b', r:'Short month (Jan)'},
    {l:'%B', r:'Full month (January)'}
  ],
  explanation:'Date format options as in slide 25.' },

{ id:'L3-025', lab:3, slide:35, topic:'rel-ops', type:'mcq',
  q:'Which relational operator means "less than" in bash test brackets?',
  options:['-lt','-le','-gt','-ne'],
  answer:0,
  explanation:'-lt means less than. -le less or equal, -gt greater than, -ne not equal.' },

{ id:'L3-026', lab:3, slide:35, topic:'string-ops', type:'mcq',
  q:'In bash test brackets, which option returns true if the string length is ZERO?',
  options:['-n','-z','-f','-x'],
  answer:1,
  explanation:'-z true if zero length; -n true if non-zero length.' },

{ id:'L3-027', lab:3, slide:35, topic:'file-test', type:'mcq',
  q:'In bash, the file-test operator -f returns true when:',
  options:['The path is a directory','The file is executable','The file exists (and is a regular file)','The file is empty'],
  answer:2,
  explanation:'-f returns true if the file exists.' },

{ id:'L3-028', lab:3, slide:36, topic:'if', type:'fill',
  q:'Complete the if/elif/else skeleton: if [ expression ]; then ... ___ [[ expression ]]; then ... else ... fi',
  accept:['elif'],
  explanation:'else if in bash is "elif".' },

{ id:'L3-029', lab:3, slide:37, topic:'if', type:'predict',
  q:'What does this print?\n<pre>n=2\nif [ $n -eq 1 ]; then\n  echo value of n is 1\nelif [[ $n -eq 2 && $n -lt 5 ]]; then\n  echo value of n is less than threshold\nfi</pre>',
  options:['value of n is 1','value of n is less than threshold','nothing','syntax error'],
  answer:1,
  explanation:'n=2 satisfies the elif: -eq 2 AND -lt 5.' },

{ id:'L3-030', lab:3, slide:38, topic:'case', type:'fill',
  q:'A bash case statement opens with "case EXPRESSION in" and closes with which keyword?',
  accept:['esac'],
  explanation:'case ... esac (case spelled backwards).' },

{ id:'L3-031', lab:3, slide:39, topic:'case', type:'predict',
  q:'What does this print?\n<pre>time=15\ncase $time in\n  9)  echo Good Morning! ;;\n  21) echo Good Night! ;;\n  *)  echo Good Day! ;;\nesac</pre>',
  options:['Good Morning!','Good Night!','Good Day!','nothing'],
  answer:2,
  explanation:'No case matches 15; the default *) prints "Good Day!".' },

{ id:'L3-032', lab:3, slide:40, topic:'for', type:'predict',
  q:'What does this print?\n<pre>arr=("bash" "shell" "script")\nfor i in "${arr[@]}"; do echo $i; done</pre>',
  options:['bash shell script (one line)','bash / shell / script on three lines','3','only "bash"'],
  answer:1,
  explanation:'For-each over array prints each element on its own line.' },

{ id:'L3-033', lab:3, slide:41, topic:'for', type:'truefalse',
  q:'Bash for loop treats whitespace in a string as word separators by default.',
  bool:true,
  explanation:'Whitespace separates words; for i in $str iterates word-by-word.' },

{ id:'L3-034', lab:3, slide:42, topic:'for', type:'fill',
  q:'Iterate i over the sequence 1..10 using seq.',
  accept:['for i in $(seq 1 10)','for i in $(seq 1 10); do'],
  explanation:'for i in $(seq 1 10) iterates over the sequence.' },

{ id:'L3-035', lab:3, slide:44, topic:'for-break', type:'predict',
  q:'What does this print?\n<pre>arr=("apple" "orange" "lemon" "banana")\nfor i in "${arr[@]}"; do\n  echo $i\n  if [ $i == "lemon" ]; then break; fi\ndone</pre>',
  options:['apple / orange / lemon','apple / orange / lemon / banana','only banana','only apple'],
  answer:0,
  explanation:'break exits the loop right after printing "lemon".' },

{ id:'L3-036', lab:3, slide:45, topic:'while', type:'predict',
  q:'What does this print (each on its own line)?\n<pre>count=10; i=0\nwhile [ $i -lt $count ]; do\n  echo "$i"\n  i=$((i + 1))\ndone</pre>',
  options:['0..9 (ten numbers)','1..10','0..10','Empty'],
  answer:0,
  explanation:'Loop runs while i < 10 starting from 0; prints 0..9.' },

{ id:'L3-037', lab:3, slide:46, topic:'while', type:'fill',
  q:'Combine multiple conditions in a while loop using which test brackets?',
  accept:['[[','[[ ]]','[[ expression ]]'],
  explanation:'Use [[ expression ]] for compound conditions like [[ $a -lt 10 && $b -lt 4 ]].' },

{ id:'L3-038', lab:3, slide:47, topic:'until', type:'mcq',
  q:'A bash until loop continues UNTIL the expression becomes:',
  options:['false','true','non-zero','zero'],
  answer:1,
  explanation:'until executes statements UNTIL the expression evaluates to TRUE.' },

{ id:'L3-039', lab:3, slide:48, topic:'fn', type:'multi',
  q:'Which are valid bash function definition syntaxes? (select all)',
  options:['function name { ... }','name () { ... }','def name(): ...','func name : ...'],
  answers:[0,1],
  explanation:'Two valid forms: "function name { ... }" or "name () { ... }".' },

{ id:'L3-040', lab:3, slide:48, topic:'fn', type:'truefalse',
  q:'A bash function must be DEFINED before it is used in the script.',
  bool:true,
  explanation:'Define before calling - bash reads top-down.' },

{ id:'L3-041', lab:3, slide:48, topic:'fn-args', type:'mcq',
  q:'Inside a bash function, the second argument is referenced as:',
  options:['$arg2','$2','arg[1]','args(2)'],
  answer:1,
  explanation:'Function args use $1, $2, ... like script args.' },

{ id:'L3-042', lab:3, slide:51, topic:'fn-local', type:'predict',
  q:'What does this print?\n<pre>SHELL="Unix"\nfunction bashShell {\n  local SHELL="Bash"\n  echo $SHELL\n}\necho $SHELL\nbashShell\necho $SHELL</pre>',
  options:['Bash / Bash / Bash','Unix / Bash / Unix','Unix / Unix / Unix','Bash / Unix / Bash'],
  answer:1,
  explanation:'local scopes SHELL inside the function; outside it stays "Unix".' },

{ id:'L3-043', lab:3, slide:53, topic:'handson1', type:'mcq',
  q:'In Lab 3 Q1, if no parameter is supplied to the reverse-number script, the script should:',
  options:[
    'Use 0 as a default',
    'Display an error message saying to retry with one parameter',
    'Loop forever',
    'Reverse 1 by default'
  ],
  answer:1,
  explanation:'Q1 requires showing an error if no input is given.' },

{ id:'L3-044', lab:3, slide:54, topic:'handson1', type:'fill',
  q:'In the reverse-number script, the test for "exactly one argument supplied" looks like: if [ $# ___ 1 ]; then',
  accept:['-eq'],
  explanation:'Exactly one argument: $# -eq 1.' },

{ id:'L3-045', lab:3, slide:55, topic:'handson2', type:'multi',
  q:'In Lab 3 Q2, a STRONG password must satisfy which conditions? (select all)',
  options:[
    'Length at least 8 characters',
    'Contains a digit (0-9)',
    'Contains an UPPER-case letter',
    'Contains a LOWER-case letter',
    'Contains an emoji'
  ],
  answers:[0,1,2,3],
  explanation:'Q2 strong password: length >= 8, includes digit, upper-case, lower-case.' },

{ id:'L3-046', lab:3, slide:56, topic:'handson2', type:'fill',
  q:'Inside the password script, the length of variable password is computed as len="___"',
  accept:['${#password}'],
  explanation:'${#var} returns the length of the string in var.' },

{ id:'L3-047', lab:3, slide:14, topic:'arrays', type:'predict',
  q:'What does this print?\n<pre>arr=("bash" "shell" "script")\necho "${arr[0]} ${arr[1]}"</pre>',
  options:['bash shell','bash shell script','arr[0] arr[1]','shell script'],
  answer:0,
  explanation:'${arr[0]} = bash, ${arr[1]} = shell.' },

{ id:'L3-048', lab:3, slide:43, topic:'array-len', type:'fill',
  q:'How do you get the LENGTH of bash array arr?',
  accept:['${#arr[@]}'],
  explanation:'${#arr[@]} returns the number of elements in arr.' },

// ==================== LAB 4 - Docker Intro ====================
{ id:'L4-001', lab:4, slide:5, topic:'problem', type:'mcq',
  q:'In Lab 4\'s scenario, three Python apps need different Python versions. The PROBLEM with one server is:',
  options:[
    'Different Python versions cannot all be cleanly installed on the same machine',
    'Python is too slow',
    'The server lacks RAM',
    'Python is not supported on Linux'
  ],
  answer:0,
  explanation:'You cannot have different versions of Python installed cleanly on the same machine.' },

{ id:'L4-002', lab:4, slide:7, topic:'vm-soln', type:'mcq',
  q:'Solution 2 uses VMs - what is the main downside vs containers?',
  options:[
    'VMs cannot run multiple OSes',
    'Each VM bundles a full guest OS, so it is heavy',
    'VMs cannot be paused',
    'VMs can\'t mount network shares'
  ],
  answer:1,
  explanation:'Each VM has its own OS - very heavy compared to containers that share the kernel.' },

{ id:'L4-003', lab:4, slide:9, topic:'runtime', type:'multi',
  q:'Which are container RUNTIMES mentioned in Lab 4? (select all)',
  options:['Docker','runC','containerd','Windows Containers','VMware ESXi'],
  answers:[0,1,2,3],
  explanation:'Container runtime examples: Docker, runC, containerd, Windows Containers.' },

{ id:'L4-004', lab:4, slide:10, topic:'containers', type:'multi',
  q:'Which statements about CONTAINERS are correct? (select all)',
  options:[
    'Provide standardized packaging for software and dependencies',
    'Isolate apps from each other',
    'Share the same OS kernel',
    'Are created from an image',
    'Each contains its own kernel'
  ],
  answers:[0,1,2,3],
  explanation:'Containers share the OS kernel; do NOT include their own kernel.' },

{ id:'L4-005', lab:4, slide:11, topic:'docker', type:'mcq',
  q:'Docker was developed using which programming language?',
  options:['Python','Java','Go','C++'],
  answer:2,
  explanation:'Docker was developed in Go.' },

{ id:'L4-006', lab:4, slide:12, topic:'why', type:'mcq',
  q:'Which is a key REASON to use Docker?',
  options:[
    'Eliminate "works on my machine" problems',
    'Replace operating systems',
    'Provide better-than-VM hardware emulation',
    'Run Windows applications natively on macOS'
  ],
  answer:0,
  explanation:'Docker eliminates "works on my machine" issues with consistent environments.' },

{ id:'L4-007', lab:4, slide:16, topic:'engine', type:'multi',
  q:'The Docker Engine has THREE main components - which? (select all)',
  options:['Server','REST API','Client','Hypervisor','Compiler'],
  answers:[0,1,2],
  explanation:'Docker Engine = Server (daemon) + REST API + Client.' },

{ id:'L4-008', lab:4, slide:17, topic:'engine', type:'mcq',
  q:'The Docker Server runs a daemon known as:',
  options:['containerd','dockerd','sshd','httpd'],
  answer:1,
  explanation:'The Docker daemon is dockerd.' },

{ id:'L4-009', lab:4, slide:17, topic:'engine', type:'mcq',
  q:'The role of the Docker REST API is to:',
  options:[
    'Run containers directly',
    'Specify how applications interact with and instruct the Server',
    'Store image files',
    'Sign certificates'
  ],
  answer:1,
  explanation:'REST API specifies how applications interact with and instruct the Server.' },

{ id:'L4-010', lab:4, slide:21, topic:'pros', type:'multi',
  q:'Which are listed ADVANTAGES of using Docker? (select all)',
  options:['Storage Optimized','Robustness','Application isolation','High scalability','Infrastructure independent','Multi-OS guests on same host'],
  answers:[0,1,2,3,4],
  explanation:'All listed except multi-OS guests; Docker requires shared OS family.' },

{ id:'L4-011', lab:4, slide:22, topic:'cons', type:'truefalse',
  q:'Apps with different OS requirements cannot be hosted together on the same Docker Host.',
  bool:true,
  explanation:'Containers share the host kernel; you cannot mix Linux and Windows kernel apps on one Docker host.' },

{ id:'L4-012', lab:4, slide:23, topic:'cli', type:'mcq',
  q:'The Docker command-line structure is:',
  options:['docker option command','docker [option(s)] <command>','docker <command> [option(s)]','docker --command argument'],
  answer:2,
  explanation:'Format: docker <command> [option(s)].' },

{ id:'L4-013', lab:4, slide:24, topic:'version', type:'mcq',
  q:'Which command verifies Docker is working and shows CLI + server versions?',
  options:['docker about','docker ping','docker version','docker show'],
  answer:2,
  explanation:'docker version checks CLI and server versions.' },

{ id:'L4-014', lab:4, slide:26, topic:'info', type:'mcq',
  q:'Which command shows MOST configuration values of the engine?',
  options:['docker conf','docker info','docker engine','docker stats'],
  answer:1,
  explanation:'docker info shows engine configuration values.' },

{ id:'L4-015', lab:4, slide:27, topic:'mgmt', type:'truefalse',
  q:'In 2017 Docker introduced "management commands" to better organize the long list of CLI commands.',
  bool:true,
  explanation:'Docker added management commands (e.g. docker container, docker image) to better organize commands.' },

{ id:'L4-016', lab:4, slide:28, topic:'mgmt', type:'match',
  q:'Match the OLD form to the new MANAGEMENT command form.',
  pairs:[
    {l:'docker run', r:'docker container run'},
    {l:'docker build', r:'docker image build'},
    {l:'docker ps', r:'docker container ls'}
  ],
  explanation:'Modern management form: docker <command> <sub-command>.' },

{ id:'L4-017', lab:4, slide:29, topic:'image', type:'multi',
  q:'A Docker IMAGE typically contains: (select all)',
  options:['Application binaries','A cut-down OS','Runtime environment (Node, Python, Java)','Third-party libraries','Environment variables','The host kernel'],
  answers:[0,1,2,3,4],
  explanation:'Image bundles app + cut-down OS + runtime + libs + env vars + dependencies. NOT the host kernel.' },

{ id:'L4-018', lab:4, slide:30, topic:'container', type:'mcq',
  q:'A Docker CONTAINER is best defined as:',
  options:[
    'A read-only blueprint',
    'An instance of a docker image running as a process',
    'A registry server',
    'A hypervisor'
  ],
  answer:1,
  explanation:'Container = running instance of an image as a process.' },

{ id:'L4-019', lab:4, slide:30, topic:'container', type:'truefalse',
  q:'Many containers can be running at the same time from the same image.',
  bool:true,
  explanation:'You can have many containers running off the same image.' },

{ id:'L4-020', lab:4, slide:31, topic:'hub', type:'mcq',
  q:'Docker Hub is:',
  options:[
    'A type of container runtime',
    'Docker\'s default image registry / official online repository',
    'A networking driver',
    'A configuration file'
  ],
  answer:1,
  explanation:'Docker Hub is the default registry / official online repo for Docker images.' },

{ id:'L4-021', lab:4, slide:34, topic:'demo', type:'predict',
  q:'What does this command do?\n<pre>docker container run --publish 80:80 nginx</pre>',
  options:[
    'Stops a running nginx container',
    'Downloads nginx (if not local), starts a new container, opens host port 80, routes traffic to container port 80',
    'Builds an image from a Dockerfile',
    'Pulls a backup of nginx logs'
  ],
  answer:1,
  explanation:'Pull-if-needed, run, expose host:80 -> container:80.' },

{ id:'L4-022', lab:4, slide:18, topic:'arch', type:'mcq',
  q:'Compared to VMs, containers in Docker:',
  options:[
    'Each include their own kernel',
    'Share the host\'s OS kernel via processes',
    'Always require a hypervisor',
    'Cannot be isolated'
  ],
  answer:1,
  explanation:'Containers share the OS kernel via processes - that is the core architectural difference vs VMs.' },

{ id:'L4-023', lab:4, slide:19, topic:'arch-os', type:'mcq',
  q:'Docker for Windows can run Linux containers via:',
  options:['Cygwin','WSL or a Linux VM','PowerShell','Wine'],
  answer:1,
  explanation:'On Windows, Docker uses WSL or a Linux VM to run Linux containers.' },

{ id:'L4-024', lab:4, slide:11, topic:'docker-def', type:'mcq',
  q:'Per Lab 4, Docker virtualizes:',
  options:['The host hardware','The OS of the host on which it is installed','The TCP/IP stack','The network only'],
  answer:1,
  explanation:'Docker virtualizes the host operating system.' },

{ id:'L4-025', lab:4, slide:14, topic:'compare', type:'mcq',
  q:'In the comparison of the 3 solutions, the BEST trade-off (lightweight, isolated, scalable) is:',
  options:['Multiple physical machines','Multiple VMs on one host','Docker containers on one host','None - they are equivalent'],
  answer:2,
  explanation:'Docker containers on one host give the best mix of efficiency and isolation.' },

{ id:'L4-026', lab:4, slide:30, topic:'image-vs-container', type:'mcq',
  q:'The relationship between Image and Container is best described as:',
  options:[
    'Image is a process; container is a file',
    'Image is a template/blueprint; container is a running instance of an image',
    'They are the same thing',
    'Container is a registry; image is a network'
  ],
  answer:1,
  explanation:'Image = template; Container = running instance of an image.' },

// ==================== LAB 5 - Container Lifecycle ====================
{ id:'L5-001', lab:5, slide:5, topic:'run-flow', type:'mcq',
  q:'When you run "docker container run nginx", Docker FIRST looks for the image:',
  options:['On Docker Hub','In the local image cache','In the running container','In etcd'],
  answer:1,
  explanation:'Run looks in the local image cache first; only pulls from Hub if not found.' },

{ id:'L5-002', lab:5, slide:5, topic:'run-flow', type:'truefalse',
  q:'docker container run starts the container by using the CMD specified in the image\'s Dockerfile.',
  bool:true,
  explanation:'After creating the container, Docker starts it using the Dockerfile CMD.' },

{ id:'L5-003', lab:5, slide:6, topic:'pull', type:'mcq',
  q:'docker image pull <image-name> will:',
  options:[
    'Always download the image, even if it exists locally',
    'Only download if the image does NOT exist locally',
    'Delete the image after downloading',
    'Push the image to Docker Hub'
  ],
  answer:1,
  explanation:'pull only downloads if the image is not already present.' },

{ id:'L5-004', lab:5, slide:8, topic:'startstop', type:'mcq',
  q:'Which command STARTS one or more stopped containers?',
  options:['docker container resume','docker container start','docker container up','docker container init'],
  answer:1,
  explanation:'docker container start <name|id> starts stopped containers.' },

{ id:'L5-005', lab:5, slide:9, topic:'ls', type:'mcq',
  q:'docker container ls (without flags) shows:',
  options:['All containers (running + stopped)','Only running containers','Only stopped containers','Only paused containers'],
  answer:1,
  explanation:'ls = running containers; use -a to see ALL.' },

{ id:'L5-006', lab:5, slide:12, topic:'ls-a', type:'fill',
  q:'List ALL containers (running and stopped).',
  accept:['docker container ls -a','docker container ls --all','docker ps -a'],
  explanation:'docker container ls -a shows all containers; -a == --all.' },

{ id:'L5-007', lab:5, slide:9, topic:'rm', type:'mcq',
  q:'To FORCE remove a running container, you use:',
  options:['docker container rm','docker container rm -f','docker container kill','docker stop -f'],
  answer:1,
  explanation:'rm -f forcibly removes a running container.' },

{ id:'L5-008', lab:5, slide:10, topic:'inspect-stats', type:'match',
  q:'Match each command to its purpose.',
  pairs:[
    {l:'docker container top', r:'Display the running processes of a container'},
    {l:'docker container inspect', r:'Display detailed configuration info'},
    {l:'docker container stats', r:'Live stream of container resource usage'}
  ],
  explanation:'top, inspect, stats - per slide 10.' },

{ id:'L5-009', lab:5, slide:12, topic:'flag-d', type:'mcq',
  q:'The flag "-d" (or "--detach") on docker run does what?',
  options:[
    'Deletes the container after it exits',
    'Runs the container in the background',
    'Drops privileges',
    'Disables networking'
  ],
  answer:1,
  explanation:'-d/--detach runs the container in the background.' },

{ id:'L5-010', lab:5, slide:12, topic:'port-format', type:'mcq',
  q:'In "-p 8080:80", which side is the HOST port?',
  options:['Right (80)','Left (8080)','Both','Neither - they\'re container only'],
  answer:1,
  explanation:'Format is HOST:CONTAINER, so 8080 is the host port.' },

{ id:'L5-011', lab:5, slide:12, topic:'run-detached', type:'command',
  q:'Run nginx detached, mapping host port 8080 to container port 80.',
  cmd:'docker container run -d -p 8080:80 nginx',
  explanation:'docker container run -d -p 8080:80 nginx (flag order can vary).' },

{ id:'L5-012', lab:5, slide:13, topic:'-it', type:'multi',
  q:'In "-it" passed to docker run, what does each letter mean? (select all that apply)',
  options:[
    '-i = interactive (keeps session open to receive terminal input)',
    '-t = pseudo-tty (simulates a real terminal, like SSH)',
    '-i = ignore signals',
    '-t = tag the image'
  ],
  answers:[0,1],
  explanation:'-i interactive, -t pseudo-tty.' },

{ id:'L5-013', lab:5, slide:13, topic:'exec', type:'mcq',
  q:'Which command runs an additional command in an EXISTING container interactively?',
  options:['docker container run -it','docker container exec -it','docker container start -it','docker container attach'],
  answer:1,
  explanation:'docker container exec -it runs another command in an existing container.' },

{ id:'L5-014', lab:5, slide:15, topic:'run-bash', type:'command',
  q:'Start a NEW container interactively named "webserver" from the nginx image, running bash.',
  cmd:'docker container run -it --name webserver nginx bash',
  explanation:'docker container run -it --name webserver nginx bash.' },

{ id:'L5-015', lab:5, slide:15, topic:'env', type:'command',
  q:'Run mysql detached, name "db", publish 3306, set env MYSQL_RANDOM_ROOT_PASSWORD=yes.',
  cmd:'docker container run -d -p 3306:3306 --name db -e MYSQL_RANDOM_ROOT_PASSWORD=yes mysql',
  explanation:'-d detached, -p host:container, --name db, -e KEY=VAL for env vars.' },

{ id:'L5-016', lab:5, slide:18, topic:'logs', type:'fill',
  q:'View the logs of the "db" container, filtering for "root password" (case-insensitive).',
  accept:['docker container logs db | grep -i "root password"','docker container logs db | grep -i \'root password\'','docker logs db | grep -i "root password"'],
  explanation:'Use docker container logs <name> | grep -i ... to find the random root password.' },

{ id:'L5-017', lab:5, slide:18, topic:'handson', type:'command',
  q:'Run httpd detached, name "webserver", host port 8080 mapped to container port 80.',
  cmd:'docker container run -d --name webserver -p 8080:80 httpd',
  explanation:'docker container run -d --name webserver -p 8080:80 httpd.' },

{ id:'L5-018', lab:5, slide:18, topic:'handson', type:'command',
  q:'Run nginx as the proxy: detached, name "proxy", publish host 80 to container 80.',
  cmd:'docker container run --publish 80:80 -d --name proxy nginx',
  explanation:'docker container run --publish 80:80 -d --name proxy nginx (publish == -p).' },

{ id:'L5-019', lab:5, slide:18, topic:'cleanup', type:'truefalse',
  q:'Both docker container stop and rm can accept multiple names or IDs at once.',
  bool:true,
  explanation:'You can stop / rm multiple containers in one command.' },

{ id:'L5-020', lab:5, slide:18, topic:'cleanup', type:'fill',
  q:'Stop the three containers webserver, proxy, db in one command.',
  accept:['docker container stop webserver proxy db','docker stop webserver proxy db'],
  explanation:'docker container stop <name1> <name2> <name3>.' },

// from Lab 5 markdown - persistence
{ id:'L5-021', lab:5, slide:0, topic:'mysql-md', type:'fill',
  q:'Pull the MySQL 8 image from Docker Hub.',
  accept:['docker pull mysql:8'],
  explanation:'docker pull mysql:8 fetches the MySQL 8 image.' },

{ id:'L5-022', lab:5, slide:0, topic:'mysql-md', type:'command',
  q:'Run a MySQL container detached, name "mysql-demo", set MYSQL_ROOT_PASSWORD=rootpass, publish 3306.',
  cmd:'docker run -d --name mysql-demo -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 mysql:8',
  explanation:'docker run -d --name mysql-demo -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 mysql:8.' },

{ id:'L5-023', lab:5, slide:0, topic:'mysql-md', type:'fill',
  q:'Open an interactive bash shell INSIDE the running mysql-demo container.',
  accept:['docker exec -it mysql-demo bash'],
  explanation:'docker exec -it mysql-demo bash gives you a shell inside the container.' },

{ id:'L5-024', lab:5, slide:0, topic:'mysql-md', type:'mcq',
  q:'Why does the MySQL "demo" database disappear after removing the container and starting a fresh one (without volumes)?',
  options:[
    'MySQL deletes its tables on shutdown',
    'Docker Hub forces a wipe',
    'Containers are EPHEMERAL - the writable layer is destroyed when the container is removed',
    'The data was stored in /tmp'
  ],
  answer:2,
  explanation:'Containers are ephemeral; container filesystem is deleted on rm. Use a volume for persistence.' },

{ id:'L5-025', lab:5, slide:0, topic:'mysql-md', type:'fill',
  q:'Create a docker volume named "mysql-data".',
  accept:['docker volume create mysql-data'],
  explanation:'docker volume create <name> creates a managed volume.' },

{ id:'L5-026', lab:5, slide:0, topic:'mysql-md', type:'command',
  q:'Run the same mysql-demo container as before BUT mount the named volume "mysql-data" to /var/lib/mysql.',
  cmd:'docker run -d --name mysql-demo -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 -v mysql-data:/var/lib/mysql mysql:8',
  explanation:'-v mysql-data:/var/lib/mysql persists the MySQL data directory.' },

{ id:'L5-027', lab:5, slide:0, topic:'mysql-md', type:'mcq',
  q:'Which directory inside the MySQL container holds its data files?',
  options:['/etc/mysql','/var/lib/mysql','/var/log/mysql','/usr/local/mysql/data'],
  answer:1,
  explanation:'/var/lib/mysql is the MySQL data directory.' },

{ id:'L5-028', lab:5, slide:0, topic:'mysql-md', type:'fill',
  q:'Run phpMyAdmin in the background, mapping host port 8080 to container port 80.',
  accept:['docker run -d -p 8080:80 phpmyadmin/phpmyadmin'],
  explanation:'docker run -d -p 8080:80 phpmyadmin/phpmyadmin gives a CRUD UI.' },

{ id:'L5-029', lab:5, slide:0, topic:'mysql-md', type:'mcq',
  q:'In the connection example "host: mysql-demo, user: root, password: rootpass", what does "mysql-demo" refer to?',
  options:['The DB name','The container name (used as a hostname)','The MySQL version','The host machine\'s name'],
  answer:1,
  explanation:'On a custom network, the container name acts as DNS hostname.' },

{ id:'L5-030', lab:5, slide:5, topic:'run-flow', type:'mcq',
  q:'Where does docker get the image from when not found locally?',
  options:['Local cache','Docker Hub (default remote registry)','Local FTP','/var/cache/docker'],
  answer:1,
  explanation:'Default remote registry is Docker Hub; e.g. nginx:latest is pulled from there.' },

{ id:'L5-031', lab:5, slide:5, topic:'run-flow', type:'mcq',
  q:'Each newly created container gets:',
  options:[
    'A virtual IP on a private network inside the docker engine',
    'A public internet IP automatically',
    'No network at all',
    'Only an IPv6 link-local address'
  ],
  answer:0,
  explanation:'Container gets a virtual IP on a private network inside the docker engine.' },

{ id:'L5-032', lab:5, slide:13, topic:'-it', type:'mcq',
  q:'Which is most analogous to "-t" pseudo-tty in docker run?',
  options:['SCP','SSH terminal','Cron','tar'],
  answer:1,
  explanation:'Pseudo-tty simulates a real terminal, like what SSH does.' },

{ id:'L5-033', lab:5, slide:15, topic:'naming', type:'truefalse',
  q:'If you don\'t specify --name, Docker generates a random name for the container.',
  bool:true,
  explanation:'Container names must be unique; without --name Docker auto-generates one.' },

{ id:'L5-034', lab:5, slide:0, topic:'mysql-md', type:'mcq',
  q:'In the markdown architecture diagram (Application → 3306 → Docker Host → Container → Volume), what is the role of the Volume?',
  options:['Hold container metadata','Provide persistent storage outside the container lifecycle','Route network traffic','Sign mysql packets'],
  answer:1,
  explanation:'The volume is persistent storage independent of the container lifecycle.' },

{ id:'L5-035', lab:5, slide:0, topic:'mysql-md', type:'multi',
  q:'In "docker run -d --name mysql-demo -e MYSQL_ROOT_PASSWORD=rootpass -p 3306:3306 mysql:8", what do these mean?',
  options:[
    '-d = detached mode',
    '--name = container name',
    '-e = environment variable',
    '-p 3306:3306 = expose container port to host',
    '-v = volume mount'
  ],
  answers:[0,1,2,3],
  explanation:'-d detached, --name name, -e env var, -p host:container port mapping. There is no -v in the command.' },

{ id:'L5-036', lab:5, slide:0, topic:'mysql-md', type:'fill',
  q:'Inspect the container "mysql-demo" and PRINT its IPAddress only (using a Go template).',
  accept:["docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' mysql-demo"],
  explanation:'Exact one-liner from the markdown: docker inspect -f \'{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}\' mysql-demo.' },

{ id:'L5-037', lab:5, slide:12, topic:'-it', type:'truefalse',
  q:'Without the -it flags, "docker run ... bash" will start, exit immediately, and you won\'t get a shell.',
  bool:true,
  explanation:'You need -i (input) and -t (tty) to keep an interactive shell session open.' },

{ id:'L5-038', lab:5, slide:9, topic:'rm', type:'fill',
  q:'Remove the containers webserver, proxy, db (already stopped) in one command.',
  accept:['docker container rm webserver proxy db','docker rm webserver proxy db'],
  explanation:'docker container rm accepts multiple names/IDs.' },

// ==================== LAB 6 - Networks & Volumes ====================
{ id:'L6-001', lab:6, slide:5, topic:'why-net', type:'mcq',
  q:'Why does Docker provide its own networking?',
  options:[
    'To allow containers to communicate with each other and with external systems while providing isolation',
    'To replace the host TCP/IP stack',
    'To install firewalls automatically',
    'To make containers slower'
  ],
  answer:0,
  explanation:'Docker networking enables container-to-container and container-to-external communication with isolation.' },

{ id:'L6-002', lab:6, slide:5, topic:'multi-net', type:'truefalse',
  q:'A single container can be added to MORE THAN ONE Docker network.',
  bool:true,
  explanation:'A container can be attached to multiple networks.' },

{ id:'L6-003', lab:6, slide:6, topic:'best-practice', type:'mcq',
  q:'A best practice for Docker networking is:',
  options:[
    'Put every container on the default bridge',
    'Disable networking for security',
    'Create a NEW virtual network for each app',
    'Use only the host network'
  ],
  answer:2,
  explanation:'Best practice: a separate virtual network per app.' },

{ id:'L6-004', lab:6, slide:8, topic:'bridge', type:'mcq',
  q:'When Docker is installed, the daemon creates a default bridge network named:',
  options:['docker0','bridge0','dockerbr','dnet0'],
  answer:0,
  explanation:'Default bridge: docker0.' },

{ id:'L6-005', lab:6, slide:9, topic:'bridge', type:'truefalse',
  q:'Containers attached to the SAME virtual bridge network can talk to each other WITHOUT using -p.',
  bool:true,
  explanation:'Inside a virtual network containers can talk freely; -p only matters for host exposure.' },

{ id:'L6-006', lab:6, slide:12, topic:'host-net', type:'mcq',
  q:'The "host" network driver:',
  options:[
    'Creates an overlay network across nodes',
    'Bypasses Docker\'s network stack and uses the host\'s network directly',
    'Disables networking completely',
    'Allocates VLAN tags'
  ],
  answer:1,
  explanation:'Host driver bypasses Docker\'s stack and uses the host\'s network directly.' },

{ id:'L6-007', lab:6, slide:14, topic:'host-net', type:'truefalse',
  q:'In host network mode, containers receive their OWN separate IP addresses, isolated from the host.',
  bool:false,
  explanation:'In host mode containers do NOT get separate IPs - they share the host network settings.' },

{ id:'L6-008', lab:6, slide:15, topic:'none', type:'mcq',
  q:'The "none" network driver:',
  options:[
    'Allows containers to access only docker0',
    'Provides no external networking and no inter-container communication (loopback only)',
    'Routes via NAT to the host',
    'Is required for overlay networks'
  ],
  answer:1,
  explanation:'none = loopback only; no external networking and no container-to-container traffic.' },

{ id:'L6-009', lab:6, slide:7, topic:'types', type:'multi',
  q:'Which Docker network DRIVER types are listed in Lab 6? (select all)',
  options:['Bridge','Host','Overlay','Custom Networks','None','TCP'],
  answers:[0,1,2,3],
  explanation:'Slide 7 lists Bridge, Host, Overlay, Custom. (Slide 15 also covers None.)' },

{ id:'L6-010', lab:6, slide:17, topic:'custom', type:'mcq',
  q:'The phrase "Batteries Included, But Removable" in Lab 6 means:',
  options:[
    'You must remove all batteries before configuring',
    'Defaults work well, but it\'s easy to swap parts to customize',
    'Docker requires manual config',
    'Networking is optional'
  ],
  answer:1,
  explanation:'Defaults included; swap parts as needed.' },

{ id:'L6-011', lab:6, slide:17, topic:'custom', type:'fill',
  q:'Skip virtual networks entirely and use the host IP for the container with the docker run option ___',
  accept:['--network=host','--network host'],
  explanation:'--network=host attaches the container directly to the host network.' },

{ id:'L6-012', lab:6, slide:19, topic:'cli', type:'fill',
  q:'Create a new docker network named "my_app_net".',
  accept:['docker network create my_app_net'],
  explanation:'docker network create <name> creates a network.' },

{ id:'L6-013', lab:6, slide:19, topic:'cli', type:'fill',
  q:'List all available docker networks.',
  accept:['docker network ls'],
  explanation:'docker network ls lists networks.' },

{ id:'L6-014', lab:6, slide:19, topic:'cli', type:'mcq',
  q:'Which command DYNAMICALLY adds a NIC to a container on an existing virtual network?',
  options:['docker network attach','docker network connect','docker network add','docker container link'],
  answer:1,
  explanation:'docker network connect <network> <container> adds a NIC dynamically.' },

{ id:'L6-015', lab:6, slide:19, topic:'cli', type:'fill',
  q:'Remove ALL unused docker networks at once.',
  accept:['docker network prune'],
  explanation:'docker network prune removes all unused networks.' },

{ id:'L6-016', lab:6, slide:20, topic:'dns', type:'mcq',
  q:'On the DEFAULT bridge network, DNS for friendly container names is:',
  options:[
    'Built-in by default',
    'Not built-in by default; you must use --link',
    'Disabled forever',
    'Provided by external DNS only'
  ],
  answer:1,
  explanation:'Default bridge has NO built-in DNS for friendly names; --link is the manual workaround.' },

{ id:'L6-017', lab:6, slide:20, topic:'dns', type:'truefalse',
  q:'On a CUSTOM (user-defined) network, DNS resolution by container name is built-in.',
  bool:true,
  explanation:'Custom networks have built-in DNS so containers find each other by name.' },

{ id:'L6-018', lab:6, slide:21, topic:'dns', type:'mcq',
  q:'DNS (Domain Name System) is best described as:',
  options:[
    'A subnet mask',
    'The Internet\'s directory: translates human-readable domain names to machine-readable IPs',
    'A type of hypervisor',
    'A storage driver'
  ],
  answer:1,
  explanation:'DNS translates human-readable domain names to IPs.' },

{ id:'L6-019', lab:6, slide:5, topic:'isolation', type:'truefalse',
  q:'Docker networks are used to provide complete isolation for Docker containers.',
  bool:true,
  explanation:'Docker networks provide complete isolation between containers.' },

{ id:'L6-020', lab:6, slide:24, topic:'demo', type:'fill',
  q:'Inspect the network details of the network named "my_app_net".',
  accept:['docker network inspect my_app_net'],
  explanation:'docker network inspect <name> shows details.' },

{ id:'L6-021', lab:6, slide:24, topic:'demo', type:'fill',
  q:'Connect the existing container "webserver" to the network "my_app_net".',
  accept:['docker network connect my_app_net webserver'],
  explanation:'docker network connect <network> <container>.' },

{ id:'L6-022', lab:6, slide:24, topic:'demo', type:'fill',
  q:'Inside the "webserver" container, curl the other container "new_nginx" by name.',
  accept:['docker container exec -it webserver curl new_nginx','docker exec -it webserver curl new_nginx'],
  explanation:'On a custom network, container names resolve via DNS, so curl new_nginx works.' },

{ id:'L6-023', lab:6, slide:25, topic:'volumes', type:'mcq',
  q:'A Docker VOLUME is best described as:',
  options:[
    'An ephemeral container layer',
    'Persistent data store for containers, created and managed by Docker',
    'A network driver',
    'A registry mirror'
  ],
  answer:1,
  explanation:'Volumes = persistent stores for containers, managed by Docker.' },

{ id:'L6-024', lab:6, slide:25, topic:'volumes-vs-bind', type:'mcq',
  q:'Volumes vs bind mounts: if you need to access files from BOTH containers and the host, you should use:',
  options:['Volumes','Bind mounts','tmpfs','Anonymous volumes'],
  answer:1,
  explanation:'Bind mounts are for host-and-container access. Volumes are managed by Docker (less ideal for host editing).' },

{ id:'L6-025', lab:6, slide:25, topic:'volumes', type:'fill',
  q:'Create a docker volume named "my_data".',
  accept:['docker volume create my_data'],
  explanation:'docker volume create <name>.' },

{ id:'L6-026', lab:6, slide:26, topic:'volumes', type:'mcq',
  q:'Which is a key BENEFIT of volumes over writing data into the container?',
  options:[
    'Volumes are faster to delete',
    'A volume does not increase the size of containers using it; data persists outside container lifecycle',
    'Volumes are encrypted automatically',
    'Volumes are required for any container'
  ],
  answer:1,
  explanation:'A volume does not bloat the container, and persists past container removal.' },

{ id:'L6-027', lab:6, slide:27, topic:'mount', type:'mcq',
  q:'Which is the SHORT-form flag to mount a volume into a container?',
  options:['-v','-m','-c','-x'],
  answer:0,
  explanation:'-v (or --volume) is the short form. --mount is more generic but longer.' },

{ id:'L6-028', lab:6, slide:27, topic:'mount', type:'fill',
  q:'Mount the volume "myvolume" READ-ONLY at /data using --mount syntax.',
  accept:['--mount type=volume,src=myvolume,dst=/data,ro','--mount type=volume,src=myvolume,dst=/data,ro,volume-subpath=/foo'],
  explanation:'Slide example: --mount type=volume,src=myvolume,dst=/data,ro,volume-subpath=/foo.' },

{ id:'L6-029', lab:6, slide:28, topic:'volumes', type:'fill',
  q:'List all docker volumes.',
  accept:['docker volume ls'],
  explanation:'docker volume ls lists volumes.' },

{ id:'L6-030', lab:6, slide:29, topic:'volumes', type:'fill',
  q:'Inspect the volume named "myvolume".',
  accept:['docker volume inspect myvolume'],
  explanation:'docker volume inspect <name> shows details.' },

{ id:'L6-031', lab:6, slide:24, topic:'demo', type:'fill',
  q:'Disconnect the "webserver" container from the "my_app_net" network.',
  accept:['docker network disconnect my_app_net webserver'],
  explanation:'docker network disconnect dynamically removes a NIC.' },

{ id:'L6-032', lab:6, slide:6, topic:'best-practice', type:'mcq',
  q:'Per the example in Lab 6, a good network setup is:',
  options:[
    'One global network for everything',
    'A separate virtual network per app (e.g. my_web_app for mysql + apache, my_api for mongo + nodejs)',
    'A network per container',
    'Default bridge only'
  ],
  answer:1,
  explanation:'Per app, group its containers on a dedicated virtual network.' },

// ==================== LAB 7 - Dockerfile + Compose ====================
{ id:'L7-001', lab:7, slide:3, topic:'image', type:'multi',
  q:'A Docker Image contains: (select all that apply)',
  options:[
    'App binaries and dependencies',
    'Metadata about the image and how to run it',
    'A complete kernel + drivers',
    'A cut-down OS'
  ],
  answers:[0,1,3],
  explanation:'Image = app + deps + metadata + cut-down OS, but NOT a complete kernel.' },

{ id:'L7-002', lab:7, slide:5, topic:'methods', type:'mcq',
  q:'There are TWO ways to create a Docker image. They are:',
  options:[
    'Interactive method and Dockerfile method',
    'Dockerfile and Docker Compose',
    'Pull and Push',
    'Bridge and Overlay'
  ],
  answer:0,
  explanation:'Interactive (commit) method and Dockerfile method.' },

{ id:'L7-003', lab:7, slide:9, topic:'commit', type:'fill',
  q:'In the interactive method, after modifying the container, which docker subcommand commits the changes to a NEW image?',
  accept:['docker commit','commit'],
  explanation:'docker commit <container> <new-image-name> creates an image from a container.' },

{ id:'L7-004', lab:7, slide:11, topic:'dockerfile', type:'mcq',
  q:'A Dockerfile is best described as:',
  options:[
    'A binary executable',
    'A simple text file with instructions to build a Docker image',
    'A YAML for orchestrating containers',
    'A JSON manifest for K8s'
  ],
  answer:1,
  explanation:'Dockerfile is a text file with instructions to build images.' },

{ id:'L7-005', lab:7, slide:18, topic:'from', type:'mcq',
  q:'To create a brand-new BASE image (no parent), you write:',
  options:['FROM ubuntu','FROM scratch','FROM base','FROM none'],
  answer:1,
  explanation:'FROM scratch creates a base image (no parent).' },

{ id:'L7-006', lab:7, slide:19, topic:'env', type:'mcq',
  q:'When using ENV in a Dockerfile WITHOUT the equals (=) sign, you can set:',
  options:['Multiple variables in one line','Only ONE variable','No variables at all','Only secret variables'],
  answer:1,
  explanation:'Without =, ENV allows only a single variable (KEY value); with =, multiple KEY=VAL pairs.' },

{ id:'L7-007', lab:7, slide:20, topic:'run', type:'mcq',
  q:'The Dockerfile instruction RUN does what?',
  options:[
    'Runs a container after build',
    'Executes a shell command in a NEW LAYER and commits the result in a new image',
    'Removes a container',
    'Pushes the image to a registry'
  ],
  answer:1,
  explanation:'RUN executes a command in a new layer and commits to the image.' },

{ id:'L7-008', lab:7, slide:21, topic:'workdir', type:'mcq',
  q:'WORKDIR in a Dockerfile:',
  options:[
    'Sets a build argument',
    'Changes the current working directory in the image (used by subsequent instructions)',
    'Specifies the entrypoint',
    'Defines metadata only'
  ],
  answer:1,
  explanation:'WORKDIR sets the working directory for subsequent instructions.' },

{ id:'L7-009', lab:7, slide:22, topic:'add-vs-copy', type:'mcq',
  q:'How does ADD differ from COPY in a Dockerfile?',
  options:[
    'They are identical',
    'ADD supports tar extraction and remote URL support; COPY does not',
    'COPY supports tar extraction; ADD does not',
    'ADD is deprecated and removed'
  ],
  answer:1,
  explanation:'ADD has additional features (tar extraction, remote URLs); COPY is simpler/preferred for plain copies.' },

{ id:'L7-010', lab:7, slide:23, topic:'expose', type:'truefalse',
  q:'EXPOSE actually publishes the port to the host at build time.',
  bool:false,
  explanation:'EXPOSE does NOT publish; it\'s informational metadata about the port the container listens on.' },

{ id:'L7-011', lab:7, slide:24, topic:'cmd', type:'truefalse',
  q:'A Dockerfile may have multiple CMD instructions; ONLY THE LAST one will be executed.',
  bool:true,
  explanation:'Multiple CMDs allowed but only the LAST one is used; specifying a command in docker run also overrides CMD.' },

{ id:'L7-012', lab:7, slide:25, topic:'entrypoint', type:'mcq',
  q:'Which flag overrides the ENTRYPOINT instruction at "docker run" time?',
  options:['--cmd','--override','--entrypoint','--exec'],
  answer:2,
  explanation:'--entrypoint overrides ENTRYPOINT in docker run.' },

{ id:'L7-013', lab:7, slide:25, topic:'entrypoint', type:'mcq',
  q:'Which forms does ENTRYPOINT support?',
  options:['shell only','exec only','shell and exec','json and yaml'],
  answer:2,
  explanation:'ENTRYPOINT has both exec and shell forms.' },

{ id:'L7-014', lab:7, slide:31, topic:'build', type:'fill',
  q:'Build a Docker image tagged "python-hello-world" from the current directory.',
  accept:['docker image build -t python-hello-world .','docker build -t python-hello-world .'],
  explanation:'docker image build -t <name> . builds and tags from the current directory (.).' },

{ id:'L7-015', lab:7, slide:34, topic:'history', type:'mcq',
  q:'Which command shows the LAYERS of changes made in an image?',
  options:['docker image stack','docker image layers','docker image history','docker image ls'],
  answer:2,
  explanation:'docker image history <name> shows the layered changes.' },

{ id:'L7-016', lab:7, slide:34, topic:'inspect', type:'fill',
  q:'Show JSON metadata about an image named "python-hello-world".',
  accept:['docker image inspect python-hello-world','docker inspect python-hello-world'],
  explanation:'docker image inspect <name> returns JSON metadata.' },

{ id:'L7-017', lab:7, slide:29, topic:'layers', type:'mcq',
  q:'Docker uses which file system to build an image from layers?',
  options:['ZFS','Union File System (UFS)','EXT4','Btrfs'],
  answer:1,
  explanation:'Docker uses UFS (Union File System) to layer multiple directories as one.' },

{ id:'L7-018', lab:7, slide:30, topic:'layers', type:'truefalse',
  q:'Each Dockerfile instruction creates a layer; each layer is a set of differences from the layer before it.',
  bool:true,
  explanation:'Each layer is a delta. Layers stack on top of each other.' },

{ id:'L7-019', lab:7, slide:33, topic:'cache', type:'mcq',
  q:'On rebuild, when Docker logs "Using cache" for a step, it means:',
  options:[
    'The instruction was skipped',
    'The existing layer is reused instead of re-running the instruction',
    'The image was deleted',
    'A push to Hub started'
  ],
  answer:1,
  explanation:'Layers unchanged on rebuild are reused from cache.' },

{ id:'L7-020', lab:7, slide:39, topic:'handson', type:'predict',
  q:'Given Dockerfile:\n<pre>FROM python\nCOPY .  /src\nCMD ["python", "/src/PythonExample.py"]</pre>\nWhich command builds the image as "python-application"?',
  options:[
    'docker pull python-application',
    'docker image build -t python-application .',
    'docker container run python-application',
    'docker compose up'
  ],
  answer:1,
  explanation:'docker image build -t python-application . builds from the current directory.' },

{ id:'L7-021', lab:7, slide:42, topic:'why-compose', type:'mcq',
  q:'A typical web app might have multiple containers (frontend, backend, database). What problem does Docker Compose solve?',
  options:[
    'It writes Dockerfiles for you',
    'It defines and runs MULTI-container Docker applications',
    'It replaces the Docker daemon',
    'It builds the kernel'
  ],
  answer:1,
  explanation:'Compose defines and runs multi-container apps from a YAML file.' },

{ id:'L7-022', lab:7, slide:47, topic:'compose', type:'multi',
  q:'Docker Compose is comprised of TWO components:',
  options:[
    'A YAML-formatted file (docker-compose.yml)',
    'A CLI tool (docker-compose)',
    'A web UI dashboard',
    'A binary daemon'
  ],
  answers:[0,1],
  explanation:'Compose = docker-compose.yml + docker-compose CLI.' },

{ id:'L7-023', lab:7, slide:54, topic:'compose-yml', type:'mcq',
  q:'In a docker-compose.yml, the top-level key that contains your containers is:',
  options:['containers','services','components','apps'],
  answer:1,
  explanation:'services maps to containers in Compose.' },

{ id:'L7-024', lab:7, slide:54, topic:'compose-yml', type:'mcq',
  q:'In a Compose service, "image:" is:',
  options:['Required','Optional if you use build:','Always required','Required only for top-level networks'],
  answer:1,
  explanation:'image is optional if you use build: to build from a Dockerfile.' },

{ id:'L7-025', lab:7, slide:54, topic:'compose-yml', type:'match',
  q:'Match Compose key to the docker run flag it represents.',
  pairs:[
    {l:'environment:', r:'-e (env vars)'},
    {l:'volumes:', r:'-v (volume mount)'},
    {l:'ports:', r:'-p (publish port)'},
    {l:'networks:', r:'docker network create'}
  ],
  explanation:'environment=-e, volumes=-v, ports=-p, networks=create network.' },

{ id:'L7-026', lab:7, slide:55, topic:'compose-yml', type:'mcq',
  q:'In Compose, which key indicates that one service starts AFTER another?',
  options:['after:','depends_on:','requires:','start_order:'],
  answer:1,
  explanation:'depends_on: defines startup ordering between services.' },

{ id:'L7-027', lab:7, slide:58, topic:'cli', type:'mcq',
  q:'Which command starts ALL containers defined in a Compose file?',
  options:['docker-compose start','docker-compose up','docker-compose run','docker-compose init'],
  answer:1,
  explanation:'docker-compose up starts all services (and creates volumes/networks).' },

{ id:'L7-028', lab:7, slide:58, topic:'cli', type:'mcq',
  q:'Which command stops ALL containers and removes containers/volumes/networks created by Compose?',
  options:['docker-compose down','docker-compose stop','docker-compose kill','docker-compose pause'],
  answer:0,
  explanation:'docker-compose down tears it all down.' },

{ id:'L7-029', lab:7, slide:59, topic:'build', type:'mcq',
  q:'Which command rebuilds custom images using Compose?',
  options:['docker-compose make','docker-compose build (or up --build)','docker-compose recreate','docker-compose tag'],
  answer:1,
  explanation:'docker-compose build, or docker-compose up --build (all-in-one).' },

{ id:'L7-030', lab:7, slide:56, topic:'cli', type:'mcq',
  q:'To use a non-default Compose file name (not docker-compose.yml), you pass which option?',
  options:['-c','-y','-f','-n'],
  answer:2,
  explanation:'docker-compose -f <file> uses a non-default filename.' },

{ id:'L7-031', lab:7, slide:62, topic:'compose-ex1', type:'predict',
  q:'Given:\n<pre>version: \'3\'\nservices:\n  nginx-server:\n    image: nginx\n    ports: ["80:80"]\n  httpd-server:\n    image: httpd\n    ports: ["8080:80"]</pre>\nAfter "docker-compose up", which URL serves NGINX?',
  options:['http://localhost:80','http://localhost:8080','http://localhost:3000','None - it serves Apache'],
  answer:0,
  explanation:'nginx is mapped to host:80; httpd is on host:8080.' },

{ id:'L7-032', lab:7, slide:64, topic:'compose-ex2', type:'predict',
  q:'Given the api+db Compose file (api on 3000:3000, db postgres on 4321:5432, env POSTGRES_USER=testUser), which host port reaches Postgres?',
  options:['5432','3000','4321','8080'],
  answer:2,
  explanation:'ports: \'4321:5432\' maps host 4321 to container 5432.' },

{ id:'L7-033', lab:7, slide:64, topic:'compose-ex2', type:'mcq',
  q:'In the api+db example, the "api" service builds its image from:',
  options:['the public node image','the local Dockerfile (build: .)','docker pull api','postgres image'],
  answer:1,
  explanation:'build: . tells Compose to build from the local Dockerfile in the current directory.' },

{ id:'L7-034', lab:7, slide:56, topic:'compose-yml', type:'truefalse',
  q:'If no Compose version is specified in the YAML, version 1 is assumed; v2 minimum is recommended.',
  bool:true,
  explanation:'Slide 54 explicitly: if no version, v1 assumed; recommend v2 minimum.' },

{ id:'L7-035', lab:7, slide:13, topic:'workflow', type:'mcq',
  q:'The image creation workflow with a Dockerfile is:',
  options:[
    'Dockerfile -> Container -> Image',
    'Dockerfile -> Image -> Container',
    'Image -> Dockerfile -> Container',
    'Container -> Image -> Dockerfile'
  ],
  answer:1,
  explanation:'A Dockerfile is used to create an image; that image is used to create containers.' },

{ id:'L7-036', lab:7, slide:24, topic:'cmd-vs-docker-run', type:'mcq',
  q:'If you specify a command at "docker run <image> <command>", it:',
  options:[
    'Overrides the CMD in the Dockerfile',
    'Is ignored',
    'Triggers an image rebuild',
    'Throws an error'
  ],
  answer:0,
  explanation:'A command in docker run takes precedence and CMD is not executed.' },

{ id:'L7-037', lab:7, slide:25, topic:'entrypoint', type:'truefalse',
  q:'Args from "docker run <image> arg1 arg2" are appended after all elements in an exec-form ENTRYPOINT.',
  bool:true,
  explanation:'docker run args are appended to exec-form ENTRYPOINT.' },

{ id:'L7-038', lab:7, slide:32, topic:'image-ls', type:'fill',
  q:'List local Docker images.',
  accept:['docker image ls','docker images'],
  explanation:'docker image ls (or docker images) shows local images.' },

{ id:'L7-039', lab:7, slide:32, topic:'run', type:'fill',
  q:'Run image "python-hello-world" detached, mapping host port 5000 to container port 5000.',
  accept:['docker image run -p 5000:5000 -d python-hello-world','docker container run -p 5000:5000 -d python-hello-world','docker run -p 5000:5000 -d python-hello-world'],
  explanation:'-p host:container maps ports; -d detached.' },

{ id:'L7-040', lab:7, slide:55, topic:'compose-yml', type:'mcq',
  q:'In a Compose service, the key "container_name:" specifies:',
  options:['Service name','Image name','A custom container name','Network name'],
  answer:2,
  explanation:'container_name: gives a custom name to the container created.' },

{ id:'L7-041', lab:7, slide:53, topic:'why', type:'multi',
  q:'Docker Compose helps you to:',
  options:[
    'Configure relationships between containers',
    'Save your docker container run settings in an easy-to-read file',
    'Create one-liner developer environment startups',
    'Build the kernel'
  ],
  answers:[0,1,2],
  explanation:'Compose: relationships, easy-to-read settings, one-liner dev startup.' },

{ id:'L7-042', lab:7, slide:64, topic:'compose-ex2', type:'mcq',
  q:'In the api+db Compose example, what does "depends_on: - db" do for the api service?',
  options:[
    'Makes db wait for api',
    'Tells Compose api should be created/started AFTER db',
    'Links the volumes',
    'Disables the db service'
  ],
  answer:1,
  explanation:'depends_on tells Compose to start db before api.' },

// ==================== LAB 8 - Kubernetes ====================
{ id:'L8-001', lab:8, slide:4, topic:'intro', type:'mcq',
  q:'Kubernetes (K8s) is best described as:',
  options:[
    'A type of hypervisor',
    'A next-generation, open-source CONTAINER SCHEDULER originally made by Google',
    'A web server',
    'A database'
  ],
  answer:1,
  explanation:'K8s is an open-source next-gen container scheduler made by Google.' },

{ id:'L8-002', lab:8, slide:5, topic:'why', type:'multi',
  q:'Per Lab 8, which problems push us to use K8s? (select all)',
  options:[
    'Updating the version of an app on a container without manual replace',
    'Handling huge concurrent users with load balancing/scaling',
    'Replacing the Linux kernel',
    'Compiling Go faster'
  ],
  answers:[0,1],
  explanation:'K8s automates updates and provides scaling/load balancing.' },

{ id:'L8-003', lab:8, slide:6, topic:'pod', type:'mcq',
  q:'A POD is best defined as:',
  options:[
    'The largest unit in K8s',
    'The smallest unit of work or management resource within K8s, comprised of ONE OR MORE containers sharing storage/network/context',
    'A type of node',
    'A K8s controller'
  ],
  answer:1,
  explanation:'A Pod is the smallest unit; one or more containers share storage/network/context.' },

{ id:'L8-004', lab:8, slide:6, topic:'node', type:'multi',
  q:'A NODE in K8s comes in which TWO types?',
  options:['Control Plane Node (Master Node)','Worker Node','Edge Node','Storage Node'],
  answers:[0,1],
  explanation:'Two node types: Control Plane (Master) and Worker.' },

{ id:'L8-005', lab:8, slide:6, topic:'cluster', type:'mcq',
  q:'A CLUSTER in K8s is:',
  options:[
    'A single host',
    'A collection of hosts that aggregate resources (CPU/RAM/disk/devices) into one usable pool',
    'A network plugin',
    'A type of pod'
  ],
  answer:1,
  explanation:'Cluster = collection of hosts pooling resources.' },

{ id:'L8-006', lab:8, slide:10, topic:'apiserver', type:'mcq',
  q:'kube-apiserver primarily acts as the:',
  options:[
    'Network proxy',
    'Storage backend',
    'Main entry point and front-end to etcd; exposes REST API; handles AuthN/AuthZ/admission',
    'Pod scheduler'
  ],
  answer:2,
  explanation:'kube-apiserver is the entry point + front-end to etcd; handles AuthN/AuthZ/admission.' },

{ id:'L8-007', lab:8, slide:11, topic:'etcd', type:'mcq',
  q:'etcd is:',
  options:[
    'A networking plugin',
    'A distributed KEY-VALUE store used by K8s to store all cluster data; strongly consistent and highly available',
    'A scheduler',
    'A container runtime'
  ],
  answer:1,
  explanation:'etcd = distributed KV store; stores all cluster data; strongly consistent.' },

{ id:'L8-008', lab:8, slide:11, topic:'controller-mgr', type:'mcq',
  q:'kube-controller-manager:',
  options:[
    'Schedules pods to nodes',
    'Stores cluster data',
    'Runs controllers (daemons) that watch state via apiserver and reconcile (e.g. Node controller, ReplicaSet controller)',
    'Provides DNS'
  ],
  answer:2,
  explanation:'controller-manager runs reconciler daemons.' },

{ id:'L8-009', lab:8, slide:12, topic:'cloud-cm', type:'multi',
  q:'cloud-controller-manager runs which controllers? (select all)',
  options:['Node Controller','Route Controller','Service Controller','PersistentVolumeLabel Controller','Container Network Controller'],
  answers:[0,1,2,3],
  explanation:'Cloud CM runs Node, Route, Service, PersistentVolumeLabel controllers.' },

{ id:'L8-010', lab:8, slide:12, topic:'scheduler', type:'mcq',
  q:'kube-scheduler decides:',
  options:[
    'When to delete a node',
    'Where a new pod should run, evaluating CPU/RAM/zones/affinity to match a suitable node',
    'How to encrypt secrets',
    'When to back up etcd'
  ],
  answer:1,
  explanation:'Scheduler picks the node for a new pod based on requirements.' },

{ id:'L8-011', lab:8, slide:14, topic:'kubelet', type:'mcq',
  q:'kubelet is:',
  options:[
    'The cluster autoscaler',
    'A node agent that monitors and manages pods on its node, ensuring described containers run',
    'A controller for services',
    'A storage class'
  ],
  answer:1,
  explanation:'kubelet = node agent that ensures pods/containers are running per PodSpec.' },

{ id:'L8-012', lab:8, slide:14, topic:'kube-proxy', type:'multi',
  q:'kube-proxy supports which proxy MODES? (select all)',
  options:['userspace','iptables','ipvs','etcd','calico'],
  answers:[0,1,2],
  explanation:'kube-proxy modes: userspace, iptables, ipvs.' },

{ id:'L8-013', lab:8, slide:14, topic:'runtime', type:'mcq',
  q:'K8s talks to the container runtime via which interface?',
  options:['CSI','CNI','CRI','OCI'],
  answer:2,
  explanation:'CRI = Container Runtime Interface.' },

{ id:'L8-014', lab:8, slide:14, topic:'runtime', type:'multi',
  q:'Which are container RUNTIMES listed for K8s? (select all)',
  options:['containerd','CRI-O','rkt','Kata','Virtlet','etcd'],
  answers:[0,1,2,3,4],
  explanation:'Common runtimes: containerd, CRI-O, rkt, Kata, Virtlet.' },

{ id:'L8-015', lab:8, slide:16, topic:'core', type:'mcq',
  q:'A NAMESPACE in K8s is primarily used for:',
  options:[
    'Storing secrets',
    'Logical division of a cluster / scoping access',
    'Defining a network plugin',
    'Mounting volumes'
  ],
  answer:1,
  explanation:'Namespaces logically divide the cluster and scope access.' },

{ id:'L8-016', lab:8, slide:16, topic:'core', type:'mcq',
  q:'Which statement about LABELS vs ANNOTATIONS is correct?',
  options:[
    'Both can be used to FILTER objects with selectors',
    'Labels identify/group; annotations are non-identifying metadata NOT used for filtering',
    'Annotations have stricter syntax than labels',
    'Labels are always base64'
  ],
  answer:1,
  explanation:'Labels = identifying (used for selectors). Annotations = metadata, NOT for filtering.' },

{ id:'L8-017', lab:8, slide:27, topic:'selectors', type:'multi',
  q:'Which OPERATORS are supported by SET-BASED selectors? (select all)',
  options:['In','NotIn','Exists','DoesNotExist','Like','Regex'],
  answers:[0,1,2,3],
  explanation:'Set-based operators: In, NotIn, Exists, DoesNotExist.' },

{ id:'L8-018', lab:8, slide:27, topic:'selectors', type:'multi',
  q:'Which K8s objects support SET-BASED selectors? (select all)',
  options:['Job','Deployment','ReplicaSet','DaemonSet','PersistentVolumeClaims','Namespace'],
  answers:[0,1,2,3,4],
  explanation:'Job, Deployment, ReplicaSet, DaemonSet, PVCs - per slide 27.' },

{ id:'L8-019', lab:8, slide:17, topic:'cluster-setup', type:'mcq',
  q:'For local/test K8s setup, the recommended cluster type is:',
  options:['kubeadm','minikube','rancher','OpenShift'],
  answer:1,
  explanation:'minikube is the test/local cluster (single machine, Docker pre-installed). kubeadm is for production-like multi-node setups.' },

{ id:'L8-020', lab:8, slide:20, topic:'kubectl', type:'mcq',
  q:'kubectl is:',
  options:[
    'The container runtime',
    'The CLI client that submits commands to the API Server (entry point of K8s)',
    'A storage class',
    'A network plugin'
  ],
  answer:1,
  explanation:'kubectl talks to the API Server, which is the entry point to K8s.' },

{ id:'L8-021', lab:8, slide:23, topic:'kubectl-cmd', type:'fill',
  q:'Run a pod imperatively with name "redis" using image "redis".',
  accept:['kubectl run redis --image redis','kubectl run redis --image=redis'],
  explanation:'kubectl run pod-name --image image-name.' },

{ id:'L8-022', lab:8, slide:23, topic:'kubectl-cmd', type:'fill',
  q:'Apply (create or replace) the manifest in pod.yml.',
  accept:['kubectl apply -f pod.yml','kubectl apply -f pod.yaml'],
  explanation:'kubectl apply -f file.yml.' },

{ id:'L8-023', lab:8, slide:23, topic:'kubectl-cmd', type:'mcq',
  q:'Which command shows DETAILED information about a pod, including events?',
  options:['kubectl get pod','kubectl describe pod <name>','kubectl logs <name>','kubectl explain pod'],
  answer:1,
  explanation:'kubectl describe pod <name> gives detailed info incl. events.' },

{ id:'L8-024', lab:8, slide:23, topic:'shortnames', type:'match',
  q:'Match the K8s resource to its kubectl SHORT name.',
  pairs:[
    {l:'pods', r:'po'},
    {l:'services', r:'svc'},
    {l:'deployments', r:'deploy'},
    {l:'nodes', r:'no'},
    {l:'ingresses', r:'ing'}
  ],
  explanation:'Per the api-resources table.' },

{ id:'L8-025', lab:8, slide:23, topic:'namespaced', type:'mcq',
  q:'Which K8s resource is NOT namespaced (cluster-scope)?',
  options:['pods','services','deployments','nodes','ingresses'],
  answer:3,
  explanation:'NODES are cluster-scoped (NAMESPACED=false).' },

{ id:'L8-026', lab:8, slide:42, topic:'rollout', type:'fill',
  q:'Roll BACK the last update of "deployment-1".',
  accept:['kubectl rollout undo deployment deployment-1','kubectl rollout undo deployment/deployment-1'],
  explanation:'kubectl rollout undo deployment <name> reverts to the previous revision.' },

{ id:'L8-027', lab:8, slide:42, topic:'rollout', type:'fill',
  q:'Show ROLLOUT history for "deployment-1".',
  accept:['kubectl rollout history deployment deployment-1','kubectl rollout history deployment/deployment-1'],
  explanation:'kubectl rollout history deployment <name>.' },

{ id:'L8-028', lab:8, slide:42, topic:'rollout', type:'fill',
  q:'Show the live ROLLOUT STATUS of "deployment-1".',
  accept:['kubectl rollout status deployment deployment-1','kubectl rollout status deployment/deployment-1'],
  explanation:'kubectl rollout status deployment <name>.' },

{ id:'L8-029', lab:8, slide:28, topic:'replicaset', type:'mcq',
  q:'A ReplicaSet is responsible for:',
  options:[
    'Routing traffic to pods',
    'Managing pod replicas and their lifecycle (scheduling/scaling/deletion)',
    'Persisting cluster state',
    'Mounting storage'
  ],
  answer:1,
  explanation:'ReplicaSet manages pod replicas.' },

{ id:'L8-030', lab:8, slide:28, topic:'deployment', type:'mcq',
  q:'A Deployment provides which extra capabilities over a ReplicaSet?',
  options:[
    'Backups and recovery',
    'Declarative management of stateless Pods/ReplicaSets, plus rollback and granular update control',
    'Storage allocation',
    'Service discovery'
  ],
  answer:1,
  explanation:'Deployment = declarative management + rollback + granular updates.' },

{ id:'L8-031', lab:8, slide:36, topic:'strategy-recreate', type:'mcq',
  q:'In the RECREATE deployment strategy:',
  options:[
    'Old and new versions run concurrently',
    'All old (v1) instances are stopped FIRST, then all new (v2) instances start',
    'Only 1% of users see v2 first',
    'Two identical environments are kept and swapped'
  ],
  answer:1,
  explanation:'Recreate: stop all v1, then start all v2.' },

{ id:'L8-032', lab:8, slide:36, topic:'strategy-rolling', type:'mcq',
  q:'In the ROLLING UPDATE strategy:',
  options:[
    'New and old run side by side; gradually replace old with new in batches',
    'New replaces old all at once',
    'Traffic is mirrored to v2 with no real users',
    'Two whole environments are maintained'
  ],
  answer:0,
  explanation:'Rolling Update gradually replaces old instances with new ones.' },

{ id:'L8-033', lab:8, slide:36, topic:'strategy-shadow', type:'mcq',
  q:'In SHADOW deployment:',
  options:[
    'v2 receives all real traffic immediately',
    'v2 runs alongside v1 but receives NO real user traffic - only test/mirrored traffic',
    'v2 is hidden in the cluster but never started',
    'v1 is deleted before v2 starts'
  ],
  answer:1,
  explanation:'Shadow: v2 alongside v1 but no real user traffic.' },

{ id:'L8-034', lab:8, slide:36, topic:'strategy-canary', type:'mcq',
  q:'In CANARY deployment:',
  options:[
    'Release v2 to a small subset of real users; monitor; gradually increase if healthy',
    'Switch all traffic at once',
    'Only mirror traffic',
    'Same as Recreate'
  ],
  answer:0,
  explanation:'Canary: small subset gets v2, scale up gradually.' },

{ id:'L8-035', lab:8, slide:37, topic:'strategy-bg', type:'mcq',
  q:'In BLUE/GREEN deployment:',
  options:[
    'Traffic is split 50/50 forever',
    'Maintain TWO identical envs (blue=v1, green=v2). When green is ready, switch ALL traffic at once. Easy rollback.',
    'Only the database changes',
    'New code is recompiled per request'
  ],
  answer:1,
  explanation:'Blue=current, Green=new; switch traffic atomically when green is verified.' },

{ id:'L8-036', lab:8, slide:37, topic:'strategy-ab', type:'mcq',
  q:'A/B Testing is primarily for:',
  options:[
    'Replacing one full app version with another',
    'Testing different features/UI variants on different user segments simultaneously and analyzing behavior',
    'Cluster scaling',
    'Storage migration'
  ],
  answer:1,
  explanation:'A/B testing compares feature variants across user segments.' },

{ id:'L8-037', lab:8, slide:48, topic:'stateful-vs-stateless', type:'multi',
  q:'Which characteristics belong to a STATEFULSET (not a Deployment)? (select all)',
  options:[
    'Fixed pod names (pod-0, pod-1)',
    'Unique persistent volume per pod',
    'Ordered startup (pod-0 first)',
    'Stable & predictable DNS names',
    'Random pod names'
  ],
  answers:[0,1,2,3],
  explanation:'StatefulSet: fixed names, unique PV per pod, ordered startup, stable DNS.' },

{ id:'L8-038', lab:8, slide:52, topic:'daemonset', type:'mcq',
  q:'A DaemonSet ensures that:',
  options:[
    'Only one pod runs in the cluster',
    'All nodes matching certain criteria run an instance of the supplied Pod (e.g. log forwarding, health monitoring)',
    'Pods are ordered',
    'Pods only run on master nodes'
  ],
  answer:1,
  explanation:'DaemonSet runs a pod on each matching node - ideal for cluster-wide services.' },

{ id:'L8-039', lab:8, slide:55, topic:'job', type:'mcq',
  q:'A Job in K8s ensures that:',
  options:[
    'Pods restart forever',
    'One or more pods execute and SUCCESSFULLY TERMINATE (until completion / parallelism met)',
    'Network policies are enforced',
    'CRDs are loaded'
  ],
  answer:1,
  explanation:'Job runs pods until they successfully terminate, satisfying completion/parallelism.' },

{ id:'L8-040', lab:8, slide:58, topic:'cronjob', type:'mcq',
  q:'A CronJob is:',
  options:[
    'A storage class',
    'An extension of the Job controller that runs jobs on a cron-like schedule',
    'A type of Service',
    'An RBAC role'
  ],
  answer:1,
  explanation:'CronJob = Job + cron schedule.' },

{ id:'L8-041', lab:8, slide:64, topic:'net-rules', type:'multi',
  q:'Which K8s networking RULES are correct? (select all)',
  options:[
    'Pods can communicate with Pods without NAT',
    'Nodes can communicate with Pods (and vice versa) without NAT',
    'A pod sees the same IP others see it as',
    'Containers in the same pod share network namespace and IP, talking over localhost',
    'Each container in a pod gets a different IP'
  ],
  answers:[0,1,2,3],
  explanation:'Per K8s fundamentals; containers in the same pod share net namespace + IP.' },

{ id:'L8-042', lab:8, slide:65, topic:'cni', type:'multi',
  q:'Which are CNI-compatible NETWORK PLUGINS for K8s? (select all)',
  options:['Calico','Flannel','Cilium','Weave','Multus','docker0'],
  answers:[0,1,2,3,4],
  explanation:'Calico, Cilium, Contiv, Contrail, Flannel, GCE, kube-router, Multus, OpenVSwitch, OVN, Romana, Weave (per slide 65).' },

{ id:'L8-043', lab:8, slide:66, topic:'service-types', type:'mcq',
  q:'Which Service type is the DEFAULT?',
  options:['ClusterIP','NodePort','LoadBalancer','ExternalName'],
  answer:0,
  explanation:'ClusterIP is the default - cluster-internal IP.' },

{ id:'L8-044', lab:8, slide:66, topic:'service-types', type:'mcq',
  q:'Which Service type uses a cloud provider to expose a service on a static external IP?',
  options:['ClusterIP','NodePort','LoadBalancer','ExternalName'],
  answer:2,
  explanation:'LoadBalancer integrates with cloud provider for an external IP.' },

{ id:'L8-045', lab:8, slide:66, topic:'service-types', type:'mcq',
  q:'Which Service type references endpoints OUTSIDE the cluster via a static internally-referenced DNS name?',
  options:['ClusterIP','NodePort','LoadBalancer','ExternalName'],
  answer:3,
  explanation:'ExternalName provides a CNAME-style DNS reference to external endpoints.' },

{ id:'L8-046', lab:8, slide:66, topic:'service-types', type:'mcq',
  q:'NodePort exposes the service on:',
  options:[
    'A cluster-internal IP only',
    'Each node\'s IP at a statically-defined port (e.g. 30000-32767)',
    'A static external IP',
    'A DNS name only'
  ],
  answer:1,
  explanation:'NodePort opens a static port on every node IP.' },

{ id:'L8-047', lab:8, slide:71, topic:'ingress', type:'mcq',
  q:'Compared to NodePort/LoadBalancer, an Ingress is best for:',
  options:[
    'Disabling networking',
    'HTTP(S) routing for multiple services using host/path-based rules',
    'Mounting volumes',
    'Storage migration'
  ],
  answer:1,
  explanation:'Ingress is the HTTP(S) router with host/path rules; supports TLS natively.' },

{ id:'L8-048', lab:8, slide:71, topic:'ingress', type:'truefalse',
  q:'Ingress requires an Ingress Controller to function.',
  bool:true,
  explanation:'Ingress objects need a controller (e.g. nginx, traefik) to enforce them.' },

{ id:'L8-049', lab:8, slide:70, topic:'ingress-ctrl', type:'multi',
  q:'Which are valid Ingress Controllers per Lab 8? (select all)',
  options:['Nginx','HAproxy','Contour','Traefik','etcd','calico'],
  answers:[0,1,2,3],
  explanation:'Listed: Nginx, HAproxy, Contour, Traefik.' },

{ id:'L8-050', lab:8, slide:73, topic:'volume', type:'mcq',
  q:'A Volume in K8s is tied to:',
  options:['Cluster lifecycle','Pod lifecycle','Node lifecycle','Container image lifecycle'],
  answer:1,
  explanation:'Volume = storage tied to the Pod lifecycle.' },

{ id:'L8-051', lab:8, slide:77, topic:'pv', type:'mcq',
  q:'A PersistentVolume (PV):',
  options:[
    'Lives only as long as the Pod that uses it',
    'Represents a storage resource and is provisioned ahead of time; lifecycle is independent of any Pod',
    'Is a type of network',
    'Is the same as a ConfigMap'
  ],
  answer:1,
  explanation:'PV = a storage resource with independent lifecycle.' },

{ id:'L8-052', lab:8, slide:78, topic:'access-modes', type:'multi',
  q:'Which are valid PV accessModes? (select all)',
  options:['ReadOnlyMany (ROX)','ReadWriteOnce (RWO)','ReadWriteMany (RWX)','ExecuteOnce','ReadWriteAny'],
  answers:[0,1,2],
  explanation:'Three valid: ROX, RWO, RWX.' },

{ id:'L8-053', lab:8, slide:78, topic:'reclaim', type:'multi',
  q:'Which are valid PV persistentVolumeReclaimPolicy values? (select all)',
  options:['Retain','Recycle','Delete','Archive','Move'],
  answers:[0,1,2],
  explanation:'Three valid: Retain, Recycle, Delete.' },

{ id:'L8-054', lab:8, slide:79, topic:'pvc', type:'mcq',
  q:'A PersistentVolumeClaim (PVC):',
  options:[
    'Is a storage resource itself',
    'Is a REQUEST for storage that satisfies a set of requirements (commonly with dynamic provisioning)',
    'Is a network policy',
    'Replaces a ConfigMap'
  ],
  answer:1,
  explanation:'PVC is a storage REQUEST.' },

{ id:'L8-055', lab:8, slide:80, topic:'pvc', type:'truefalse',
  q:'PVCs are scoped to NAMESPACES, while PVs are CLUSTER-WIDE resources.',
  bool:true,
  explanation:'PVC = namespaced; PV = cluster-wide and not directly consumable by a Pod.' },

{ id:'L8-056', lab:8, slide:75, topic:'storageclass', type:'multi',
  q:'A StorageClass typically includes which fields? (select all)',
  options:['Provisioner','Parameters','reclaimPolicy','accessModes','externalIP'],
  answers:[0,1,2],
  explanation:'StorageClass fields per slide 76: Provisioner, Parameters, reclaimPolicy.' },

{ id:'L8-057', lab:8, slide:82, topic:'configmap', type:'mcq',
  q:'A ConfigMap is best used for:',
  options:[
    'Storing private credentials encoded in base64 with at-rest encryption',
    'Externalized data (config) referenced as command-line arg, env var, or injected file via volume mount',
    'Distributed key-value cluster state',
    'Container runtime config'
  ],
  answer:1,
  explanation:'ConfigMap externalizes configuration; can be CLI arg, env var, or file mount.' },

{ id:'L8-058', lab:8, slide:82, topic:'secret', type:'mcq',
  q:'A Secret is functionally identical to a ConfigMap but stored:',
  options:[
    'Plain text in etcd',
    'Encoded as BASE64 and encrypted at rest (if configured)',
    'Encrypted with AES only',
    'On the Node\'s local disk in plaintext'
  ],
  answer:1,
  explanation:'Secrets are base64-encoded and (if configured) encrypted at rest.' },

{ id:'L8-059', lab:8, slide:83, topic:'configmap', type:'multi',
  q:'A ConfigMap or Secret can be consumed by a pod by being: (select all)',
  options:[
    'Injected as a file (volume mount)',
    'Passed as an environment variable',
    'Used as a container command (requires passing as env var)',
    'Mounted as a network device'
  ],
  answers:[0,1,2],
  explanation:'Three consumption modes per slide 83.' },

{ id:'L8-060', lab:8, slide:87, topic:'rbac-role', type:'mcq',
  q:'A Role contains rules with VERBS (get/list/watch...) over RESOURCES scoped to apiGroups, scoped to:',
  options:['The cluster','A namespace','A node','A container'],
  answer:1,
  explanation:'Role is scoped to a Namespace.' },

{ id:'L8-061', lab:8, slide:87, topic:'rbac-clusterrole', type:'mcq',
  q:'A ClusterRole differs from a Role because it:',
  options:[
    'Cannot grant verbs',
    'Is scoped CLUSTER-WIDE and can manage non-namespaced resources (like nodes)',
    'Only works for Pods',
    'Has the same scope as a Role'
  ],
  answer:1,
  explanation:'ClusterRole = cluster-wide; can manage non-namespaced resources.' },

{ id:'L8-062', lab:8, slide:90, topic:'rbac-rb', type:'mcq',
  q:'A RoleBinding grants a Role to subjects in:',
  options:['The whole cluster','A namespace','Only the kube-system namespace','Only worker nodes'],
  answer:1,
  explanation:'RoleBinding is namespace-scoped.' },

{ id:'L8-063', lab:8, slide:92, topic:'rbac-crb', type:'mcq',
  q:'A ClusterRoleBinding grants a ClusterRole to subjects:',
  options:['Across the entire cluster','Only in default namespace','To a single pod','To a single service'],
  answer:0,
  explanation:'ClusterRoleBinding spans the whole cluster.' },

{ id:'L8-064', lab:8, slide:88, topic:'rbac-sa', type:'mcq',
  q:'A ServiceAccount provides:',
  options:[
    'A user identity for humans',
    'A consumable IDENTITY for pods or external services interacting with the cluster directly',
    'Cluster-wide auditing',
    'Encryption of secrets'
  ],
  answer:1,
  explanation:'ServiceAccount = identity for pods or external services.' },

{ id:'L8-065', lab:8, slide:93, topic:'rbac-rb', type:'multi',
  q:'A [Cluster]RoleBinding can reference subjects of which kinds? (select all)',
  options:['User','Group','ServiceAccount','Pod','Node'],
  answers:[0,1,2],
  explanation:'Subjects: User, Group, ServiceAccount.' },

{ id:'L8-066', lab:8, slide:93, topic:'rbac-rb', type:'truefalse',
  q:'A [Cluster]RoleBinding\'s roleRef can target multiple roles at once.',
  bool:false,
  explanation:'roleRef targets ONE role only; subjects list can be multiple.' },

{ id:'L8-067', lab:8, slide:71, topic:'svc-vs', type:'mcq',
  q:'Which is true about NodePort?',
  options:[
    'It needs an Ingress Controller to work',
    'External IP is provided by the cloud provider',
    'It opens a port (e.g. 30000-32767) on every node; no external IP from cloud needed',
    'Supports HTTPS natively with certs'
  ],
  answer:2,
  explanation:'NodePort opens a port on every node; no external IP from a cloud provider.' },

{ id:'L8-068', lab:8, slide:71, topic:'svc-vs', type:'mcq',
  q:'Which support TLS NATIVELY (with certs) per the comparison table?',
  options:['NodePort','LoadBalancer','Ingress','ClusterIP'],
  answer:2,
  explanation:'Ingress supports TLS natively with certs.' },

{ id:'L8-069', lab:8, slide:97, topic:'deploy-flow', type:'mcq',
  q:'In the deployment "behind the scenes" sequence, the FIRST thing kubectl does is:',
  options:[
    'Pull container images',
    'Authenticate to apiserver',
    'Client-side validation (linting); manifest serialized to JSON',
    'Schedule the pod'
  ],
  answer:2,
  explanation:'kubectl first lints client-side, serializes to JSON, then sends.' },

{ id:'L8-070', lab:8, slide:98, topic:'deploy-flow', type:'multi',
  q:'In the apiserver request loop, what happens? (select all)',
  options:[
    'Authentication via x509, JWT, http-auth-proxy or http-basic',
    'Authorization iterates Node, ABAC, RBAC, webhook',
    'AdmissionControl checks resource quotas + security',
    'Request stored in etcd',
    'Initializers may mutate before publish',
    'kubectl runs the pod'
  ],
  answers:[0,1,2,3,4],
  explanation:'AuthN, AuthZ, Admission, store in etcd, initializers; kubectl does NOT run the pod itself.' },

{ id:'L8-071', lab:8, slide:102, topic:'scheduler', type:'mcq',
  q:'After Scheduler binds a pod to a node, the pod status becomes:',
  options:['Running','Pending','PodScheduled','CrashLoopBackOff'],
  answer:2,
  explanation:'Pod status set to PodScheduled after the binding is POSTed.' },

{ id:'L8-072', lab:8, slide:104, topic:'pause', type:'mcq',
  q:'The "pause" container is provisioned by kubelet via the CRI to:',
  options:[
    'Hold etcd locks',
    'Act as the PARENT container for the Pod (network plumbing target)',
    'Run init scripts',
    'Replace kube-proxy'
  ],
  answer:1,
  explanation:'pause is the parent container; CNI attaches a veth pair to it.' },

{ id:'L8-073', lab:8, slide:104, topic:'cni', type:'mcq',
  q:'IPAM (IP Address Management) in K8s is handled by:',
  options:['etcd','The CNI plugin','kube-scheduler','The container runtime'],
  answer:1,
  explanation:'CNI plugin handles IPAM and assigns IP to the pause container.' },

{ id:'L8-074', lab:8, slide:106, topic:'pod-status', type:'mcq',
  q:'Before PodStatus is updated to "ready", what runs?',
  options:[
    'Liveness/readiness probes (if any)',
    'A backup',
    'Image promotion',
    'Cluster reboot'
  ],
  answer:0,
  explanation:'Liveness/readiness probes execute before PodStatus is updated to ready.' },

{ id:'L8-075', lab:8, slide:25, topic:'handson', type:'mcq',
  q:'In the hands-on, a pod created with image "nginx123" is in which status?',
  options:['Running','Pending','ImagePullBackOff / ErrImagePull','Completed'],
  answer:2,
  explanation:'"nginx123" doesn\'t exist on Hub; pod stays in ErrImagePull / ImagePullBackOff.' },

{ id:'L8-076', lab:8, slide:36, topic:'strategy-rolling', type:'mcq',
  q:'In Lab 8 hands-on, the strategy used to upgrade deployment-1 from busybox to nginx is:',
  options:['Recreate','RollingUpdate','Blue/Green','Canary'],
  answer:1,
  explanation:'Default Deployment strategy is RollingUpdate, observed in describe events.' },

{ id:'L8-077', lab:8, slide:23, topic:'kubectl-cmd', type:'fill',
  q:'List all api-resources known to the cluster.',
  accept:['kubectl api-resources'],
  explanation:'kubectl api-resources lists all available resource types.' },

{ id:'L8-078', lab:8, slide:42, topic:'kubectl-cmd', type:'fill',
  q:'List all running pods with WIDE output (showing node assignment).',
  accept:['kubectl get po -o wide','kubectl get pods -o wide'],
  explanation:'-o wide adds extra columns like NODE.' },

{ id:'L8-079', lab:8, slide:42, topic:'kubectl-cmd', type:'fill',
  q:'Replace an existing resource using the manifest in pod.yml.',
  accept:['kubectl replace -f pod.yml','kubectl replace -f pod.yaml'],
  explanation:'kubectl replace -f file.yml replaces an existing resource.' },

{ id:'L8-080', lab:8, slide:14, topic:'kube-proxy', type:'mcq',
  q:'Which kube-proxy mode is generally noted as offering BETTER PERFORMANCE?',
  options:['userspace','iptables','ipvs','etcd-based'],
  answer:2,
  explanation:'ipvs uses IP Virtual Server for better performance than userspace/iptables.' },

{ id:'L8-081', lab:8, slide:34, topic:'deployment', type:'mcq',
  q:'A Deployment generates and manages which underlying object?',
  options:['Pod directly only','A ReplicaSet','A StatefulSet','A DaemonSet'],
  answer:1,
  explanation:'Deployment generates a ReplicaSet from its pod template.' },

{ id:'L8-082', lab:8, slide:6, topic:'pod', type:'truefalse',
  q:'A pod can contain MORE THAN ONE container that shares storage, network and context.',
  bool:true,
  explanation:'A pod can have one or more containers sharing storage, network, namespace, cgroups.' },

{ id:'L8-083', lab:8, slide:14, topic:'kubelet', type:'truefalse',
  q:'kubelet takes PodSpecs (YAML manifests) and ensures the described containers are running and healthy.',
  bool:true,
  explanation:'kubelet ensures the desired pod state on its node.' },

{ id:'L8-084', lab:8, slide:64, topic:'net-ip', type:'mcq',
  q:'Containers in the same pod communicate over:',
  options:['localhost (shared network namespace)','A NodePort','A LoadBalancer','etcd'],
  answer:0,
  explanation:'They share the network namespace and IP - communicate via localhost.' },

{ id:'L8-085', lab:8, slide:18, topic:'minikube', type:'truefalse',
  q:'Minikube comes with a Docker container runtime pre-installed.',
  bool:true,
  explanation:'Minikube is bundled with Docker container runtime pre-installed.' },

{ id:'L8-086', lab:8, slide:71, topic:'svc-vs', type:'mcq',
  q:'Which gives an external IP automatically from the cloud provider?',
  options:['NodePort','LoadBalancer','Ingress','ClusterIP'],
  answer:1,
  explanation:'LoadBalancer gets an external IP from the cloud provider.' },

{ id:'L8-087', lab:8, slide:71, topic:'svc-vs', type:'truefalse',
  q:'Ingress can route traffic for MULTIPLE services using HTTP rules (host/path-based) and a SHARED external IP.',
  bool:true,
  explanation:'Ingress = single shared external IP routing to many services.' },

{ id:'L8-088', lab:8, slide:11, topic:'reconcile', type:'mcq',
  q:'In K8s controllers, "reconciliation" means:',
  options:[
    'Backup and restore',
    'Comparing desired vs current state and taking action to bring them in sync',
    'Cluster shutdown',
    'Encryption rotation'
  ],
  answer:1,
  explanation:'Controllers reconcile the desired state vs the current state.' },

{ id:'L8-089', lab:8, slide:106, topic:'pod-status', type:'mcq',
  q:'When all probes succeed, the pod is set to ___, meaning it has started successfully.',
  options:['Pending','PodScheduled','ready','Failed'],
  answer:2,
  explanation:'PodStatus = ready once probes pass.' },

{ id:'L8-090', lab:8, slide:65, topic:'cni', type:'mcq',
  q:'Networking within K8s is plumbed via:',
  options:['CSI (Container Storage Interface)','CRI (Container Runtime Interface)','CNI (Container Network Interface)','CDI'],
  answer:2,
  explanation:'CNI = Container Network Interface, the K8s networking plumbing.' },

{ id:'L8-091', lab:8, slide:23, topic:'kubectl-cmd', type:'fill',
  q:'Get a list of all pods in the current namespace.',
  accept:['kubectl get pods','kubectl get po'],
  explanation:'kubectl get pods (short: po).' },

{ id:'L8-092', lab:8, slide:23, topic:'kubectl-cmd', type:'fill',
  q:'Delete the pod named "redis".',
  accept:['kubectl delete pod redis','kubectl delete po redis'],
  explanation:'kubectl delete pod <name>.' }

];

// Self-check counts (used by dashboard / verify step)
window.QUESTION_COUNTS = (function(){
  const c = {1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,total: window.QUESTIONS.length};
  for (const q of window.QUESTIONS) c[q.lab] = (c[q.lab]||0) + 1;
  return c;
})();
