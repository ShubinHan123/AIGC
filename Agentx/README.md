# AgentX - 智能对话系统平台

[](https://opensource.org/licenses/MIT)

AgentX 是一个基于大模型 (LLM) 和多能力平台 (MCP) 的智能 Agent 构建平台。它致力于简化 Agent 的创建流程，让用户无需复杂的流程节点或拖拽操作，仅通过自然语言和工具集成即可打造个性化的智能 Agent。
项目不方便展示源码,可以按照以下顺序部署体验



### 🐳 一键部署（推荐）

适用于想要快速体验完整功能的用户，**无需下载源码**，一个命令启动所有服务：

#### 步骤1：准备配置文件

```bash
# For mac
# 下载配置文件模板
curl -O https://raw.githubusercontent.com/lucky-aeon/AgentX/master/.env.example
# 复制并编辑配置
cp .env.example .env
# 根据需要修改 .env 文件中的配置
# For Window
curl -O https://raw.githubusercontent.com/lucky-aeon/AgentX/master/.env.example
copy .env.example .env
```

#### 步骤2：启动服务(打开docker)

```bash
# For Mac
# 一键启动（包含前端+后端+数据库+消息队列）
#  智能适配：本地、内网、服务器环境均可使用相同命令
docker run -d \
  --name agentx \
  -p 3000:3000 \
  -p 8088:8088 \
  -p 5432:5432 \
  -p 5672:5672 \
  -p 15672:15672 \
  --env-file .env \
  -v agentx-data:/var/lib/postgresql/data \
  -v agentx-storage:/app/storage \
  ghcr.nju.edu.cn/lucky-aeon/agentx:latest
# For windows
docker run -d --name agentx -p 3000:3000 -p 8088:8088 -p 5432:5432 -p 5672:5672 -p 15672:15672 --env-file .env -v agentx-data:/var/lib/postgresql/data -v agentx-storage:/app/storage ghcr.nju.edu.cn/lucky-aeon/agentx:latest

```
#### 访问服务

| **主应用** | http://localhost:3000 |

- 测试用户：`test@agentx.ai` / `test123`


## ⏳ 功能
 - [x] Agent 管理（创建/发布）
 - [x] LLM 上下文管理（滑动窗口，摘要算法）
 - [x] Agent 策略（MCP）
 - [x] 大模型服务商
 - [x] 用户
 - [x] 工具市场
 - [x] MCP Server Community
 - [x] MCP Gateway 
 - [x] 预先设置工具
 - [x] Agent 定时任务
 - [x] Agent OpenAPI
 - [x] 模型高可用组件
 - [x] RAG
 - [x] 计费
 - [x] Agent 监控
 - [x] 嵌入网站组件

## 页面图片展示

