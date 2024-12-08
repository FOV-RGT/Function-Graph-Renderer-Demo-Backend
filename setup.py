from setuptools import setup, find_packages

setup(
    name='my_django_project',
    version='0.666',
    packages=find_packages(),
    include_package_data=True,
    install_requires=[
        'django',
        # Add other dependencies here
    ],
    entry_points={
        'console_scripts': [
            'manage.py = myproject.manage:main',
        ],
    },
)
