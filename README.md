# System Design Architecture Diagrams

## 0. Simplified Infrastructure Flow (Client → API Gateway → Load Balancer → Services)

### Text-Based Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENT LAYER                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                     │
│  │ Browser  │  │  Mobile  │  │   Web    │                     │
│  │  Client  │  │   App    │  │   App    │                     │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘                     │
└───────┼─────────────┼─────────────┼────────────────────────────┘
        │             │             │
        └─────────────┴─────────────┘
                      │
                      │ HTTPS Request
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                  API GATEWAY LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  API Gateway (Azure API Management / AWS API Gateway)     │  │
│  │  • Authentication & Authorization                       │  │
│  │  • Rate Limiting & Throttling                            │  │
│  │  • Request Routing & Versioning                          │  │
│  │  • Request/Response Transformation                       │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬───────────────────────────────────┘
                              │
                              │ Authenticated Request
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                LOAD BALANCER LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Application Load Balancer                                │  │
│  │  • Health Checks                                          │  │
│  │  • SSL/TLS Termination                                    │  │
│  │  • Session Affinity (Sticky Sessions)                    │  │
│  │  • Traffic Distribution (Round Robin / Least Connections) │  │
│  └──────────────────────────────────────────────────────────┘  │
└────────────────────────────┬───────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Next.js App  │    │ Next.js App  │    │ Next.js App  │
│   Server 1   │    │   Server 2   │    │   Server N   │
│  (Port 3000) │    │  (Port 3000) │    │  (Port 3000) │
└──────┬───────┘    └──────┬───────┘    └──────┬───────┘
       │                  │                   │
       └──────────────────┼───────────────────┘
                          │
                          │ API Calls
                          ▼
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Backend    │  │   Backend    │  │   Data API   │       │
│  │  Service 1   │  │  Service 2   │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   User       │  │   Config     │  │   Report     │       │
│  │   Service    │  │   Service    │  │   Service    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

### Request Flow Sequence

```
1. Client sends HTTPS request
   ↓
2. API Gateway receives request
   ├─ Validates authentication token
   ├─ Applies rate limiting rules
   ├─ Routes to appropriate backend
   └─ Transforms request if needed
   ↓
3. Load Balancer receives request
   ├─ Performs health check on servers
   ├─ Terminates SSL/TLS connection
   ├─ Determines target server (load balancing algorithm)
   └─ Routes to selected Next.js server
   ↓
4. Next.js Application Server processes request
   ├─ Handles API route (/api/service, /api/data, etc.)
   ├─ Makes business logic decisions
   └─ Calls external backend services
   ↓
5. External Services respond
   ├─ Backend services return data
   └─ Response flows back through layers
   ↓
6. Response returns to client
   └─ Through: Next.js → Load Balancer → API Gateway → Client
```

### Mermaid Diagram

```mermaid
graph LR
    subgraph "1. Client Layer"
        Client[Client/Frontend<br/>Browser, Mobile, Web App]
    end
    
    subgraph "2. API Gateway Layer"
        APIGateway[API Gateway<br/>- Authentication<br/>- Rate Limiting<br/>- Request Routing<br/>- API Versioning]
    end
    
    subgraph "3. Load Balancer Layer"
        LoadBalancer[Load Balancer<br/>- Health Checks<br/>- SSL Termination<br/>- Session Affinity<br/>- Traffic Distribution]
    end
    
    subgraph "4. Application Servers"
        App1[Next.js Server 1]
        App2[Next.js Server 2]
        App3[Next.js Server N]
    end
    
    subgraph "5. External Services"
        Service1[Backend Service 1]
        Service2[Backend Service 2]
        Service3[Backend Service 3]
        DataService[Data API Service]
    end
    
    Client -->|HTTPS Request| APIGateway
    APIGateway -->|Authenticated Request| LoadBalancer
    LoadBalancer -->|Distributed Load| App1
    LoadBalancer -->|Distributed Load| App2
    LoadBalancer -->|Distributed Load| App3
    App1 -->|API Calls| Service1
    App1 -->|API Calls| Service2
    App2 -->|API Calls| Service3
    App2 -->|API Calls| DataService
    App3 -->|API Calls| Service1
```

## 1. Overall System Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser]
        NextJS[Next.js App Router]
    end
    
    subgraph "Application Layer"
        Pages[Pages/Components]
        API[API Routes]
        Middleware[Middleware]
    end
    
    subgraph "State Management"
        Redux[Redux Store]
        ReactQuery[React Query]
        Context[Context API]
    end
    
    subgraph "External Services"
        AzureAD[Azure AD B2C]
        BackendAPI[Backend API Services]
        Redis[Redis Cache]
        S3[AWS S3]
    end
    
    Browser --> NextJS
    NextJS --> Pages
    NextJS --> API
    NextJS --> Middleware
    Middleware --> AzureAD
    Pages --> Redux
    Pages --> ReactQuery
    Pages --> Context
    API --> BackendAPI
    API --> Redis
    API --> S3
    ReactQuery --> API
    Redux --> Pages
```

## 2. Request Flow Architecture

```mermaid
sequenceDiagram
    participant User
    participant ClientComponent
    participant ReactQuery
    participant APIRoute
    participant Middleware
    participant BackendAPI
    participant Redis
    
    User->>ClientComponent: User Action
    ClientComponent->>ReactQuery: useQuery Hook
    ReactQuery->>APIRoute: POST /api/service/fetch
    APIRoute->>Middleware: Auth Check
    Middleware-->>APIRoute: Session Valid
    APIRoute->>Redis: Check Cache
    alt Cache Hit
        Redis-->>APIRoute: Cached Data
        APIRoute-->>ReactQuery: Response
    else Cache Miss
        APIRoute->>BackendAPI: HTTP Request
        BackendAPI-->>APIRoute: Data
        APIRoute->>Redis: Store Cache
        APIRoute-->>ReactQuery: Response
    end
    ReactQuery-->>ClientComponent: Data
    ClientComponent-->>User: UI Update
```

## 3. Component Hierarchy

```mermaid
graph TD
    RootLayout[Root Layout]
    LayoutClient[LayoutClient]
    Providers[Providers]
    
    subgraph "Provider Stack"
        ThemeProvider[Theme Provider]
        HeroUIProvider[HeroUI Provider]
        AuthProvider[Auth Provider]
        SidebarProvider[Sidebar Provider]
        ReduxProvider[Redux Provider]
        QueryProvider[Query Provider]
    end
    
    MainLayout[Main Layout]
    SideNav[Side Navigation]
    Header[Header]
    MainContent[Main Content]
    
    subgraph "Feature Pages"
        Dashboard[Dashboard Pages]
        Analytics[Analytics Pages]
        Operations[Operations Pages]
    end
    
    RootLayout --> LayoutClient
    LayoutClient --> Providers
    Providers --> ThemeProvider
    ThemeProvider --> HeroUIProvider
    HeroUIProvider --> AuthProvider
    AuthProvider --> SidebarProvider
    SidebarProvider --> ReduxProvider
    ReduxProvider --> QueryProvider
    QueryProvider --> MainLayout
    MainLayout --> SideNav
    MainLayout --> Header
    MainLayout --> MainContent
    MainContent --> Dashboard
    MainContent --> Analytics
    MainContent --> Operations
```

## 4. State Management Architecture

```mermaid
graph LR
    subgraph "Global State - Redux"
        ReduxStore[Redux Store]
        SidebarSlice[Sidebar Slice]
        UserSlice[User Settings]
        DashboardSlice[Dashboard Slice]
        AnalyticsSlice[Analytics Slice]
        TicketsSlice[Tickets Slice]
        RulesSlice[Rules Slice]
        Persist[Redux Persist]
    end
    
    subgraph "Server State - React Query"
        QueryClient[Query Client]
        QueryCache[Query Cache]
        Mutations[Mutations]
    end
    
    subgraph "UI State - Context"
        SidebarContext[Sidebar Context]
        PlantContext[Plant Context]
        SettingsContext[Settings Context]
    end
    
    Components[React Components]
    
    Components --> ReduxStore
    Components --> QueryClient
    Components --> SidebarContext
    Components --> PlantContext
    Components --> SettingsContext
    
    ReduxStore --> SidebarSlice
    ReduxStore --> UserSlice
    ReduxStore --> DashboardSlice
    ReduxStore --> AnalyticsSlice
    ReduxStore --> TicketsSlice
    ReduxStore --> RulesSlice
    ReduxStore --> Persist
    
    QueryClient --> QueryCache
    QueryClient --> Mutations
```

## 5. Authentication Flow

# Azure AD B2C Login Flow — Explained in Easy Language

Think of the login process like this:

- **Azure B2C** = the place where the user logs in  
- **Your Backend Database** = the place where you store user details + settings  
- **NextAuth** = the messenger between Azure and your app  
- **JWT Cookie** = the user’s access pass  

Now let’s walk through it step by step.

### ✅ 1. User starts login
- User goes to `/login`
- They click **“Login with Azure AD B2C”**
- The app redirects them to Azure’s login page

### ✅ 2. Azure AD B2C shows login form
- Azure displays the Microsoft-branded login page
- User enters **email + password**
- Azure verifies the credentials
- If correct → Azure sends back an **authorization code**  
  (This code means: “Yes, this user is real and logged in successfully.”)

### ✅ 3. NextAuth exchanges the code for tokens
- NextAuth takes the authorization code and asks Azure:  
  “Give me the user’s profile and tokens.”
- Azure responds with:
  - Access Token
  - ID Token
  - User Profile (email, name, etc.)

### ✅ 4. Find the user in your database
- NextAuth extracts the email from Azure and checks your backend:
  - Sends request → `GET /user/email/{email}`
- Your backend runs:
  ```sql
  SELECT * FROM users WHERE email = ?
  - If user exists → return user info
  - If not → new user can be created (optional)

### ✅ 5. Get the User’s Settings
- The database returns user settings such as : user role, plant list available environment etc

### Update the User’s Environment (If Needed)
- NextAuth updates environment settings: POST /user/{userId}/settings
- Backend returns the updated settings.

### ✅ 7. Create the JWT Token
- NextAuth builds a JWT token containing: userId, user roles, user settings, QUADRICAL_ENV

### ✅ 8. Store Token in Cookie & Create Session
- JWT stored in an HTTP-only cookie
- Session now has all user data
- No need to query database again on every page load

### ✅ 9. Redirect the User to the App
- User is redirected to /
- Now the user: is logged in, has session cookie, can open protected pages

  ### ✅ 10. User Accesses Protected Pages
- When user opens any protected route:Middleware checks the session cookie, If valid → allow access, If invalid → send user to /login
- 
```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Middleware
    participant NextAuth
    participant AzureB2C
    participant UserService
    participant Session
    
    User->>Browser: Access Protected Route
    Browser->>Middleware: Request
    Middleware->>NextAuth: Check Session
    alt No Session
        NextAuth-->>Browser: Redirect to /login
        Browser->>AzureB2C: OAuth Login
        AzureB2C-->>Browser: Auth Token
        Browser->>NextAuth: Token
        NextAuth->>UserService: Fetch User Data
        UserService-->>NextAuth: User Settings
        NextAuth->>Session: Create JWT Session
        Session-->>Browser: Set Cookie
        Browser->>Middleware: Retry Request
    end
    Middleware->>NextAuth: Validate Token
    NextAuth-->>Middleware: Authorized
    Middleware-->>Browser: Allow Access
```

## 6. API Route Architecture

```mermaid
graph TD
    subgraph "Client Side"
        ClientComponent[Client Component]
        Serialize[Serialize Payload]
    end
    
    subgraph "Next.js API Routes"
        ServiceRoute[/api/service]
        FetchRoute[/api/service/fetch]
        FetchAllRoute[/api/service/fetchall]
        DataRoute[/api/data/*]
        UserRoute[/api/user/*]
        ReportsRoute[/api/reports/*]
    end
    
    subgraph "API Route Processing"
        AuthCheck[Auth Check]
        Deserialize[Deserialize]
        CacheCheck[Cache Check]
        RequestBuilder[Request Builder]
    end
    
    subgraph "External Services"
        BackendAPI[Backend API]
        RedisCache[Redis Cache]
        S3Storage[S3 Storage]
    end
    
    ClientComponent --> Serialize
    Serialize --> ServiceRoute
    ServiceRoute --> AuthCheck
    AuthCheck --> Deserialize
    Deserialize --> CacheCheck
    CacheCheck --> RedisCache
    CacheCheck --> RequestBuilder
    RequestBuilder --> BackendAPI
    FetchRoute --> AuthCheck
    FetchAllRoute --> AuthCheck
    DataRoute --> BackendAPI
    UserRoute --> BackendAPI
    ReportsRoute --> BackendAPI
```

## 7. Data Flow Diagram

```mermaid
flowchart TD
    Start[User Interaction] --> Component{Component Type}
    
    Component -->|Server Component| ServerFetch[Server-Side Fetch]
    Component -->|Client Component| ClientFetch[Client-Side Fetch]
    
    ServerFetch --> DirectAPI[Direct Backend API]
    DirectAPI --> ServerProps[Pass as Props]
    
    ClientFetch --> StateChoice{State Choice}
    
    StateChoice -->|Server State| ReactQuery[React Query]
    StateChoice -->|Global State| Redux[Redux Action]
    StateChoice -->|UI State| Context[Context Update]
    
    ReactQuery --> APIRoute[API Route]
    Redux --> ReduxStore[Redux Store]
    Context --> ContextValue[Context Value]
    
    APIRoute --> Backend[Backend Service]
    Backend --> Cache[Cache Layer]
    Cache --> Response[Response]
    
    Response --> ReactQuery
    ReduxStore --> Component
    ContextValue --> Component
    ServerProps --> Component
    
    Component --> Render[UI Render]
```

## 8. Feature Module Structure

```mermaid
graph TD
    subgraph "app/ main/"
        MainLayout[Main Layout]
        
        subgraph "Analytics Module"
            AnalyticsPage[analytics/page.tsx]
            TrendsClient[TrendsClient.tsx]
            AnalyticsAPI[analytics/api.ts]
        end
        
        subgraph "Dashboard Module"
            DashboardPage[dashboard/page.tsx]
            DashboardClient[DashboardClient.tsx]
            DashboardAPI[dashboard/api.ts]
        end
        
        subgraph "Operations Module"
            OperationsPage[operations/page.tsx]
            OperationsClient[OperationsClient.tsx]
        end
        
        subgraph "Shared Components"
            SideNav[SideNav.tsx]
            Header[Header.tsx]
            Charts[Chart Components]
        end
    end
    
    subgraph "API Routes"
        ServiceAPI[/api/service]
        DataAPI[/api/data]
        ReportsAPI[/api/reports]
    end
    
    subgraph "Redux Slices"
        AnalyticsSlice[analyticsSlice]
        DashboardSlice[dashboardSlice]
        OperationsSlice[operationsSlice]
    end
    
    MainLayout --> AnalyticsPage
    MainLayout --> DashboardPage
    MainLayout --> OperationsPage
    
    AnalyticsPage --> TrendsClient
    DashboardPage --> DashboardClient
    OperationsPage --> OperationsClient
    
    TrendsClient --> AnalyticsAPI
    DashboardClient --> DashboardAPI
    
    AnalyticsAPI --> ServiceAPI
    DashboardAPI --> ServiceAPI
    
    TrendsClient --> AnalyticsSlice
    DashboardClient --> DashboardSlice
```

## 9. Caching Strategy

```mermaid
graph TD
    Request[API Request] --> Route{API Route}
    
    Route -->|/api/service/fetch| CacheCheck{Cache Enabled?}
    Route -->|/api/service| NoCache[No Cache]
    Route -->|/api/data| NoCache
    
    CacheCheck -->|Yes| RedisCheck[Check Redis]
    CacheCheck -->|No| DirectCall[Direct Backend Call]
    
    RedisCheck -->|Hit| ReturnCache[Return Cached Data]
    RedisCheck -->|Miss| DirectCall
    
    DirectCall --> Backend[Backend API]
    Backend --> Response[Response Data]
    
    Response --> UpdateCache{Update Cache?}
    UpdateCache -->|Yes| StoreCache[Store in Redis]
    UpdateCache -->|No| ReturnResponse[Return Response]
    
    StoreCache --> ReturnResponse
    ReturnCache --> Client[Client Component]
    ReturnResponse --> Client
```

## 10. Build and Deployment Flow

```mermaid
graph LR
    subgraph "Development"
        Dev[Development]
        Turbopack[Turbopack]
        HotReload[Hot Reload]
    end
    
    subgraph "Build Process"
        Build[Next.js Build]
        BundleAnalyzer[Bundle Analysis]
        Optimize[Optimization]
        Standalone[Standalone Output]
    end
    
    subgraph "Containerization"
        Dockerfile[Dockerfile]
        DockerBuild[Docker Build]
        Image[Docker Image]
    end
    
    subgraph "Deployment"
        AzurePipeline[Azure Pipeline]
        ContainerRegistry[Container Registry]
        Production[Production]
    end
    
    Dev --> Turbopack
    Turbopack --> HotReload
    
    Dev --> Build
    Build --> BundleAnalyzer
    BundleAnalyzer --> Optimize
    Optimize --> Standalone
    
    Standalone --> Dockerfile
    Dockerfile --> DockerBuild
    DockerBuild --> Image
    
    Image --> AzurePipeline
    AzurePipeline --> ContainerRegistry
    ContainerRegistry --> Production
```

## 11. Security Architecture

```mermaid
graph TD
    Request[Incoming Request] --> Middleware[Middleware Layer]
    
    Middleware --> AuthCheck{Authenticated?}
    
    AuthCheck -->|No| Redirect[Redirect to /login]
    AuthCheck -->|Yes| RouteCheck{Route Type}
    
    RouteCheck -->|Public| Allow[Allow Access]
    RouteCheck -->|Protected| SessionCheck[Session Validation]
    
    SessionCheck --> TokenCheck{Valid Token?}
    TokenCheck -->|No| Redirect
    TokenCheck -->|Yes| PermissionCheck[Permission Check]
    
    PermissionCheck --> EnvCheck{Environment Access?}
    EnvCheck -->|No| Forbidden[403 Forbidden]
    EnvCheck -->|Yes| Allow
    
    Allow --> APIRoute[API Route]
    APIRoute --> BackendAuth[Backend Auth]
    BackendAuth --> SecureRequest[Secure Request]
```

## 12. Performance Optimization Layers

```mermaid
graph TD
    subgraph "Build Time"
        CodeSplit[Code Splitting]
        TreeShake[Tree Shaking]
        BundleOpt[Bundle Optimization]
        ImageOpt[Image Optimization]
    end
    
    subgraph "Runtime"
        LazyLoad[Lazy Loading]
        Memoization[React Memoization]
        VirtualScroll[Virtual Scrolling]
        Debounce[Debouncing]
    end
    
    subgraph "Caching"
        QueryCache[React Query Cache]
        ReduxCache[Redux Persist]
        RedisCache[Redis Cache]
        BrowserCache[Browser Cache]
    end
    
    subgraph "Network"
        Compression[Response Compression]
        CDN[CDN Assets]
        Prefetch[Prefetching]
    end
    
    CodeSplit --> LazyLoad
    TreeShake --> Memoization
    BundleOpt --> VirtualScroll
    ImageOpt --> BrowserCache
    
    LazyLoad --> QueryCache
    Memoization --> ReduxCache
    VirtualScroll --> RedisCache
    
    QueryCache --> Compression
    ReduxCache --> CDN
    RedisCache --> Prefetch
```

## 17. Azure AD B2C Login Flow: User Authentication & Database Integration

### Complete Login Flow Sequence

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant NextJSApp
    participant NextAuth
    participant AzureB2C
    participant UserService
    participant BackendDB[(Backend Database)]
    
    User->>Browser: 1. Navigate to /login
    Browser->>NextJSApp: 2. GET /login
    NextJSApp-->>Browser: 3. Render Login Page
    
    User->>Browser: 4. Click "Login with Azure AD B2C"
    Browser->>NextAuth: 5. signIn('azure-ad-b2c')
    NextAuth->>AzureB2C: 6. Redirect to Azure B2C Login Page<br/>OAuth2 Authorization Request
    
    Note over AzureB2C: User enters credentials<br/>(Email/Password)
    User->>AzureB2C: 7. Enter Credentials & Submit
    AzureB2C->>AzureB2C: 8. Validate Credentials
    
    alt Valid Credentials
        AzureB2C->>NextAuth: 9. OAuth2 Callback<br/>Authorization Code
        NextAuth->>AzureB2C: 10. Exchange Code for Tokens<br/>(Access Token, ID Token)
        AzureB2C-->>NextAuth: 11. Return Tokens & User Profile<br/>{oid, email, given_name, surname}
        
        Note over NextAuth: JWT Callback Triggered
        NextAuth->>NextAuth: 12. Extract User Info from Profile<br/>{id, email, name}
        
        NextAuth->>UserService: 13. GET /user/email/{email}<br/>Basic Auth Header
        UserService->>BackendDB: 14. Query: SELECT * FROM users<br/>WHERE email = ?
        BackendDB-->>UserService: 15. Return User Record<br/>{id, email, role, ...}
        UserService-->>NextAuth: 16. Return User Data<br/>{id, email, role, ...}
        
        NextAuth->>UserService: 17. GET /user/{userId}/settings<br/>?exclude_plants=true
        UserService->>BackendDB: 18. Query User Settings<br/>SELECT settings FROM user_settings<br/>WHERE user_id = ?
        BackendDB-->>UserService: 19. Return User Settings<br/>{environments, theme, date_format, ...}
        UserService-->>NextAuth: 20. Return Settings Data
        
        NextAuth->>UserService: 21. POST /user/{userId}/settings<br/>Update Environment Settings
        UserService->>BackendDB: 22. UPDATE user_settings<br/>SET current_environment = ...
        BackendDB-->>UserService: 23. Settings Updated
        UserService-->>NextAuth: 24. Settings Updated
        
        NextAuth->>UserService: 25. GET /user/{userId}/settings<br/>Fetch Updated Settings
        UserService->>BackendDB: 26. Query Updated Settings
        BackendDB-->>UserService: 27. Return Updated Settings<br/>{current_environment, api_path, ...}
        UserService-->>NextAuth: 28. Return Updated Settings
        
        Note over NextAuth: Build JWT Token with:<br/>- userSettings<br/>- userId<br/>- roles<br/>- apiPath<br/>- QUADRICAL_ENV
        
        NextAuth->>NextAuth: 29. Create JWT Session Token<br/>Store in HTTP-only Cookie
        
        NextAuth-->>Browser: 30. Set Session Cookie<br/>Redirect to callbackUrl (/)
        Browser->>NextJSApp: 31. GET / (with session cookie)
        NextJSApp->>NextAuth: 32. Validate Session
        NextAuth-->>NextJSApp: 33. Valid Session
        NextJSApp-->>Browser: 34. Render Dashboard
        
    else Invalid Credentials
        AzureB2C-->>Browser: Error: Invalid Credentials
        Browser-->>User: Show Error Message
    end
```

### Login Flow Architecture Diagram

```mermaid
graph TB
    subgraph "1. User Initiation"
        User[User]
        LoginPage[Login Page<br/>/login]
    end
    
    subgraph "2. Authentication Layer"
        NextAuth[NextAuth.js<br/>Authentication Handler]
        AzureB2C[Azure AD B2C<br/>Identity Provider]
    end
    
    subgraph "3. Token Processing"
        JWT[JWT Callback<br/>Token Builder]
        Session[Session Callback<br/>Session Builder]
    end
    
    subgraph "4. User Service Integration"
        UserServiceAPI[User Service API<br/>Backend Service]
        UserEndpoint[/user/email/{email}]
        SettingsEndpoint[/user/{id}/settings]
    end
    
    subgraph "5. Database Layer"
        BackendDB[(Backend Database)]
        UsersTable[(users table)]
        SettingsTable[(user_settings table)]
    end
    
    subgraph "6. Session Storage"
        Cookie[HTTP-only Cookie<br/>JWT Token]
        SessionStore[Session Store]
    end
    
    User -->|1. Click Login| LoginPage
    LoginPage -->|2. signIn| NextAuth
    NextAuth -->|3. OAuth Redirect| AzureB2C
    AzureB2C -->|4. User Credentials| AzureB2C
    AzureB2C -->|5. Auth Code| NextAuth
    NextAuth -->|6. Exchange Code| AzureB2C
    AzureB2C -->|7. Tokens & Profile| NextAuth
    NextAuth -->|8. Trigger| JWT
    JWT -->|9. Fetch User| UserServiceAPI
    UserServiceAPI -->|10. Query| UserEndpoint
    UserEndpoint -->|11. SQL Query| UsersTable
    UsersTable -->|12. User Data| UserEndpoint
    UserEndpoint -->|13. Return| UserServiceAPI
    UserServiceAPI -->|14. User Info| JWT
    JWT -->|15. Fetch Settings| SettingsEndpoint
    SettingsEndpoint -->|16. SQL Query| SettingsTable
    SettingsTable -->|17. Settings Data| SettingsEndpoint
    SettingsEndpoint -->|18. Return| JWT
    JWT -->|19. Update Settings| SettingsEndpoint
    SettingsEndpoint -->|20. UPDATE Query| SettingsTable
    JWT -->|21. Build Token| Session
    Session -->|22. Store| Cookie
    Cookie -->|23. Set Cookie| User
```

### Database Schema & Data Flow

```mermaid
erDiagram
    AZURE_B2C ||--o{ USERS : "authenticates"
    USERS ||--|| USER_SETTINGS : "has"
    USER_SETTINGS ||--o{ ENVIRONMENTS : "contains"
    
    AZURE_B2C {
        string oid "Azure Object ID"
        string email "User Email"
        string given_name "First Name"
        string surname "Last Name"
    }
    
    USERS {
        int id PK "Primary Key"
        string email UK "Unique Email"
        string full_name "Full Name"
        json role "User Roles"
        datetime created_at "Created Date"
    }
    
    USER_SETTINGS {
        int user_id FK "Foreign Key"
        string default_environment "Default Env"
        json enabled_environments "Enabled Envs"
        string theme "UI Theme"
        string date_format "Date Format"
        json current_environment "Current Env Config"
    }
    
    ENVIRONMENTS {
        string environment "Env Name"
        array plants "Plant IDs"
        array env_roles "Environment Roles"
        string api_path "API Endpoint"
        string role "User Role in Env"
    }
```

### Step-by-Step Login Process

```mermaid
flowchart TD
    Start[User Visits /login] --> ClickLogin[User Clicks Login Button]
    ClickLogin --> RedirectAzure[Redirect to Azure AD B2C]
    RedirectAzure --> AzureLogin[Azure B2C Login Page]
    AzureLogin --> EnterCreds[User Enters Credentials]
    EnterCreds --> ValidateAzure{Azure Validates}
    
    ValidateAzure -->|Invalid| Error[Show Error]
    Error --> AzureLogin
    
    ValidateAzure -->|Valid| AuthCode[Azure Returns Auth Code]
    AuthCode --> ExchangeToken[NextAuth Exchanges Code for Token]
    ExchangeToken --> GetProfile[Get User Profile from Azure]
    GetProfile --> ExtractInfo[Extract: email, oid, name]
    
    ExtractInfo --> CheckDB{User Exists<br/>in Database?}
    
    CheckDB -->|No| CreateUser[Create User in DB<br/>POST /user]
    CreateUser --> FetchUser[Fetch User from DB]
    
    CheckDB -->|Yes| FetchUser[Fetch User from DB<br/>GET /user/email/{email}]
    
    FetchUser --> FetchSettings[Fetch User Settings<br/>GET /user/{id}/settings]
    FetchSettings --> UpdateSettings[Update Environment Settings<br/>POST /user/{id}/settings]
    UpdateSettings --> GetUpdatedSettings[Get Updated Settings]
    
    GetUpdatedSettings --> BuildToken[Build JWT Token with:<br/>- userSettings<br/>- userId<br/>- roles<br/>- apiPath<br/>- QUADRICAL_ENV]
    
    BuildToken --> CreateSession[Create Session]
    CreateSession --> SetCookie[Set HTTP-only Cookie]
    SetCookie --> RedirectApp[Redirect to Application]
    RedirectApp --> Dashboard[User Sees Dashboard]
```

### Data Synchronization Flow

```mermaid
sequenceDiagram
    participant AzureB2C
    participant NextAuth
    participant UserService
    participant Database
    
    Note over AzureB2C,Database: Initial Login - User Creation Flow
    
    AzureB2C->>NextAuth: User Profile<br/>{email, oid, name}
    NextAuth->>UserService: Check if user exists<br/>GET /user/email/{email}
    UserService->>Database: SELECT * FROM users WHERE email = ?
    
    alt User Not Found
        Database-->>UserService: No user found
        UserService-->>NextAuth: 404 Not Found
        NextAuth->>UserService: Create user<br/>POST /user<br/>{email, full_name}
        UserService->>Database: INSERT INTO users<br/>(email, full_name, role)
        Database-->>UserService: User created {id, email}
        UserService-->>NextAuth: User data
    else User Exists
        Database-->>UserService: User found {id, email, role}
        UserService-->>NextAuth: User data
    end
    
    NextAuth->>UserService: Get settings<br/>GET /user/{id}/settings
    UserService->>Database: SELECT * FROM user_settings<br/>WHERE user_id = ?
    
    alt Settings Not Found
        Database-->>UserService: No settings
        UserService->>Database: INSERT INTO user_settings<br/>(user_id, default_environment, ...)
        Database-->>UserService: Settings created
    end
    
    UserService-->>NextAuth: Settings data
    NextAuth->>UserService: Update environment<br/>POST /user/{id}/settings
    UserService->>Database: UPDATE user_settings<br/>SET current_environment = ...
    Database-->>UserService: Updated
    UserService-->>NextAuth: Updated settings
    NextAuth->>NextAuth: Store in JWT Token
```

### Authentication State Management

```mermaid
graph LR
    subgraph "Azure B2C Data"
        AzureProfile[Azure Profile<br/>oid, email, name]
    end
    
    subgraph "Backend Database"
        UserRecord[User Record<br/>id, email, role]
        UserSettings[User Settings<br/>environments, theme, api_path]
    end
    
    subgraph "JWT Token"
        JWTPayload[JWT Payload<br/>- userId<br/>- userSettings<br/>- roles<br/>- apiPath<br/>- QUADRICAL_ENV]
    end
    
    subgraph "Session Object"
        SessionData[Session Data<br/>- user<br/>- apiPath<br/>- QUADRICAL_ENV<br/>- roles]
    end
    
    AzureProfile -->|Mapped to| UserRecord
    UserRecord -->|Fetched with| UserSettings
    UserRecord -->|Combined into| JWTPayload
    UserSettings -->|Included in| JWTPayload
    JWTPayload -->|Stored in| SessionData
    SessionData -->|Available in| App[Application]
```

## 13. Infrastructure Flow: Client → API Gateway → Load Balancer → Services

```mermaid
graph TB
    subgraph "Client Layer"
        Browser[Browser/Client]
        Mobile[Mobile App]
        WebApp[Web Application]
    end
    
    subgraph "CDN & Edge"
        CDN[CDN/CloudFront]
        EdgeCache[Edge Cache]
    end
    
    subgraph "API Gateway Layer"
        APIGateway[API Gateway<br/>Azure API Management / AWS API Gateway]
        RateLimit[Rate Limiting]
        AuthGateway[Auth Gateway]
        RequestRouting[Request Routing]
    end
    
    subgraph "Load Balancer Layer"
        LoadBalancer[Load Balancer<br/>Application Load Balancer]
        HealthCheck[Health Checks]
        SSLTerm[SSL Termination]
        SessionSticky[Session Affinity]
    end
    
    subgraph "Application Servers"
        AppServer1[Next.js Server 1]
        AppServer2[Next.js Server 2]
        AppServer3[Next.js Server N]
    end
    
    subgraph "API Routes Layer"
        NextAPIRoutes[Next.js API Routes]
        ServiceRoute[/api/service]
        DataRoute[/api/data]
        UserRoute[/api/user]
    end
    
    subgraph "External Services Layer"
        BackendAPI1[Backend API Service 1]
        BackendAPI2[Backend API Service 2]
        DataAPI[Data API Service]
        UserService[User Service]
        ConfigService[Config Service]
    end
    
    subgraph "Data & Cache Layer"
        RedisCluster[Redis Cluster]
        Database[(Database)]
        S3Storage[S3 Storage]
    end
    
    subgraph "Authentication Services"
        AzureB2C[Azure AD B2C]
        AuthService[Auth Service]
    end
    
    Browser --> CDN
    Mobile --> APIGateway
    WebApp --> CDN
    CDN --> EdgeCache
    EdgeCache --> APIGateway
    
    APIGateway --> RateLimit
    RateLimit --> AuthGateway
    AuthGateway --> AzureB2C
    AuthGateway --> RequestRouting
    
    RequestRouting --> LoadBalancer
    
    LoadBalancer --> HealthCheck
    LoadBalancer --> SSLTerm
    LoadBalancer --> SessionSticky
    
    HealthCheck --> AppServer1
    HealthCheck --> AppServer2
    HealthCheck --> AppServer3
    
    SSLTerm --> AppServer1
    SSLTerm --> AppServer2
    SSLTerm --> AppServer3
    
    SessionSticky --> AppServer1
    SessionSticky --> AppServer2
    SessionSticky --> AppServer3
    
    AppServer1 --> NextAPIRoutes
    AppServer2 --> NextAPIRoutes
    AppServer3 --> NextAPIRoutes
    
    NextAPIRoutes --> ServiceRoute
    NextAPIRoutes --> DataRoute
    NextAPIRoutes --> UserRoute
    
    ServiceRoute --> LoadBalancer
    DataRoute --> LoadBalancer
    UserRoute --> LoadBalancer
    
    LoadBalancer --> BackendAPI1
    LoadBalancer --> BackendAPI2
    LoadBalancer --> DataAPI
    LoadBalancer --> UserService
    LoadBalancer --> ConfigService
    
    BackendAPI1 --> RedisCluster
    BackendAPI2 --> RedisCluster
    DataAPI --> Database
    UserService --> Database
    ConfigService --> Database
    
    BackendAPI1 --> S3Storage
    DataAPI --> S3Storage
    UserService --> AuthService
```

## 14. Detailed Request Flow: Infrastructure Level

```mermaid
sequenceDiagram
    participant Client
    participant CDN
    participant APIGateway
    participant LoadBalancer
    participant NextJSApp
    participant APIRoute
    participant BackendService
    participant Redis
    participant Database
    
    Client->>CDN: 1. HTTP Request
    CDN->>CDN: 2. Check Edge Cache
    alt Cache Hit
        CDN-->>Client: 3a. Return Cached Response
    else Cache Miss
        CDN->>APIGateway: 3b. Forward Request
        APIGateway->>APIGateway: 4. Rate Limiting Check
        APIGateway->>APIGateway: 5. Authentication/Authorization
        APIGateway->>LoadBalancer: 6. Route Request
        LoadBalancer->>LoadBalancer: 7. Health Check & SSL Termination
        LoadBalancer->>LoadBalancer: 8. Session Affinity Routing
        LoadBalancer->>NextJSApp: 9. Forward to App Server
        NextJSApp->>APIRoute: 10. Process API Route
        APIRoute->>Redis: 11. Check Cache
        alt Cache Hit
            Redis-->>APIRoute: 11a. Return Cached Data
        else Cache Miss
            APIRoute->>LoadBalancer: 11b. Request Backend Service
            LoadBalancer->>BackendService: 12. Route to Backend
            BackendService->>Database: 13. Query Database
            Database-->>BackendService: 14. Return Data
            BackendService-->>APIRoute: 15. Return Response
            APIRoute->>Redis: 16. Cache Response
        end
        APIRoute-->>NextJSApp: 17. Return Data
        NextJSApp-->>LoadBalancer: 18. Return Response
        LoadBalancer-->>APIGateway: 19. Return Response
        APIGateway->>CDN: 20. Cache Response
        APIGateway-->>Client: 21. Return Response
    end
```

## 15. Network Architecture with Load Balancing

```mermaid
graph LR
    subgraph "Internet"
        Users[Users]
    end
    
    subgraph "Edge Layer"
        CDN[CDN]
        WAF[Web Application Firewall]
    end
    
    subgraph "API Gateway Tier"
        Gateway1[API Gateway Instance 1]
        Gateway2[API Gateway Instance 2]
        GatewayLB[Gateway Load Balancer]
    end
    
    subgraph "Application Tier"
        LB[Application Load Balancer]
        TargetGroup[Target Group]
    end
    
    subgraph "Next.js Application Servers"
        App1[Next.js Server 1<br/>Port 3000]
        App2[Next.js Server 2<br/>Port 3000]
        App3[Next.js Server 3<br/>Port 3000]
    end
    
    subgraph "Backend Services Tier"
        BackendLB[Backend Load Balancer]
        Service1[Backend Service 1]
        Service2[Backend Service 2]
        Service3[Backend Service 3]
    end
    
    subgraph "Data Tier"
        RedisMaster[Redis Master]
        RedisReplica1[Redis Replica 1]
        RedisReplica2[Redis Replica 2]
        DBPrimary[(Primary DB)]
        DBReplica[(Replica DB)]
    end
    
    Users --> CDN
    CDN --> WAF
    WAF --> GatewayLB
    GatewayLB --> Gateway1
    GatewayLB --> Gateway2
    Gateway1 --> LB
    Gateway2 --> LB
    LB --> TargetGroup
    TargetGroup --> App1
    TargetGroup --> App2
    TargetGroup --> App3
    App1 --> BackendLB
    App2 --> BackendLB
    App3 --> BackendLB
    BackendLB --> Service1
    BackendLB --> Service2
    BackendLB --> Service3
    Service1 --> RedisMaster
    Service2 --> RedisMaster
    Service3 --> RedisMaster
    RedisMaster --> RedisReplica1
    RedisMaster --> RedisReplica2
    Service1 --> DBPrimary
    Service2 --> DBPrimary
    Service3 --> DBPrimary
    DBPrimary --> DBReplica
```

## 16. Complete Infrastructure Stack

```mermaid
graph TB
    subgraph "Layer 1: Client Devices"
        WebClient[Web Browser]
        MobileClient[Mobile App]
        DesktopClient[Desktop App]
    end
    
    subgraph "Layer 2: Content Delivery"
        CloudFront[CloudFront/CDN]
        EdgeLocations[Edge Locations]
    end
    
    subgraph "Layer 3: Security & Gateway"
        WAF[WAF - DDoS Protection]
        APIGateway[API Gateway<br/>- Request Routing<br/>- Rate Limiting<br/>- Authentication]
    end
    
    subgraph "Layer 4: Load Balancing"
        ALB[Application Load Balancer<br/>- Health Checks<br/>- SSL Termination<br/>- Path-based Routing]
    end
    
    subgraph "Layer 5: Application Servers"
        AutoScaling[Auto Scaling Group]
        EC2Instance1[EC2/Container Instance 1<br/>Next.js App]
        EC2Instance2[EC2/Container Instance 2<br/>Next.js App]
        EC2Instance3[EC2/Container Instance N<br/>Next.js App]
    end
    
    subgraph "Layer 6: API Routes"
        NextAPIRoutes[Next.js API Routes<br/>/api/service<br/>/api/data<br/>/api/user]
    end
    
    subgraph "Layer 7: Service Mesh"
        ServiceMesh[Service Mesh<br/>- Service Discovery<br/>- Circuit Breaker<br/>- Retry Logic]
    end
    
    subgraph "Layer 8: Backend Services"
        Microservice1[Microservice 1]
        Microservice2[Microservice 2]
        Microservice3[Microservice 3]
        DataService[Data Service]
        UserService[User Service]
    end
    
    subgraph "Layer 9: Data Layer"
        ElastiCache[ElastiCache/Redis<br/>- Cache Cluster]
        RDS[(RDS Database<br/>- Primary & Replicas)]
        S3[S3 Storage<br/>- Object Storage]
    end
    
    subgraph "Layer 10: External Services"
        AzureB2C[Azure AD B2C]
        Monitoring[Monitoring Services]
        Logging[Logging Services]
    end
    
    WebClient --> CloudFront
    MobileClient --> APIGateway
    DesktopClient --> APIGateway
    CloudFront --> EdgeLocations
    EdgeLocations --> WAF
    WAF --> APIGateway
    APIGateway --> ALB
    ALB --> AutoScaling
    AutoScaling --> EC2Instance1
    AutoScaling --> EC2Instance2
    AutoScaling --> EC2Instance3
    EC2Instance1 --> NextAPIRoutes
    EC2Instance2 --> NextAPIRoutes
    EC2Instance3 --> NextAPIRoutes
    NextAPIRoutes --> ServiceMesh
    ServiceMesh --> Microservice1
    ServiceMesh --> Microservice2
    ServiceMesh --> Microservice3
    ServiceMesh --> DataService
    ServiceMesh --> UserService
    Microservice1 --> ElastiCache
    Microservice2 --> ElastiCache
    DataService --> RDS
    UserService --> RDS
    Microservice1 --> S3
    DataService --> S3
    APIGateway --> AzureB2C
    EC2Instance1 --> Monitoring
    EC2Instance2 --> Logging
```

