// 初始化所有图表
document.addEventListener('DOMContentLoaded', function() {
    initTimeline();
    initMap();
    initLiteratureTree();
    initHerbsMap();
    initHerbsFrequency();
    initDiagnosisFlow();
    initCultureMap();
});

// 时间轴图表
function initTimeline() {
    const timelineChart = echarts.init(document.getElementById('timeline'));
    const option = {
        title: {
            text: '中医药发展时间轴'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'time',
            axisLabel: {
                formatter: function(value) {
                    return value.getFullYear() + '年';
                }
            }
        },
        yAxis: {
            type: 'category',
            data: ['经典著作', '重要发现', '理论发展', '技术革新']
        },
        series: [
            {
                name: '重要事件',
                type: 'scatter',
                data: [
                    ['-2697', 0, '黄帝内经成书'],
                    ['-475', 1, '扁鹊发现经络'],
                    ['-206', 2, '张仲景著伤寒论'],
                    ['659', 3, '唐本草编撰'],
                    ['1578', 0, '本草纲目成书']
                ],
                symbolSize: 10,
                label: {
                    show: true,
                    formatter: '{c}'
                }
            }
        ]
    };
    timelineChart.setOption(option);
}

// 地图图表
function initMap() {
    const mapChart = echarts.init(document.getElementById('map'));
    const option = {
        title: {
            text: '中医药文化传播路线'
        },
        tooltip: {
            trigger: 'item'
        },
        geo: {
            map: 'china',
            roam: true,
            label: {
                show: true
            }
        },
        series: [
            {
                name: '传播路线',
                type: 'lines',
                data: [
                    {
                        coords: [[116.4, 39.9], [34.8, 113.6]], // 北京到洛阳
                        lineStyle: {
                            color: '#f00'
                        }
                    },
                    {
                        coords: [[34.8, 113.6], [30.6, 114.3]], // 洛阳到武汉
                        lineStyle: {
                            color: '#0f0'
                        }
                    }
                ]
            }
        ]
    };
    mapChart.setOption(option);
}

// 文献树状图
function initLiteratureTree() {
    const literatureChart = echarts.init(document.getElementById('literature-tree'));
    const option = {
        title: {
            text: '中医经典文献关系'
        },
        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
        },
        series: [
            {
                type: 'tree',
                data: [{
                    name: '黄帝内经',
                    children: [
                        { name: '素问' },
                        { name: '灵枢' }
                    ]
                }, {
                    name: '伤寒论',
                    children: [
                        { name: '辨太阳病脉证并治' },
                        { name: '辨阳明病脉证并治' }
                    ]
                }],
                top: '5%',
                left: '5%',
                bottom: '5%',
                right: '5%',
                symbolSize: 7,
                label: {
                    position: 'left',
                    verticalAlign: 'middle',
                    align: 'right'
                },
                leaves: {
                    label: {
                        position: 'right',
                        verticalAlign: 'middle',
                        align: 'left'
                    }
                },
                emphasis: {
                    focus: 'descendant'
                },
                expandAndCollapse: true,
                animationDuration: 550,
                animationDurationUpdate: 750
            }
        ]
    };
    literatureChart.setOption(option);
}

// 药材分布地图
function initHerbsMap() {
    const herbsMapChart = echarts.init(document.getElementById('herbs-map'));
    const option = {
        title: {
            text: '主要药材产地分布'
        },
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.data && params.data.image) {
                    return `${params.name}<br/>
                            <img src="${params.data.image}" style="width:100px;height:100px;"/>
                            <br/>主要药材：${params.data.herbs.join(', ')}`;
                }
                return params.name;
            }
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '药材分布',
                type: 'map',
                map: 'china',
                roam: true,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {
                        name: '吉林',
                        value: 90,
                        image: 'images/ginseng.jpg',
                        herbs: ['人参', '鹿茸', '五味子']
                    },
                    {
                        name: '四川',
                        value: 85,
                        image: 'images/sichuan.jpg',
                        herbs: ['川贝母', '川芎', '川乌']
                    },
                    {
                        name: '云南',
                        value: 80,
                        image: 'images/yunnan.jpg',
                        herbs: ['三七', '天麻', '石斛']
                    },
                    {
                        name: '广西',
                        value: 75,
                        image: 'images/guangxi.jpg',
                        herbs: ['肉桂', '八角', '砂仁']
                    },
                    {
                        name: '甘肃',
                        value: 70,
                        image: 'images/gansu.jpg',
                        herbs: ['当归', '黄芪', '党参']
                    }
                ]
            }
        ]
    };
    herbsMapChart.setOption(option);
}

// 药材使用频率图
function initHerbsFrequency() {
    const herbsFrequencyChart = echarts.init(document.getElementById('herbs-frequency'));
    const option = {
        title: {
            text: '常见药材使用频率'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function(params) {
                return `${params[0].name}<br/>
                        使用频率：${params[0].value}<br/>
                        <img src="images/${params[0].data.image}" style="width:100px;height:100px;"/>`;
            }
        },
        xAxis: {
            type: 'category',
            data: ['人参', '当归', '黄芪', '枸杞', '茯苓']
        },
        yAxis: {
            type: 'value',
            name: '使用频率'
        },
        series: [
            {
                name: '使用频率',
                type: 'bar',
                data: [
                    {value: 320, image: 'images/ginseng.jpg'},
                    {value: 302, image: 'images/angelica.jpg'},
                    {value: 301, image: 'images/astragalus.jpg'},
                    {value: 334, image: 'images/goji.jpg'},
                    {value: 390, image: 'images/poria.jpg'}
                ]
            }
        ]
    };
    herbsFrequencyChart.setOption(option);
}

// 诊疗方法流程图
function initDiagnosisFlow() {
    const diagnosisChart = echarts.init(document.getElementById('diagnosis-flow'));
    const option = {
        title: {
            text: '中医诊疗方法发展'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                type: 'graph',
                layout: 'force',
                data: [
                    {name: '望诊', symbolSize: 50},
                    {name: '闻诊', symbolSize: 50},
                    {name: '问诊', symbolSize: 50},
                    {name: '切诊', symbolSize: 50}
                ],
                links: [
                    {source: '望诊', target: '闻诊'},
                    {source: '闻诊', target: '问诊'},
                    {source: '问诊', target: '切诊'}
                ],
                roam: true,
                label: {
                    show: true
                },
                force: {
                    repulsion: 100
                }
            }
        ]
    };
    diagnosisChart.setOption(option);
}

// 文化传播地图
function initCultureMap() {
    const cultureChart = echarts.init(document.getElementById('culture-map'));
    const option = {
        title: {
            text: '中医药文化国际传播'
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            min: 0,
            max: 100,
            text: ['高', '低'],
            realtime: false,
            calculable: true,
            inRange: {
                color: ['lightskyblue', 'yellow', 'orangered']
            }
        },
        series: [
            {
                name: '传播程度',
                type: 'map',
                map: 'world',
                roam: true,
                emphasis: {
                    label: {
                        show: true
                    }
                },
                data: [
                    {name: 'China', value: 100},
                    {name: 'Japan', value: 80},
                    {name: 'Korea', value: 70},
                    {name: 'Vietnam', value: 60}
                ]
            }
        ]
    };
    cultureChart.setOption(option);
}

// 窗口大小改变时重绘图表
window.addEventListener('resize', function() {
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        const instance = echarts.getInstanceByDom(chart);
        if (instance) {
            instance.resize();
        }
    });
}); 