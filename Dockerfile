# ------------------------------------------------------------------------------
# Pull base image
FROM mbed/yotta:latest
MAINTAINER Rob Moran <rob@thegecko.org>

# ------------------------------------------------------------------------------
# Install base
RUN curl -sL https://deb.nodesource.com/setup_0.12 | bash -
RUN apt-get -y update && \
	apt-get -y install ctags nodejs && \
	npm install -g gulp

# ------------------------------------------------------------------------------
# Clone codebox
RUN git clone https://github.com/code-box/codebox /yotta-box && \
	rm -rf /yotta-box/.git /yotta-box/test

# ------------------------------------------------------------------------------
# Install codebox dependencies
RUN cd /yotta-box && \
	npm install && \
	gulp

# ------------------------------------------------------------------------------
# Environment
EXPOSE 8000
ENV CODEBOX_PORT 8000
ENV CODEBOX_TITLE yotta-box
ENV CODEBOX_DEBUG false
ENV CODEBOX_LOCAL_FOLDER /yotta-box
ENV CODEBOX_DESKTOPUSER yottaUser
ENV CODEBOX_ID docker_workspace

# ------------------------------------------------------------------------------
# Install codebox packages
RUN /yotta-box/bin/codebox.js install
#RUN /yotta-box/bin/codebox.js install --packages=about:thegecko/yotta-box-about,yotta:thegecko/yotta-box-yotta

# ------------------------------------------------------------------------------
# Settings overlay
ADD settings.json /yotta-box/settings.json

# ------------------------------------------------------------------------------
# Startup
ENTRYPOINT ["/yotta-box/bin/codebox.js", "run"]
CMD ["/workspace"]