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

### 2. Token Types Diagram
```
      ┌─────────────────────────────────────────────────────────────┐
      │                      TOKENIZATION METHODS                    │
      └─────────────────────────────────────────────────────────────┘

      Word-level:    "I don't like pizza!" → ["I", "don't", "like", "pizza", "!"]
                     Pros: Easy to understand
                     Cons: Large vocabulary, out-of-vocabulary problems

      Subword-level: "I don't like pizza!" → ["I", "don", "'t", "like", "pizz", "a", "!"]
                     Pros: Handles unknown words, smaller vocabulary
                     Cons: More tokens needed

      Character-level: "I don't like pizza!" → ["I", " ", "d", "o", "n", "'", "t", ...]
                     Pros: Very small vocabulary
                     Cons: Long sequences, less semantic meaning
```

### 3. BPE (Byte Pair Encoding) - Most Common Method
```
      Training Corpus: "low lower newest widest"
      Step 1: Count character frequency
      l:2, o:2, w:2, e:4, r:2, n:1, s:2, t:2, i:1, d:1, space:3

      Step 2: Find most frequent pair: "e" + "s" = "es" (appears 3 times)
      New vocabulary: "es"

      Step 3: Replace in corpus: "low lower newest widest" → "low lower newes widest"

      Step 4: Repeat until desired vocabulary size
      Next: "es" + "t" = "est" (appears 2 times)
      And so on...

      Final tokens might include: "low", "low", "er", "new", "est", "wid", "est"
```

### 4. Token Limits and Context Window
```
      ┌─────────────────────────────────────────────────────────────────┐
      │                     CONTEXT WINDOW EXAMPLE                      │
      ├─────────────────────────────────────────────────────────────────┤
      │ Model: GPT-3.5-turbo │ Context: 4,096 tokens                    │
      │ Input: 1,000 tokens  │ Output: 500 tokens │ Remaining: 2,596    │ 
      │                                                                 │
      │ If input + output > 4,096: ERROR - Context length exceeded      │
      └─────────────────────────────────────────────────────────────────┘

      Token Counting Example:
      Input: "Explain machine learning" (3 tokens)
      + System message: "You are a helpful assistant" (6 tokens)
      + Previous conversation: 500 tokens
      + Current response: 200 tokens
      = Total: 709 tokens used
```

### 5. Cost Calculation
```
      ┌─────────────────────────────────────────────────────────────────┐
      │                         COST CALCULATION                        │
      ├─────────────────────────────────────────────────────────────────┤
      │ Input Tokens: 1,000 × $0.0015 per 1K tokens = $0.0015           │
      │ Output Tokens: 500 × $0.0020 per 1K tokens = $0.0010            │ 
      │ Total Cost: $0.0025 for this interaction                        │
      └─────────────────────────────────────────────────────────────────┘
```

