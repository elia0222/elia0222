// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 添加视频播放控制
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // 鼠标悬停时显示控制栏
        video.addEventListener('mouseover', function() {
            this.setAttribute('controls', '');
        });
        
        // 鼠标移出时隐藏控制栏（但仍可以播放）
        video.addEventListener('mouseout', function() {
            if (!this.paused) {
                this.removeAttribute('controls');
            }
        });
    });
    
    // 添加平滑滚动效果
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是页面内部链接才阻止默认行为
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // 移除所有active类
                navLinks.forEach(item => item.classList.remove('active'));
                
                // 给当前点击的链接添加active类
                this.classList.add('active');
                
                // 平滑滚动到顶部
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 添加页面滚动动画效果
    const sections = document.querySelectorAll('section');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            
            if (sectionTop < triggerBottom) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            } else {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
            }
        });
    }
    
    // 初始设置
    sections.forEach(section => {
        section.style.transition = 'all 0.5s ease';
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
    });
    
    // 首次检查
    checkScroll();
    
    // 滚动时检查
    window.addEventListener('scroll', checkScroll);
    
    // 添加文字特效
    const introSection = document.querySelector('.intro-section');
    if (introSection) {
        const introTitle = document.querySelector('.intro-section h3');
        const introParagraphs = document.querySelectorAll('.intro-section p');
        const introList = document.querySelectorAll('.intro-section ul li');
        
        // 当滚动到介绍区域时触发特效
        function checkIntroVisibility() {
            const introPosition = introSection.getBoundingClientRect();
            const screenPosition = window.innerHeight;
            
            // 当介绍区域进入可视范围
            if(introPosition.top < screenPosition && introPosition.bottom > 0) {
                introTitle.classList.add('animate-text');
                
                // 添加鼠标跟踪效果
                introSection.addEventListener('mousemove', moveTextShadow);
            } else {
                introTitle.classList.remove('animate-text');
                introSection.removeEventListener('mousemove', moveTextShadow);
            }
        }
        
        // 创建鼠标跟踪阴影效果
        function moveTextShadow(e) {
            const { offsetWidth: width, offsetHeight: height } = introSection;
            const xPos = (e.clientX / width) - 0.5;
            const yPos = (e.clientY / height) - 0.5;
            
            const shadowIntensity = 5;
            const textShadow = `${xPos * shadowIntensity}px ${yPos * shadowIntensity}px 5px rgba(135, 206, 250, 0.3)`;
            
            introTitle.style.textShadow = textShadow;
            
            // 为图标添加轻微的移动效果
            const icons = document.querySelectorAll('.intro-section ul li span:first-child');
            icons.forEach(icon => {
                icon.style.transform = `translate(${xPos * 5}px, ${yPos * 5}px) scale(1.1)`;
            });
        }
        
        // 添加鼠标悬停效果到列表项
        introList.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.color = '#87CEFA';
                const icon = this.querySelector('span:first-child');
                if (icon) {
                    icon.style.transform = 'scale(1.3) rotate(15deg)';
                    icon.style.transition = 'transform 0.3s ease';
                }
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.color = '#555';
                const icon = this.querySelector('span:first-child');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }
            });
        });
        
        // 添加文字交互效果
        introParagraphs.forEach(paragraph => {
            if(paragraph === introParagraphs[introParagraphs.length - 1]) {
                // 最后一段落特殊处理
                paragraph.addEventListener('mouseenter', function() {
                    this.style.animationPlayState = 'paused';
                    this.style.transform = 'scale(1.03)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                paragraph.addEventListener('mouseleave', function() {
                    this.style.animationPlayState = 'running';
                    this.style.transform = 'scale(1)';
                });
            }
        });
        
        // 初始检查
        checkIntroVisibility();
        
        // 滚动时检查
        window.addEventListener('scroll', checkIntroVisibility);
    }
    
    // 产品展示页面特效
    const productItems = document.querySelectorAll('.product-item');
    
    if (productItems.length > 0) {
        productItems.forEach((item, index) => {
            // 设置动画延迟，使产品依次显示
            item.style.opacity = '0';
            item.style.transform = 'translateY(50px)';
            item.style.transition = 'all 0.5s ease';
            item.style.transitionDelay = `${index * 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 500);
            
            // 添加鼠标悬停效果
            item.addEventListener('mouseenter', function() {
                this.querySelector('h3').style.color = '#87CEFA';
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('h3').style.color = '#333';
            });
        });
        
        // 优化翻转效果，防止多个卡片同时翻转
        const flipContainers = document.querySelectorAll('.flip-container');
        
        // 点击文档其他区域，关闭所有已翻转的卡片
        document.addEventListener('click', function(e) {
            // 检查点击的目标是否在翻转容器内
            let isInsideFlipContainer = false;
            flipContainers.forEach(container => {
                if (container.contains(e.target)) {
                    isInsideFlipContainer = true;
                }
            });
            
            // 如果点击的不是翻转容器，则关闭所有激活状态
            if (!isInsideFlipContainer) {
                flipContainers.forEach(container => {
                    container.classList.remove('active');
                });
            }
        });
        
        flipContainers.forEach(container => {
            // 处理触摸事件
            container.addEventListener('touchstart', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                
                // 先重置所有其他容器的翻转状态
                flipContainers.forEach(otherContainer => {
                    if (otherContainer !== this) {
                        otherContainer.classList.remove('active');
                    }
                });
                
                // 切换当前容器的翻转状态
                this.classList.toggle('active');
            });
            
            // 处理鼠标事件
            container.addEventListener('mouseenter', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                
                // 确保其他容器不受影响
                flipContainers.forEach(otherContainer => {
                    if (otherContainer !== this) {
                        const flipper = otherContainer.querySelector('.flipper');
                        if (flipper) {
                            flipper.style.transition = 'none'; // 暂时禁用过渡效果
                            setTimeout(() => {
                                flipper.style.transition = 'transform 0.8s'; // 恢复过渡效果
                            }, 10);
                        }
                    }
                });
            });
            
            // 点击事件，用于桌面设备
            container.addEventListener('click', function(e) {
                e.stopPropagation(); // 阻止事件冒泡
                
                // 在桌面设备上，点击时切换激活状态
                if (window.matchMedia('(hover: none)').matches) {
                    // 如果是触摸设备，前面的触摸事件已处理
                } else {
                    // 重置所有其他容器
                    flipContainers.forEach(otherContainer => {
                        if (otherContainer !== this) {
                            otherContainer.classList.remove('active');
                        }
                    });
                    
                    // 切换当前容器状态
                    this.classList.toggle('active');
                }
            });
        });
    }

    // 关于Dimoo页面特效
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (galleryItems.length > 0) {
        // 图片加载效果
        galleryItems.forEach((item, index) => {
            // 设置初始状态
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.5s ease';
            item.style.transitionDelay = `${index * 0.2}s`;
            
            // 加载完成后显示
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 300);
        });
    }
    
    // 角色资料和设计师资料信息交互
    const profiles = document.querySelectorAll('.character-profile, .designer-profile');
    if (profiles.length > 0) {
        profiles.forEach(profile => {
            // 添加初始动画
            profile.style.opacity = '0';
            profile.style.transform = 'scale(0.95)';
            profile.style.transition = 'all 0.8s ease';
            
            // 检测是否在可视范围内
            function checkPosition() {
                const rect = profile.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.8) {
                    profile.style.opacity = '1';
                    profile.style.transform = 'scale(1)';
                }
            }
            
            // 初始检查
            checkPosition();
            
            // 滚动时检查
            window.addEventListener('scroll', checkPosition);
        });
    }
    
    // 信息表格行悬停效果
    const tableRows = document.querySelectorAll('.info-table tr');
    if (tableRows.length > 0) {
        tableRows.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(147, 112, 219, 0.05)';
                const th = this.querySelector('th');
                if (th) th.style.color = '#87CEFA';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
                const th = this.querySelector('th');
                if (th) th.style.color = '#9370DB';
            });
        });
    }
    
    // 品牌理念文本淡入效果
    const philosophyText = document.querySelector('.philosophy-text');
    if (philosophyText) {
        philosophyText.style.opacity = '0';
        philosophyText.style.transform = 'translateY(20px)';
        philosophyText.style.transition = 'all 1s ease';
        
        // 检测是否在可视范围内
        function checkPhilosophyText() {
            const rect = philosophyText.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                philosophyText.style.opacity = '1';
                philosophyText.style.transform = 'translateY(0)';
            }
        }
        
        // 初始检查
        checkPhilosophyText();
        
        // 滚动时检查
        window.addEventListener('scroll', checkPhilosophyText);
    }
    
    // 收藏指南页面特效
    const guideItems = document.querySelectorAll('.guide-item');
    if (guideItems.length > 0) {
        // 为每个指南项添加动画效果
        guideItems.forEach((item, index) => {
            // 设置初始状态
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            item.style.transitionDelay = `${index * 0.15}s`;
            
            // 检测是否在可视范围内
            function checkVisible() {
                const rect = item.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.85) {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }
            }
            
            // 初始检查
            setTimeout(checkVisible, 100);
            
            // 滚动时检查
            window.addEventListener('scroll', checkVisible);
        });
        
        // 为每个指南项添加高亮效果
        guideItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.querySelector('h3').style.color = '#87CEFA';
                const textItems = this.querySelectorAll('.guide-text p strong');
                textItems.forEach(textItem => {
                    textItem.style.color = '#87CEFA';
                });
            });
            
            item.addEventListener('mouseleave', function() {
                this.querySelector('h3').style.color = '#333';
                const textItems = this.querySelectorAll('.guide-text p strong');
                textItems.forEach(textItem => {
                    textItem.style.color = '#9370DB';
                });
            });
            
            // 文本项悬停效果
            const paragraphs = item.querySelectorAll('.guide-text p');
            paragraphs.forEach(paragraph => {
                paragraph.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateX(5px)';
                    this.style.transition = 'transform 0.3s ease';
                });
                
                paragraph.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateX(0)';
                });
            });
        });
    }
    
    // 联系我们页面特效
    const infoCards = document.querySelectorAll('.info-card');
    if (infoCards.length > 0) {
        // 为卡片添加动画效果
        infoCards.forEach((card, index) => {
            // 设置初始状态
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            card.style.transitionDelay = `${index * 0.15}s`;
            
            // 加载后显示
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 300);
        });
    }
    
    // 表单验证和交互效果
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // 添加输入字段焦点效果
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'translateX(5px)';
                this.parentElement.style.transition = 'transform 0.3s ease';
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'translateX(0)';
            });
        });
        
        // 表单提交
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 模拟表单提交
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;
            
            // 模拟网络请求
            setTimeout(() => {
                submitBtn.textContent = '发送成功!';
                submitBtn.style.background = 'linear-gradient(to right, #4CAF50, #8BC34A)';
                
                // 重置表单
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = 'linear-gradient(to right, #9370DB, #87CEFA)';
                    submitBtn.disabled = false;
                    
                    // 显示感谢消息
                    alert('感谢您的留言，我们会尽快与您联系!');
                }, 2000);
            }, 1500);
        });
    }
    
    // 社交媒体链接动画
    const socialLinks = document.querySelectorAll('.social-link');
    if (socialLinks.length > 0) {
        socialLinks.forEach((link, index) => {
            // 设置初始状态
            link.style.opacity = '0';
            link.style.transform = 'scale(0.8)';
            link.style.transition = 'all 0.5s ease';
            link.style.transitionDelay = `${index * 0.1}s`;
            
            // 检测是否在可视范围内
            function checkVisible() {
                const rect = link.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.9) {
                    link.style.opacity = '1';
                    link.style.transform = 'scale(1)';
                }
            }
            
            // 初始检查
            setTimeout(checkVisible, 100);
            
            // 滚动时检查
            window.addEventListener('scroll', checkVisible);
        });
    }
    
    // 地图容器效果
    const mapPlaceholder = document.querySelector('.map-placeholder');
    if (mapPlaceholder) {
        mapPlaceholder.style.opacity = '0';
        mapPlaceholder.style.transform = 'translateY(30px)';
        mapPlaceholder.style.transition = 'all 0.8s ease';
        
        // 检测是否在可视范围内
        function checkMapVisible() {
            const rect = mapPlaceholder.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight * 0.8) {
                mapPlaceholder.style.opacity = '1';
                mapPlaceholder.style.transform = 'translateY(0)';
            }
        }
        
        // 初始检查
        setTimeout(checkMapVisible, 500);
        
        // 滚动时检查
        window.addEventListener('scroll', checkMapVisible);
    }
}); 