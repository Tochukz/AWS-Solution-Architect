# Section 23: Machine Learning
## Amazon Rekognition
__Introduction__  
Amazon Rekognition is used to
* find object, people, text, scenes in images and videos using Machine Learning
* do facial analysis and  facial search for user verification and people counting

With Rekognition you can create a database of "familiar faces" or compare against celebrities

__Use cases__  
* Labeling
* Content Moderation
* Text Detection
* Face Detection and Analysis (gender, age, range, emotions...)
* Face Search and Verification
* Celebrity Recognition
* Pathing (ex: for sports game analysis)

__Amazon Rekognition - Content Moderation__  
* Detect content that is inappropriate, unwanted, or offensive (image and video)
* Used in social media, broadcast media, advertising and e-commerce situations to create a safer user experience.  

__How to use Rekognition__  
You send and Image to Rekognition to analyse and you set a _Minimum Confidence Threshold_ for the image to be flagged.

## Amazon Transcribe
__Introduction__  
Amazon Transcribe allows you to automatically convert speech into text. You pass it some audio and it is automatically transformed into text.    
It uses a deep leaning process called _automatic speech recognition_ (ASR) to convert speech to text quickly and accurately.  

__Amazon Transcribe Features__  
Amazon Transcribe can automatically remove _Personally Identifiable Information_ (PII) using Redaction.   
Amazon Transcribe also supports Automatic Language Identification for multi-lingual audio.

__Use cases__  
* Transcribe customer service calls
* Automate closed captioning and subtitling
* Generate metadata for media assets to create a fully searchable archive

## Amazon Polly
__Introduction__  
Amazon Polly turns text into lifelike speech using deep learning. This allows you to create applications that talk.  

__Amazon Polly - Lexicon__  
* Amazon Polly supports customization of pronunciation of words with _Pronunciation lexicons_  
  - Styles words: St3ph4ne => "Stephane"
  - Acronymns: AWS => "AWS Web Services"
* You upload the lexicons and use them in the _SynthesizeSpeech_ operation

__Amazon Polly - SSML__  
In Amazon Polly, speech can be generated  from plain text or from documents marked up with _Speech Synthesis Markup Language_ (SSML).
Generating speech from SSML provides the ability to customize the speech further. With SSML, you can
* emphasize specific  words or phrases
* use phonetic pronunciation
* include breathing sounds or whispering
* use the Newscaster speaking style

## Amazon Translate
__Introduction__  
Amazon Translate is a natural and accurate language translation service.
Amazon Translate allows you to localize content such as websites and applications for international users and to easily translate large volumes of text efficiently.

## Amazon Lex and Connect
### Amazon Lex
Amazon Lex is the same technology that powers Alexa.
It has the following features:
* Automatic Speech Recognition (ASR) to convert speech to text
* Natural Language Understanding to recognize the intent of text, callers
Amazon Lex can help you to build chatbots and call center bots.

### Amazon Connect
With Amazon connect you can build a cloud-based _virtual contact center_ to receive calls and create contact flow
Amazon connect can integrate with other CRM systems or AWS services.   
No upfront payment is required and it is 80% cheaper than traditional contact center solutions.  

## Amazon Comprehend
__Introduction__  
* Amazon Comprehend is for _Natural Language Processing_ (NLP)
* It is a fully managed and serverless service

__Amazon Conprehend capabilities__
_Amazon Comprehend_ uses machine learning to find insight and relationships in text.
* It can determine the language of the text
* Extract key phrases, places, people, brand or events
* Understand how positive or nagative the text is
* Analyze text using tokenization and parts of speech
* Automatically organizes a collection of text files by topic

__Amazon Conprehend use cases__  
* Analyze customer interactions (emails) to find what leads to a positive or negative experience
* Create and group articles by topics that Comprehend will uncover

## Amazon Comprehend Medical
__Introduction__  
_Amazon Comprehend Medical_ detects and returns useful information in unstructured clinical text:
* Physician's notes
* Discharge summaries
* Test results
* Cases notes

Amazon Comprehend Medical uses NLP to detect Protected Health Information (PHI) - DetechPHI API

## Amazon SageMaker
__Introduction__  
* Fully managed service for developers/data scientists to build ML models.  
* Typically difficult to do all the processes in one place + provision servers

## Amazon Kendra
__Introduction__  
* Fully manages _document search service_ powered by Machine Learning
* Extract answers from within a document (text, pdf, HTML, PowerPoint, MS Word, FAQs)
* Natural Language search capabilities
* Learn from user interactions/feedback to promote preferred results (Incremental Learning)
*b Ability to manually fine-tune search results (importance of data freshness, custom,...)

## Amazon Personalize
* Fully managed ML-service to build apps with real-time personalized recommendations
* Example: personalized product recommendations/re-ranking, customized direct marketing
 - Example: User brought gardening tools, provide recommendations on the next one to buy
* Same technology used by Amazon.com
* Integrates into existing websites, applications, SMS, email marketing systems
* Implement in days, not months (you don't need to build, train and deploy ML solutions)
* Use cases: retails stores, media and entertainment

## Amazon Textract
* Automatically extract text, handwriting, and data from any scanned documents using AI and ML
* Extract data from forms and tables
* Read and process any type of document (PDFs, images,...)
* Use cases:
  - Financial Services (e.g invoices, financial reports)
  - Healthcare (e.g medical records, insurance claims)
  - Public Sector (e.g tax forms, ID documents, passports)

## Amazon Forecast
Amazon Forecast is a fully managed service that uses machine learning to deliver highly accurate forcasts.

## AWS Machine Learning - Summary
* __Rekognition__: face detection, labeling, celebrity recognition
* __Transcribe__: audio to text (eg. subtitle)
* __Polly__: text to audio
* __Translate__: translation
* __Lex__: build conversational bots - chatbots
* __Connect__: cloud contact center
* __Comprehend__: natural language processing
* __SageMaker__: machine learning for every developer and data scientist
* __Kendra__; ML-powered search engine
* __Personalize__: real-time personalized recommendations
* __Textract__: detect text and data in documents
* __Forecast__: for weather forecast
