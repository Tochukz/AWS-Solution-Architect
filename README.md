# AWS Solution Architect
[Certified solutions architect associate](https://aws.amazon.com/certification/certified-solutions-architect-associate/)   
[Skill Builder prep](https://skillbuilder.aws/exam-prep/solutions-architect-associate)  
[Skill Builder Search](https://skillbuilder.aws/search)

### Resources
[Knowledgehut Practice Tests](https://www.knowledgehut.com/practice-tests/aws-solutions-architect-associate)
[AWS Study Guide Review Questions (SAA-C01)](https://quizlet.com/sg/512306255/aws-study-guide-review-questions-saa-c01-flash-cards/)

### Usefull commands
Get all the managed policies
```bash
$ aws iam list-policies --scope AWS --output table > aws-policies.md
```

### Convert yaml to JSON template
Install `cfn-flip`  
```bash
$ pip install cfn-flip
```

Convert yaml template to JSON template
```bash
$ cfn-flip template.yaml template.json
```  

Covert JSON template to yaml template
```bash
$ cfn-flip template.json template.yaml
```

### Downloading Video from Youtube
__Install CLI tools__   
```bash
# Install yt-dlp for dowloading youtube videos
$ pip install yt-dlp

# Install ffmpeg for spliting large videos
$ brew install ffmpeg
```

__Download the Youtube video__    
```bash
$ yt-dlp https://www.youtube.com/watch\?v\=c3Cn4xYfxJY\&t\=394s
```

__Split the video if large__   
```
$ ffmpeg -i input.mp4 -c copy -map 0 -segment_time 05:02:00 -f segment CSA_%03d.mp4
```

### Useful Tools
[AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)  
[IAM Policy Simulator](https://policysim.aws.amazon.com)  
[ExamPro SAA-C03](https://www.exampro.co/saa-c03)  

[GitPod](gitpod.io/#https://github.com/tochukz)  


## RDS Cost
All Upfront
106 + 2.66 * 12 = 137.92 (R11.49/Month)

Partial Upfront
55 + 7.19 * 12 = 141.28

No Upfront
0 + 12.15 * 12 = 145.8     

On Demand
15.80 * 12 = 189.6 (R51 More than All Upfront) ($15.80/Month)
