# LLM Working & Tokens Explained

## How LLMs Work?

### 1. Basic Architecture
```
      Input Text → Tokenization → Embedding → Transformer Layers → Output Generation
```

### 2. Detailed Process
```
      ┌─────────────────────────────────────────────────────────────────┐
      │                        INPUT PROCESSING                         │
      └─────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────────┐
      │                          TOKENIZATION                           │
      │  "Hello, how are you?" → ["Hello", ",", " how", " are", " you?"] │
      └─────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────────┐
      │                           EMBEDDING                             │
      │  Each token → Vector in high-dimensional space                  │
      │  "Hello" → [0.12, -0.45, 0.78, ..., 0.23] (768 dimensions)      |
      └─────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────────┐
      │                        TRANSFORMER LAYERS                       │
      ├─────────────────────────────────────────────────────────────────┤
      │  Multi-Head Attention: Understanding relationships between words│
      │  Feed Forward Networks: Processing information                  │
      │  Layer Normalization: Stabilizing training                      │
      │  Residual Connections: Preventing information loss              │
      └─────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────────┐
      │                          OUTPUT LAYER                           │
      │  Probability distribution over vocabulary                       │
      │  ["I": 0.1, "am": 0.3, "fine": 0.4, ...]                       │
      └─────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
      ┌─────────────────────────────────────────────────────────────────┐
      │                         TEXT GENERATION                         │
      │  Select next token based on probabilities → "fine"              │
      │  Add to sequence → "Hello, how are you? I am fine"              │
      └─────────────────────────────────────────────────────────────────┘
```

### 3. Transformer Architecture Diagram
```
        Input Embeddings
              │
              ▼
      Positional Encoding
              │
              ▼
      ┌─────────────────┐
      │ Encoder Stack   │
      │ ┌─────────────┐ │
      │ │Multi-Head   │ │
      │ │Attention    │ │
      │ └─────────────┘ │
      │ ┌─────────────┐ │
      │ │Feed Forward │ │
      │ │Network      │ │
      │ └─────────────┘ │
      │      ...        │  (Repeated N times)
      └─────────────────┘
              │
              ▼
      ┌─────────────────┐
      │ Decoder Stack   │
      │ ┌─────────────┐ │
      │ │Masked       │ │
      │ │Attention    │ │
      │ └─────────────┘ │
      │ ┌─────────────┐ │
      │ │Cross        │ │
      │ │Attention    │ │
      │ └─────────────┘ │
      │ ┌─────────────┐ │
      │ │Feed Forward │ │
      │ │Network      │ │
      │ └─────────────┘ │
      │      ...        │  (Repeated N times)
      └─────────────────┘
              │
              ▼
      Output Probabilities
```

## How Tokens Work
### 1. Tokenization Process
```
      Original Text: "I don't like pizza!"
                    ↓
      Tokenization: ["I", " don", "'t", " like", " pizza", "!"]
                    ↓
      Token IDs:    [40, 243, 83, 128, 12496, 0]
```



