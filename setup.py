from setuptools import setup, find_packages

setup(
    name= 'crypto_tools',
    version= '0.1',
    author= 'yasin',
    author_email= 'yasintuncerr@gmail.com',
    description= 'AES encryption and decryption',
    long_description= open('README.md').read(),
    long_description_content_type= 'text/markdown',
    url= 'https://github.com/yasintuncer/de-encrypt',
    packages= find_packages(where='src'),
    install_requires= ['pycryptodome'],
    package_dir= {'': 'src'},
    
    classifiers= [
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires= '>=3.6',
)

    