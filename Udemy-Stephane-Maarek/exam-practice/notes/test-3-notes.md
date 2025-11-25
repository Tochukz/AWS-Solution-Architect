### Data Transfer: AWS DataSync vs File Gateway vs AWS Transfer Family

__AWS DataSync__  
* Support S3, EFS and FSx for Windows File Server
* Simplifies, automates, and accelerates copying large amounts of data to and from AWS storage services over the internet or AWS Direct Connect.
* Performs data integrity verification both during the transfer and at the end of the transfer.

__AWS Transfer Family__  
* Support S3 and EFS
* Provides fully managed support for file transfers directly into and out of S3 and EFS.

__AWS Storage Gateway or File Gateway__  
* Supports only S3
* Stores application data files and backup images as durable objects on Amazon S3
* File gateway offers SMB or NFS-based access to data in Amazon S3 with local caching.
