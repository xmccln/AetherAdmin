document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航菜单切换
    initializeNavigation();
    
    // 初始化图表
    initCharts();
    
    // 加载实例数据
    loadInstanceData();
    
    // 创建实例按钮事件
    document.getElementById('createInstanceBtn').addEventListener('click', createInstance);
    
    // 初始化下拉选择框
    populateSelectOptions();
    
    // 初始化主题切换
    initializeThemeToggle();
    
    // 初始化存储管理
    initStorageManagement();
});

// 导航菜单初始化
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活动类
            navLinks.forEach(item => item.classList.remove('active'));
            
            // 隐藏所有区域
            document.querySelectorAll('[id$="-section"]').forEach(section => {
                section.classList.add('section-hidden');
                section.classList.remove('section-active');
            });
            
            // 添加活动类到当前链接
            this.classList.add('active');
            
            // 显示对应区域
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(`${targetId}-section`).classList.add('section-active');
            document.getElementById(`${targetId}-section`).classList.remove('section-hidden');
        });
    });
}

// 初始化主题切换
function initializeThemeToggle() {
    const themeToggle = document.querySelector('.swap input[type="checkbox"]');
    
    // 检查本地存储中的主题首选项
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'dark';
    
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

// 初始化图表
function initCharts() {
    // 资源使用趋势图 (使用TailAdmin ApexCharts)
    const resourceChartOptions = {
        chart: {
            height: 335,
            type: 'area',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            toolbar: {
                show: false
            }
        },
        colors: ['#3C50E0', '#80CAEE', '#FF9800'],
        series: [
            {
                name: 'CPU 使用率',
                data: [23, 30, 42, 38, 41, 44, 46, 60, 55, 53, 42, 45]
            },
            {
                name: '内存使用率',
                data: [30, 36, 42, 35, 40, 52, 58, 65, 61, 57, 50, 49]
            },
            {
                name: '存储使用率',
                data: [45, 50, 52, 53, 55, 60, 65, 70, 72, 75, 76, 78]
            }
        ],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: [
                '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'
            ]
        },
        tooltip: {
            y: {
                formatter: function(val) {
                    return val + '%';
                }
            }
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 0,
                right: 0
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right'
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.3
            }
        }
    };

    const resourceChart = new ApexCharts(
        document.getElementById('resourceChart'),
        resourceChartOptions
    );
    resourceChart.render();
    
    // 实例类型分布图 (饼图)
    const instanceChartOptions = {
        chart: {
            type: 'donut',
            width: '100%',
            height: '100%',
            fontFamily: 'Segoe UI, Arial, sans-serif',
        },
        colors: ['#3C50E0', '#0FADCF', '#80CAEE', '#6577F3', '#AAADE9'],
        labels: ['小型实例', '中型实例', '大型实例', '计算优化型', '内存优化型'],
        series: [35, 25, 20, 15, 5],
        legend: {
            show: true,
            position: 'bottom'
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%'
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    chart: {
                        height: 250,
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        ]
    };

    const instanceChart = new ApexCharts(
        document.getElementById('instanceTypePieChart'),
        instanceChartOptions
    );
    instanceChart.render();
}

// 加载实例数据
function loadInstanceData() {
    const tableBody = document.querySelector('#instances-section table');
    
    // 表头
    tableBody.innerHTML = `
        <thead>
            <tr>
                <th>实例名称</th>
                <th>状态</th>
                <th>镜像</th>
                <th>类型</th>
                <th>IP地址</th>
                <th>创建时间</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody id="instancesTableBody">
        </tbody>
    `;
    
    const instancesTableBody = document.getElementById('instancesTableBody');
    
    // 添加实例数据行
    mockData.instances.forEach(instance => {
        const row = document.createElement('tr');
        
        // 格式化日期
        const createdDate = new Date(instance.createdAt);
        const formattedDate = `${createdDate.toLocaleDateString()} ${createdDate.toLocaleTimeString()}`;
        
        // 设置状态样式类
        let statusClass = '';
        switch (instance.status) {
            case 'running':
                statusClass = 'status-running';
                break;
            case 'stopped':
                statusClass = 'status-stopped';
                break;
            case 'error':
                statusClass = 'status-error';
                break;
            default:
                statusClass = '';
        }
        
        // 行内容
        row.innerHTML = `
            <td>${instance.name}</td>
            <td><span class="status-badge ${statusClass}">${instance.status}</span></td>
            <td>${instance.image}</td>
            <td>${instance.type}</td>
            <td>${instance.ip}</td>
            <td>${formattedDate}</td>
            <td>
                <div class="dropdown dropdown-end">
                    <label tabindex="0" class="btn btn-xs btn-ghost">
                        <i class="bi bi-three-dots-vertical"></i>
                    </label>
                    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        ${instance.status === 'running' ? 
                            '<li><a onclick="manageInstance(\'' + instance.id + '\', \'stop\')"><i class="bi bi-stop-circle mr-2"></i>停止</a></li>' : 
                            '<li><a onclick="manageInstance(\'' + instance.id + '\', \'start\')"><i class="bi bi-play-circle mr-2"></i>启动</a></li>'
                        }
                        <li><a onclick="manageInstance('${instance.id}', 'restart')"><i class="bi bi-arrow-clockwise mr-2"></i>重启</a></li>
                        <li><a onclick="manageInstance('${instance.id}', 'delete')"><i class="bi bi-trash mr-2"></i>删除</a></li>
                    </ul>
                </div>
            </td>
        `;
        
        instancesTableBody.appendChild(row);
    });
}

// 实例操作
function manageInstance(id, action) {
    // 查找实例
    const instance = mockData.instances.find(inst => inst.id === id);
    
    if (!instance) {
        showToast('未找到指定实例', 'alert-error');
        return;
    }
    
    let actionText = '';
    let successMessage = '';
    
    switch(action) {
        case 'start':
            actionText = '启动';
            instance.status = 'running';
            successMessage = `实例 ${instance.name} 已成功启动`;
            break;
        case 'stop':
            actionText = '停止';
            instance.status = 'stopped';
            successMessage = `实例 ${instance.name} 已成功停止`;
            break;
        case 'restart':
            actionText = '重启';
            instance.status = 'running';
            successMessage = `实例 ${instance.name} 已成功重启`;
            break;
        case 'delete':
            actionText = '删除';
            // 从数组中移除实例
            const index = mockData.instances.findIndex(inst => inst.id === id);
            if (index !== -1) {
                mockData.instances.splice(index, 1);
            }
            successMessage = `实例 ${instance.name} 已成功删除`;
            break;
    }
    
    // 显示操作中提示
    showToast(`正在${actionText}实例 ${instance.name}...`, 'alert-info');
    
    // 模拟异步操作
    setTimeout(() => {
        // 重新加载实例数据
        loadInstanceData();
        
        // 显示成功提示
        showToast(successMessage, 'alert-success');
    }, 1000);
}

// 创建新实例
function createInstance() {
    const instanceName = document.getElementById('instanceName').value.trim();
    const imageSelect = document.getElementById('imageSelect').value;
    const instanceType = document.getElementById('instanceType').value;
    const diskSize = document.getElementById('diskSize').value;
    const networkSelect = document.getElementById('networkSelect').value;
    const enableFirewall = document.getElementById('enableFirewall').checked;
    const enableBackup = document.getElementById('enableBackup').checked;
    
    // 验证输入
    if (!instanceName) {
        showToast('请输入实例名称', 'alert-warning');
        return;
    }
    
    // 检索选择的镜像和实例类型的详细信息
    const selectedImage = mockData.options.images.find(img => img.id === imageSelect);
    const selectedType = mockData.options.instanceTypes.find(type => type.id === instanceType);
    const selectedNetwork = mockData.options.networks.find(net => net.id === networkSelect);
    
    // 模拟IP地址生成
    const ipSegments = [10, 0, Math.floor(Math.random() * 10), Math.floor(Math.random() * 254) + 1];
    const randomIP = ipSegments.join('.');
    
    // 创建新实例对象
    const newInstance = {
        id: `inst-${Math.floor(Math.random() * 10000).toString().padStart(3, '0')}`,
        name: instanceName,
        status: 'running',
        image: selectedImage ? selectedImage.name : '未知镜像',
        type: selectedType ? selectedType.id : '未知类型',
        cpu: selectedType ? selectedType.cpu : '1 vCPU',
        memory: selectedType ? selectedType.memory : '1 GB',
        storage: `${diskSize} GB`,
        network: selectedNetwork ? selectedNetwork.name : '默认网络',
        ip: randomIP,
        createdAt: new Date().toISOString(),
        tags: []
    };
    
    // 显示创建中提示
    showToast(`正在创建实例 ${instanceName}...`, 'alert-info');
    
    // 模拟异步创建过程
    setTimeout(() => {
        // 添加到实例数组
        mockData.instances.push(newInstance);
        
        // 重新加载实例数据
        loadInstanceData();
        
        // 关闭模态框
        document.getElementById('create-instance-modal').close();
        
        // 显示成功提示
        showToast(`实例 ${instanceName} 创建成功！`, 'alert-success');
        
        // 重置表单
        document.querySelector('#create-instance-modal form').reset();
    }, 1500);
}

// 显示提示消息
function showToast(message, bgClass = 'alert-success') {
    // 确保有Toast容器
    const toastContainer = document.getElementById('toast-container') || createToastContainer();
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = `toast-notification ${bgClass}`;
    toast.innerHTML = `<span>${message}</span>`;
    
    // 添加到容器
    toastContainer.appendChild(toast);
    
    // 设置自动消失
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// 创建Toast容器
function createToastContainer() {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast toast-end';
    document.body.appendChild(container);
    return container;
}

// 填充下拉选择框
function populateSelectOptions() {
    const imageSelect = document.getElementById('imageSelect');
    const instanceType = document.getElementById('instanceType');
    const networkSelect = document.getElementById('networkSelect');
    
    // 清空并填充操作系统选项
    imageSelect.innerHTML = '';
    mockData.options.images.forEach(img => {
        const option = document.createElement('option');
        option.value = img.id;
        option.textContent = img.name;
        imageSelect.appendChild(option);
    });
    
    // 清空并填充实例类型选项
    instanceType.innerHTML = '';
    mockData.options.instanceTypes.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id;
        option.textContent = type.name;
        instanceType.appendChild(option);
    });
    
    // 清空并填充网络选项
    networkSelect.innerHTML = '';
    mockData.options.networks.forEach(net => {
        const option = document.createElement('option');
        option.value = net.id;
        option.textContent = net.name;
        networkSelect.appendChild(option);
    });
}

// 初始化存储管理功能
function initStorageManagement() {
    // 加载存储卷数据
    loadVolumeData();
    
    // 初始化存储性能图表
    initStoragePerformanceChart();
    
    // 挂载创建存储卷按钮事件
    document.getElementById('createVolumeBtn').addEventListener('click', createVolume);
    
    // 挂载挂载存储卷按钮事件
    document.getElementById('mountVolumeBtn').addEventListener('click', mountVolume);
    
    // 填充挂载实例下拉菜单
    populateMountInstanceSelect();
}

// 加载存储卷数据
function loadVolumeData() {
    const tableBody = document.getElementById('volume-table-body');
    if (!tableBody) return;
    
    // 清空表格
    tableBody.innerHTML = '';
    
    // 填充存储卷数据
    volumeData.forEach(volume => {
        const row = document.createElement('tr');
        
        // 设置状态样式
        let statusClass = 'badge-ghost';
        let statusText = '未知';
        
        if (volume.status === 'in-use') {
            statusClass = 'badge-success';
            statusText = '已挂载';
        } else if (volume.status === 'available') {
            statusClass = 'badge-info';
            statusText = '可用';
        } else if (volume.status === 'creating') {
            statusClass = 'badge-warning';
            statusText = '创建中';
        } else if (volume.status === 'error') {
            statusClass = 'badge-error';
            statusText = '错误';
        }
        
        // 使用情况进度条颜色
        let usageColorClass = 'progress-success';
        if (volume.usagePercent > 80) {
            usageColorClass = 'progress-error';
        } else if (volume.usagePercent > 60) {
            usageColorClass = 'progress-warning';
        }
        
        row.innerHTML = `
            <td class="font-mono text-xs">${volume.id}</td>
            <td>${volume.name}</td>
            <td>${volumeTypeMap[volume.type] || volume.type}</td>
            <td>${volume.size} GB</td>
            <td>
                <div class="flex items-center gap-2">
                    <progress class="progress ${usageColorClass} w-14" value="${volume.usagePercent}" max="100"></progress>
                    <span>${volume.usagePercent}%</span>
                </div>
            </td>
            <td><span class="badge ${statusClass} status-badge">${statusText}</span></td>
            <td>${volume.attachmentPoint || '未挂载'}</td>
            <td>
                <div class="flex gap-1">
                    ${volume.status === 'available' ? 
                        `<button class="btn btn-xs btn-outline" onclick="showMountModal('${volume.id}')">
                            <i class="bi bi-hdd-rack"></i> 挂载
                        </button>` : 
                        `<button class="btn btn-xs btn-outline" onclick="unmountVolume('${volume.id}')">
                            <i class="bi bi-hdd-rack-fill"></i> 卸载
                        </button>`
                    }
                    <button class="btn btn-xs btn-error btn-outline" onclick="deleteVolume('${volume.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// 初始化存储性能图表
function initStoragePerformanceChart() {
    const options = {
        chart: {
            height: 335,
            type: 'line',
            fontFamily: 'Segoe UI, Arial, sans-serif',
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            }
        },
        colors: ['#3C50E0', '#80CAEE', '#FF9800'],
        series: [
            {
                name: 'IOPS',
                data: storagePerformanceData.iops
            },
            {
                name: '吞吐量 (MB/s)',
                data: storagePerformanceData.throughput
            },
            {
                name: '延迟 (ms)',
                data: storagePerformanceData.latency
            }
        ],
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
            width: 2
        },
        xaxis: {
            categories: storagePerformanceData.timestamps
        },
        tooltip: {
            shared: true,
            intersect: false
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 0,
                right: 0
            }
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'right'
        },
        markers: {
            size: 4,
            hover: {
                size: 6
            }
        }
    };

    const storageChart = new ApexCharts(
        document.getElementById('storagePerformanceChart'),
        options
    );
    storageChart.render();
}

// 显示挂载模态框
function showMountModal(volumeId) {
    // 设置当前处理的卷ID
    document.getElementById('mountVolumeId').value = volumeId;
    
    // 显示模态框
    document.getElementById('mount-volume-modal').showModal();
}

// 填充挂载实例选择下拉菜单
function populateMountInstanceSelect() {
    const select = document.getElementById('mountInstanceSelect');
    if (!select) return;
    
    // 清空现有选项
    select.innerHTML = '';
    
    // 添加实例选项 (使用模拟数据)
    const instances = [
        { id: 'i-1234567890abcdef0', name: '应用服务器-01' },
        { id: 'i-234567890abcdef01', name: '数据库服务器-01' },
        { id: 'i-34567890abcdef012', name: '缓存服务器-01' },
        { id: 'i-4567890abcdef0123', name: '分析服务器-01' }
    ];
    
    instances.forEach(instance => {
        const option = document.createElement('option');
        option.value = instance.id;
        option.textContent = `${instance.name} (${instance.id})`;
        select.appendChild(option);
    });
}

// 创建存储卷
function createVolume() {
    // 获取表单数据
    const name = document.getElementById('volumeName').value;
    const type = document.getElementById('volumeType').value;
    const size = parseInt(document.getElementById('volumeSize').value);
    const zone = document.getElementById('volumeZone').value;
    const iops = parseInt(document.getElementById('volumeIops').value);
    const encrypted = document.getElementById('enableEncryption').checked;
    const backup = document.getElementById('enableBackup').checked;
    
    // 验证表单
    if (!name || !type || !size || !zone || !iops) {
        showToast('请填写所有必填字段', 'alert-error');
        return;
    }
    
    // 生成随机ID (模拟)
    const id = 'vol-' + Math.random().toString(36).substring(2, 12);
    
    // 创建新存储卷对象
    const newVolume = {
        id,
        name,
        type,
        size,
        usagePercent: 0,
        status: 'creating',
        createdAt: new Date().toISOString(),
        attachedTo: null,
        attachmentPoint: null,
        zone,
        iops,
        throughput: type === 'gp3' ? 125 : (type === 'io2' ? 500 : 250),
        encrypted
    };
    
    // 添加到数据中
    volumeData.push(newVolume);
    
    // 刷新表格
    loadVolumeData();
    
    // 关闭模态框
    document.getElementById('create-volume-modal').close();
    
    // 显示成功消息
    showToast('存储卷创建中，请稍候...', 'alert-info');
    
    // 模拟创建完成 (2秒后)
    setTimeout(() => {
        // 更新状态
        const index = volumeData.findIndex(v => v.id === id);
        if (index !== -1) {
            volumeData[index].status = 'available';
            loadVolumeData();
            showToast('存储卷创建成功！', 'alert-success');
        }
    }, 2000);
}

// 挂载存储卷
function mountVolume() {
    // 获取表单数据
    const volumeId = document.getElementById('mountVolumeId').value;
    const instanceId = document.getElementById('mountInstanceSelect').value;
    const deviceName = document.getElementById('deviceName').value;
    
    // 验证表单
    if (!volumeId || !instanceId || !deviceName) {
        showToast('请填写所有必填字段', 'alert-error');
        return;
    }
    
    // 查找并更新存储卷状态
    const volumeIndex = volumeData.findIndex(v => v.id === volumeId);
    if (volumeIndex !== -1) {
        volumeData[volumeIndex].status = 'in-use';
        volumeData[volumeIndex].attachedTo = instanceId;
        volumeData[volumeIndex].attachmentPoint = deviceName;
        
        // 刷新表格
        loadVolumeData();
        
        // 关闭模态框
        document.getElementById('mount-volume-modal').close();
        
        // 显示成功消息
        showToast('存储卷挂载成功！', 'alert-success');
    } else {
        showToast('找不到指定的存储卷', 'alert-error');
    }
}

// 卸载存储卷
function unmountVolume(volumeId) {
    // 确认
    if (!confirm('确定要卸载此存储卷吗？')) {
        return;
    }
    
    // 查找并更新存储卷状态
    const volumeIndex = volumeData.findIndex(v => v.id === volumeId);
    if (volumeIndex !== -1) {
        // 显示处理中消息
        showToast('正在卸载存储卷...', 'alert-info');
        
        // 模拟卸载过程 (1秒)
        setTimeout(() => {
            volumeData[volumeIndex].status = 'available';
            volumeData[volumeIndex].attachedTo = null;
            volumeData[volumeIndex].attachmentPoint = null;
            
            // 刷新表格
            loadVolumeData();
            
            // 显示成功消息
            showToast('存储卷卸载成功！', 'alert-success');
        }, 1000);
    } else {
        showToast('找不到指定的存储卷', 'alert-error');
    }
}

// 删除存储卷
function deleteVolume(volumeId) {
    // 确认
    if (!confirm('确定要删除此存储卷吗？此操作无法撤销！')) {
        return;
    }
    
    // 查找存储卷索引
    const volumeIndex = volumeData.findIndex(v => v.id === volumeId);
    if (volumeIndex !== -1) {
        // 检查是否已挂载
        if (volumeData[volumeIndex].status === 'in-use') {
            showToast('无法删除已挂载的存储卷，请先卸载', 'alert-error');
            return;
        }
        
        // 显示处理中消息
        showToast('正在删除存储卷...', 'alert-warning');
        
        // 模拟删除过程 (1.5秒)
        setTimeout(() => {
            // 删除存储卷
            volumeData.splice(volumeIndex, 1);
            
            // 刷新表格
            loadVolumeData();
            
            // 显示成功消息
            showToast('存储卷已删除！', 'alert-success');
        }, 1500);
    } else {
        showToast('找不到指定的存储卷', 'alert-error');
    }
}