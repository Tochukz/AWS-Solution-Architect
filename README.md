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
