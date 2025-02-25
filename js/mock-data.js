/**
 * 云主机管理系统模拟数据
 * 提供前端开发和测试使用的模拟数据
 */

// 图表数据
const chartData = {
    resourceTrend: {
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        cpu: [23, 30, 42, 38, 41, 44, 46, 60, 55, 53, 42, 45],
        memory: [30, 36, 42, 35, 40, 52, 58, 65, 61, 57, 50, 49],
        storage: [45, 50, 52, 53, 55, 60, 65, 70, 72, 75, 76, 78]
    },
    instanceDistribution: {
        types: ['小型实例', '中型实例', '大型实例', '计算优化型', '内存优化型'],
        values: [35, 25, 20, 15, 5]
    }
};

// 存储卷数据
const volumeData = [
    {
        id: 'vol-0a1b2c3d4e5f6',
        name: '系统存储卷-01',
        type: 'gp3',
        size: 100,
        usagePercent: 72,
        status: 'in-use',
        createdAt: '2023-06-15T08:30:00Z',
        attachedTo: 'i-1234567890abcdef0',
        attachmentPoint: '/dev/sda1',
        zone: 'az-a',
        iops: 3000,
        throughput: 125,
        encrypted: true
    },
    {
        id: 'vol-1b2c3d4e5f6a7',
        name: '数据存储卷-01',
        type: 'io2',
        size: 500,
        usagePercent: 45,
        status: 'in-use',
        createdAt: '2023-07-05T11:25:00Z',
        attachedTo: 'i-234567890abcdef01',
        attachmentPoint: '/dev/sdf',
        zone: 'az-b',
        iops: 5000,
        throughput: 500,
        encrypted: true
    },
    {
        id: 'vol-2c3d4e5f6a7b8',
        name: '备份存储卷-01',
        type: 'st1',
        size: 1000,
        usagePercent: 68,
        status: 'in-use',
        createdAt: '2023-05-20T14:15:00Z',
        attachedTo: 'i-34567890abcdef012',
        attachmentPoint: '/dev/sdg',
        zone: 'az-a',
        iops: 500,
        throughput: 500,
        encrypted: false
    },
    {
        id: 'vol-3d4e5f6a7b8c9',
        name: '归档存储卷-01',
        type: 'sc1',
        size: 2000,
        usagePercent: 89,
        status: 'in-use',
        createdAt: '2023-04-10T16:45:00Z',
        attachedTo: 'i-4567890abcdef0123',
        attachmentPoint: '/dev/sdh',
        zone: 'az-c',
        iops: 250,
        throughput: 250,
        encrypted: true
    },
    {
        id: 'vol-4e5f6a7b8c9d0',
        name: '临时存储卷-01',
        type: 'gp3',
        size: 50,
        usagePercent: 12,
        status: 'available',
        createdAt: '2023-08-01T09:50:00Z',
        attachedTo: null,
        attachmentPoint: null,
        zone: 'az-b',
        iops: 3000,
        throughput: 125,
        encrypted: false
    }
];

// 存储性能数据
const storagePerformanceData = {
    timestamps: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    iops: [320, 340, 580, 720, 510, 350],
    throughput: [25, 30, 75, 110, 65, 40],
    latency: [2, 3, 8, 12, 7, 4]
};

// 存储卷类型映射
const volumeTypeMap = {
    'gp3': '通用型SSD',
    'io2': '高性能SSD',
    'st1': '吞吐优化型',
    'sc1': '冷存储'
};

// 实例数据
const instancesData = [
    {
        id: 'inst-001',
        name: 'web-server-prod',
        status: 'running',
        image: 'Ubuntu 20.04 LTS',
        type: 't2.medium',
        cpu: '2 vCPU',
        memory: '4 GB',
        storage: '50 GB',
        network: 'private-net-1',
        ip: '10.0.1.15',
        createdAt: '2023-05-12T08:30:45',
        tags: ['production', 'web']
    },
    {
        id: 'inst-002',
        name: 'db-server-prod',
        status: 'running',
        image: 'CentOS 8',
        type: 't2.large',
        cpu: '4 vCPU',
        memory: '8 GB',
        storage: '120 GB',
        network: 'private-net-1',
        ip: '10.0.1.16',
        createdAt: '2023-05-12T09:15:22',
        tags: ['production', 'database']
    },
    {
        id: 'inst-003',
        name: 'dev-environment',
        status: 'stopped',
        image: 'Ubuntu 22.04 LTS',
        type: 't2.small',
        cpu: '1 vCPU',
        memory: '2 GB',
        storage: '40 GB',
        network: 'private-net-2',
        ip: '10.0.2.5',
        createdAt: '2023-07-03T14:22:10',
        tags: ['development']
    },
    {
        id: 'inst-004',
        name: 'test-server',
        status: 'error',
        image: 'Debian 11',
        type: 't2.small',
        cpu: '1 vCPU',
        memory: '2 GB',
        storage: '30 GB',
        network: 'private-net-2',
        ip: '10.0.2.8',
        createdAt: '2023-08-17T11:42:35',
        tags: ['testing']
    },
    {
        id: 'inst-005',
        name: 'cache-server',
        status: 'running',
        image: 'Alpine Linux',
        type: 't2.micro',
        cpu: '1 vCPU',
        memory: '1 GB',
        storage: '20 GB',
        network: 'private-net-1',
        ip: '10.0.1.20',
        createdAt: '2023-09-01T16:08:12',
        tags: ['production', 'cache']
    }
];

// 资源使用数据 - 过去7天
const resourceUsageData = {
    dates: ['2023-09-25', '2023-09-26', '2023-09-27', '2023-09-28', '2023-09-29', '2023-09-30', '2023-10-01'],
    cpu: [45, 52, 49, 60, 55, 58, 62],
    memory: [38, 40, 45, 52, 48, 50, 53],
    storage: [68, 70, 72, 71, 73, 74, 75],
    network: [25, 38, 42, 30, 55, 45, 40]
};

// 可用选项数据
const availableOptions = {
    images: [
        {id: 'ubuntu-20-04', name: 'Ubuntu 20.04 LTS'},
        {id: 'ubuntu-22-04', name: 'Ubuntu 22.04 LTS'},
        {id: 'debian-11', name: 'Debian 11'},
        {id: 'centos-8', name: 'CentOS 8'},
        {id: 'alpine', name: 'Alpine Linux'},
        {id: 'windows-2019', name: 'Windows Server 2019'},
        {id: 'windows-2022', name: 'Windows Server 2022'}
    ],
    instanceTypes: [
        {id: 't2.micro', name: 't2.micro (1 vCPU, 1 GB RAM)', cpu: '1 vCPU', memory: '1 GB'},
        {id: 't2.small', name: 't2.small (1 vCPU, 2 GB RAM)', cpu: '1 vCPU', memory: '2 GB'},
        {id: 't2.medium', name: 't2.medium (2 vCPU, 4 GB RAM)', cpu: '2 vCPU', memory: '4 GB'},
        {id: 't2.large', name: 't2.large (4 vCPU, 8 GB RAM)', cpu: '4 vCPU', memory: '8 GB'},
        {id: 't2.xlarge', name: 't2.xlarge (8 vCPU, 16 GB RAM)', cpu: '8 vCPU', memory: '16 GB'}
    ],
    networks: [
        {id: 'default', name: '默认网络'},
        {id: 'private-net-1', name: '专用网络 1 (10.0.1.0/24)'},
        {id: 'private-net-2', name: '专用网络 2 (10.0.2.0/24)'},
        {id: 'public-net', name: '公共网络 (DHCP)'}
    ]
};

// 实例类型分布
const instanceTypeDistribution = [
    {name: 't2.micro', value: 12},
    {name: 't2.small', value: 18},
    {name: 't2.medium', value: 25},
    {name: 't2.large', value: 15},
    {name: 't2.xlarge', value: 8}
];

// 操作系统分布
const osDistribution = [
    {name: 'Ubuntu', value: 42},
    {name: 'CentOS', value: 18},
    {name: 'Debian', value: 15},
    {name: 'Windows', value: 12},
    {name: 'Alpine', value: 8},
    {name: 'Other', value: 5}
];

// 导出所有模拟数据
const mockData = {
    instances: instancesData,
    resourceUsage: resourceUsageData,
    options: availableOptions,
    instanceTypeDistribution: instanceTypeDistribution,
    osDistribution: osDistribution,
    chartData: chartData
};
